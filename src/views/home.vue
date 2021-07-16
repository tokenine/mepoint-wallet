<template>
  <vue-pull-refresh class="home-page" :on-refresh="onRefresh" :config="config">
    <app-bar />
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
</template>

<script>
import HomeAppBar from "../components/homeAppBar.vue";
import BottomNav from "../components/BottomNav.vue";
import tokenList from "../components/tokenList.vue";
import VuePullRefresh from "vue-pull-refresh";
export default {
  name: "Home",
  components: {
    "app-bar": HomeAppBar,
    "bottom-nav": BottomNav,
    "token-list": tokenList,
    "vue-pull-refresh": VuePullRefresh,
  },
  data() {
    return {
      showPage: false,
      dialog: false,
      config: {
        errorLabel: "",
        startLabel: "",
        readyLabel: "",
        loadingLabel: "",
      },
    };
  },
  computed: {
    tokenList() {
      return this.$store.state.auth.tokenList;
    },
  },
  methods: {
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

.v-toolbar__content {
  padding: 0px 8px !important;
}
</style>