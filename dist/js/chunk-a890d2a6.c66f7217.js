(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a890d2a6"],{"312a":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"otpVerify"},[r("v-row",{staticClass:"pt-2",class:{blur:t.showSetPin||t.showConfirmPin},attrs:{"no-gutters":"",justify:"center"}},[r("v-col",{attrs:{cols:"12"}},[r("v-icon",{attrs:{large:"",color:"#A7A7A7"},on:{click:function(e){return t.$router.push("/OTP/emailVerify")}}},[t._v("keyboard_arrow_left")])],1),r("v-col",{staticClass:"title-x text-sm-center",attrs:{cols:"12"}},[t._v(" กรุณากรอก OTP ที่ส่งไปที่ E-mail ของคุณ ")]),r("v-col",{attrs:{cols:"12",xs:"12",sm:"8",md:"6",lg:"4"}},[r("v-row",[r("v-col",{staticClass:"input-section",attrs:{cols:"12"}},[r("div",{staticClass:"px-3"},[t._v("หมายเลข OTP")]),r("div",{staticClass:"input-all px-3 mt-2"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.otp.pos1,expression:"otp.pos1"}],ref:"input1",attrs:{type:"text",pattern:"\\d*",maxlength:"1",id:"1"},domProps:{value:t.otp.pos1},on:{keypress:function(e){return t.isNumber()},keyup:function(e){return e.stopPropagation(),t.keyup.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.otp,"pos1",e.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.otp.pos2,expression:"otp.pos2"}],attrs:{type:"text",pattern:"\\d*",maxlength:"1",id:"2",readonly:""},domProps:{value:t.otp.pos2},on:{keypress:function(e){return t.isNumber()},keyup:function(e){return e.stopPropagation(),t.keyup.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.otp,"pos2",e.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.otp.pos3,expression:"otp.pos3"}],attrs:{type:"text",pattern:"\\d*",maxlength:"1",id:"3",readonly:""},domProps:{value:t.otp.pos3},on:{keypress:function(e){return t.isNumber()},keyup:function(e){return e.stopPropagation(),t.keyup.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.otp,"pos3",e.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.otp.pos4,expression:"otp.pos4"}],attrs:{type:"text",pattern:"\\d*",maxlength:"1",id:"4",readonly:""},domProps:{value:t.otp.pos4},on:{keypress:function(e){return t.isNumber()},keyup:function(e){return e.stopPropagation(),t.keyup.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.otp,"pos4",e.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.otp.pos5,expression:"otp.pos5"}],attrs:{type:"text",pattern:"\\d*",maxlength:"1",id:"5",readonly:""},domProps:{value:t.otp.pos5},on:{keypress:function(e){return t.isNumber()},keyup:function(e){return e.stopPropagation(),t.keyup.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.otp,"pos5",e.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.otp.pos6,expression:"otp.pos6"}],attrs:{type:"text",pattern:"\\d*",maxlength:"1",id:"6",readonly:""},domProps:{value:t.otp.pos6},on:{keypress:function(e){return t.isNumber()},keyup:function(e){return e.stopPropagation(),t.keyup.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.otp,"pos6",e.target.value)}}})])]),r("v-col",{staticClass:"text-center text-otp",attrs:{cols:"12"}},[r("div",{staticClass:"mt-2 mb-1"},[t._v("OTP Ref: "+t._s(t.otpData.ref))]),t.timer<31?r("div",[t._v(t._s(t.timer)+" Seconds")]):t._e(),t.errorEntry>0?r("div",{staticClass:"red--text"},[t._v(" OTP ไม่ถูกต้อง "+t._s(t.errorEntry)+" / 3 ")]):t._e()]),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{staticClass:"px-3 mt-1 text-again",attrs:{disabled:31!=t.timer,text:""},on:{click:t.sendOTPAgain}},[r("span",{staticClass:"cicle"},[r("v-icon",{attrs:{"x-small":"",color:"white"}},[t._v("refresh")])],1),r("span",{staticClass:"ml-1"},[t._v("ส่งรหัสอีกครั้ง")])])],1)],1)],1)],1),t.showSetPin?r("pin-pad",{attrs:{header:"กรุณากำหนดรหัสผ่าน <br> ความปลอดภัย 6 หลัก",backward:!0},on:{pinEmit:t.setPin,goback:function(e){t.showSetPin=!1,t.$refs.input1.focus()}}}):t._e(),t.showConfirmPin?r("pin-pad",{attrs:{header:"กรุณายืนยันรหัสผ่าน <br> ความปลอดภัย 6 หลัก",backward:!0},on:{pinEmit:t.confirmPin,goback:t.goSetAgain}}):t._e()],1)},a=[],o=r("1da1"),s=(r("96cf"),r("ac1f"),r("1276"),r("4795"),r("466d"),r("e25e"),r("4160"),r("159b"),r("b64b"),r("5319"),r("6b31")),i=r("4ee7"),p={name:"OtpVerify",components:{"pin-pad":s["a"]},computed:{otpData:function(){return this.$store.state.auth.OTP},pos1:function(){return this.otp.pos1}},data:function(){return{showSetPin:!1,showConfirmPin:!1,otp:{pos1:null,pos2:null,pos3:null,pos4:null,pos5:null,pos6:null},timer:31,sessionToken:null,errorEntry:0,Pin:""}},watch:{pos1:function(t){var e=this;try{if(6==t.length){var r=t.split(""),n=0;for(var a in this.otp)this.otp[a]=r[n],n++;setTimeout((function(){var t="";for(var r in e.otp)t+="".concat(e.otp[r]),e.otp[r]=null;e.$refs.input1.blur(),e.next(t)}),500)}}catch(o){}},timer:function(t){var e=this;t<31&&0!=t?setTimeout((function(){e.timer=e.timer-1}),1e3):0==t&&(this.timer=31)}},methods:{sendOTPAgain:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,n,a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.$store.commit("SET_APP_LOADING",!0),r="https://api.mepoint.one/send_otp",n={headers:{"content-type":"application/json"}},a={email:t.otpData.email},e.next=7,t.$axios.post(r,a,n);case 7:o=e.sent,o.data.success&&t.$store.commit("SET_OTP",{ref:o.data.otp_ref,phone:t.otpData.email}),t.timer=30,t.$store.commit("SET_APP_LOADING",!1),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](0),t.alert_show({header:"ล้มเหลว",type:"error",title:"การดำเนินการล้มเหลว <br> กรุณาลองใหม่อีกครั้ง !"});case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))()},setPin:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.showSetPin=!1,e.app_loading(!0),e.Pin=t,setTimeout((function(){e.showConfirmPin=!0}),500),e.app_loading(!1);case 5:case"end":return r.stop()}}),r)})))()},storeUserOnfireStore:function(t,e,r){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var o,s,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,n.$ethers.Wallet.createRandom();case 3:return o=a.sent,a.next=6,o.encrypt(e);case 6:return s=a.sent,p=s,a.next=10,i["b"].add({email:t,uid:r,wallet:p});case 10:a.next=15;break;case 12:throw a.prev=12,a.t0=a["catch"](0),a.t0;case 15:case"end":return a.stop()}}),a,null,[[0,12]])})))()},firebaseCreateUser:function(t,e){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,o,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,a=r,n.next=4,i["a"].createUserWithEmailAndPassword(t,e);case 4:return o=n.sent,s=o.user,n.next=8,a.storeUserOnfireStore(t,e,s.uid);case 8:n.next=13;break;case 10:throw n.prev=10,n.t0=n["catch"](0),n.t0;case 13:case"end":return n.stop()}}),n,null,[[0,10]])})))()},checkAccount:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i["b"].where("email","==",t.otpData.email).get();case 3:return r=e.sent,e.abrupt("return",r.empty);case 7:throw e.prev=7,e.t0=e["catch"](0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},confirmPin:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.showConfirmPin=!1,e.app_loading(!0),t!=e.Pin){r.next=23;break}return r.prev=3,n=t,a=e.otpData.email,r.next=8,e.firebaseCreateUser(a,n);case 8:return r.next=10,i["a"].signInWithEmailAndPassword(a,n);case 10:return o=r.sent,localStorage.setItem("email_account_mpv",e.otpData.email),r.next=14,e.$store.dispatch("getUser",{uid:o.user.uid,password:n});case 14:return r.next=16,e.$store.dispatch("getBalance");case 16:e.$router.push("/"),r.next=23;break;case 19:r.prev=19,r.t0=r["catch"](3),e.app_loading(!1),e.alert_show({header:"ล้มเหลว",type:"error",title:r.t0.message});case 23:e.app_loading(!1);case 24:case"end":return r.stop()}}),r,null,[[3,19]])})))()},goSetAgain:function(){var t=this;this.showConfirmPin=!1,setTimeout((function(){t.showSetPin=!0}),1e3)},reqX:function(t){var e=/[0-9]/g,r=t.match(e);return r},isNumber:function(t){t=t||window.event;var e=t.which?t.which:t.keyCode;if(43==e);else{if(!(e>31&&(e<48||e>57)&&46!==e))return!0;t.preventDefault()}},keyup:function(t){var e,r,n,a=parseInt(t.target.id)-1,o=document.getElementsByTagName("input");if(o.forEach((function(t,o){o==a?e=t:o==a+1?r=t:o==a-1&&(n=t)})),"Backspace"==t.code){if(a>0){n.removeAttribute("readonly"),e.setAttribute("readonly","readonly"),n.focus();var s=parseInt(n.id)-1,i=Object.keys(this.otp)[s];this.otp[i]=null}}else if(this.reqX(t.key))if(a<5)e.setAttribute("readonly","readonly"),r.removeAttribute("readonly"),r.focus();else if(5==a){var p="";for(var u in this.otp)p+="".concat(this.otp[u]),this.otp[u]=null;e.setAttribute("readonly","readonly"),e.blur(),this.$refs.input1.removeAttribute("readonly"),this.next(p)}},next:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.app_loading(!0),r.prev=1,r.next=4,e.verifyOTP(t);case 4:if(n=r.sent,!n){r.next=12;break}return r.next=8,e.checkAccount();case 8:a=r.sent,a?e.showSetPin=!0:a||(localStorage.setItem("email_account_mpv",e.otpData.email),e.$router.push("/login")),r.next=13;break;case 12:throw"error";case 13:r.next=21;break;case 15:r.prev=15,r.t0=r["catch"](1),e.app_loading(!1),e.errorEntry+=1,e.$refs.input1.focus(),3==e.errorEntry&&setTimeout((function(){e.alert_show({header:"ล้มเหลว",type:"error",title:"OTP ไม่สำเร็จ <br> กรอก E-mail ใหม่อีกครั้ง"}).then((function(t){e.$router.push("/OTP/emailVerify")}))}),300);case 21:e.app_loading(!1);case 22:case"end":return r.stop()}}),r,null,[[1,15]])})))()},verifyOTP:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,n={headers:{"content-type":"application/json"}},a={email:e.otpData.email,otp_ref:e.otpData.ref,otp:t.replace(/[^0-9\.]+/g,"")},r.next=5,e.$axios.post("https://api.mepoint.one/verify_otp",a,n);case 5:return o=r.sent,r.abrupt("return",o.data.success);case 9:throw r.prev=9,r.t0=r["catch"](0),r.t0;case 12:case"end":return r.stop()}}),r,null,[[0,9]])})))()}},mounted:function(){var t=this;this.$nextTick((function(){t.$refs.input1.focus()}))}},u=p,c=(r("7441"),r("2877")),l=r("6544"),m=r.n(l),d=r("8336"),f=r("62ad"),v=r("132d"),h=r("0fd9"),g=Object(c["a"])(u,n,a,!1,null,null,null);e["default"]=g.exports;m()(g,{VBtn:d["a"],VCol:f["a"],VIcon:v["a"],VRow:h["a"]})},"701a":function(t,e,r){},7441:function(t,e,r){"use strict";r("701a")}}]);
//# sourceMappingURL=chunk-a890d2a6.c66f7217.js.map