<template>
  <v-row
    align="center"
    :class="{ 'list-token': !lastChild }"
    @click="$router.push('/token/' + address)"
  >
    <v-col cols="2">
      <v-img :src="logoURI" height="28px" width="36px" contain></v-img>
    </v-col>
    <v-col cols="3">{{ symbol }}</v-col>
    <v-col cols="7" class="text-right">{{ parseUtillETHtoShow(balanceX) }}</v-col>
  </v-row>
</template>

<script>
export default {
  name: "tokenList",
  props: {
    address: {
      type: String,
      default: "",
    },
    logoURI: {
      type: String,
      default: "",
    },
    symbol: {
      type: String,
      default: "",
    },
    balanceX: {
      type: String,
      default: "0",
    },
    lastChild: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.list-token {
  border-bottom: 1px solid #c71e2b20;
}
</style>