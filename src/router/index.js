import Vue from "vue";
import Router from "vue-router";
import path from "./path";
import store from "../store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: path,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({
      ...context,
      next: nextMiddleware,
    });
  }

  return next();
});

router.afterEach(async (to, from) => {
  const login = store.state.app.loggedIn;
  if (login) {
    await store.dispatch("getBalance");
  }
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({
      ...context,
      next: nextMiddleware,
    });
  };
}

export default router;
