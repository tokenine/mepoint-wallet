<template>
  <div class="dapp-page">
    <v-row no-gutters class="h-100" align="center">
      <v-col cols="12" class="pa-4 text-center">
        coming soon ...
      </v-col>
    </v-row>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav.vue";
export default {
  name: "Dapp",
  components: {
    "bottom-nav": BottomNav,
  },
  data() {
    return {
      showPage: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showPage = true;
    });
  },
};
</script>

<style lang="scss">
.dapp-page {
  height: 100vh;
  background-color: white;
  padding-bottom: 50px;
  overflow-y: scroll;

}
</style>