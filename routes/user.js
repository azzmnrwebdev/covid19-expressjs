const express = require("express");
const router = express.Router();
const User = require("../controllers/UserController");

router.post("/user/register", User.register); // untuk membuat user baru
router.post("/user/login", User.login); // untuk user login

// export router
module.exports = router;
