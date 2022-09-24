require("dotenv").config();
const express = require("express");
// const models = require("./models");
const passport = require("passport")
const session = require("express-session");
const flash = require("express-flash")
const router = require("./routers");

const db = require("./models");
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
    cookie: { maxAge: 3600000 },
  })
);

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs");

app.use(router);

app.get("/logout", (req, res) => {
  res.status(300);
  req.session.destroy();
  res.redirect("/login");
});

// app.use("/", (req, res) => {
//   res.status(404).send("<h1>404 Not Found</h1>");
// });
db.sequelize.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log("Server connected at http://localhost:3000");
    console.log("database connected")
  });
});
