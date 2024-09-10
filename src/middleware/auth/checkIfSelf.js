const USER_ROLES = require("@/config/userRoles");

function checkIfSelf(options) {
  return (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    if (user.username === username) {
      req.USER_ROLE = USER_ROLES.SELF;
      req.log("user is self");
      return next();
    }

    if (options?.reject) {
      req.log("user is basic");
      req.log("401, sent");
      return res.status(401).end();
    }

    req.log("user is basic");
    req.USER_ROLE = USER_ROLES.BASIC;
    return next();
  };
}

module.exports = checkIfSelf;
