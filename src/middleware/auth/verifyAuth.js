const { issueAccessToken } = require("./issueTokens");
const verifyToken = require("@/middleware/auth/verifyToken");
const logger = require("@/middleware/logging/winston");

async function verifyAuth(req, res, next) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];

  try {
    logger.info("Verifying access token...");
    const userWithAccess = await verifyToken(accessToken);
    if (userWithAccess) {
      logger.info("Access token is valid");
      req.user = userWithAccess;
      return next();
    }

    logger.info("Access token is invalid");
    logger.info("Verifying refresh token...");
    const { refreshToken } = req.cookies;
    const userWithRefresh = await verifyToken(refreshToken, {
      refreshToken: true,
    });

    if (!userWithRefresh) {
      logger.info("Refresh token is invalid");
      logger.info("Responded with 401");
      return res.sendStatus(401);
    }

    logger.info("Refresh token is valid");
    req.user = userWithRefresh;
    const newAccessToken = issueAccessToken(userWithRefresh._id);
    res.accessToken(newAccessToken);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyAuth;
