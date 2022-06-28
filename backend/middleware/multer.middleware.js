// MIDDLEWARE MULTER
const multer = require("multer");

// CONTROLE FORMAT ET SIZE /!\

// Format des images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (req.url == "/user") {
      return callback(null, "images/avatar");
    }
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // Suppression des espaces
    const index = name.lastIndexOf(".");
    const newName = name.slice(0, index); // Suppression de l'extension
    const extension = MIME_TYPES[file.mimetype]; // Récuperation de l'extension
    callback(null, `${newName}_${Date.now()}.${extension}`); // Renommage du fichier avec le nouveau nom et la date
  },
});

module.exports = multer({ storage }).single("picture");
