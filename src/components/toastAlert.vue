<template>
  <v-alert
    :value="alert_toast.status"
    transition="slide-x-reverse-transition"
    class="alert-toast"
  >
    <v-btn icon x-small class="close-btn" @click="close">
      <v-icon> close </v-icon>
    </v-btn>
    <div>
      <v-row no-gutters class="pa-3" align="center">
        <v-col cols="2">
          <v-icon large color="success"> monetization_on </v-icon>
        </v-col>
        <v-col cols="10">
          <div>มีรายการโอนเข้า</div>
          <div>{{parseUtillETH(alert_toast.amount)}} {{alert_toast.tokenName}} ({{alert_toast.tokenSymbol}})</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="pa-0">
          <v-progress-linear
            v-model="power"
            color="white"
            height="25"
            :reverse="true"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>
  </v-alert>
</template>

<script>
export default {
  name: "ToastAlert",
  data() {
    return {
      power: 0,
    };
  },
  computed: {
    alert_toast() {
      let alert = this.$store.getters.alert_toast;
      if (alert.status) {
        this.counter();
      }
      return alert;
    },
  },
  methods: {
    close() {
      this.$store.commit("SET_CLOSE_TOAST");
    },
    counter() {
      let interval = setInterval(() => {
        if (this.power == 100) {
          this.$store.commit("SET_CLOSE_TOAST");
          clearInterval(interval);
          setTimeout(() => {
            this.power = 0;
          }, 1000);
        }
        this.power += 4;
      }, 100);
    },
  },
};
</script>

<style>
</style>