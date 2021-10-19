<template>
  <div class="payment-page">
    <v-row no-gutters v-if="selected != null">
      <v-col cols="12" class="d-flex align-start">
        <span class="ml-2">
          <h2>ซื้อเหรียญ</h2>
        </span>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" class="px-3">
      <v-col cols="12" xs="12" sm="8" md="6" lg="4">
        <v-row dense class="mt-3">
          <v-col cols="12">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex align-center">
                  <v-btn text class="pl-0" v-bind="attrs" v-on="on">
                    <v-img
                      height="30px"
                      max-width="30px"
                      contain
                      :src="selected.logoURI"
                    ></v-img>
                    <span class="ml-2">{{ selected.symbol }}</span>
                    <v-icon>arrow_drop_down</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <div class="text-right d-block mt-1">
                    <span class="sub-text">
                      1 {{ selected.symbol }} = {{ selected.price }} THB
                    </span>
                  </div>
                </div>
              </template>
              <v-list>
                <v-list-item
                  v-for="(token, i) in tokenListWithoutSelect"
                  :key="i"
                  link
                  @click="selected = token"
                >
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-img
                        height="25px"
                        max-width="25px"
                        contain
                        :src="token.logoURI"
                      ></v-img>
                      <span class="ml-3" style="font-size: 13px">{{
                        token.symbol
                      }}</span>
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-text-field
              background-color="#c71e2b"
              dark
              class="amount-input"
              hide-details
              type="number"
              outlined
              v-model.number="amount"
            >
            </v-text-field>
            <div class="text-center mt-2">
              <h3>จำนวน {{ sum_price }} THB</h3>
              <span class="error--text" style="font-size: 12px"
                >ซื้อขั้นต่ำ 20 บาท</span
              >
            </div>
          </v-col>
          <v-col cols="12" class="mt-3">
            <div class="d-flex align-center">
              <v-icon large> payment </v-icon>
              <span class="ml-1">Payment methods</span>
            </div>
          </v-col>
          <v-col cols="12">
            <v-expansion-panels focusable v-model="panel">
              <v-expansion-panel @change="channelPayment('payplus_kbank')">
                <v-expansion-panel-header>
                  <div class="d-flex align-center pr-3">
                    <v-img
                      :src="'/image/kplus.png'"
                      max-width="30px"
                      height="30px"
                      contain
                    ></v-img>
                    <v-spacer></v-spacer>
                    <span> Mobile Payment </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters class="px-3 pt-4" justify="center">
                    <v-form
                      ref="formKplus"
                      v-model="valid"
                      lazy-validation
                      class="text-center"
                    >
                      <v-text-field
                        required
                        :rules="phoneRules"
                        type="number"
                        v-model.trim="form.PhoneNumber"
                        color="none"
                        outlined
                        dense
                        height="40px"
                        label="เบอร์โทรศัพท์ K PLUS"
                        :counter="10"
                      ></v-text-field>
                      <v-btn
                        color="#c71e2b"
                        class="mt-3"
                        :disabled="sum_price < 20"
                        @click="pay"
                      >
                        <span class="white--text"> จ่ายด้วย PayPlus </span>
                      </v-btn>
                    </v-form>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel @change="channelPayment('bank_qrcode')">
                <v-expansion-panel-header>
                  <div class="d-flex align-center pr-3">
                    <v-icon>qr_code</v-icon>
                    <v-spacer></v-spacer>
                    <span> QR Code Payment </span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters class="px-3 pt-4" justify="center">
                    <v-btn
                      color="#c71e2b"
                      :disabled="sum_price < 20"
                      @click="pay"
                    >
                      <span class="white--text"> จ่ายด้วย QR Code </span>
                    </v-btn>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="mt-30">
        <div class="d-flex align-center">
          <v-icon large> history </v-icon>
          <span class="ml-1">ประวัติการซื้อเหรียญ</span>
        </div>
        <v-card class="box-detail mt-2" elevation="0">
          <div v-if="history.length > 0">
            <history-pay-item
              v-for="(item, i) in history"
              :key="'history' + i"
              :Description="item.Description"
              :TransactionId="item.TransactionId"
              :tokenAddress="item.tokenAddress"
              :PaymentStatus="
                item.PaymentStatus == undefined
                  ? 99
                  : Number.parseInt(item.PaymentStatus)
              "
              :Amount="item.Amount"
            />
          </div>
          <div
            v-else
            class="d-flex align-center justify-center"
            style="height: 100px"
          >
            ไม่มีข้อมูล...
          </div>
        </v-card>
      </v-col>
    </v-row>
    <bottom-nav />
  </div>
</template>

<script>
import layout from "../../../components/layout.vue";
import bottomNav from "../../../components/BottomNav.vue";
import HistoryPayItem from "../../../components/history_pay_item.vue";
import { paymentsCollection } from "../../../plugins/firebase";
export default {
  name: "Payment",
  components: {
    layout: layout,
    "bottom-nav": bottomNav,
    "history-pay-item": HistoryPayItem,
  },
  computed: {
    sum_price() {
      try {
        return this.amount * this.selected.price;
      } catch (err) {
        return 0;
      }
    },
    tokenList() {
      return this.$store.state.auth.tokenList;
    },
    tokenListWithoutSelect() {
      try {
        let index = this.tokenList.findIndex((q) => q == this.selected);
        if (index >= 0) {
          let array = [];
          for (let i in this.tokenList) {
            if (i != index) {
              array.push(this.tokenList[i]);
            }
          }
          return array;
        } else {
          return this.tokenList;
        }
      } catch (err) {
        console.log(err);
        return this.tokenList;
      }
    },
    me() {
      return this.$store.state.auth.me;
    },
  },
  data() {
    return {
      panel: null,
      phoneRules: [
        (v) => !!v || "กรุณากรอกเบอร์โทรศํพท์",
        (v) => (v && v.length <= 10) || "เบอร์โทรศัพท์ 10 หลัก",
      ],
      valid: true,
      amount: 0,
      selected: null,
      form: {
        CustomerId: null,
        Amount: null,
        PhoneNumber: null,
        Description: null,
        ChannelCode: null,
        ProductImageUrl: null,
      },
      history: [],
    };
  },
  created() {
    this.selected = this.tokenList[0];
  },
  mounted() {
    this.$nextTick(async () => {
      await this.getHistory();
    });
  },
  methods: {
    async getHistory() {
      let response = await paymentsCollection
        .where("CustomerId", "==", String(this.me.uid))
        .orderBy("OrderNo", "desc")
        .limit(20)
        .get();
      if (!response.empty) {
        let history = [];
        for (let i of response.docs) {
          history.push(i.data());
        }
        this.history = history;
      }
    },
    channelPayment(ch) {
      this.form.ChannelCode = ch;
    },
    async pay() {
      this.app_loading(true);
      try {
        this.form.Amount = this.sum_price + "00";
        this.form.Description = `ซื้อเหรียญ ${this.selected.symbol} จำนวน ${this.amount} เหรียญ`;
        this.form.ProductImageUrl = this.selected.logoURI;
        if (this.form.ChannelCode == "payplus_kbank") {
        } else if (this.form.ChannelCode == "bank_qrcode") {
          delete this.form.PhoneNumber;
        }
        this.form.CustomerId = this.me.uid;
        let params = {
          ethereumAddress: this.ethereumAddress,
          tokenAddress: this.selected.address,
          tokenAmount: this.amount,
          form: this.form,
        };
        let response = await this.$axios.post(
          "https://asia-southeast1-mpv-wallet.cloudfunctions.net/mpv/api/payment/create",
          params
        );
        this.app_loading(false);
        let url = response.data.data.PaymentUrl;
        this.alert_show({
          type: "success",
          header: "การทำรายการสำเร็จ",
          title: "กรุณาชำระเงิน <br/> ระบบจะทำการส่งเหรียญให้ท่าน",
        }).then(() => {
          this.panel = null;
          this.amount = 0;
          for (let i in this.form) {
            this.form[i] = null;
          }
        });
        window.open(url, "_blank");
        this.getHistory();
      } catch (err) {
        console.log(err);
        this.app_loading(false);
        this.alert_show({
          type: "error",
          title: "การทำรายการล้มเหลว <br/> กรุณาลองใหม่อีกครั้ง",
        });
      }
    },
    async saveToFB(form) {
      await paymentsCollection.add(form);
    },
  },
};
</script>

<style lang="scss">
.payment-page {
  min-height: 1vh;
  // height: 100%;
  background-color: white;
  padding: 24px 8px 70px 8px;

  .sub-text {
    color: #adadad;
  }

  .amount-input {
    font-size: 21px;
  }
}
</style>