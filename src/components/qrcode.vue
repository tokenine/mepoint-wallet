<template>
  <v-card>
    <v-card-text>
      <v-row justify="center" class="pt-5">
        <v-col cols="12" class="text-center">
          <qrcode :value="value" :options="{ width: 200 }"></qrcode>
        </v-col>
        <v-col cols="12" class="text-center">
          <p>หมายเลขกระเป๋าของฉัน</p>
          <input
            type="text"
            class="input-wallet"
            ref="ethWallet"
            :value="ethereumAddress"
            @click="Copy"
            readonly
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
export default {
  name: "QRCODE",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  components: {
    qrcode: VueQrcode,
  },
  methods: {
    Copy() {
      try {
        this.$refs.ethWallet.select();
        document.execCommand("copy");
        this.alert_show({
          type: "success",
          title: "Copied on clipboard !",
        });
      } catch (err) {
      }
    },
  },
};
</script>

<style>
.input-wallet {
  border: 1px solid #e5e5e5 !important;
  width: 90%;
  border-radius: 50px;
  text-align: center;
  padding: 10px;
  color: #6d6b6b;
  font-size: 14px;
}
</style>