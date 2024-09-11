module.exports = {
  checkIfSelf: require("./checkIfSelf"),
  verifyAuth: require("./verifyAuth"),
  verifyJWT: require("./verifyJWT"),
  ...require("./issueTokens"),
};
