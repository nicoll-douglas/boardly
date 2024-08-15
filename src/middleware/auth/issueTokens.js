const jwt = require("jsonwebtoken");
const { ACCESS_DURATION, REFRESH_DURATION } = require("@/config/JWT");

function issueAccessToken(id) {
  const accessToken = jwt.sign(
    {
      id,
      exp: Math.floor((Date.now() + ACCESS_DURATION) / 1000),
    },
    process.env.JWT_SECRET
  );
  return accessToken;
}

function issueRefreshToken(id) {
  const refreshToken = jwt.sign(
    {
      id,
      exp: Math.floor((Date.now() + REFRESH_DURATION) / 1000),
    },
    process.env.JWT_SECRET
  );
  return refreshToken;
}

module.exports = {
  issueAccessToken,
  issueRefreshToken,
};
