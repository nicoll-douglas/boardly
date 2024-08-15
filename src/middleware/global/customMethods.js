const { REFRESH_DURATION } = require("@/config/JWT");

function customMethods(req, res, next) {
  let body = {};

  res.feedback = (...msgs) => {
    body.feedback = msgs.map(([subject, message]) => ({ subject, message }));
    return res.json(body);
  };

  res.accessToken = (accessToken) => {
    body.accessToken = accessToken;
    return res;
  };

  res.refreshToken = (refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      maxAge: REFRESH_DURATION,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res;
  };

  res.appendData = (key, data) => {
    body[key] = data;
    return res.json(body);
  };

  res.sendData = () => res.json(body);

  next();
}

module.exports = customMethods;
