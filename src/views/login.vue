<template>
  <v-container class="login-page" fluid>
    <v-row class="text-center h-100 blur" align="center" no-gutters>
      <v-col cols="12">
        <div>SPLASH SCREEN</div>
      </v-col>
    </v-row>
    <pin-pad
      :clear="clear"
      header="กรุณาใส่รหัส"
      :logout="true"
      @pinEmit="verifyPin"
      @logout="logout"
    ></pin-pad>
  </v-container>
</template>

<script>
import pinPad from "../components/pinPad.vue";
import { firebaseAuth } from "../plugins/firebase";
export default {
  name: "Login",
  components: {
    "pin-pad": pinPad,
  },
  data() {
    return {
      clear: true,
    };
  },
  methods: {
    async verifyPin(pin) {
      this.app_loading(true);
      try {
        const email = localStorage.getItem("email_account_mpv");
        const encypt_string = localStorage.getItem("encypt_string_mpv");
        const password = pin;
        let signIn = await firebaseAuth.signInWithEmailAndPassword(
          email,
          password
        );
        if (encypt_string == null) {
          await this.$store.dispatch("getUser", {
            uid: signIn.user.uid,
            password: password,
          });
          console.log("getted user");
        } else {
          let wallet = await this.$ethers.Wallet.fromEncryptedJson(
            encypt_string,
            password
          );
          await this.$store.commit("SET_ME", {
            email: email,
            uid: signIn.user.uid,
            ethereumAddress: wallet.address,
            privateKey: null,
          });
        }
        await this.$store.dispatch("getBalance");
        console.log("getted balance");
        await this.$store.commit("SET_LOGGEDIN", true);
        this.app_loading(false);
        this.$router.push("/");
      } catch (err) {
        this.clear = !this.clear;
        this.app_loading(false);
        this.alert_show({
          header: "ล้มเหลว",
          type: "error",
          title: err.message,
        });
      }
    },
    logout() {
      const vm = this;
      vm.alert_show({
        header: "กรุณายืนยัน",
        type: "confirm",
        title: "ท่านต้องการออกจากระบบ ?",
      }).then(async (res) => {
        if (res) {
          const vm = this;
          try {
            firebaseAuth
              .signOut()
              .then(async () => {
                await vm.$store.commit("SET_LOGGEDIN", false);
                await vm.$store.commit("SET_ME", null);
                await vm.$store.commit("SET_TOKENLIST", []);
                localStorage.removeItem("email_account_mpv");
                localStorage.removeItem("encypt_string_mpv");
                await vm.$router.push("/OTP/termService");
              })
              .catch((error) => {
                vm.alert_show({
                  header: "ล้มเหลว",
                  type: "error",
                  title: error.message,
                });
              });
          } catch (err) {}
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  height: calc(var(--vh, 1vh) * 100);

  .logo {
    width: 50%;
    min-width: 150px;
    height: auto;
    max-width: 350px;
  }
}
</style>