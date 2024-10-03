const jwt = require("jsonwebtoken");
const User = require("@/models/User");

async function verifyJWT(token, options) {
  let id;
  let refreshTokenVersion;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    id = decoded.id;
    if (options?.refreshToken) {
      refreshTokenVersion = decoded.refreshTokenVersion;
    }
  } catch {
    return null;
  }

  if (options?.refreshToken) {
    return User.findOne({ _id: id, refreshToken: token, refreshTokenVersion });
  } else {
    return User.findById(id);
  }
}

module.exports = verifyJWT;
