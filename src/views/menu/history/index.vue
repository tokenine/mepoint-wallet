<template>
  <div class="history-page">
    <layout :header="'ประวัติการทำรายการ'" @onBack="$router.push('/')">
      <template v-slot:content>
        <v-col cols="12" xs="12" sm="10" md="8" lg="6" v-show="showPage">
          <div class="box-detail my-2" v-if="history.length > 0">
            <v-row
              align="center"
              v-for="(item, i) in orderByHistory"
              :key="i"
              @click="
                $router.push({
                  name: 'HistoryDetail',
                  params: { id: item.transaction_hash },
                })
              "
            >
              <v-col cols="2">
                <div class="icon-shuff">
                  <v-icon
                    large
                    dark
                    v-if="item.type == 'redeem'"
                    color="#31B7C0"
                  >
                    add_circle
                  </v-icon>
                  <v-icon large dark v-else color="#FF9300">
                    remove_circle
                  </v-icon>
                </div>
              </v-col>
              <v-col cols="6" class="detail-body">
                <div>{{ item.note }}</div>
                <div>{{ DateTime(item.created_at) }}</div>
              </v-col>
              <v-col cols="4" class="text-right">
                <span
                  class="sk d-block w-100 mt-2 money text-right"
                  :class="{ wd: item.type != 'redeem' }"
                  >{{ item.type == "redeem" ? "+" : "-" }}
                  {{ formatMoney(item.amount) }}</span
                >
                <span
                  class="sk text-right"
                  :class="{ wd: item.type != 'redeem' }"
                  >{{ item.asset_code }}</span
                >
              </v-col>
              <v-col cols="12" class="pa-0 px-3" v-if="i < history.length - 1">
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </div>
          <div class="box-detail my-2" v-else>
            <v-row align="center">
              <v-col cols="12" class="text-center"> ไม่มีข้อมูล ... </v-col>
            </v-row>
          </div>
        </v-col>
      </template>
    </layout>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import layout from "../../../components/layout.vue";
import BottomNavVue from "../../../components/BottomNav.vue";
export default {
  name: "History",
  components: {
    layout: layout,
    "bottom-nav": BottomNavVue,
  },
  data: () => ({
    showPage: false,
  }),
  computed: {
    history() {
      return this.$store.state.auth.history;
    },
    orderByHistory() {
      return this.history.sort(dynamicSort("-createdAt"));
    },
  },
  methods: {
    checkOut(from) {
      if (from == this.walletAddress) {
        return true;
      } else {
        return false;
      }
    },
  },
  async created() {
    this.app_loading(true);
    await this.$store.dispatch("getHistory");
    this.app_loading(false);
    this.showPage = true;
  },
};

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
</script>

<style lang="scss">
.history-page {
  .layout-page {
    padding-bottom: 60px;
    overflow-y: scroll;
  }
  .box-detail {
    border-radius: 12px;
    background-color: #f7f7f7;
    padding: 20px 10px;
    font-size: 14px;

    .icon-shuff {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .detail-body {
      > div {
        height: 15px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      > div:nth-child(2) {
        font-size: 12px;
        color: #a7a7a7;
        margin-top: 4px;
      }
    }

    .sk {
      color: #31b7c0;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
    }

    .wd {
      color: #ff9300 !important;
    }
  }
}
</style>