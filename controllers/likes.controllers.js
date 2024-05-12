const Like = require("../models/likes.models");

// Create a new like
exports.createLike = async (req, res) => {
  try {
    const userIp = req.ip; // Get user's IP address from request
    const existingLike = await Like.findOne({
      userIp: userIp,
      postId: req.body.postId,
    });

    if (existingLike) {
      return res.status(400).json({ message: "Like déjà existant." });
    }

    const like = new Like({
      userIp: userIp,
      postId: req.body.postId,
    });

    await like.save();

    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

// Get likes for a post
exports.getLikesForPost = async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId });

    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

// Delete a like
exports.deleteLike = async (req, res) => {
  try {
    const userIp = req.ip; // Get user's IP address from request
    const like = await Like.findOne({
      userIp: userIp,
      postId: req.body.postId,
    });

    if (!like) {
      return res.status(404).json({ message: "Like non trouvé." });
    }

    await like.deleteOne();

    res.status(200).json({ message: "Like supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};
