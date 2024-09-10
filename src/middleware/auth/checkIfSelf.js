const USER_ROLES = require("@/config/userRoles");

function checkIfSelf(options) {
  return (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    if (user.username === username) {
      req.USER_ROLE = USER_ROLES.SELF;
      return next();
    }

    if (options?.reject) {
      return res.status(401).end();
    }

    req.USER_ROLE = USER_ROLES.BASIC;
    return next();
  };
}

module.exports = checkIfSelf;
