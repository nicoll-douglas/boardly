module.exports = {
  users: require("./users.controller"),
  auth: {
    login: require("./auth/login.controller"),
    register: require("./auth/register.controller"),
    forgot: require("./auth/forgot.controller"),
    reset: require("./auth/reset.controller"),
    verify: require("./auth/verify.controller"),
  },
};
