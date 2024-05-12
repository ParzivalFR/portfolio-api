const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  userIp: { type: String, required: true },
  postId: { type: String, required: true },
});

module.exports = mongoose.model("Like", likeSchema);
