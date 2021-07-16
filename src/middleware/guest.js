export default function guest({ next, router }) {
  if (localStorage.getItem("email_account_mpv") == null) {
    return next();
  }
  return router.push("/login");
}
