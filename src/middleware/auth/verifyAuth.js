const { issueAccessToken } = require("./issueTokens");
const verifyJWT = require("@/middleware/auth/verifyJWT");

async function verifyAuth(req, res, next) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];

  req.log("verifying auth");
  try {
    const userWithAccess = await verifyJWT(accessToken);
    if (userWithAccess) {
      req.user = userWithAccess;
      req.log("auth valid");
      return next();
    }

    const { refreshToken } = req.cookies;
    const userWithRefresh = await verifyJWT(refreshToken, {
      refreshToken: true,
    });

    if (!userWithRefresh) {
      req.log("auth invalid, 401, sent");
      return res.sendStatus(401);
    }
    req.log("auth valid");

    req.user = userWithRefresh;
    const newAccessToken = issueAccessToken(userWithRefresh._id);

    res._accessToken(newAccessToken);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyAuth;
