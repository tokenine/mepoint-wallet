<template>
  <div class="qr-page">
    <v-row no-gutters align-content="space-between">
      <v-col cols="12" class="d-flex align-center">
        <v-icon large color="white" @click="$router.back()"
          >keyboard_arrow_left</v-icon
        >
        <span class="white--text ml-2">
          <h2>แสกน QR Code</h2>
        </span>
      </v-col>
      <v-col cols="12">
        <qrcode-stream
          v-if="showScan"
          ref="qrscan"
          @detect="onDetect"
          @init="onInit"
        >
        </qrcode-stream>
      </v-col>
      <v-col cols="12" class="text-center">
        <qrcode-capture
          ref="qrupload"
          class="qrupload"
          id="my_file"
          @decode="onDecode"
          accept="image/jpeg, image/png"
          :capture="false"
          :multiple="false"
        />
        <v-btn color="#A0A0A0" class="mx-1" dark @click="upload" rounded large>
          Upload QR Code
        </v-btn>
        <v-btn
          color="#A0A0A0"
          class="mx-1"
          dark
          @click="$router.push('/receive')"
          rounded
          large
        >
          QR Code ของฉัน
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from "vue-qrcode-reader";
export default {
  name: "Scan",
  components: {
    QrcodeStream,
    QrcodeCapture,
  },
  data() {
    return {
      showPage: false,
      showScan: true,
      Scanner: null,
    };
  },
  methods: {
    upload() {
      document.getElementById("my_file").click();
    },
    Catch() {
      this.alert_show({
        type: "error",
        header: "ล้มเหลว !",
        title: "Format ไม่ถูกต้อง",
      });
    },
    async onInit(promise) {
      try {
        this.app_loading(true);
        await promise;
        this.showPage = true;
        this.app_loading(false);
      } catch (error) {
        console.log(error.name);
      }
    },
    async onDetect(promise) {
      try {
        const { imageData, content, location } = await promise;
        await this.onScan(content);
      } catch (error) {
        this.Catch();
      }
    },
    async onDecode(result) {
      try {
        const content = await result;
        await this.onScan(content);
      } catch (error) {
        console.log(error);
        this.Catch();
      }
    },
    async onScan(content) {
      try {
        if (this.isJson(content)) {
          let json = JSON.parse(content);
          if (json.type == "transfer") {
            let to = json.to;
            let contractAddress = json.contractAddress
            this.$router.push("/token/" + contractAddress + "?to=" + to);
          } else {
            throw "not app format";
          }
        } else {
          throw "not JSON format";
        }
      } catch (err) {
        throw err;
      }
    },
    isJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.qr-page {
  height: 100vh;
  background-color: #484848;

  .row {
    height: 100%;
    padding: 24px 8px;
  }

  .qrcode-stream-wrapper {
    display: flex;
    justify-content: center;
  }

  .qrcode-stream-camera {
    border-radius: 16px;
    max-width: 400px;
    max-height: 400px;
    height: 90vw;
    width: 90vw;
  }

  .qrupload {
    display: none;
  }
}
</style>