<template>
  <div class="home-page">
    <vue-pull-refresh
      :class="{ blur: showPin }"
      :on-refresh="onRefresh"
      :config="config"
    >
      <app-bar @exportKey="showPin = true" />
      <v-row no-gutters class="layout-body-home">
        <v-col cols="12" class="text-center">
          <div class="logo">
            <v-img :src="'/image/logo.png'" height="80px" contain></v-img>
          </div>
        </v-col>
        <v-col cols="12" class="px-4">
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
      privateKey: null
    };
  },
  computed: {
    tokenList() {
      return this.$store.state.auth.tokenList;
    },
  },
  methods: {
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
          let wallet = await this.$ethers.Wallet.fromEncryptedJson(
            localStorage.getItem("encypt_string_mpv"),
            verify.password
          );
          this.privateKey = await wallet.privateKey;
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
    });
  },
};
</script>

<style lang="scss">
.home-page {
  height: 100vh;
  background-color: white;
  padding-bottom: 90px;
  overflow-y: scroll;

  .logo {
    margin: 50px 0px;
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
}

.v-toolbar__content {
  padding: 0px 8px !important;
}
</style>