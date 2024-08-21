const { ALLOWED_TYPES, MAX_FILE_SIZE } = require("@/config/imgUploads");

function validateImg(options) {
  return (req, res, next) => {
    const optional = options?.optional;
    if (optional && !req.file) return next();
    if (!optional && !req.file) return res.status(400).sendData();
    if (!ALLOWED_TYPES.includes(req.file.mimetype))
      return res.status(400).sendData();
    if (req.file.size > MAX_FILE_SIZE) return res.status(400).sendData();
    return next();
  };
}

module.exports = validateImg;
