const multer = require("multer");
const { MAX_FILE_SIZE } = require("@/config/imgUploads");

exports.one = (fieldName) => {
  const storage = multer.memoryStorage();
  return multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  }).single(fieldName);
};
