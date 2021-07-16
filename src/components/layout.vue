<template>
  <div class="layout-page">
    <v-row no-gutters>
      <v-col cols="12" class="d-flex align-start">
        <v-icon large color="#A7A7A7" @click="$emit('onBack')"
          >keyboard_arrow_left</v-icon
        >
        <span class="ml-2">
          <h2 v-html="header"></h2>
        </span>
        <v-spacer> </v-spacer>
        <v-btn text large @click="$emit('receive')" class="text-center">
          <div>
            <v-icon>play_for_work</v-icon>
            <div style="font-size:12px;">รับเหรียญ</div>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="12" class="mt-5 px-3">
        <v-row no-gutters justify="center">
          <slot name="content"></slot>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: {
    header: {
      type: String,
      default: "",
    },
    receive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.layout-page {
  height: 100vh;
  min-height: 500px;
  padding: 24px 8px;
}
</style>