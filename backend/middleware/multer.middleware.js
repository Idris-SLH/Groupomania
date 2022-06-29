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
    if (req.baseUrl == "/api/user") {
      return callback(null, "images/avatar");
    }
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname.split(" ").join("_"); // Suppression des espaces
    const index = originalName.lastIndexOf("."); // Récuperation de l'index de l'extension
    const newName = originalName.slice(0, index); // Suppression de l'extension dans le nom
    const maxLength = 20; // Caractère max des fichier
    const name = newName.slice(0, maxLength);
    const extension = MIME_TYPES[file.mimetype]; // Récuperation de l'extension
    callback(null, `${name}_${Date.now()}.${extension}`); // Renommage du fichier avec le nouveau nom et la date
  },
});

module.exports = multer({ storage }).single("picture");
