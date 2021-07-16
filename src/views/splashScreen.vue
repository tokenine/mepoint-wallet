<template>
  <v-container class="splash-page" fluid>
    <v-row class="text-center h-100" align="center">
      <v-col cols="12">
        <img :src="'/image/logo.png'" class="logo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SplashScreen",
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.commit("SET_SPLASH", false);
        if (localStorage.getItem("email_account_mpv") == null) {
          this.$router.push("/OTP/termService");
        } else {
          this.$router.push("/login");
        }
      }, 1500);
    });
  },
};
</script>
<style lang="scss">
.splash-page {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: white;

  .logo {
    width: 50%;
    min-width: 150px;
    height: auto;
    max-width: 350px;
  }
}
</style>