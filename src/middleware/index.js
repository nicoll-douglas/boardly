module.exports = {
  auth: {
    checkIfSelf: require("./auth/checkIfSelf"),
    verifyAuth: require("./auth/verifyAuth"),
    verifyJWT: require("./auth/verifyJWT"),
    ...require("./auth/issueTokens"),
  },
  common: {
    handleImage: require("./common/handleImage"),
    limiter: require("./common/limiter"),
  },
  global: {
    customMethods: require("./global/customMethods"),
    errorHandler: require("./global/errorHandler"),
    notFoundHandler: require("./global/notFoundHandler"),
  },
  logging: {
    devLogger: require("./logging/devLogger"),
    logger: require("./logging/logger"),
  },
  validation: {
    validate: require("./validation/validate"),
  },
};
