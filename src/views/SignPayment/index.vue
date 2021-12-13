<template>
  <div class="dapp-page">
    <layout
      header="Sign Transaction"
      @onBack="$router.push('/')"
      :class="{ blur: showPin }"
      @receive="dialog = true"
    >
      <template v-slot:content>
        <v-col cols="12" xs="12" sm="8" md="6" lg="4">
          <div v-if="showApprove">
            <h1>
              Approve
              <v-chip v-if="isPaymentContract" color="success" outlined>
                <v-icon left>
                  mdi-check
                </v-icon>
                Payment contract
              </v-chip>
            </h1>

            <div class="mt-3">
              <v-card outlined>
                <v-card-text class="body black--text">
                  <div>Token: {{ shortenAddress(tokenAddress) }}</div>
                  <div>Spender: {{ shortenAddress(payContractAddress) }}</div>
                  <div>Amount: {{ payAmount }} {{ tokenSymbol }}</div>
                </v-card-text>
              </v-card>
            </div>
          </div>
          <div v-else>
            <h1>
              Pay
              <v-chip v-if="isPaymentContract" color="success" outlined>
                <v-icon left>
                  mdi-check
                </v-icon>
                Payment contract
              </v-chip>
            </h1>
            <div class="mt-5">
              <v-card outlined>
                <v-card-text>
                  <div>Your balance:</div>
                  <div class="title black--text">
                    {{ tokenAmount }} {{ tokenSymbol }}
                  </div>
                </v-card-text>
              </v-card>
              <div class="mt-3">
                <v-card outlined>
                  <v-card-text class="body black--text">
                    <div>Order ID: {{ orderId }}</div>
                    <div>Amount: {{ payAmount }} {{ tokenSymbol }}</div>
                    <div>Pay to: {{ shortenAddress(payToAddress) }}</div>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </div>

          <v-alert v-if="txError" dense outlined type="error" class="mt-5">
            Transaction error.
          </v-alert>

          <div class="mt-5">
            <v-text-field
              outlined
              v-model="showGasPrice"
              label="Gas price (GWEI)"
              disabled
              required
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              outlined
              v-model="showGasLimit"
              label="Gas limit"
              disabled
              required
            ></v-text-field>
          </div>
        </v-col>
      </template>
    </layout>
    <div
      style="position: fixed; width: 100vw; height: 50px; bottom: 0; left: 0;"
      class="px-6 pt-2"
    >
      <v-row>
        <v-col cols="6" xs="6" sm="6" md="6" lg="6">
          <v-btn
            block
            outlined
            @click="backToHome"
            color="#8f8d8d"
            style="background-color: white"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="6" xs="6" sm="6" md="6" lg="6">
          <v-btn
            color="#c71e2b"
            class="white--text"
            block
            :loading="loading"
            @click="confirm"
            :disabled="disableBtn"
          >
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <pin-pad
      v-if="showPin"
      header="กรุณาใส่รหัส"
      :verify="true"
      @verifyPin="verifyPin"
    />
  </div>
</template>

<script>
import { Contract, ethers, BigNumber } from "ethers";
import layout from "../../components/layout.vue";
import pidPad from "../../components/pinPad.vue";
export default {
  name: "SignPayment",
  components: {
    layout,
    "pin-pad": pidPad,
  },
  data() {
    return {
      showApprove: true,
      showPin: true,
      showGasPrice: "0",
      showGasLimit: "0",
      tokenAddress: "",
      payContractAddress: "",
      amount: "",
      orderId: "",
      payToAddress: "",
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
      const email = localStorage.getItem("email_account_mpv");
      if (email === null) {
        this.alert_show({
          type: "errordontlogin",
          title: "กรุณาเข้าสู่ระบบก่อนทำรายการ",
          header: "ล้มเหลว !",
        });
      }
      this.provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.tbwg.io"
      );
      this.currentGasPrice = await this.provider.getGasPrice();
      const denom = BigNumber.from(10).pow(9);
      this.showGasPrice = this.currentGasPrice.div(denom);
      const params = this.$route.query.params.split(",");
      this.payToAddress = params[0];
      this.orderId = params[1];
      this.amount = params[2];
      this.tokenAddress = params[3];
      this.payContractAddress = params[4];
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    shortenAddress(address) {
      return ethers.utils.isAddress(address)
        ? address.substring(0, 6) +
            "..." +
            address.substring(address.length - 4, address.length)
        : "";
    },
    saveLocalstorage(item) {
      const rawItems = localStorage.getItem("ACTIVITY_ITEMS");
      let items = [];
      if (rawItems) {
        items = JSON.parse(rawItems);
      }
      items.push(item);
      localStorage.setItem("ACTIVITY_ITEMS", JSON.stringify(items));
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
    async confirm() {
      try {
        this.loading = true;
        if (this.showApprove) {
          await this.approveToSpender();
          this.showApprove = false;
        } else {
          await this.payToDestination();
        }
      } catch (err) {
        console.error(err);
        this.loading = false;
        this.alert_show({
          type: "error",
          title: "การทำรายการล้มเหลว",
          header: "ล้มเหลว !",
        });
      }
    },
    async allowance(address) {
      try {
        const amount = await this.tokenContract.allowance(
          address,
          this.payContractAddress
        );
        const isAllow = amount.gte(BigNumber.from(this.amount));
        if (isAllow) {
          this.showApprove = false;
        }
        return isAllow;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    async prepareApprove() {
      try {
        this.loading = true;
        const estimateGas = await this.tokenContract.estimateGas.approve(
          this.payContractAddress,
          BigNumber.from(this.amount)
        );
        this.showGasLimit = estimateGas.toString();
        this.loading = false;
      } catch (err) {
        console.error(err);
        this.txError = true;
        this.disableBtn = true;
      }
    },
    async approveToSpender() {
      try {
        const transaction = await this.tokenContract.approve(
          this.payContractAddress,
          BigNumber.from(this.amount)
        );
        await transaction.wait();
        await this.preparePay();
        transaction.method = "approve";
        transaction.actionAt = new Date();
        this.saveLocalstorage(transaction);
        this.loading = false;
      } catch (err) {
        console.error(err);
        this.loading = false;
        throw err;
      }
    },
    async preparePay() {
      try {
        this.loading = true;
        const estimateGas = await this.paymentContract.estimateGas.pay(
          this.payToAddress,
          BigNumber.from(this.orderId),
          BigNumber.from(this.amount),
          this.tokenAddress
        );
        this.showGasLimit = estimateGas.toString();
        this.loading = false;
      } catch (err) {
        console.error(err);
        this.txError = true;
        this.disableBtn = true;
        this.loading = false;
      }
    },
    async payToDestination() {
      try {
        const transaction = await this.paymentContract.pay(
          this.payToAddress,
          BigNumber.from(this.orderId),
          BigNumber.from(this.amount),
          this.tokenAddress
        );
        await transaction.wait();
        transaction.method = "pay";
        transaction.actionAt = new Date();
        this.saveLocalstorage(transaction);
        this.alert_show({
          type: "success",
          header: "สำเร็จ",
          title: "การดำเนินการสำเร็จ",
        });
        this.loading = false;
        this.backToHome();
      } catch (err) {
        console.error(err);
        this.loading = false;
        throw err;
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
</style>
