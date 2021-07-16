<template>
  <div>
    <layout :header="'My Wallet'" @onBack="$router.push('/')">
      <template v-slot:content>
        <v-col cols="12" xs="12" sm="8" md="6" class="mt-5">
          <div class="box-detail px-4">
            <v-row justify="center">
              <v-col cols="12" class="text-center">
                <qrcode
                  :value="
                    JSON.stringify({
                      type: 'transfer',
                      to: walletAddress,
                    })
                  "
                  :options="{ width: 200 }"
                ></qrcode>
              </v-col>
              <v-col cols="12" class="text-center">
                <p>หมายเลขกระเป๋าของฉัน</p>
                <input
                  type="text"
                  class="input"
                  id="testing-code"
                  :value="walletAddress"
                  readonly
                  @click="Copy"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </template>
    </layout>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import Layout from "../../../components/layout.vue";
export default {
  name: "Receive",
  components: {
    layout: Layout,
    qrcode: VueQrcode,
  },
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    objectId() {
      return this.$store.getters.objectId;
    },
    walletAddress() {
      return this.$store.getters.walletAddress;
    },
  },
  methods: {
    Copy() {
      const vm = this;
      this.$copyText(this.walletAddress).then((res) => {
        vm.alert_show({
          type: "success",
          title: "Copied on clipboard !",
        });
      });
    },
  },
};
</script>

<style scoped>
.tab-x {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.box-detail {
  border-radius: 12px;
  background-color: #f7f7f7;
  padding: 20px 10px;
}

.box {
  width: 100%;
  background: white;
  position: relative;
}

input {
  border: 1px solid #e5e5e5;
  width: 90%;
  border-radius: 50px;
  text-align: center;
  padding: 12px;
  color: #6d6b6b;
  font-size: 14px;
}

.sub {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 600;
  padding: 0px;
  display: block;
}

p {
  font-size: 16px;
  font-weight: 600;
}
</style>