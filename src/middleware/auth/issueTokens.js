const jwt = require("jsonwebtoken");
const config = require("@/config");

function issueAccessToken(id) {
  const accessToken = jwt.sign(
    {
      id,
      exp: Math.floor((Date.now() + config.jwt.accessDuration) / 1000),
    },
    process.env.JWT_SECRET
  );
  return accessToken;
}

function issueRefreshToken(id, refreshTokenVersion) {
  const refreshToken = jwt.sign(
    {
      id,
      refreshTokenVersion,
      exp: Math.floor((Date.now() + config.jwt.refreshDuration) / 1000),
    },
    process.env.JWT_SECRET
  );
  return refreshToken;
}

module.exports = {
  issueAccessToken,
  issueRefreshToken,
};
