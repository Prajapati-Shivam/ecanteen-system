const multer = require("multer");

const memory = multer.memoryStorage();
const upload = multer({
  storage: memory,
}).single("image");

module.exports = upload;
