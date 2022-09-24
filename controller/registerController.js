const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  registPage: (req, res) => {
    res.render("register");
  },
  registData: async (req, res) => {
    const { username, password, role } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
      await User.create({ username, password: passwordHash, role });
      res.status(200);
      res.redirect("/login");
    } catch (error) {
      res.json({ message: error });
    }
  },
};
