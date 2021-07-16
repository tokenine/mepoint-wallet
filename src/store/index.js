import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import moduleApp from "./module/app";
import moduleAuth from "./module/auth";
export default new Vuex.Store({
  modules: {
    app: moduleApp,
    auth: moduleAuth,
  },
});
