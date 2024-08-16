const User = require("@/models/User");

module.exports = async (req, res) => {
  const id = req.user._id;
  const profile = await User.findById(id).select("username age bio pronouns");
  const profileObj = profile.toObject();
  res.appendData("profile", profileObj).sendData();
};
