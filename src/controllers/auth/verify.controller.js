const {
  issueAccessToken,
  issueRefreshToken,
} = require("@/middleware/auth/issueTokens");
const verifyJWT = require("@/middleware/auth/verifyJWT");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const { user } = await verifyJWT(token);
    if (!user) {
      req.log("token, 401, sent");
      return res.sendStatus(401);
    }

    const accessToken = issueAccessToken(user._id);
    const refreshToken = issueRefreshToken(user._id);
    user.refreshToken = refreshToken;
    user.verified = true;
    await user.save();

    req.log("user updated, 200");
    res
      .status(200)
      ._accessToken(accessToken)
      ._refreshToken(refreshToken)
      ._end();
  } catch (err) {
    next(err);
  }
};
