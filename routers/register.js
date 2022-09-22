const router = require("express").Router();
const { registPage, registData } = require("../controller/registerController");

router.get("/", registPage);
router.post("/", registData);

module.exports = router;
