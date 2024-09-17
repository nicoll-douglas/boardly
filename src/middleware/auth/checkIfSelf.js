const config = require("@/config");

function checkIfSelf(options) {
  return (req, res, next) => {
    const { username } = req.params;
    const user = req.user;

    if (user.username === username) {
      req.log("user is self, appended privilege");
      res._append("userPrivilege", config.userPrivilege.self);
      return next();
    }

    if (options?.reject) {
      req.log("user is basic");
      req.log("401, sent");
      return res.status(401).end();
    }

    req.log("user is basic, appended privilege");
    res._append("userPrivilege", config.userPrivilege.basic);
    return next();
  };
}

module.exports = checkIfSelf;
