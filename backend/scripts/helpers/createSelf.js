const { User, Board } = require("@/models");

async function createSelf() {
  await User.deleteOne({ username: "DEMO_USER" });
  await Board.deleteOne({ name: "DEMO_BOARD" });

  await new User({
    username: "DEMO_USER",
  }).save();

  console.log("info: created demo user");
}

module.exports = createSelf;
