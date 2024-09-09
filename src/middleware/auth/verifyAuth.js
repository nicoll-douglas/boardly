const verifyJWT = require("@/middleware/auth/verifyJWT");
const handleRefresh = require("@/middleware/auth/handleRefresh");

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

    await handleRefresh();
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyAuth;
