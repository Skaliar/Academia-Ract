// const multer = require("multer");
// const path = require("path");

// console.log("Estoy aqui...en mullter.");
// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, path.join(__dirname, "../public/imagens/courses"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const filename = file.originalname.split(".")[0];
//     cb(null, filename + "-" + uniqueSuffix + ".png");
//   },
// });

// exports.upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limitar el tamaño máximo de archivo a 10MB
// });

const multer = require("multer");
const path = require("path");

console.log("Estoy aquí... en multer.");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/imagens/courses"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Aceptar sólo archivos de imagen
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limitar el tamaño máximo de archivo a 10MB
  fileFilter: fileFilter,
});