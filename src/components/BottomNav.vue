<template>
  <div class="bottom-bar">
    <router-link to="/" class="pr-5">
      <v-icon color="#EAEAEA" size="28"> account_balance_wallet </v-icon>
    </router-link>
    <router-link to="/scan" class="scan">
      <v-icon color="#EAEAEA" size="28"> qr_code </v-icon>
    </router-link>
    <router-link to="/dapp" class="pl-5">
      <v-icon color="#EAEAEA" size="28"> touch_app </v-icon>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "bottomNav",
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
    background-color: #c71e2b;
    border-radius: 60px;
    height: 60px;
    width: 60px;
    position: absolute;
    bottom: 10px;
  }
}
</style>