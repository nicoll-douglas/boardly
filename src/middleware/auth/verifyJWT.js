const jwt = require("jsonwebtoken");
const User = require("@/models/User");

async function verifyJWT(token, options) {
  let id;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    id = decoded.id;
  } catch (err) {
    return {
      user: null,
      expired: err instanceof jwt.TokenExpiredError,
    };
  }

  if (options?.refreshToken) {
    const user = await User.findOne({ refreshToken: token });
    return {
      user,
      expired: false,
    };
  } else {
    const user = await User.findById(id);
    return {
      user,
      expired: false,
    };
  }
}

module.exports = verifyJWT;
