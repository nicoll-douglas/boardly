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
    if (!foundUser) {
      req.log("username, 404, sent");
      return res.status(404).end();
    }

    if (foundUser.deleted) return res.status(404).end();

    const passwordMatch = await bcrypt.compare(
      password,
      foundUser.hashedPassword
    );
    if (!passwordMatch) {
      req.log("password, 404, sent");
      return res.status(404).end();
    }

    if (!foundUser.verified) {
      req.log("unverified, 401, sent");
      return res.status(401).end();
    }

    const accessToken = issueAccessToken(foundUser._id);
    const refreshToken = issueRefreshToken(foundUser._id);
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    req.log("200");
    return res
      .status(200)
      ._accessToken(accessToken)
      ._refreshToken(refreshToken)
      ._end();
  } catch (err) {
    return next(err);
  }
};
