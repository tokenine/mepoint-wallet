<template>
  <v-app app>
    <v-main app>
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
      <ToastAlert></ToastAlert>
    </v-main>
    <loading v-if="loadingState" />
    <alert></alert>
  </v-app>
</template>

<script>
import loading from "./components/loading.vue";
import alert from "./components/alert.vue";
import ToastAlert from "./components/toastAlert";
export default {
  name: "App",
  computed: {
    loadingState() {
      return this.$store.state.app.loading;
    },
  },
  components: {
    loading: loading,
    alert,
    ToastAlert,
  },
  beforeMount() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};
</script>
<style lang="scss">
.alert-toast {
  padding: 0px !important;
  position: fixed !important;
  top: 10px;
  right: 0px;
  z-index: 1000;
  margin-right: 10px;
  margin-left: 10px;
  width: calc(100vw - 20px);
  max-width: 380px;

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.v-progress-linear__background {
  padding: 0px;
  opacity: 1 !important;
  background: rgb(199, 30, 43);
  background: linear-gradient(
    90deg,
    rgba(199, 30, 43, 1) 0%,
    rgba(239, 65, 54, 1) 35%,
    rgba(246, 133, 33, 1) 100%
  ) !important;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
</style>