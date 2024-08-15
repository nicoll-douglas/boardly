const User = require("@/models/User");
const bcrypt = require("bcrypt");
const {
  issueAccessToken,
  issueRefreshToken,
} = require("@/middleware/auth/issueTokens");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.sendStatus(404);

    const passwordMatch = await bcrypt.compare(
      password,
      foundUser.hashedPassword
    );
    if (!passwordMatch) return res.sendStatus(404);
    if (!foundUser.verified) return res.sendStatus(401);

    const accessToken = issueAccessToken(foundUser._id);
    const refreshToken = issueRefreshToken(foundUser._id);
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    return res
      .status(200)
      .refreshToken(refreshToken)
      .accessToken(accessToken)
      .sendData();
  } catch (err) {
    next(err);
  }
};
