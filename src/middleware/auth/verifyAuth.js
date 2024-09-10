const verifyJWT = require("@/middleware/auth/verifyJWT");
const { issueAccessToken } = require("@/middleware/auth/issueTokens");

async function verifyAuth(req, res, next) {
  req.log("verifying auth");

  try {
    const { accessToken } = req.cookies;
    let user = await verifyJWT(accessToken);

    if (user) {
      req.user = user;
      req.log("auth valid");
      res._append("username", user.username);
      return next();
    }

    const { refreshToken } = req.cookies;
    user = await verifyJWT(refreshToken, {
      refreshToken: true,
    });

    if (!user) {
      req.log("auth invalid, 401, sent");
      return res.status(401).end();
    }

    req.log("auth valid");
    req.user = user;
    const newAccessToken = issueAccessToken(user._id);
    res._accessToken(newAccessToken)._append("username", user.username);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyAuth;
