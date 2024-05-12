// Dépendances :
const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
// const limite = require("express-rate-limit");

// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

const connectDB = require("./config/db.config");

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: "dbmjyltpp",
  api_key: "312544571817957",
  api_secret: "ocObLlYCm5pjl84zTCMW2btXKBw",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
// app.use(
//   limite({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   })
// );

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", require("./routes/users.routes"));
app.use("/api/projects", require("./routes/projects.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/likes", require("./routes/likes.routes"));

module.exports = app;
