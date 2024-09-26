const { User } = require("@/models");

async function createSelf() {
  console.log("info: creating self...");
  const username = process.env.SEED_USER;
  const password = process.env.SEED_PASS;

  const user = new User({ username, verified: true });
  await user.setPassword(password);
  await user.save();

  console.log(`info: self created. USER=${username} PASS=${password}`);
}

module.exports = createSelf;
