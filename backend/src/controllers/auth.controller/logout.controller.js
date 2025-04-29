const verifyJWT = require("@/middleware/auth/verifyJWT");

module.exports = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  try {
    const user = await verifyJWT(refreshToken, { refreshToken: true });
    if (!user) return res.status(200)._accessToken("")._end();

    user.refreshToken = "";
    await user.save();

    return res.status(200)._accessToken("")._refreshToken("")._end();
  } catch (err) {
    return next(err);
  }
};
