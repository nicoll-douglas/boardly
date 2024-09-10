const verifyJWT = require("@/middleware/auth/verifyJWT");
const { issueAccessToken } = require("@/middleware/auth/issueTokens");

async function handleRefresh(req, res, next) {
  const { refreshToken } = req.cookies;
  const user = await verifyJWT(refreshToken, {
    refreshToken: true,
  });

  if (!user) {
    req.log("auth invalid, 401, sent");
    return res.sendStatus(401);
  }
  req.log("auth valid");

  req.user = user;
  const newAccessToken = issueAccessToken(user._id);

  res._accessToken(newAccessToken);
  return next();
}

module.exports = handleRefresh;
