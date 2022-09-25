const { User } = require("../models");
const passport = require("../lib/passport");

module.exports = {
  registPage: (req, res) => {
    res.render("register");
  },
  registData: (req, res, next) => {
    User.register(req.body)
      .then(() => res.redirect("/login"))
      .catch((err) => next(err));
  },
  indexRedirect: (req, res) => res.redirect("/login"),
  loginPage: (req, res) => res.render("player/login"),
  loginAuth: passport.authenticate("player-local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }),
  loginPageAdmin: (req, res) => res.render("admin/login-admin"),
  loginAuthAdmin: passport.authenticate("admin-local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login/admin",
  }),
  logOut: (req, res, next) => {
    req.logout(function(err){
        if(err){return next(err)}
    })
    res.redirect("/login")
  }
};
