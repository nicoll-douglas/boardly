const {
  issueAccessToken,
  issueRefreshToken,
} = require("@/middleware/auth/issueTokens");
const verifyJWT = require("@/middleware/auth/verifyJWT");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const user = await verifyJWT(token);
    if (!user) {
      req.log("token, 401, sent");
      return res.status(401).end();
    }

    if (user.verified) return res.status(200)._end();

    const newRefreshTokenVersion = user.refreshTokenVersion + 1;

    const accessToken = issueAccessToken(user._id);
    const refreshToken = issueRefreshToken(user._id, newRefreshTokenVersion);
    user.refreshToken = refreshToken;
    user.refreshTokenVersion = newRefreshTokenVersion;
    user.verified = true;
    await user.save();

    req.log("user updated, 200");
    return res
      .status(200)
      ._accessToken(accessToken)
      ._refreshToken(refreshToken)
      ._end();
  } catch (err) {
    return next(err);
  }
};
