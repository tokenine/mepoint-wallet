<template>
  <div class="phoneVerify">
    <div>
      <div class="title-x">
        <div>กรุณากรอก</div>
        <div class="mt-1">E-mail ของคุณ</div>
      </div>
      <div class="input-section">
        <div class="mt-5">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              outlined
              ref="email_txt"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              @keydown.enter.prevent="requestOTP"
            ></v-text-field>
          </v-form>
        </div>
      </div>
      <div>
        <v-btn
          block
          rounded
          color="#c71e2b"
          dense
          height="49"
          @click="requestOTP()"
          :disabled="timer < 31"
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
  name: "EmailVerify",
  data() {
    return {
      timer: 31,
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "กรุณากรอก E-mail",
        (v) => /.+@.+\..+/.test(v) || "E-mail ไม่ถูกต้อง",
      ],
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
  },
  methods: {
    async requestOTP() {
      try {
        if (!this.$refs.form.validate()) {
          return false;
        }
        this.app_loading(true);
        const url = "https://api.mepoint.one/send_otp";
        let config = {
          headers: {
            "content-type": "application/json",
          },
        };
        let params = {
          email: this.email,
        };
        let res = await this.$axios.post(url, params, config);
        if (res.data.success) {
          this.$store.commit("SET_OTP", {
            ref: res.data.otp_ref,
            email: this.email,
          });
          this.$router.push("/OTP/otpVerify");
        } else {
          this.alert_show({
            header: "ล้มเหลว",
            type: "error",
            title: "E-mail ม่ถูกต้อง <br> กรุณาลองใหม่อีกครั้ง !",
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
  },
  mounted() {},
};
</script>

<style lang="scss">
.phoneVerify {
  height: 100vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;

  > div {
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
  }
}
</style>