(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a890d2a6"],{"312a":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"otpVerify"},[r("v-row",{staticClass:"pt-2",class:{blur:e.showSetPin||e.showConfirmPin},attrs:{"no-gutters":"",justify:"center"}},[r("v-col",{attrs:{cols:"12"}},[r("v-icon",{attrs:{large:"",color:"#A7A7A7"},on:{click:function(t){return e.$router.push("/OTP/emailVerify")}}},[e._v("keyboard_arrow_left")])],1),r("v-col",{staticClass:"title-x text-sm-center",attrs:{cols:"12"}},[e._v(" กรุณากรอก OTP ที่ส่งไปที่ E-mail ของคุณ ")]),r("v-col",{attrs:{cols:"12",xs:"12",sm:"8",md:"6",lg:"4"}},[r("v-row",[r("v-col",{staticClass:"input-section",attrs:{cols:"12"}},[r("div",{staticClass:"px-3"},[e._v("หมายเลข OTP")]),r("div",{staticClass:"input-all px-3 mt-2"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.otp.pos1,expression:"otp.pos1"}],ref:"input1",attrs:{type:"number",id:"1"},domProps:{value:e.otp.pos1},on:{keypress:function(t){return e.isNumber()},keyup:function(t){return t.stopPropagation(),e.keyup.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.otp,"pos1",t.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.otp.pos2,expression:"otp.pos2"}],attrs:{type:"number",id:"2",readonly:""},domProps:{value:e.otp.pos2},on:{keypress:function(t){return e.isNumber()},keyup:function(t){return t.stopPropagation(),e.keyup.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.otp,"pos2",t.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.otp.pos3,expression:"otp.pos3"}],attrs:{type:"number",id:"3",readonly:""},domProps:{value:e.otp.pos3},on:{keypress:function(t){return e.isNumber()},keyup:function(t){return t.stopPropagation(),e.keyup.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.otp,"pos3",t.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.otp.pos4,expression:"otp.pos4"}],attrs:{type:"number",id:"4",readonly:""},domProps:{value:e.otp.pos4},on:{keypress:function(t){return e.isNumber()},keyup:function(t){return t.stopPropagation(),e.keyup.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.otp,"pos4",t.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.otp.pos5,expression:"otp.pos5"}],attrs:{type:"number",id:"5",readonly:""},domProps:{value:e.otp.pos5},on:{keypress:function(t){return e.isNumber()},keyup:function(t){return t.stopPropagation(),e.keyup.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.otp,"pos5",t.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.otp.pos6,expression:"otp.pos6"}],attrs:{type:"number",id:"6",readonly:""},domProps:{value:e.otp.pos6},on:{keypress:function(t){return e.isNumber()},keyup:function(t){return t.stopPropagation(),e.keyup.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.otp,"pos6",t.target.value)}}})])]),r("v-col",{staticClass:"text-center text-otp",attrs:{cols:"12"}},[r("div",{staticClass:"mt-2 mb-1"},[e._v("OTP Ref: "+e._s(e.otpData.ref))]),e.timer<31?r("div",[e._v(e._s(e.timer)+" Seconds")]):e._e(),e.errorEntry>0?r("div",{staticClass:"red--text"},[e._v(" OTP ไม่ถูกต้อง "+e._s(e.errorEntry)+" / 3 ")]):e._e()]),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{staticClass:"px-3 mt-1 text-again",attrs:{disabled:31!=e.timer,text:""},on:{click:e.sendOTPAgain}},[r("span",{staticClass:"cicle"},[r("v-icon",{attrs:{"x-small":"",color:"white"}},[e._v("refresh")])],1),r("span",{staticClass:"ml-1"},[e._v("ส่งรหัสอีกครั้ง")])])],1)],1)],1)],1),e.showSetPin?r("pin-pad",{attrs:{header:"กรุณากำหนดรหัสผ่าน <br> ความปลอดภัย 6 หลัก",backward:!0},on:{pinEmit:e.setPin,goback:function(t){e.showSetPin=!1,e.$refs.input1.focus()}}}):e._e(),e.showConfirmPin?r("pin-pad",{attrs:{header:"กรุณายืนยันรหัสผ่าน <br> ความปลอดภัย 6 หลัก",backward:!0},on:{pinEmit:e.confirmPin,goback:e.goSetAgain}}):e._e()],1)},a=[],o=r("1da1"),s=(r("96cf"),r("ac1f"),r("1276"),r("4795"),r("0d03"),r("d3b7"),r("25f0"),r("466d"),r("e25e"),r("4160"),r("159b"),r("b64b"),r("5319"),r("6b31")),i=r("4ee7"),p={name:"OtpVerify",components:{"pin-pad":s["a"]},computed:{otpData:function(){return this.$store.state.auth.OTP},pos1:function(){return this.otp.pos1}},data:function(){return{showSetPin:!1,showConfirmPin:!1,otp:{pos1:null,pos2:null,pos3:null,pos4:null,pos5:null,pos6:null},timer:31,sessionToken:null,errorEntry:0,Pin:""}},watch:{pos1:function(e){var t=this;try{if(6==e.length){var r=e.split(""),n=0;for(var a in this.otp)this.otp[a]=r[n],n++;setTimeout((function(){var e="";for(var r in t.otp)e+="".concat(t.otp[r]),t.otp[r]=null;t.$refs.input1.blur(),t.next(e)}),500)}}catch(o){}},timer:function(e){var t=this;e<31&&0!=e?setTimeout((function(){t.timer=t.timer-1}),1e3):0==e&&(this.timer=31)}},methods:{sendOTPAgain:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.$store.commit("SET_APP_LOADING",!0),r="https://api.mepoint.one/send_otp",n={headers:{"content-type":"application/json"}},a={email:e.otpData.email},t.next=7,e.$axios.post(r,a,n);case 7:o=t.sent,o.data.success&&e.$store.commit("SET_OTP",{ref:o.data.otp_ref,email:e.otpData.email}),e.timer=30,e.$store.commit("SET_APP_LOADING",!1),t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),e.alert_show({header:"ล้มเหลว",type:"error",title:"การดำเนินการล้มเหลว <br> กรุณาลองใหม่อีกครั้ง !"});case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},setPin:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.showSetPin=!1,t.app_loading(!0),t.Pin=e,setTimeout((function(){t.showConfirmPin=!0}),500),t.app_loading(!1);case 5:case"end":return r.stop()}}),r)})))()},storeUserOnfireStore:function(e,t,r){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var o,s,p,c,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,n.$ethers.Wallet.createRandom();case 3:return o=a.sent,s={address:o.address,privateKey:o.privateKey,publicKey:o.publicKey},p=JSON.stringify(s),c=u(p,t),l=c.toString(),a.next=10,i["b"].add({email:e,uid:r,wallet:l});case 10:return a.next=12,n.$store.commit("SET_ME",{email:e,uid:r,ethereumAddress:s.address,privateKey:s.privateKey});case 12:delete s.privateKey,localStorage.setItem("encypt_string_mpv",l),localStorage.setItem("wallet_mpv",JSON.stringify(s)),a.next=20;break;case 17:throw a.prev=17,a.t0=a["catch"](0),a.t0;case 20:case"end":return a.stop()}}),a,null,[[0,17]])})))()},firebaseCreateUser:function(e,t){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,o,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,a=r,n.next=4,i["a"].createUserWithEmailAndPassword(e,t);case 4:return o=n.sent,s=o.user,n.next=8,a.storeUserOnfireStore(e,t,s.uid);case 8:n.next=13;break;case 10:throw n.prev=10,n.t0=n["catch"](0),n.t0;case 13:case"end":return n.stop()}}),n,null,[[0,10]])})))()},checkAccount:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i["b"].where("email","==",e.otpData.email).limit(1).get();case 3:return r=t.sent,t.abrupt("return",r.empty);case 7:throw t.prev=7,t.t0=t["catch"](0),t.t0;case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},confirmPin:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.showConfirmPin=!1,t.app_loading(!0),e!=t.Pin){r.next=20;break}return r.prev=3,n=e,a=t.otpData.email,r.next=8,t.firebaseCreateUser(a,n);case 8:return r.next=10,i["a"].signInWithEmailAndPassword(a,n);case 10:return localStorage.setItem("email_account_mpv",t.otpData.email),r.next=13,t.$store.dispatch("getBalance");case 13:t.$router.push("/"),r.next=20;break;case 16:r.prev=16,r.t0=r["catch"](3),t.app_loading(!1),t.alert_show({header:"ล้มเหลว",type:"error",title:r.t0.message});case 20:t.app_loading(!1);case 21:case"end":return r.stop()}}),r,null,[[3,16]])})))()},goSetAgain:function(){var e=this;this.showConfirmPin=!1,setTimeout((function(){e.showSetPin=!0}),1e3)},reqX:function(e){var t=/[0-9]/g,r=e.match(t);return r},isNumber:function(e){e=e||window.event;var t=e.which?e.which:e.keyCode;if(43==t);else{if(!(t>31&&(t<48||t>57)&&46!==t))return!0;e.preventDefault()}},keyup:function(e){var t,r,n,a=parseInt(e.target.id)-1,o=document.getElementsByTagName("input");if(o.forEach((function(e,o){o==a?t=e:o==a+1?r=e:o==a-1&&(n=e)})),"Backspace"==e.key){if(a>0){n.removeAttribute("readonly"),t.setAttribute("readonly","readonly"),n.focus();var s=parseInt(n.id)-1,i=Object.keys(this.otp)[s];this.otp[i]=null}}else if(this.reqX(e.key))if(a<5)t.setAttribute("readonly","readonly"),r.removeAttribute("readonly"),r.focus();else if(5==a){var p="";for(var u in this.otp)p+="".concat(this.otp[u]),this.otp[u]=null;t.setAttribute("readonly","readonly"),t.blur(),this.$refs.input1.removeAttribute("readonly"),this.next(p)}},next:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.app_loading(!0),r.prev=1,r.next=4,t.verifyOTP(e);case 4:if(n=r.sent,!n){r.next=12;break}return r.next=8,t.checkAccount();case 8:a=r.sent,a?t.showSetPin=!0:a||(localStorage.setItem("email_account_mpv",t.otpData.email),t.$router.push("/login")),r.next=13;break;case 12:throw"error";case 13:r.next=21;break;case 15:r.prev=15,r.t0=r["catch"](1),t.app_loading(!1),t.errorEntry+=1,t.$refs.input1.focus(),3==t.errorEntry&&setTimeout((function(){t.alert_show({header:"ล้มเหลว",type:"error",title:"OTP ไม่สำเร็จ <br> กรอก E-mail ใหม่อีกครั้ง"}).then((function(e){t.$router.push("/OTP/emailVerify")}))}),300);case 21:t.app_loading(!1);case 22:case"end":return r.stop()}}),r,null,[[1,15]])})))()},verifyOTP:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,n={headers:{"content-type":"application/json"}},a={email:t.otpData.email,otp_ref:t.otpData.ref,otp:e.replace(/[^0-9\.]+/g,"")},r.next=5,t.$axios.post("https://api.mepoint.one/verify_otp",a,n);case 5:return o=r.sent,r.abrupt("return",o.data.success);case 9:throw r.prev=9,r.t0=r["catch"](0),r.t0;case 12:case"end":return r.stop()}}),r,null,[[0,9]])})))()}},mounted:function(){var e=this;this.$nextTick((function(){e.$refs.input1.focus()}))}};function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(e){e=CryptoJS.AES.encrypt(e,t);return e.toString()}(e)}var c=p,l=(r("7441"),r("2877")),m=r("6544"),d=r.n(m),f=r("8336"),v=r("62ad"),h=r("132d"),y=r("0fd9"),g=Object(l["a"])(c,n,a,!1,null,null,null);t["default"]=g.exports;d()(g,{VBtn:f["a"],VCol:v["a"],VIcon:h["a"],VRow:y["a"]})},"701a":function(e,t,r){},7441:function(e,t,r){"use strict";r("701a")}}]);
//# sourceMappingURL=chunk-a890d2a6.8ad91e7f.js.map