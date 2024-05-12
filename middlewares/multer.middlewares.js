// const multer = require("multer");
// const sharp = require("sharp");
// const fs = require("fs");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
//   "image/gif": "gif",
//   "image/webp": "webp",
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.join("images"));
//   },
//   filename: (req, file, callback) => {
//     const nom = file.originalname.slice(0, 3).split(" ").join("_");
//     const extension = MIME_TYPES[file.mimetype];
//     if (!extension) {
//       return callback(new Error("Format de fichier non pris en charge"), false);
//     }
//     callback(null, `${nom}_${uuidv4().slice(0, 12)}.${extension}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, callback) => {
//     if (!MIME_TYPES[file.mimetype]) {
//       return callback(new Error("Format de fichier non pris en charge"), false);
//     }
//     callback(null, true);
//   },
// }).fields([
//   { name: "cover", maxCount: 1 },
//   { name: "images", maxCount: 10 }, // Remplacez 10 par le nombre maximum d'images que vous voulez autoriser
// ]);

// module.exports = {
//   uploadImages: upload,
//   optimizeImages: async (req, res, next) => {
//     try {
//       if (!req.files) {
//         throw new Error("Aucun fichier image trouvé dans la requête");
//       }

//       const optimizeFile = async (file) => {
//         const cheminImageOptimisee = path.join(
//           "images",
//           `opti_${file.filename}`
//         );
//         sharp.cache(false);
//         await sharp(file.path).resize(800).toFile(cheminImageOptimisee);
//         fs.unlink(file.path, (err) => {
//           if (err) {
//             console.error(
//               "Erreur lors de la suppression du fichier original :",
//               err
//             );
//             return res.status(500).json({
//               error:
//                 "Une erreur est survenue lors de la suppression du fichier original",
//             });
//           }
//         });
//         file.path = cheminImageOptimisee;
//       };

//       if (req.files["cover"]) {
//         await Promise.all(req.files["cover"].map((file) => optimizeFile(file)));
//       }
//       if (req.files["images"]) {
//         await Promise.all(
//           req.files["images"].map((file) => optimizeFile(file))
//         );
//       }

//       next();
//     } catch (error) {
//       console.error(
//         "Erreur lors de l'optimisation des images :",
//         error.message
//       );
//       res.status(500).json({
//         error: "Une erreur est survenue lors de l'optimisation des images",
//       });
//     }
//   },
// };

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure multer
const upload = multer({ dest: "uploads/" });

exports.uploadImages = async (req, res, next) => {
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 10 }, // Remplacez 10 par le nombre maximum d'images que vous voulez autoriser
  ])(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ error: err.message });
    }

    // Everything went fine and files are available at `req.files`.
    // You can now upload these files to Cloudinary.

    const uploadFile = async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        transformation: [{ width: 800, crop: "scale" }, { format: "webp" }],
      });
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(
            "Erreur lors de la suppression du fichier original :",
            err
          );
          return res.status(500).json({
            error:
              "Une erreur est survenue lors de la suppression du fichier original",
          });
        }
      });
      return result.secure_url;
    };

    if (req.files["cover"]) {
      req.body.cover = await uploadFile(req.files["cover"][0]);
    }
    if (req.files["images"]) {
      req.body.images = await Promise.all(
        req.files["images"].map((file) => uploadFile(file))
      );
    }

    next();
  });
};
