const { ALLOWED_TYPES } = require("@/config/imgUploads");

function validateImg(options = {}) {
  const { optional = true } = options;

  return (req, res, next) => {
    if (!req.file) {
      return optional ? next() : res.status(400).sendData();
    } else {
      const allowedType = ALLOWED_TYPES.includes(req.file.mimetype);
      return allowedType ? next() : res.status(400).sendData();
    }
  };
}

module.exports = validateImg;
