<template>
  <div class="otpVerify">
    <v-row
      no-gutters
      class="pt-2"
      :class="{ blur: showSetPin || showConfirmPin }"
      justify="center"
    >
      <v-col cols="12">
        <v-icon large color="#A7A7A7" @click="$router.push('/OTP/phoneVerify')"
          >keyboard_arrow_left</v-icon
        >
      </v-col>
      <v-col cols="12" class="title-x text-sm-center">
        กรุณากรอก OTP ที่ส่ง บนโทรศัพท์มือถือของคุณ
      </v-col>
      <v-col cols="12" xs="12" sm="8" md="6" lg="4">
        <v-row>
          <v-col cols="12" class="input-section">
            <div class="px-3">หมายเลข OTP</div>
            <div class="input-all px-3 mt-2">
              <input
                type="text"
                pattern="\d*"
                maxlength="1"
                ref="input1"
                id="1"
                v-model="otp.pos1"
                @keypress="isNumber()"
                @keyup.stop="keyup"
              />
              <input
                type="text"
                pattern="\d*"
                maxlength="1"
                id="2"
                v-model="otp.pos2"
                @keypress="isNumber()"
                @keyup.stop="keyup"
                readonly
              />
              <input
                type="text"
                pattern="\d*"
                maxlength="1"
                id="3"
                v-model="otp.pos3"
                @keypress="isNumber()"
                @keyup.stop="keyup"
                readonly
              />
              <input
                type="text"
                pattern="\d*"
                maxlength="1"
                id="4"
                v-model="otp.pos4"
                @keypress="isNumber()"
                @keyup.stop="keyup"
                readonly
              />
              <input
                type="text"
                pattern="\d*"
                maxlength="1"
                id="5"
                v-model="otp.pos5"
                @keypress="isNumber()"
                @keyup.stop="keyup"
                readonly
              />
              <input
                type="text"
                pattern="\d*"
                maxlength="1"
                id="6"
                v-model="otp.pos6"
                @keypress="isNumber()"
                @keyup.stop="keyup"
                readonly
              />
            </div>
          </v-col>
          <v-col cols="12" class="text-center text-otp">
            <div class="mt-2 mb-1">OTP Ref: {{ otpData.ref }}</div>
            <div v-if="timer < 31">{{ timer }} Seconds</div>
          </v-col>
          <v-col cols="12">
            <v-btn
              :disabled="timer != 31"
              text
              class="px-3 mt-1 text-again"
              @click="sendOTPAgain"
            >
              <span class="cicle">
                <v-icon x-small color="white">refresh</v-icon>
              </span>
              <span class="ml-1">ส่งรหัสอีกครั้ง</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <pin-pad
      v-if="showSetPin"
      :header="'กรุณากำหนดรหัสผ่าน <br> ความปลอดภัย 6 หลัก'"
      @pinEmit="setPin"
      :backward="true"
      @goback="
        showSetPin = false;
        $refs.input1.focus();
      "
    />
    <pin-pad
      v-if="showConfirmPin"
      :header="'กรุณายืนยันรหัสผ่าน <br> ความปลอดภัย 6 หลัก'"
      :backward="true"
      @pinEmit="confirmPin"
      @goback="goSetAgain"
    />
  </div>
</template>

<script>
import Pinpad from "../../components/pinPad.vue";
export default {
  name: "OtpVerify",
  components: {
    "pin-pad": Pinpad,
  },
  computed: {
    otpData() {
      return this.$store.state.auth.OTP;
    },
    pos1() {
      return this.otp.pos1;
    },
  },
  data() {
    return {
      showSetPin: false,
      showConfirmPin: false,
      otp: {
        pos1: null,
        pos2: null,
        pos3: null,
        pos4: null,
        pos5: null,
        pos6: null,
      },
      timer: 31,
      sessionToken: null,
      errorEntry: 0,
    };
  },
  watch: {
    pos1(val) {
      try {
        if (val.length == 6) {
          let split = val.split("");
          let i = 0;
          for (let j in this.otp) {
            this.otp[j] = split[i];
            i++;
          }
          setTimeout(() => {
            let otp = "";
            for (const property in this.otp) {
              otp += `${this.otp[property]}`;
              this.otp[property] = null;
            }
            this.$refs.input1.blur();
            this.next(otp);
          }, 500);
        }
      } catch (err) {}
    },
    timer(val) {
      if (val < 31 && val != 0) {
        setTimeout(() => {
          this.timer = this.timer - 1;
        }, 1000);
      } else if (val == 0) {
        this.timer = 31;
      }
    },
  },
  methods: {
    async sendOTPAgain() {
      try {
        this.$store.commit("SET_APP_LOADING", true);
        const url = process.env.VUE_APP_API_OTP;
        let config = {
          headers: {
            "content-type": "application/json",
            "X-API-KEY": "OTPJFINzM8L6ZCmbIvce1BAFwihvDf3BF",
          },
        };
        let params = {
          phone_no: this.otpData.phone,
        };
        let res = await this.$axios.post(
          url + "paa/auth_phone",
          JSON.stringify(params),
          config
        );
        if (res.data.status_code == 200) {
          this.$store.commit("SET_OTP", {
            ref: res.data.data.otp_ref,
            phone: this.otpData.phone,
          });
        }
        this.timer = 30;
        this.$store.commit("SET_APP_LOADING", false);
      } catch (err) {
        this.alert_show({
          header: "ล้มเหลว",
          type: "error",
          title: "การดำเนินการล้มเหลว <br> กรุณาลองใหม่อีกครั้ง !",
        });
      }
    },
    async setPin(pin) {
      this.showSetPin = false;
      this.app_loading(true);
      try {
        let config = {
          headers: {
            "X-Parse-Session-Token": this.sessionToken,
          },
        };
        let params = {
          pin: pin,
        };
        let response = await this.$axios.post(
          process.env.VUE_APP_API_JID + "set_new_pin",
          params,
          config
        );
        if (response.data.status == 200) {
          this.showConfirmPin = true;
        } else {
          throw 400;
        }
      } catch (err) {
        this.alert_show({
          header: "ล้มเหลว",
          type: "error",
          title: "การดำเนินการล้มเหลว <br> กรุณาลองใหม่อีกครั้ง !",
        });
      }
      this.app_loading(false);
    },
    async confirmPin(pin) {
      this.showConfirmPin = false;
      this.app_loading(true);
      try {
        let config = {
          headers: {
            "X-Parse-Session-Token": this.sessionToken,
          },
        };
        let params = {
          pin: pin,
        };
        let response = await this.$axios.post(
          process.env.VUE_APP_API_JID + "verify_pin",
          params,
          config
        );
        if (response.data.status == 200) {
          let verifyToken = await response.data.token;
          localStorage.setItem("sessionToken_mpv", this.sessionToken);
          await this.$store.commit("SET_VERIFY_TOKEN", verifyToken);
          await this.$store.dispatch("getUser");
          // await this.$store.dispatch("getEkycData");
          await this.$store.dispatch("getBalance");
          await this.$store.commit("SET_LOGGEDIN", true);
          await this.$router.push("/");
        } else if (response.data.status == 400) {
          if (response.data.lock <= 0) {
            let errMessage = `รหัสผ่านไม่ถูกต้อง<br>attemped ${response.data.attempted}/3`;
            this.alert_show({
              header: "ล้มเหลว",
              type: "error",
              title: errMessage,
            });
          } else {
            let errMessage = `กรุณาลองใหม่อีกครั้ง<br> ภายในอีก ${response.data.lock} วินาที`;
            this.alert_show({
              header: "ล้มเหลว",
              type: "error",
              title: errMessage,
            });
          }
          this.showConfirmPin = true;
        }
      } catch (err) {
        console.log(err);
        this.alert_show({
          header: "ล้มเหลว",
          type: "error",
          title: "การดำเนินการล้มเหลว <br> กรุณาลองใหม่อีกครั้ง !",
        });
      }
      this.app_loading(false);
    },
    goSetAgain() {
      this.showConfirmPin = false;
      setTimeout(() => {
        this.showSetPin = true;
      }, 1000);
    },
    reqX(number) {
      var patt1 = /[0-9]/g;
      var result = number.match(patt1);
      return result;
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode == 43) {
      } else if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    keyup(e) {
      const inputIndex = parseInt(e.target.id) - 1;
      const allInput = document.getElementsByTagName("input");
      let nowInput, nextInput, backInput;
      allInput.forEach((element, index) => {
        if (index == inputIndex) {
          nowInput = element;
        } else if (index == inputIndex + 1) {
          nextInput = element;
        } else if (index == inputIndex - 1) {
          backInput = element;
        }
      });
      if (e.code == "Backspace") {
        if (inputIndex > 0) {
          backInput.removeAttribute("readonly");
          nowInput.setAttribute("readonly", "readonly");
          backInput.focus();
        }
      } else if (this.reqX(e.key)) {
        if (inputIndex < 5) {
          nowInput.setAttribute("readonly", "readonly");
          nextInput.removeAttribute("readonly");
          nextInput.focus();
        } else if (inputIndex == 5) {
          let otp = "";
          for (const property in this.otp) {
            otp += `${this.otp[property]}`;
            this.otp[property] = null;
          }
          nowInput.setAttribute("readonly", "readonly");
          nowInput.blur();
          this.$refs.input1.removeAttribute("readonly");
          this.next(otp);
        }
      }
    },
    async next(otp) {
      this.app_loading(true);
      try {
        const access_token = await this.verifyOTP(otp);
        const { sessionToken } = await this.loginOTP(access_token);
        this.sessionToken = sessionToken;
        this.showSetPin = true;
      } catch (err) {
        this.alert_show({
          header: "ล้มเหลว",
          type: "error",
          title: err.response.data.error,
        });
        this.errorEntry += 1;
        if (this.errorEntry == 3) {
          setTimeout(() => {
            this.showAlertError = true;
          }, 300);
        }
      }
      this.app_loading(false);
    },
    async verifyOTP(otp) {
      try {
        let config = {
          headers: {
            "content-type": "application/json",
            "X-API-KEY": "OTPJFINzM8L6ZCmbIvce1BAFwihvDf3BF",
          },
        };
        let params = {
          phone_no: this.otpData.phone,
          otp_ref: this.otpData.ref,
          otp: otp.replace(/[^0-9\.]+/g, ""),
        };
        let result = await this.$axios.post(
          process.env.VUE_APP_API_OTP + "paa/verify_otp",
          JSON.stringify(params),
          config
        );
        return result.data.access_token;
      } catch (err) {
        throw err;
      }
    },
    async loginOTP(access_token) {
      try {
        let config = {
          headers: {
            "X-Parse-Application-Id": "928f24ed35d8876dee76d0a5460ef078",
            "content-type": "application/json",
          },
        };
        let params = {
          authData: {
            paa: {
              id: this.otpData.phone,
              access_token: access_token,
            },
          },
        };
        let result = await this.$axios.post(
          "https://api.jfin.network/parse/users",
          JSON.stringify(params),
          config
        );
        let sessionToken = result.data.sessionToken;
        let objectId = result.data.objectId;
        return {
          sessionToken,
          objectId,
        };
      } catch (err) {
        throw err;
      }
    },
    async getMe() {
      try {
        let config = {
          headers: {
            "X-Parse-Application-Id": "928f24ed35d8876dee76d0a5460ef078",
            "X-Parse-Session-Token": localStorage.getItem("sessionToken_mpv"),
            "content-type": "application/json",
          },
        };
        let result = await this.$axios.get(
          "https://api.jfin.network/parse/users/me",
          config
        );
        return await result.data;
      } catch (err) {
        throw err;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input1.focus();
    });
  },
};
</script>

<style lang="scss">
.otpVerify {
  height: 100vh;

  > .row {
    > div {
      padding: 8px 16px !important;
    }
  }

  .title-x {
    font-size: 24px;
    margin: 8px 0px;
  }

  .text-otp {
    div:nth-child(1) {
      font-size: 14px;
    }

    div:nth-child(2) {
      font-size: 16px;
      color: #c71e2b;
      font-weight: 600;
    }
  }

  .text-again {
    font-size: 14px;
    color: #c71e2b;
    display: flex !important;
    align-items: center;
  }

  .cicle {
    border-radius: 50%;
    background-color: #c71e2b;
    height: 21px;
    width: 21px;
    padding: 1px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .input-section {
    font-size: 16px;

    .input-all {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;

      > input {
        background-color: #eaecef;
        border-radius: 8px;
        width: 45px;
        height: 50px;
        text-align: center;
        font-size: 23px;
        font-weight: 600;
      }
    }
  }
}
</style>