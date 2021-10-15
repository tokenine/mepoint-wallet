<template>
  <div class="bar-me">
    <v-app-bar color="#c71e2b" max-width="500px" flat height="64px">
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div class="white--text pl-3" v-bind="attrs" v-on="on">
            {{ $store.state.auth.me.email || "" }} <v-icon>arrow_drop_down</v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="exportKey">
              <v-icon medium> outbox </v-icon>
              <span
                class="pl-2"
                style="font-size: 11px; text-transform: uppercase"
                >export privateKey</span
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout">
              <v-icon medium> logout </v-icon>
              <span
                class="pl-2"
                style="font-size: 11px; text-transform: uppercase"
                >ออกจากระบบ</span
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <div>
        <v-btn dark icon to="/scan">
          <v-icon>qr_code</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { firebaseAuth } from "../plugins/firebase";
import pinPad from "../components/pinPad.vue";
export default {
  name: "HomeAppBar",
  components: {
    "pin-pad": pinPad,
  },
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
                vm.$cookies
                  .keys()
                  .forEach((cookie) => vm.$cookies.remove(cookie));
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
    exportKey() {
      this.$emit("exportKey");
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