const { REFRESH_DURATION } = require("@/config/JWT");
const logger = require("@/middleware/logging/winston");

function customMethods(req, res, next) {
  let body = {};

  res.feedback = (...msgs) => {
    body.feedback = msgs.map(([subject, message]) => ({ subject, message }));
    return res.json(body);
  };

  res.accessToken = (accessToken) => {
    body.accessToken = accessToken;
    logger.info("Added new access token to response");
    return res;
  };

  res.refreshToken = (refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      maxAge: REFRESH_DURATION,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    logger.info("Added new refresh token to response");
    return res;
  };

  res.appendData = (key, data) => {
    body[key] = data;
    logger.info(`Appended data to response body: ${key}`);
    return res;
  };

  res.sendData = () => {
    logger.info("Sent data back to client");
    return res.json(body);
  };

  next();
}

module.exports = customMethods;
