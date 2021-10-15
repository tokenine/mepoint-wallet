<template>
  <v-row no-gutters class="history-pay-tem" align="center">
    <v-col cols="1">
      <div class="icon-shuff">
        <v-img
          :src="token.logoURI"
          width="100%"
          max-width="36px"
          height="auto"
          contain
        ></v-img>
      </div>
    </v-col>
    <v-col cols="8" class="detail-body">
      <div>{{ Description }}</div>
      <div>จำนวน {{ formatMoney(String(Amount).substring(0,String(Amount).length - 2)) }} บาท</div>
      <div>
          Tx ID: {{ TransactionId }}
      </div>
    </v-col>
    <v-col cols="3" class="text-right" style="font-size: 12px">
      <span v-if="PaymentStatus == 0" class="success--text">Success</span>
      <span v-else-if="PaymentStatus == 1" class="error--text">Fail</span>
      <span v-else-if="PaymentStatus == 2" class="error--text">Cancel</span>
      <span v-else-if="PaymentStatus == 3" class="error--text">Error</span>
      <span v-else-if="PaymentStatus == 4">Transaction Timeout</span>
      <span v-else-if="PaymentStatus == 9">Transaction Pending</span>
      <span v-else-if="PaymentStatus == 20">Void Success</span>
      <span v-else-if="PaymentStatus == 21">Refund Success</span>
      <span v-else-if="PaymentStatus == 22">Request to Refund</span>
      <span v-else-if="PaymentStatus == 23">Settlement Success</span>
      <span v-else-if="PaymentStatus == 24">Void Fail Refund</span>
      <span v-else-if="PaymentStatus == 25">Fail Pending</span>
      <span v-else-if="PaymentStatus == 99" class="warning--text">Pending</span>
    </v-col>
    <v-col cols="12" class="pt-2 px-2" v-if="!lastChild">
      <v-divider></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HistoryPayItem",
  computed: {
    tokenList() {
      return this.$store.state.auth.tokenList;
    },
  },
  props: {
    Description: {
      type: String,
      default: "-",
    },
    TransactionId: {
      type: String,
      default: "",
    },
    tokenAddress: {
      type: String,
      default: "",
    },
    PaymentStatus: {
      type: Number,
      default: 99,
    },
    Amount: {
      type: Number,
      default: 0,
    },
    lastChild: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      token: null,
    };
  },
  created() {
    let token = this.tokenList.find(
      (q) =>
        String(q.address).toLowerCase() ==
        String(this.tokenAddress).toLowerCase()
    );
    this.token = token;
  },
};
</script>

<style lang="scss">
.history-pay-tem {
  font-size: 14px;
  padding: 8px 8px 0px 8px;
  .icon-shuff {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .detail-body {
    padding-left: 12px !important;
    > div {
      width: 100%;
      font-size: 12px;
      height: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > div:nth-child(2) {
      font-size: 12px;
      margin-top: 4px;
    }
    > div:nth-child(3) {
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