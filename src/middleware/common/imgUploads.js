const multer = require("multer");
const { MAX_FILE_SIZE } = require("@/config/imgUploads");

function processImg(fieldName, limits = {}) {
  const storage = multer.memoryStorage();
  return multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE, files: 1, ...limits },
  }).single(fieldName);
}

module.exports = processImg;
