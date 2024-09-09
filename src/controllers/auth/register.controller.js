const sendVerificationEmail = require("@/services/sendVerificationEmail");
const User = require("@/models/User");

module.exports = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken)
      return res.status(409).feedback(["username", "Username is taken"]);

    const emailTaken = await User.findOne({ email });
    if (emailTaken)
      return res.status(409).feedback(["email", "Email is already in use"]);

    const newUser = new User({ email, username });
    await sendVerificationEmail(email, newUser._id);
    await newUser.setPassword(password);
    await newUser.save();

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
