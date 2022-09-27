require("dotenv").config()
const { User } = require("../models");
const passport = require("../lib/passport");
const jwt = require("jsonwebtoken")

let name

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
  loginAuthPlayer: async(req, res) => {
    await User.authenticatePlayer(req.body);
    res.redirect("/home")
  },
  homePage: async (req, res) => {
    const cek = req.isUser
    console.log(cek)
    const user = name
    if(!user) return res.redirect("/login")
    res.render("player/home", {user});
  },
  loginPageAdmin: (req, res) => res.render("admin/login-admin"),
  loginAuthAdmin: passport.authenticate("admin-local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login/admin",
  }),
  logOut: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/login");
  },
};
