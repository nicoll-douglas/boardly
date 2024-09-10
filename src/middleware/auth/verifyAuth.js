const verifyJWT = require("@/middleware/auth/verifyJWT");
const handleRefresh = require("@/middleware/auth/handleRefresh");

async function verifyAuth(req, res, next) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];

  req.log("verifying auth");
  try {
    const user = await verifyJWT(accessToken);
    if (user) {
      req.user = user;
      req.log("auth valid");
      return next();
    }

    handleRefresh(req, res, next);
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyAuth;
