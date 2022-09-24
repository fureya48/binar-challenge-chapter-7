const router = require("express").Router();
const { homePage } = require("../controller/authController");
const {checkAuthenticate} = require("../controller/checkAuthenticate")

router.get("/", checkAuthenticate,homePage);

module.exports = router;
