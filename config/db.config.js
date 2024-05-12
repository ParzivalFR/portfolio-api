const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() =>
      console.log("✅ Connexion à la base de données MongoDB réussie !")
    )
    .catch((err) =>
      console.log(
        "✖️ Connexion à la base de données MongoDB échouée !",
        err.message
      )
    );
};

module.exports = connectDB;
