const router = require("express").Router();
const { registPage, registData } = require("../controller/authController");

router.get("/", registPage);
router.post("/", registData);

module.exports = router;
