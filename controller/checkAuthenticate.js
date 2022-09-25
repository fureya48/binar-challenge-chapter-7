function checkAuthenticatePlayer(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else return res.redirect("/login");
}
function checkNotAuthenticatePlayer(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  } else return next();
}
function checkAuthenticateAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else return res.redirect("/login");
}
function checkNotAuthenticateAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  } else return next();
}

module.exports = {checkAuthenticatePlayer, checkNotAuthenticatePlayer, checkAuthenticateAdmin, checkNotAuthenticateAdmin}
