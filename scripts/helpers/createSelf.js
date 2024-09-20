const { User } = require("@/models");

async function createSelf(username, password) {
  const user = new User({
    email: "user123@example.com",
    username: username,
    verified: true,
  });
  await user.setPassword(password);
  return user.save();
}

module.exports = createSelf;
