<template>
  <div class="phoneVerify">
    <div>
      <div class="title-x">
        <div>กรุณากรอกหมายเลข</div>
        <div class="mt-1">โทรศัพท์ของคุณ</div>
      </div>
      <div class="input-section">
        <div>หมายเลขโทรศัพท์</div>
        <div class="mt-2">
          <input
            ref="phone_txt"
            type="text"
            :disabled="timer != 31"
            maxlength="10"
            v-model="phone"
            @keypress="isNumber()"
            @keyup.enter="requestOTP()"
          />
        </div>
      </div>
      <div>
        <v-btn
          block
          rounded
          color="#c71e2b"
          :disabled="phone.length != 10"
          dense
          height="49"
          @click="requestOTP()"
          class="mt-4"
        >
          <span v-if="timer == 31" class="white--text"> ขอรับOTP </span>
          <span class="white--text" v-else>{{ timer }}</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneVerify",
  data() {
    return {
      phone: "",
      timer: 31,
    };
  },
  watch: {
    timer(val) {
      if (val < 31 && val != 0) {
        setTimeout(() => {
          this.timer = this.timer - 1;
        }, 1000);
      } else if (val == 0) {
        this.timer = 31;
      }
    },
    phone(val) {
      var phone = val.replace(/[^0-9\.+]+/g, "");
      this.phone = phone;
    },
  },
  methods: {
    async requestOTP() {
      this.app_loading(true);
      try {
        if (this.phone.length != 10) {
          return false;
        }
        const url = process.env.VUE_APP_API_OTP;
        let config = {
          headers: {
            "content-type": "application/json",
            "X-API-KEY": "OTPJFINzM8L6ZCmbIvce1BAFwihvDf3BF",
          },
        };
        let params = {
          phone_no: this.phone,
        };
        let res = await this.$axios.post(
          url + "paa/auth_phone",
          JSON.stringify(params),
          config
        );
        if (res.data.status_code == 200) {
          this.$store.commit("SET_OTP", {
            ref: res.data.data.otp_ref,
            phone: this.phone,
          });
          this.$router.push("/OTP/otpVerify");
        } else {
          this.alert_show({
            header: "ล้มเหลว",
            type: "error",
            title: "เบอร์โทรศัพท์มือถือไม่ถูกต้อง <br> กรุณาลองใหม่อีกครั้ง !",
          });
        }
        this.timer = 30;
      } catch (err) {
        this.alert_show({
          header: "ล้มเหลว",
          type: "error",
          title: "การดำเนินการล้มเหลว <br> กรุณาลองใหม่อีกครั้ง !",
        });
      }
      this.app_loading(false);
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
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.phone_txt.focus();
    });
  },
};
</script>

<style lang="scss">
.phoneVerify {
  height: 100vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;

  > div{
    margin-left: auto;
    margin-right: auto;
    margin-top: 3vw;
    display: block;
    padding: 18px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: white;
    max-width: 500px;
    width: 100%;

    .title-x {
      font-size: 21px;
      font-weight: 100;
    }

    .input-section {
      margin-top: 40px;
      font-size: 16px;

      input {
        // border: 1px solid black;
        border-radius: 4px;
        height: 49px;
        width: 100%;
        font-weight: 600;
        font-size: 21px;
        padding: 10px;
        letter-spacing: 1px;
        border: 2px solid #c71e2b;
      }
    }
  }
}
</style>