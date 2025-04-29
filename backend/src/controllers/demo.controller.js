const { User } = require("@/models");
const { issueRefreshToken } = require("@/middleware/auth/issueTokens");

module.exports = async (req, res, next) => {
  try {
    const demoUser = await User.findOne({ username: "DEMO_USER" });
    const refreshToken = issueRefreshToken(demoUser._id);

    demoUser.refreshToken = refreshToken;
    await demoUser.save();

    return res.status(200)._refreshToken(refreshToken)._end();
  } catch (err) {
    return next(err);
  }
};
