const config = require("@/config");

function checkIfSelf(options) {
  return (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    if (user.username === username) {
      req.userRole = config.userRoles.self;
      req.log("user is self");
      return next();
    }

    if (options?.reject) {
      req.log("user is basic");
      req.log("401, sent");
      return res.status(401).end();
    }

    req.log("user is basic");
    req.userRole = config.userRoles.basic;
    return next();
  };
}

module.exports = checkIfSelf;
