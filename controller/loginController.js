const bcrypt = require("bcrypt");
const {User} = require("../models")
// const users = require("../data/users.json");
let message;

module.exports = {
  indexRedirect: (req, res) => res.redirect("/login"),
  loginPage: (req, res) => res.render("login", { message }),

  //Login from DB
  loginAuth: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      where:{username}
    })
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!user) {
      return res.render("login", {
        message: "Username or password is wrong!",
      });
    } else if (user) {
      if (checkPassword) {
        req.session.user = user
        user.role === "admin" ? res.redirect("/dashboard") : res.redirect("/home");
      }
    }
  },

  //Login from Static
  // loginAuth: async (req, res) => {
  //   const { username, password } = req.body;
  //   const findUser = users.find((user) => {
  //     return username == user.username && password == user.password;
  //   });

  //   if (findUser) {
  //       if (findUser.username == "admin") {
  //         res.status(302);
  //         res.redirect("/dashboard");
  //       } else {
  //         res.status(302);
  //         req.session.user = findUser
  //         res.redirect("/home");
  //       }
  //     } else {
  //       req.session.err = "wrong username/password"
  //       res.render("login", {
  //         message: "Username or password is wrong!",
  //       });
  //     }
  // },
};
