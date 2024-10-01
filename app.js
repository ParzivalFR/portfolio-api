// Dépendances :
const cloudinary = require("cloudinary").v2;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");

const connectDB = require("./config/db.config");

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "*" }));

app.use("/api/auth", require("./routes/users.routes"));
app.use("/api/projects", require("./routes/projects.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/likes", require("./routes/likes.routes"));
app.use("/api/contact", require("./routes/contact.routes"));

module.exports = app; // Nous exportons bien l'app ici
