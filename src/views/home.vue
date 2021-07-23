<template>
  <div class="home-page">
    <vue-pull-refresh
      :class="{ blur: showPin }"
      :on-refresh="onRefresh"
      :config="config"
    >
      <app-bar @exportKey="showPin = true" />
      <v-row no-gutters class="layout-body-home">
        <v-col cols="12" class="text-center logo">
          <div>
            <v-img :src="'/image/logo.png'" height="80px" contain></v-img>
          </div>
          <div class="my-2 px-5">
            <input
              type="text"
              class="input-pvkey"
              ref="ethWallet"
              :value="ethereumAddress"
              @click="CopyEth"
              readonly
            />
          </div>
        </v-col>
        <v-col cols="12" class="px-4 mb-5">
          <v-card class="px-4">
            <token-list
              v-for="(token, i) in tokenList"
              :key="'token ' + i"
              :address="token.address"
              :logoURI="token.logoURI"
              :symbol="token.symbol"
              :balanceX="String(token.balance)"
              :lastChild="i >= tokenList.length - 1"
            />
          </v-card>
        </v-col>
      </v-row>
      <bottom-nav />
    </vue-pull-refresh>
    <v-dialog max-width="350" v-model="dialog">
      <v-card height="180px" class="px-4">
        <v-row no-gutters justify="center" align="center" class="h-100">
          <v-col cols="12" class="text-center" v-if="dialog">
            <p>This is your private key</p>
            <input
              type="text"
              class="input-pvkey"
              ref="privatekey"
              :value="privateKey"
              @click="Copy"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <pin-pad
      v-if="showPin"
      header="กรุณาใส่รหัส"
      :verify="true"
      :backward="true"
      @goback="showPin = false"
      @verifyPin="exportKey"
    />
  </div>
</template>

<script>
import HomeAppBar from "../components/homeAppBar.vue";
import BottomNav from "../components/BottomNav.vue";
import tokenList from "../components/tokenList.vue";
import VuePullRefresh from "vue-pull-refresh";
import pinPad from "../components/pinPad.vue";
export default {
  name: "Home",
  components: {
    "app-bar": HomeAppBar,
    "bottom-nav": BottomNav,
    "token-list": tokenList,
    "vue-pull-refresh": VuePullRefresh,
    "pin-pad": pinPad,
  },
  data() {
    return {
      showPage: false,
      showPin: false,
      dialog: false,
      config: {
        errorLabel: "",
        startLabel: "",
        readyLabel: "",
        loadingLabel: "",
      },
      privateKey: null,
      wsProvider: null,
      contract: [],
    };
  },
  computed: {
    tokenList() {
      return this.$store.state.auth.tokenList;
    },
  },
  methods: {
    CopyEth() {
      try {
        this.$refs.ethWallet.select();
        document.execCommand("copy");
        this.alert_show({
          type: "success",
          title: "Copied on clipboard !",
        });
      } catch (err) {}
    },
    Copy() {
      try {
        this.$refs.privatekey.select();
        document.execCommand("copy");
        this.alert_show({
          type: "success",
          title: "Copied on clipboard !",
        });
      } catch (err) {}
    },
    async exportKey(verify) {
      try {
        if (verify.status) {
          this.showPin = false;
          await this.app_loading(true);
          let wallet = await decrypt(
            localStorage.getItem("encypt_string_mpv"),
            verify.password
          );
          let wallet_json = JSON.parse(wallet);
          this.privateKey = await wallet_json.privateKey;
          this.app_loading(false);
          this.dialog = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onRefresh() {
      await this.$store.dispatch("getBalance");
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.showPage = true;
      const vm = this;
      var init = function() {
        vm.wsProvider = new vm.$ethers.providers.WebSocketProvider(
          "wss://ws.xchain.asia"
        );

        vm.wsProvider.on("pending", async (tx) => {
          let getTx = await vm.wsProvider.getTransaction(tx);
          await vm.wsProvider.once(tx, async (transaction) => {
            console.log(transaction);
            if (
              String(transaction.to).toLowerCase() ==
                String(vm.ethereumAddress).toLowerCase() ||
              String(transaction.from).toLowerCase() ==
                String(vm.ethereumAddress).toLowerCase()
            ) {
              setTimeout(() => {
                vm.$store.dispatch("getHistory");
                vm.$store.dispatch("getBalance");
              }, 2000);

              if (
                String(transaction.to).toLowerCase() ==
                String(vm.ethereumAddress).toLowerCase()
              ) {
                let amount = await getTx.value.toString();
                await vm.$store.commit("SET_ALERT_TOAST", {
                  status: true,
                  tokenName: "XTH",
                  tokenSymbol: "XTH",
                  amount: amount,
                });
              }
            }
          });
        });

        let tokenList = vm.tokenList.filter((q) => q.address != "mainnet");
        for (let i in tokenList) {
          if (tokenList[i].address != "mainnet") {
            vm.contract[i] = new vm.$ethers.Contract(
              tokenList[i].address,
              vm.$abi,
              vm.wsProvider
            );
            vm.contract[i].on("*", async (res) => {
              console.log("token: ", tokenList[i].symbol);
              console.log("res: ", res);
              let to = await res.args.to;
              let amount = await res.args.tokens.toString();
              setTimeout(() => {
                vm.$store.dispatch("getHistory");
                vm.$store.dispatch("getBalance");
              }, 2000);
              if (
                res.event == "Transfer" &&
                String(to).toLowerCase() ==
                  String(vm.ethereumAddress).toLowerCase()
              ) {
                await vm.$store.commit("SET_ALERT_TOAST", {
                  status: true,
                  tokenName: tokenList[i].name,
                  tokenSymbol: tokenList[i].symbol,
                  amount: amount,
                });
              }
            });
          }
        }

        vm.wsProvider.on("error", async () => {
          console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
          setTimeout(init, 3000);
        });
        vm.wsProvider.on("close", async (code) => {
          console.log(
            `Connection lost with code ${code}! Attempting reconnect in 3s...`
          );
          vm.wsProvider.terminate();
          setTimeout(init, 3000);
        });
      };
      init();
    });
  },
  beforeDestroy() {
    this.wsProvider.off();
  },
};

function decrypt(message = "", key = "") {
  var code = CryptoJS.AES.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}
</script>

<style lang="scss">
.home-page {
  min-height: 100vh;
  height: 100%;
  background-color: white;
  padding-bottom: 70px;
  .logo {
    margin: 30px 0px;
  }

  .layout-body-home {
    max-width: 500px;
    margin: 0 auto;
  }
}
.input-pvkey {
  border: 1px solid #e5e5e5 !important;
  width: 90%;
  border-radius: 50px;
  text-align: center;
  padding: 10px;
  color: #6d6b6b;
  font-size: 14px;
  margin-top: 10px;
  max-width: 250px;
}

.v-toolbar__content {
  padding: 0px 8px !important;
}
</style>
