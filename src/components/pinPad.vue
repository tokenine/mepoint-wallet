<template>
  <transition name="page" mode="in-out">
    <v-container fluid class="pindPadComponent">
      <v-row
        class="px-3"
        align-content="space-around"
        align-content-sm="center"
      >
        <v-col cols="12"></v-col>
        <v-col cols="12">
          <div class="header-pad" v-html="header"></div>
        </v-col>
        <v-col cols="12">
          <div class="hole-pad d-flex justify-center my-5">
            <ul class="pwd">
              <li
                class="full"
                v-for="(full, j) in Pin.length"
                :key="'full' + j"
              >
                &nbsp;
              </li>
              <li
                class="hollow"
                v-for="(hollow, i) in 6 - Pin.length"
                :key="'hollow' + i"
              >
                &nbsp;
              </li>
            </ul>
          </div>
        </v-col>
        <v-col cols="12" class="text-center d-flex justify-center">
          <v-row class="pin-pad px-5" align="center">
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('1')"
                >1
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('2')"
                >2
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('3')"
                >3
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('4')"
                >4
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('5')"
                >5
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('6')"
                >6
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('7')"
                >7
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('8')"
                >8
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('9')"
                >9
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                v-if="logout"
                small
                text
                class="pa-1 white--text"
                @click="$emit('logout')"
              >
                ออกจากระบบ
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                class="pinButton"
                depressed
                dark
                fab
                large
                :disabled="Pin.length >= 6"
                @click="addVerify('0')"
                >0
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-icon color="white" large @click="decrementVerify()"
                >mdi-backspace</v-icon
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12"></v-col>
      </v-row>
      <v-btn
        icon
        v-if="backward"
        class="white--text backward"
        @click="$emit('goback')"
      >
        <v-icon color="white"> arrow_back </v-icon>
      </v-btn>
    </v-container>
  </transition>
</template>

<script>
import { firebaseAuth } from "../plugins/firebase";
export default {
  name: "pindPadComponent",
  props: {
    header: {
      type: String,
      default: "",
    },
    backward: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: false,
    },
    logout: {
      type: Boolean,
      default: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    Pin: "",
  }),
  watch: {
    clear(val) {
      this.Pin = "";
    },
  },
  methods: {
    async addVerify(val) {
      if (this.Pin.length < 5) {
        this.Pin += val;
      } else if (this.Pin.length == 5) {
        this.Pin += val;
        setTimeout(() => {
          if (!this.verify) {
            this.$emit("pinEmit", this.Pin);
          } else if (this.verify) {
            this.verifyPin();
          }
        }, 300);
      }
    },
    async verifyPin() {
      this.app_loading(true);
      try {
        const email = localStorage.getItem("email_account_mpv");
        const password = this.Pin;
        let signIn = await firebaseAuth.signInWithEmailAndPassword(
          email,
          password
        );
        if (signIn.user.uid) {
          this.$emit("verifyPin", true);
        }
        this.app_loading(false);
      } catch (err) {
        this.app_loading(false);
        this.clear = !this.clear;
        this.alert_show({
          header: "ล้มเหลว",
          type: "error",
          title: err.message,
        });
      }
      this.Pin = "";
    },
    decrementVerify() {
      this.Pin = this.Pin.substring(0, this.Pin.length - 1);
    },
  },
};
</script>

<style lang="scss">
.pindPadComponent {
  min-height: 500px;
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6) !important;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;

  .header-pad {
    color: white;
    font-size: 1.2em !important;
    font-weight: 800;
    text-align: center;
  }

  .pwd {
    padding: 0px !important;
    display: flex;
    justify-content: space-between;
    margin: 0px;
    background: none;
    max-width: 200px;
    width: 50%;

    > * {
      height: 1em;
      width: 1em;
      border-radius: 50%;
      display: inline-block;
    }

    > .hollow {
      background-color: none;
      border: 2px solid white;
    }

    > .full {
      background-color: white;
      border: 2px solid white;
    }
  }

  .pin-pad {
    max-width: 390px;

    .pinButton {
      background-color: rgba(255, 255, 255, 0.25) !important;
      font-size: 1.4em;
    }
  }

  .backward {
    position: absolute;
    top: 2vh;
    left: 2vh;
    width: 3em;
    height: 3em;
    padding: 5px;

    > img {
      width: 100%;
      margin: 0 auto;
      height: auto;
    }
  }
}
</style>