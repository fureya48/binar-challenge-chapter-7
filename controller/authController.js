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

  loginPagePlayer: (req, res) => res.render("login"),

  loginPageAdmin: (req, res) => res.render("login-admin"),

  loginAuthPlayer: passport.authenticate("player", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }),

  homePage: (req, res) => {
    res.render("home", req.user.dataValues);
  },

  loginAuthAdmin: passport.authenticate("admin", {
    successRedirect: "/dashboard",
    failureRedirect: "/login/admin",
  }),

  dashboardPage: (req, res) => {
    res.render("dashboard", req.user.dataValues);
  },

  logOut: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/login");
  },
};
