const bcrypt = require("bcrypt");

exports.changePassword = async (req, res, next) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;

  try {
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    );

    if (!passwordMatch) {
      return res
        .status(400)
        ._feedback(["currentPassword", "Password is incorrect"]);
    }

    await user.setPassword(newPassword);
    await user.save();

    return res.status(200)._end();
  } catch (err) {
    return next(err);
  }
};
