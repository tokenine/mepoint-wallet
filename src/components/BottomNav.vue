<template>
  <div class="bottom-bar">
    <router-link to="/">
      <v-icon color="#EAEAEA" size="28"> account_balance_wallet </v-icon>
    </router-link>
    <router-link to="/payment">
      <!-- <v-icon color="#EAEAEA" size="28"> qr_code </v-icon> -->
      <v-img class="mx-auto" :src="pathBuyIcon" height="28px" width="28px" contain></v-img>
    </router-link>
    <router-link to="/dapp">
      <v-icon color="#EAEAEA" size="28"> touch_app </v-icon>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "bottomNav",
  computed: {
    routeName() {
      return this.$route.name
    },
    pathBuyIcon() {
      if(this.routeName == "Payment") {
        return "/image/buyicon.png"
      } else {
        return "/image/buyiconactive.png"
      }
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.bottom-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #c71e2b;
  height: 50px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  padding: 0px 10px;

  a {
    flex-grow: 1;
    text-align: center;
    font-size: 12px !important;
    text-decoration: none;
    > i {
      opacity: 0.3;
    }
    max-width: 350px;
  }

  .router-link-exact-active {
    > i {
      opacity: 1;
    }
  }

  .scan {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c71e2b;
    border-radius: 60px;
    height: 60px;
    width: 60px;
    position: absolute;
    bottom: 10px;
  }
}
</style>