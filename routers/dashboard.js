const router = require("express").Router();
const { dashboardPage } = require("../controller/adminController");
const { checkAuthenticateAdmin } = require("../middleware/checkAuthenticate");

router.get("/", checkAuthenticateAdmin, dashboardPage);

module.exports = router;
