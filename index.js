const express = require("express");
const hash = require("object-hash");
const users = require("./data/users.json");
const models = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let findUser;
let message;

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.status(200);
  res.render("login", {
    message,
  });
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  findUser = users.find((user) => {
    return username == user.username && password == user.password;
  });
  if (findUser) {
    if (findUser.username == "admin") {
      res.status(302);
      res.redirect("/dashboard");
    } else {
      res.status(302);
      res.redirect("/home");
    }
  } else {
    res.render("login", {
      message: "Username or password is wrong!",
    });
  }
  return findUser;
});

app.use((req, res, next) => {
  try {
    findUser.username;
    findUser.password;
    next();
  } catch {
    res.status(400)
    res.send("<h1>404 Not Found</h1>");
  }
});

app.get("/dashboard", async (req, res) => {
  const users = await models.UserGame.findAll({ include: models.UserBiodata });

  res.status(200)
  res.render("dashboard", {
    users,
  });
});

app.get("/add-user", async (req, res) => {

  res.status(200)
  res.render("add-user", { message });
});

app.post("/add-user", async (req, res) => {
  const { username, password } = req.body;
  try {
    await models.UserGame.create({
      username: username,
      password: password,
    });

    res.status(300)
    res.redirect("/dashboard");
  } catch (error) {
    const message = "username has been create";
    res.status(500)
    res.render("add-user", { message });
  }
});

app.get("/add-biodata/:id", async (req, res) => {
  const { id } = req.params;
  const user = await models.UserGame.findOne({ where: { id: id } });
  
  res.status(200)
  res.render("add-user-biodata", { user });
});

app.post("/add-biodata/:id", async (req, res) => {
  const { UserGameId, dob, pob, city, gender } = req.body;
  try {
    await models.UserBiodata.create({
      UserGameId: UserGameId,
      dob: dob,
      pob: pob,
      city: city,
      gender: gender,
    });

    res.status(200)
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500)
    res.send(error);
  }
});

app.get("/edit-user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await models.UserGame.findOne({
    where: { id: id },
    include: models.UserBiodata,
  });

  res.status(200)
  res.render("edit-user", { user });
});

app.post("/edit-user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await models.UserGame.findOne({ where: { id: id } });
  const biodata = await models.UserBiodata.findOne({ where: { UserGameId: id } });

  await user.update(req.body);
  await biodata.update(req.body);

  res.status(300)
  res.redirect("/dashboard");
});

app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await models.UserGame.destroy({
    where: { id: id },
  });
  await models.UserBiodata.destroy({
    where: { UserGameId: id },
  });

  res.redirect("/dashboard");
});

app.get("/detail-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.UserGame.findOne({
      where: { id: id },
      include: [models.UserBiodata, models.UserHistory],
    });
    const histories = user.UserHistories;

    res.render("detail-user", { user, histories });
  } catch (error) {}
});

app.get("/home", (req, res) => {
  res.status(200);
  res.render("home", {
    findUser,
  });
});

app.get("/home/api", (req, res) => {
  res.status(200);
  res.json({
    username: findUser.username,
    password: hash(findUser.password),
  });
});

app.get("/game/:username", (req, res) => {
  res.status(200);
  res.render("game", {
    findUser,
  });
});

app.get("/logout", (req, res) => {
  findUser = null;
  res.status(300);
  res.redirect("/login");
});

app.use("/", (req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

models.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server connected at http://localhost:3000");
      console.log("Database connected!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
