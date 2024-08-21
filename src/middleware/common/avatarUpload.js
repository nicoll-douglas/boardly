const multer = require("multer");
const { MAX_FILE_SIZE } = require("@/config/imgUploads");

const storage = multer.memoryStorage();
const processAvatar = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE, files: 1, fields: 3 },
}).single("avatar");

module.exports = processAvatar;
