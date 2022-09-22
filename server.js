require("dotenv").config()
const express = require("express");
// const models = require("./models");
const session = require("express-session");
const router = require("./routers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.set("view engine", "ejs");

app.use(router);

// app.get("/dashboard", async (req, res) => {
//   const users = await models.UserGame.findAll({ include: models.UserBiodata });

//   res.status(200)
//   res.render("dashboard", {
//     users,
//   });
// });

// app.get("/add-user", async (req, res) => {

//   res.status(200)
//   res.render("add-user", { message });
// });

// app.post("/add-user", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     await models.UserGame.create({
//       username: username,
//       password: password,
//     });

//     res.status(300)
//     res.redirect("/dashboard");
//   } catch (error) {
//     const message = "username has been create";
//     res.status(500)
//     res.render("add-user", { message });
//   }
// });

// app.get("/add-biodata/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await models.UserGame.findOne({ where: { id: id } });

//   res.status(200)
//   res.render("add-user-biodata", { user });
// });

// app.post("/add-biodata/:id", async (req, res) => {
//   const { UserGameId, dob, pob, city, gender } = req.body;
//   try {
//     await models.UserBiodata.create({
//       UserGameId: UserGameId,
//       dob: dob,
//       pob: pob,
//       city: city,
//       gender: gender,
//     });

//     res.status(200)
//     res.redirect("/dashboard");
//   } catch (error) {
//     res.status(500)
//     res.send(error);
//   }
// });

// app.get("/edit-user/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await models.UserGame.findOne({
//     where: { id: id },
//     include: models.UserBiodata,
//   });

//   res.status(200)
//   res.render("edit-user", { user });
// });

// app.post("/edit-user/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await models.UserGame.findOne({ where: { id: id } });
//   const biodata = await models.UserBiodata.findOne({ where: { UserGameId: id } });

//   await user.update(req.body);
//   await biodata.update(req.body);

//   res.status(300)
//   res.redirect("/dashboard");
// });

// app.get("/delete/:id", async (req, res) => {
//   const { id } = req.params;

//   await models.UserGame.destroy({
//     where: { id: id },
//   });
//   await models.UserBiodata.destroy({
//     where: { UserGameId: id },
//   });

//   res.redirect("/dashboard");
// });

// app.get("/detail-user/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await models.UserGame.findOne({
//       where: { id: id },
//       include: [models.UserBiodata, models.UserHistory],
//     });
//     const histories = user.UserHistories;

//     res.render("detail-user", { user, histories });
//   } catch (error) {}
// });

// app.get("/game/:username", (req, res) => {
//   res.status(200);
//   res.render("game", {
//     findUser,
//   });
// });

app.get("/logout", (req, res) => {
  res.status(300);
  req.session.destroy();
  res.redirect("/login");
});

// app.use("/", (req, res) => {
//   res.status(404).send("<h1>404 Not Found</h1>");
// });

app.listen(PORT, () => {
  console.log("Server connected at http://localhost:3000");
});
