const router = require("express").Router();
const { homePage } = require("../controller/authController");
const {checkAuthenticatePlayer} = require("../controller/checkAuthenticate")

router.get("/", checkAuthenticatePlayer,homePage);

module.exports = router;
