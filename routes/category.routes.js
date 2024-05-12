const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middlewares");
const categoryCtrl = require("../controllers/category.controllers");

router.post("/", auth, categoryCtrl.createCategory);
router.get("/", auth, categoryCtrl.getAllCategories);
router.delete("/:id", auth, categoryCtrl.deleteCategory);

module.exports = router;
