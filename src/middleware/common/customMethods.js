const { REFRESH_DURATION, ACCESS_DURATION } = require("@/config/JWT");

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
      maxAge: ACCESS_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    req.log("access token appended");
    return res;
  };

  res._refreshToken = (refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      maxAge: REFRESH_DURATION,
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
