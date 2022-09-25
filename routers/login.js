const router = require("express").Router();
const {indexRedirect, logOut, loginAuthPlayer, loginAuthAdmin, loginPagePlayer, loginPageAdmin } = require("../controller/authController");
const { checkAuthenticatePlayer, checkNotAuthenticatePlayer, checkAuthenticateAdmin, checkNotAuthenticateAdmin } = require("../controller/checkAuthenticate");


router.get("/", indexRedirect);
router.get("/login", checkAuthenticatePlayer, loginPagePlayer);
router.get("/login/admin", checkAuthenticateAdmin, loginPageAdmin);
router.post("/login", checkNotAuthenticatePlayer, loginAuthPlayer);
router.post("/login/admin", checkNotAuthenticateAdmin, loginAuthAdmin);
router.get("/logout", logOut);

module.exports = router;
