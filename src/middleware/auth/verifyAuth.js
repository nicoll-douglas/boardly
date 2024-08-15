const { issueAccessToken } = require("./issueTokens");
const verifyToken = require("@/middleware/auth/verifyToken");

async function verifyAuth(req, res, next) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];

  try {
    const userWithAccess = await verifyToken(accessToken);
    if (userWithAccess) {
      req.user = userWithAccess;
      return next();
    }

    const { refreshToken } = req.cookies;
    const userWithRefresh = await verifyToken(refreshToken, {
      refreshToken: true,
    });
    if (!userWithRefresh) return res.sendStatus(401);

    req.user = userWithRefresh;
    const newAccessToken = issueAccessToken(userWithRefresh._id);
    res.accessToken(newAccessToken);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyAuth;
