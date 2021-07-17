<template>
  <v-app app>
    <v-main app>
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <loading v-if="loadingState" />
    <alert></alert>
  </v-app>
</template>

<script>
import loading from "./components/loading.vue";
import alert from "./components/alert.vue";
export default {
  name: "App",
  computed: {
    loadingState() {
      return this.$store.state.app.loading;
    }
  },
  components: {
    loading: loading,
    alert,
  },
  beforeMount() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};
</script>