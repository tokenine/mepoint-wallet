<template>
  <div class="dapp-page">
    <layout
      header="Activity"
      @onBack="$router.push('/')"
      @receive="dialog = true"
    >
      <template v-slot:content>
        <v-col cols="12" xs="12" sm="8" md="6" lg="4">
          <h1>
            Activity
            <v-chip v-if="isPaymentContract" color="success" outlined>
              <v-icon left>
                mdi-check
              </v-icon>
              Payment contract
            </v-chip>
          </h1>

          <div class="mt-3">
            <v-card outlined>
              <!-- <v-card-text class="body black--text">
                <div>Token: {{ shortenAddress(tokenAddress) }}</div>
                <div>Spender: {{ shortenAddress(payContractAddress) }}</div>
                <div>Amount: {{ payAmount }} {{ tokenSymbol }}</div>
              </v-card-text> -->
              <v-card-text class="box-detail mt-2" elevation="0">
                <div v-if="listActivity.length > 0">
                  <div
                    v-for="item in listActivity"
                    :key="item.nonce"
                    outlined
                    style="background-color: whitesmoke"
                    class="mb-2 pa-3"
                    @click="openLink(item.hash)"
                  >
                    <div>
                      <v-row>
                        <v-col cols="1">
                          <v-icon>
                            description
                          </v-icon>
                        </v-col>
                        <v-col cols="10">
                          <div class="font-weight-black">
                            {{ item.method.toUpperCase() }}
                          </div>
                          <div>
                            <div class="detail-body">
                              <div>
                                {{ DateTime(new Date(item.actionAt)) }} *
                                {{ item.hash }}
                              </div>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="d-flex align-center justify-center"
                  style="height: 100px"
                >
                  ไม่มีข้อมูล...
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </template>
    </layout>
    <div
      style="position: fixed; width: 100vw; height: 50px; bottom: 0; left: 0;"
      class="px-6 pt-2"
    ></div>
    <!-- <pin-pad
      v-if="showPin"
      header="กรุณาใส่รหัส"
      :verify="true"
      @verifyPin="verifyPin"
    /> -->
  </div>
</template>

<script>
import { Contract, ethers, BigNumber } from "ethers";
import layout from "../../components/layout.vue";
import pidPad from "../../components/pinPad.vue";
import HistoryPayItem from "../../components/history_pay_item.vue";

export default {
  name: "SignPayment",
  components: {
    layout,
    "pin-pad": pidPad,
    "history-pay-item": HistoryPayItem,
  },
  data() {
    return {
      listActivity: [],
      showPin: true,
      tokenAddress: "",
      payContractAddress: "",
      amount: "",
      provider: undefined,
      paymentContract: undefined,
      tokenContract: undefined,
      currentGasPrice: 0,
      loading: false,
      disableBtn: false,
      account: undefined,
      tokenAmount: "0",
      payAmount: "0",
      tokenSymbol: "",
      decimals: BigNumber.from(0),
      txError: false,
    };
  },
  computed: {
    isPaymentContract() {
      return (
        this.payContractAddress.toLowerCase() ===
        "0x9E21682867c428f0Bd3F7d17cd9c53eA53D374C7".toLowerCase()
      );
    },
  },
  async mounted() {
    try {
      const rawItems = localStorage.getItem("ACTIVITY_ITEMS");
      this.listActivity = JSON.parse(rawItems);
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    openLink(link) {
      window.open("https://exp.xchain.asia/tx/" + link, "_blank");
    },
    shortenAddress(address) {
      return ethers.utils.isAddress(address)
        ? address.substring(0, 6) +
            "..." +
            address.substring(address.length - 4, address.length)
        : "";
    },
    backToHome() {
      try {
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    },
    async verifyPin(verify) {
      if (verify.status) {
        try {
          const wallet = decrypt(
            localStorage.getItem("encypt_string_mpv"),
            verify.password
          );
          const walletJson = JSON.parse(wallet);
          const privateKey = await walletJson.privateKey;
          const signer = await new this.$ethers.Wallet(
            privateKey,
            this.provider
          );

          this.showPin = false;

          this.tokenContract = new Contract(
            this.tokenAddress,
            this.$abi,
            signer
          );
          this.paymentContract = new Contract(
            this.payContractAddress,
            this.$paymentAbi,
            signer
          );

          this.loading = true;
          this.account = await signer.getAddress();

          const balance = await this.tokenContract.balanceOf(this.account);
          this.decimals = await this.tokenContract.decimals();
          this.tokenSymbol = await this.tokenContract.symbol();
          this.tokenAmount = ethers.utils.formatUnits(balance, this.decimals);
          this.payAmount = ethers.utils.formatUnits(
            BigNumber.from(this.amount),
            this.decimals
          );

          const allowed = await this.allowance(this.account);
          if (!allowed) {
            await this.prepareApprove();
          } else {
            await this.preparePay();
          }
          this.loading = false;
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      }
    },
  },
};

function decrypt(message = "", key = "") {
  var code = CryptoJS.AES.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}
</script>

<style lang="scss">
.dapp-page {
  min-height: 100vh;
  height: 100%;
  background-color: white;
  padding-bottom: 50px;
}
.detail-body {
  > div {
    height: 15px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .box-detail {
    background-color: #f7f7f7;
  }
  > div:nth-child(2) {
    font-size: 12px;
    color: #a7a7a7;
    margin-top: 4px;
  }
}
</style>
