const express = require("express");
const router = express.Router();
const User = require("../controllers/UserController");

router.post("/user/register", User.register); // to create a new user
router.post("/user/login", User.login); // for user login

// export router
module.exports = router;
