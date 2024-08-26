const { issueAccessToken } = require("./issueTokens");
const verifyToken = require("@/middleware/auth/verifyToken");
const logger = require("@/middleware/logging/winston");

async function verifyAuth(req, res, next) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];

  logger.info("Verifying auth...");
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

    if (!userWithRefresh) {
      logger.info("Auth invalid, responded with 401");
      return res.sendStatus(401);
    }
    logger.info("Auth valid");

    req.user = userWithRefresh;
    const newAccessToken = issueAccessToken(userWithRefresh._id);
    res.accessToken(newAccessToken);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyAuth;
