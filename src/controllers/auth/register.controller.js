const sendVerificationEmail = require("@/services/sendVerificationEmail");
const User = require("@/models/User");

module.exports = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      req.log("username, 409, sent");
      return res.status(409).feedback(["username", "Username is taken"]);
    }

    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      req.log("email, 409, sent");
      return res.status(409).feedback(["email", "Email is already in use"]);
    }

    const newUser = new User({ email, username });
    await sendVerificationEmail(email, newUser._id);

    await newUser.setPassword(password);
    await newUser.save();

    req.log("email sent, user created, 200");
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
