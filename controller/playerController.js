module.exports = {
  homePage: (req, res) => {
    res.render("player/home", req.user.dataValues);
  },
};
