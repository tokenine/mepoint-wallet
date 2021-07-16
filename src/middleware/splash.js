import store from "../store";

export default function isSplash({ next, router }) {
  const isSplash = store.state.app.isSplash;
  if (!isSplash) {
    return next();
  } 
  return next({name:'SplashScreen'});
}