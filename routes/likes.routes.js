const express = require("express");
const router = express.Router();

const LikeCtrl = require("../controllers/likes.controllers");

router.post("/:postId", LikeCtrl.createLike);
router.get("/:postId", LikeCtrl.getLikesForPost);
router.delete("/:postId", LikeCtrl.deleteLike);

module.exports = router;
