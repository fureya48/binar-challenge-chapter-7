const router = require("express").Router();
const login = require("./login");
const home = require("./home");
const register = require("./register");

router.use("/", login);
router.use("/home", home);
router.use("/register", register);

module.exports = router;
