const router = require("express").Router();
const { dashboardPage } = require("../controller/adminController");
const { checkAuthenticateAdmin } = require("../controller/checkAuthenticate");

router.get("/", checkAuthenticateAdmin, dashboardPage);

module.exports = router;
