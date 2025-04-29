const multer = require("multer");
const config = require("@/config");

exports.one = (fieldName) => {
  const storage = multer.memoryStorage();
  return multer({
    storage: storage,
    limits: { fileSize: config.imgUploads.maxSize, files: 1 },
  }).single(fieldName);
};
