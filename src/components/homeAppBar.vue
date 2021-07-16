<template>
  <div class="bar-me">
    <v-app-bar color="#c71e2b" max-width="500px" flat height="64px">
      <div class="white--text pl-3">
        {{ $store.state.auth.me.email }}
      </div>
      <v-spacer></v-spacer>
      <div class="text-center" @click="logout">
        <v-icon medium color="white"> logout </v-icon>
        <div style="color: white; font-size: 11px; text-transform: uppercase">
          ออกจากระบบ
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import {firebaseAuth} from "../plugins/firebase"
export default {
  name: "HomeAppBar",
  methods: {
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
.bar-me {
  background-color: #c71e2b;
  > header {
    margin: 0 auto;
    padding: 0;
  }
}
</style>