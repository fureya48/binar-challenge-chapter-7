const router = require("express").Router();
const login = require("./login");
const home = require("./home");
const dashboard = require("./dashboard")
const register = require("./register");

router.use("/", login);
router.use("/home", home);
router.use("/dashboard", dashboard);
router.use("/register", register);

module.exports = router;
