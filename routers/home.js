const router = require("express").Router();
const { homePage } = require("../controller/authController");
const auth = require("../middleware/checkAuthorize")

router.get("/", homePage);
// router.get("/",  (req,res)=> res.json({user: req.headers}));

module.exports = router;
