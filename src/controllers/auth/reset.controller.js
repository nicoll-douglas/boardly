const verifyToken = require("@/middleware/auth/verifyToken");

module.exports = async (req, res, next) => {
  const { password } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const foundUser = await verifyToken(token);
    if (!foundUser) return res.sendStatus(401);

    await foundUser.setPassword(password);
    await foundUser.save();
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
