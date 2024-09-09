const User = require("@/models/User");
const sendResetPasswordEmail = require("@/services/sendResetPasswordEmail");

module.exports = async (req, res, next) => {
  const { email } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      req.log("email, 404, sent");
      return res.sendStatus(404);
    }

    await sendResetPasswordEmail(email, foundUser._id);
    req.log("email sent, 200, sent");
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
