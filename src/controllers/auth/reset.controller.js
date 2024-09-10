const verifyJWT = require("@/middleware/auth/verifyJWT");

module.exports = async (req, res, next) => {
  const { password } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const user = await verifyJWT(token);
    if (!user) {
      req.log("token, 401, sent");
      return res.sendStatus(401);
    }

    await user.setPassword(password);
    await user.save();
    req.log("password reset, 200, sent");
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
