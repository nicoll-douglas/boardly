const verifyJWT = require("@/middleware/auth/verifyJWT");
const { issueAccessToken } = require("@/middleware/auth/issueTokens");

async function handleRefresh(req, res, next) {
  const { refreshToken } = req.cookies;
  const { user, expired } = await verifyJWT(refreshToken, {
    refreshToken: true,
  });

  if (!user) {
    req.log("auth invalid, 401, sent");
    return res.status(401)._append("feedback", { expired })._end();
  }
  req.log("auth valid");

  req.user = user;
  const newAccessToken = issueAccessToken(user._id);

  res._accessToken(newAccessToken);
  return next();
}

module.exports = handleRefresh;
