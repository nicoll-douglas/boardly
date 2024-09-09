const {
  issueAccessToken,
  issueRefreshToken,
} = require("@/middleware/auth/issueTokens");
const verifyToken = require("@/middleware/auth/verifyToken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const foundUser = await verifyToken(token);
    if (!foundUser) return res.sendStatus(401);

    const accessToken = issueAccessToken(foundUser._id);
    const refreshToken = issueRefreshToken(foundUser._id);
    foundUser.refreshToken = refreshToken;
    foundUser.verified = true;
    await foundUser.save();

    res
      .status(200)
      .refreshToken(refreshToken)
      .accessToken(accessToken)
      .sendData();
  } catch (err) {
    next(err);
  }
};
