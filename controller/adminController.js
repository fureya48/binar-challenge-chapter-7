module.exports = {
    dashboardPage: (req, res) => {
        res.render("dashboard",req.user.dataValues);
      },
}