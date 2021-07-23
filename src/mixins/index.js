import store from "../store";
import {
  ethers
} from "ethers";

const mixins = {
  computed: {
    balance() {
      return store.state.auth.balance;
    },
    walletAddress() {
      return store.getters.walletAddress;
    },
    ethereumAddress() {
      return store.getters.ethereumAddress;
    },
    id_card() {
      return store.getters.id_card;
    },
    verifyToken() {
      return store.getters.verifyToken;
    },
  },
  methods: {
    parseUtillETH(val) {
      const value = ethers.BigNumber.from(String(val));
      let check = ethers.utils.formatEther(value).split(".");
      let decimal = check[1].length;
      if (check[1].length > 4) {
        return this.formatMoney(ethers.utils.formatEther(value), 4);
      } else if (check[1].length < 4) {
        if(parseInt(check[1]) <= 0) {
          return this.formatMoney(ethers.utils.formatEther(value), 0);
        }
        return this.formatMoney(ethers.utils.formatEther(value), decimal);
      }
    },
    app_loading(state) {
      store.commit("SET_APP_LOADING", state);
    },
    alert_show(data) {
      return new Promise((resolve, reject) => {
        store.commit("SET_APP_ALERT_SHOW", [data, resolve, reject]);
      });
    },
    alert_close() {
      store.commit("SET_APP_ALERT_CLOSE");
    },
    DateTime(stmpDate) {
      let d = this.$moment(stmpDate);
      var month = new Array();
      month[0] = "มกราคม";
      month[1] = "กุมภาพันธุ์";
      month[2] = "มีนาคม";
      month[3] = "เมษายน";
      month[4] = "พฤษภาคม";
      month[5] = "มิถุนายน";
      month[6] = "กรกฎาคม";
      month[7] = "สิงหาคม";
      month[8] = "กันยายน";
      month[9] = "ตุลาคม";
      month[10] = "พฤศจิกายน";
      month[11] = "ธันวาคม";
      let year = parseInt(d.year()) + 543;
      return (
        this.twoDigit(d.date()) +
        " " +
        month[d.month()] +
        " " +
        year +
        " " +
        this.twoDigit(d.hour()) +
        ":" +
        this.twoDigit(d.minute()) +
        " น."
      );
    },
    DateOnly(stmpDate) {
      let d = this.$moment(stmpDate);
      var month = new Array();
      month[0] = "มกราคม";
      month[1] = "กุมภาพันธุ์";
      month[2] = "มีนาคม";
      month[3] = "เมษายน";
      month[4] = "พฤษภาคม";
      month[5] = "มิถุนายน";
      month[6] = "กรกฎาคม";
      month[7] = "สิงหาคม";
      month[8] = "กันยายน";
      month[9] = "ตุลาคม";
      month[10] = "พฤศจิกายน";
      month[11] = "ธันวาคม";
      let year = parseInt(d.year()) + 543;
      return this.twoDigit(d.date()) + " " + month[d.month()] + " " + year;
    },
    DateOne(stmpDate) {
      try {
        var month = new Array();
        month[0] = "มกราคม";
        month[1] = "กุมภาพันธุ์";
        month[2] = "มีนาคม";
        month[3] = "เมษายน";
        month[4] = "พฤษภาคม";
        month[5] = "มิถุนายน";
        month[6] = "กรกฎาคม";
        month[7] = "สิงหาคม";
        month[8] = "กันยายน";
        month[9] = "ตุลาคม";
        month[10] = "พฤศจิกายน";
        month[11] = "ธันวาคม";
        let res = stmpDate.match(/-/);
        if (res == null) {
          let year = stmpDate.substr(0, 4);
          let m = parseInt(stmpDate.substr(4, 2)) - 1;
          let day = stmpDate.substr(6, 2);
          return day + " " + month[m] + " " + year;
        } else {
          let d = this.$moment(stmpDate);
          let year = parseInt(d.year()) + 543;
          return this.twoDigit(d.date()) + " " + month[d.month()] + " " + year;
        }
      } catch (err) {
        return "";
      }
    },
    twoDigit(digit) {
      if (String(digit).length == 1) {
        return "0" + digit;
      } else {
        return digit;
      }
    },
    focusInput(e) {
      window.scroll({
        top: e.target.offsetTop,
        behavior: "smooth",
      });
    },
    diffDate(x, y) {
      var x = new this.$moment(x);
      var y = new this.$moment(y);
      var duration = this.$moment.duration(y.diff(x));
      return duration.asDays();
    },
    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : "") +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
          (decimalCount ?
            decimal +
            Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2) :
            "")
        );
      } catch (e) {
        console.log(e);
      }
    },
    checkDecimal(amount) {
      let check = amount.substr(".");
      console.log(check);
    }
  },
};

export default mixins;