const { User } = require("../models");

module.exports = {
  registPage: (req, res) => {
    res.render("register");
  },
  registData: async (req, res) => {
    const { username, password, role } = req.body;
    try {
      await User.create({ username, password, role });
      res.status(200);
      res.redirect("/login");
    } catch (error) {
      res.json({ message: error });
    }
  },
};
