const jwt = require("jsonwebtoken");
const User = require("@/models/User");

async function verifyToken(token, options) {
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (options?.refreshToken) {
      return User.findOne({ _id: id, refreshToken: token });
    } else {
      return User.findById(id);
    }
  } catch {
    return null;
  }
}

module.exports = verifyToken;
