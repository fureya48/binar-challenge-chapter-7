const { User } = require("../models");

module.exports = {
  dashboardPage: async(req, res) => {
    const users = await User.findAll()
    res.render("admin/dashboard", {users});
  },
};
