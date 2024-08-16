const User = require("@/models/User");

module.exports = async (req, res, next) => {
  try {
    const id = req.user._id;
    const profile = await User.findById(id).select("username age bio pronouns");
    const profileObj = profile.toObject();
    res.status(200).appendData("profile", profileObj).sendData();
  } catch (err) {
    next(err);
  }
};
