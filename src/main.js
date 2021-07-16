import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import mixin from "./mixins";
import VueClipboard from "vue-clipboard2";
import vuetify from './plugins/vuetify'
import moment from "moment-timezone";
import "material-design-icons-iconfont";
import "./assets/scss/main.scss";
import { ethers, Signer } from "ethers";
import abi from "./assets/static/abi.json";

Vue.prototype.$axios = axios
Vue.prototype.$ethers = ethers;
Vue.prototype.$abi = abi;
Vue.config.productionTip = false
moment()
  .tz("Asia/Bangkok")
  .format();
Vue.prototype.$moment = moment;
Vue.mixin(mixin);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
