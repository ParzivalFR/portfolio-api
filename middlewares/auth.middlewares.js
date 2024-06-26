const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error(
        "👀 Hop Hop Hop ! Il manque le token d'authentification, jeune Padawan..."
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error(
        "👀 Hop Hop Hop ! Le token d'authentification semble être vide, jeune Padawan..."
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      throw new Error(
        "👀 Hop Hop Hop ! Le token d'authentification est invalide, jeune Padawan..."
      );
    }

    req.auth = {
      userId: decodedToken.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
