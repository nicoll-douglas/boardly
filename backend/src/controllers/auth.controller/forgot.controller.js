const User = require("@/models/User");
const sendResetPasswordEmail = require("@/services/email/sendResetPasswordEmail");

module.exports = async (req, res, next) => {
  const { email } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      req.log("email, 404, sent");
      return res.status(404).end();
    }

    await sendResetPasswordEmail(email, foundUser._id);
    req.log("email sent, 200, sent");
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};
