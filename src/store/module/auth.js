import $axios from "axios";
import {
  usersCollection
} from "../../plugins/firebase";
import {
  ethers,
  Signer
} from "ethers";

export default {
  state: {
    me: null,
    OTP: null,
    verify_token: null,
    history: [],
    tokenList: [],
    balance: 0,
  },
  getters: {
    ethereumAddress: (state) => state.me.ethereumAddress,
    id_card: (state) => state.me.idCard,
    historyByID: (state) => (id) => {
      return state.history.find((q) => q.transaction_hash === id);
    },
    historyByToken: (state) => (address) => {
      if (address == "mainnet") {
        return state.history.filter(
          (q) => q.contractAddress == "" && q.value != "0"
        );
      }
      return state.history.filter(
        (q) =>
        String(q.contractAddress).toLowerCase() ==
        String(address).toLowerCase()
      );
    },
    tokenByName: (state) => (token) => {
      return state.tokenList.find((q) => q.address == token);
    },
    objectId: (state) => state.me.objectId,
  },
  mutations: {
    SET_ME(state, data) {
      state.me = data;
    },
    SET_OTP(state, data) {
      state.OTP = data;
    },
    SET_BALANCE(state, data) {
      state.balance = data;
    },
    SET_HISTORY(state, data) {
      state.history = data;
    },
    SET_TOKENLIST(state, data) {
      state.tokenList = data;
    },
    SET_PRIVATE_KEY(state, data) {
      state.me.privateKey = data;
    },
  },
  actions: {
    async getUser({
      commit
    }, data) {
      let querySnapshot = await usersCollection.where("uid", "==", data.uid).limit(1).get();
      let me = querySnapshot.docs[0].data();
      let decryptedMessage = await decrypt(me.wallet, data.password);
      let wallet = JSON.parse(decryptedMessage);
      await commit("SET_ME", {
        email: me.email,
        uid: me.uid,
        ethereumAddress: wallet.address,
        privateKey: wallet.privateKey,
      });
      delete wallet.privateKey;
      localStorage.setItem("encypt_string_mpv", me.wallet);
      localStorage.setItem("wallet_mpv", JSON.stringify(wallet));
    },
    async getBalance({
      commit,
      getters
    }) {
      try {
        console.log("getBalance");
        let tokens = await fetchToken();

        let mainnetToken = [{
          address: "mainnet",
          chainId: 35,
          decimals: 18,
          logoURI: "https://raw.githubusercontent.com/dfy-asia/default-token-list/main/src/images/xth.png",
          name: "XTH",
          symbol: "XTH",
          balance: 0,
        }, ];

        let getBalanceUti = await getUtiBalance(getters.ethereumAddress);

        mainnetToken[0].balance = getBalanceUti;

        let tokenHolder = await getTokenHolder(getters.ethereumAddress);

        if (tokenHolder.length > 0) {
          for (let cypto of tokenHolder) {
            let find = tokens.findIndex(
              (q) =>
              String(q.address).toLowerCase() ===
              String(cypto.contractAddress).toLowerCase()
            );
            if (find != undefined && tokens[find] != undefined) {
              tokens[find].balance = String(cypto.balance);
            }
          }
        }

        let tokenList = mainnetToken.concat(
          tokens.sort(dynamicSort("-balance"))
        );
        await commit("SET_TOKENLIST", tokenList);
      } catch (err) {
        throw err;
      }
    },
    async getHistory({
      commit,
      getters
    }) {
      try {
        console.log("getHistory");
        let tokenx = await getHistoryTokenx(getters.ethereumAddress);

        let txlist = await getHistoryTxlist(getters.ethereumAddress);

        let all = await txlist.concat(tokenx);

        await commit("SET_HISTORY", all.sort(dynamicSort("-timeStamp")));
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

function decrypt(message = "", key = "") {
  var code = CryptoJS.AES.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

async function getUtiBalance(address) {
  try {
    let getUti = await $axios.get(
      process.env.VUE_APP_API_EXP +
      "?module=account&action=eth_get_balance&address=" +
      address
    );

    let Big = ethers.BigNumber.from(getUti.data.result);

    return Big.toString();
  } catch (err) {
    return "0";
  }
}

async function fetchToken() {
  try {
    let fetchToken = await fetch(
      "https://raw.githubusercontent.com/dfy-asia/default-token-list/main/build/dfy.tokenlist.json"
    );
    let toJson = await fetchToken.json();
    let tokens = toJson.tokens;
    let tokenfromFecth = await tokens.filter((q) => q.chainId === 35);
    for (let i in tokenfromFecth) {
      tokenfromFecth[i] = Object.assign(tokenfromFecth[i], {
        balance: "0",
      });
    }
    return tokenfromFecth;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getTokenHolder(address) {
  try {
    let response = await $axios.get(
      process.env.VUE_APP_API_EXP +
      "?module=account&action=tokenlist&address=" +
      address
    );
    return response.data.result;
  } catch (err) {
    return [];
  }
}

async function getHistoryTokenx(address) {
  try {
    let result = await $axios.get(
      process.env.VUE_APP_API_EXP +
      "?module=account&action=tokentx&address=" +
      address
    );
    return result.data.result;
  } catch (err) {
    return [];
  }
}

async function getHistoryTxlist(address) {
  try {
    let result = await $axios.get(
      process.env.VUE_APP_API_EXP +
      "?module=account&action=txlist&address=" +
      address
    );
    return result.data.result;
  } catch (err) {
    return [];
  }
}