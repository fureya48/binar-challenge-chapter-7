// const { Users } = require("../models/users.js");
const users = require("../data/users.json");
let message;

module.exports = {
  indexRedirect: (req,res) => res.redirect('/login'),
  loginPage: (req, res) => res.render("login", { message }),

  //Login from DB
  //   loginData: async (req, res) => {
  //     const { username, password } = req.body;
  //     const user = await Users.findOne({
  //       where: { username, password },
  //     });

  //     if (!user)
  //       return res.render("login", {
  //         message: "Username or password is wrong!",
  //       });

  //     res.redirect("/home");
  //   },

  //Login from Static
  loginAuth: async (req, res) => {
    const { username, password } = req.body;
    const findUser = users.find((user) => {
      return username == user.username && password == user.password;
    });

    if (findUser) {
        if (findUser.username == "admin") {
          res.status(302);
          res.redirect("/dashboard");
        } else {
          res.status(302);
          req.session.user = findUser
          res.redirect("/home");
        }
      } else {
        req.session.err = "wrong username/password"
        res.render("login", {
          message: "Username or password is wrong!",
        });
      }
  },
};
