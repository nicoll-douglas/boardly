const config = require("@/config");

function customMethods(req, res, next) {
  let body = {};

  res._feedback = (...msgs) => {
    body.feedback = msgs.map(([subject, message]) => ({ subject, message }));
    req.log("feedback appended:");
    req.log(JSON.stringify(body.feedback, null, 2));
    return res.json(body);
  };

  res._accessToken = (accessToken) => {
    res.cookie("accessToken", accessToken, {
      maxAge: config.jwt.accessDuration,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    req.log("access token appended");
    return res;
  };

  res._refreshToken = (refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      maxAge: config.jwt.refreshDuration,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    req.log("refresh token appended");
    return res;
  };

  res._append = (key, data) => {
    body[key] = data;
    req.log(`new data appended "${key}"`);
    return res;
  };

  res._end = () => {
    req.log("sent");
    return res.json(body);
  };

  next();
}

module.exports = customMethods;
