<template>
  <v-row no-gutters class="historyItem" align="center" @click="openLink(hash)">
    <v-col cols="1">
      <div class="icon-shuff">
        <v-icon dark v-if="!checkOut(from)" color="#31B7C0" size="28">
          add_circle
        </v-icon>
        <v-icon dark v-else color="#FF9300" size="28"> remove_circle </v-icon>
      </div>
    </v-col>
    <v-col cols="8" class="detail-body">
      <div>Tx hash: {{ hash }}</div>
      <div>
        {{ DateTime(new Date(parseInt(timeStamp) * 1000)) }}
      </div>
    </v-col>
    <v-col cols="3" class="text-right">
      <span
        class="d-block w-100 money text-xs-right"
        :class="{ wd: checkOut(from) }"
        >{{ checkOut(from) ? "-" : "+" }} {{ parseUtillETHtoShow(value) }}</span
      >
      <span class="sk text-xs-right" :class="{ wd: checkOut(from) }">
        <span>{{ tokenSymbol }}</span>
      </span>
    </v-col>
    <v-col cols="12" class="pt-2 px-2" v-if="!lastChild">
      <v-divider></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HistoryItem",
  props: {
    hash: {
      type: String,
      default: "",
    },
    from: {
      type: String,
      default: "",
    },
    timeStamp: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "0",
    },
    tokenSymbol: {
      type: String,
      default: "XTH",
    },
    lastChild: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openLink(link) {
      window.open("https://exp.xchain.asia/tx/" + link, "_blank");
    },
    checkOut(from) {
      console.log();
      return from.toLowerCase() === String(this.ethereumAddress).toLowerCase();
    },
  },
};
</script>

<style lang="scss">
.historyItem {
  font-size: 14px;
  padding: 8px 12px;
  .icon-shuff {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .detail-body {
    padding-left: 12px!important;
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
}

.mt-30 {
  margin-top: 30px;
}

.money {
  color: #31b7c0;
}

.sk {
  font-size: 12px;
  color: #31b7c0;
}

.wd {
  color: #ff9300;
}
</style>