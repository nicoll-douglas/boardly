const crypto = require("crypto");

exports.changePassword = async (req, res, next) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;

  try {
    // Split stored hash into salt and hash portions
    const [salt, storedHash] = user.hashedPassword.split(':');
    
    // Hash the provided password with the same salt
    const hash = crypto.pbkdf2Sync(currentPassword, salt, 1000, 64, 'sha512').toString('hex');
    
    // Compare the generated hash with the stored hash
    const passwordMatch = storedHash === hash;

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
