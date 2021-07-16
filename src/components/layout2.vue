<template>
  <div class="layout-2-page">
    <v-row no-gutters justify="center">
      <v-col cols="12" xs="12" sm="8" md="6" lg="4">
        <v-row no-gutters justify="center">
          <v-col cols="12" class="header-section">
            <div>
              <v-icon
                large
                color="white"
                @click="$emit('onBack')"
                v-if="backward"
                >keyboard_arrow_left</v-icon
              >
              <span class="ml-2" :class="{ 'pl-3': !backward }">
                <h2 v-html="header" class="white--text"></h2>
              </span>
            </div>
          </v-col>

          <v-col cols="12" class="body pa-5">
            <slot name="content"> </slot>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ActivityDetail",
  props: {
    header: {
      type: String,
      default: "",
    },
    backward: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.layout-2-page {
  min-height: 100vh;
  height: 100%;
  padding-bottom: 50px;
  background: url("/image/bg-profile.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;

  .header-section {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 12px;
    > div {
      display: flex;
      align-items: flex-start;
    }
  }

  .body {
    background-color: white;
    min-height: calc(100vh - 170px);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
}
</style>