const { User } = require("@/models");

async function createSelf(username, password) {
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({
      email: "user123@example.com",
      username: username,
      verified: true,
    });
  }
  await user.setPassword(password);
  return user.save();
}

module.exports = createSelf;
