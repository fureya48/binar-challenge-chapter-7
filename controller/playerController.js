module.exports = {
    homePage: (req, res) => {
    res.render("home",req.user.dataValues);
  },
}