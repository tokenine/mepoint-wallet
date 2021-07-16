<template>
  <div class="history-detail-page">
    <layout :header="'ประวัติการทำรายการ'" @onBack="$router.push('/history')">
      <template v-slot:content>
        <v-col cols="12" xs="12" sm="10" md="8" lg="6">
          <div class="box-detail my-2">
            <div>
              <h1 class="w-100 text-center">
                {{ historyByID.amount }}
                <small class="ml-2">{{ historyByID.token_name }}</small>
              </h1>
              <v-subheader class="d-block text-center">{{
                DateTime(historyByID.created_at)
              }}</v-subheader>
            </div>
            <div>
              <p>
                <strong>ผู้ทำรายการ:</strong>
                {{ historyByID.type != "redeem" ? "ระบบ" : "เจ้าของบัญชี" }}
              </p>
              <p style="word-wrap: break-word">
                <strong>การทำรายการ:</strong>
                {{ historyByID.type != "redeem" ? "โอนเหรียญ" : "รับเหรียญ" }}
              </p>
              <p style="word-wrap: break-word">
                <strong>หมายเลขกระเป๋า:</strong>
                {{
                  historyByID.type != "redeem"
                    ? historyByID.to_address
                    : historyByID.user_wallet
                }}
              </p>
              <p style="word-wrap: break-word">
                <strong>บันทึกข้อความ:</strong>
                {{ historyByID.note }}
              </p>
            </div>
          </div>
        </v-col>
      </template>
    </layout>
    <bottom-nav> </bottom-nav>
  </div>
</template>

<script>
import BottomNavVue from "../../../components/BottomNav.vue";
import layout from "../../../components/layout.vue";
export default {
  name: "HistoryDetail",
  components: {
    layout: layout,
    "bottom-nav": BottomNavVue,
  },
  computed: {
    historyByID() {
      return this.$store.getters.historyByID(this.$route.params.id);
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
};
</script>

<style lang="scss">
.history-detail-page {
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