const router = require("express").Router();
const { homePage } = require("../controller/playerController");
const { checkAuthenticatePlayer } = require("../controller/checkAuthenticate");

router.get("/", checkAuthenticatePlayer, homePage);

module.exports = router;
