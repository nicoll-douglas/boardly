const verifyToken = require("@/middleware/auth/verifyToken");

module.exports = async (req, res, next) => {
  const { password } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const foundUser = await verifyToken(token);
    if (!foundUser) {
      req.log("token, 401, sent");
      return res.sendStatus(401);
    }

    await foundUser.setPassword(password);
    await foundUser.save();
    req.log("password reset, 200, sent");
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
