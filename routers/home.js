const router = require("express").Router();
const { homePage } = require("../controller/homeController");

router.get("/", homePage);

module.exports = router;
