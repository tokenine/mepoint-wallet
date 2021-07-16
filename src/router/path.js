import guest from "../middleware/guest";
import isSplash from "../middleware/splash";

const routes = [
  {
    path: "*",
    component: () => import(`@/views/notfound.vue`),
  },
  {
    path: "/splashScreen",
    name: "SplashScreen",
    component: () => import("../views/splashScreen.vue"),
  },
  {
    path: "/OTP/termService",
    name: "TermService",
    component: () => import("../views/OTP/termService.vue"),
    meta: {
      middleware: [isSplash, guest],
    },
  },
  {
    path: "/OTP/emailVerify",
    name: "EmailVerify",
    component: () => import("../views/OTP/emailVerify.vue"),
    meta: {
      middleware: [isSplash, guest],
    },
  },
  {
    path: "/OTP/otpVerify",
    name: "OtpVerify",
    component: () => import("../views/OTP/otpVerify.vue"),
    meta: {
      middleware: [isSplash, guest],
    },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home"),
    meta: {
      middleware: [isSplash],
    },
  },
  {
    path: "/dapp",
    name: "Dapp",
    component: () => import("../views/dapp"),
    meta: {
      middleware: [isSplash],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
    meta: {
      middleware: [isSplash],
    },
  },
  {
    path: "/scan",
    name: "Scan",
    component: () => import("../views/scan.vue"),
    meta: {
      middleware: [isSplash],
    },
  },
  {
    path: "/receive",
    name: "Receive",
    component: () => import("../views/menu/receive"),
    meta: {
      middleware: [isSplash],
    },
  },
  {
    path: "/token/:token",
    name: "Token",
    component: () => import("../views/menu/transfer"),
    meta: {
      middleware: [isSplash],
    },
  },
  {
    path: "/history",
    name: "History",
    component: () => import("../views/menu/history"),
    meta: {
      middleware: [isSplash],
    },
  },
  {
    path: "/history/:id",
    name: "HistoryDetail",
    component: () => import("../views/menu/history/detail.vue"),
    meta: {
      middleware: [isSplash],
    },
  },
];

export default routes;
