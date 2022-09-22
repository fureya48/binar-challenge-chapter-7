module.exports = {
  homePage: (req, res) => {
    const user = req.session.user

    if(!user) return res.send('<h1>404 Not Found</h1>')
    else return res.render("home", { user });
  },
};
