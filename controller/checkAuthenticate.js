function checkAuthenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else return res.redirect("/login");
}
function checkNotAuthenticate(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  } else return next();
}

module.exports = {checkAuthenticate, checkNotAuthenticate}
