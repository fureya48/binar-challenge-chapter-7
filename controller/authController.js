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
  loginPage: (req, res) => res.render("login"),
  loginAuth: passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }),
  homePage: (req, res) => {
    res.render("home",req.user.dataValues);
  },
  logOut: (req, res, next) => {
    req.logout(function(err){
        if(err){return next(err)}
    })
    res.redirect("/login")
  }
};