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
import { firebaseAuth } from "../plugins/firebase";
export default {
  name: "SplashScreen",
  mounted() {
    this.$nextTick(() => {
      setTimeout(async () => {
        this.$store.commit("SET_SPLASH", false);
        const email = localStorage.getItem("email_account_mpv");
        const encypt_string = localStorage.getItem("encypt_string_mpv");
        if (email == null) {
          this.$router.push("/OTP/termService");
        } else {
          const user = firebaseAuth.currentUser;
          if (user) {
            if(encypt_string == null) {
              return this.$router.push("/login");
            }
            let wallet = JSON.parse(encypt_string);
            await this.$store.commit("SET_ME", {
              email: email,
              uid: user.uid,
              ethereumAddress: wallet.address,
              privateKey: wallet.privateKey,
            });
            this.app_loading(true);
            await this.$store.dispatch("getBalance");
            console.log("getted balance");
            await this.$store.commit("SET_LOGGEDIN", true);
            this.app_loading(false);
            this.$router.push("/");
          } else {
            this.$router.push("/login");
          }
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