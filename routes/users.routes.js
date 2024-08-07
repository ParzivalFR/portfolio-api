const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users.controllers");
const auth = require("../middlewares/auth.middlewares");

router.post("/signup", auth, usersCtrl.signup);
router.post("/login", usersCtrl.login);

module.exports = router;
