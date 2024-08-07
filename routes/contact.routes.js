const express = require("express");
const router = express.Router();

const contactCtrl = require("../controllers/contact.controllers");

router.post("/", contactCtrl.sendMail);

module.exports = router;
