import $axios from "axios";
const api_url = process.env.VUE_APP_API_JID;
export default {
  state: {
    isSplash: true,
    loggedIn: false,
    loading: false,
    alert: false,
    alert_data: {
      header: "",
      type: "success",
      ttile: "",
    },
    alert_resolve: null,
    alert_reject: null,
    system_wallet: "0x40c85fe4F0E390A62fdAfccc253bcd84ddb01549",
  },
  getters: {
    system_wallet: (state) => state.system_wallet,
  },
  mutations: {
    SET_LOGGEDIN(state, data) {
      state.loggedIn = data;
    },
    SET_SPLASH(state, data) {
      state.isSplash = data;
    },
    SET_APP_LOADING(state, data) {
      state.loading = data;
    },
    SET_APP_ALERT_SHOW(state, data) {
      state.alert = true;
      state.alert_data = data[0];
      state.alert_resolve = data[1];
      state.alert_reject = data[2];
    },
    SET_APP_ALERT_CLOSE(state) {
      state.alert = false;
      state.alert_resolve = null;
      state.alert_reject = null;
      setTimeout(() => {
        state.alert_data = {
          header: "",
          type: "success",
          ttile: "",
        };
      }, 300);
    },
  },
  actions: {
    async faucet({ commit }) {
      try {
        let config = {
          headers: {
            "X-Parse-Session-Token": localStorage.getItem("sessionToken_mpv"),
          },
        };
        let response = await $axios.post(
          api_url + "university/faucet",
          {},
          config
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
