const jwt = require("jsonwebtoken");
const User = require("@/models/User");

async function verifyJWT(token, options) {
  let id;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    id = decoded.id;
  } catch {
    return null;
  }

  if (options?.refreshToken) {
    return User.findOne({ _id: id, refreshToken: token });
  } else {
    return User.findById(id);
  }
}

module.exports = verifyJWT;
