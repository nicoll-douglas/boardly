const { User, Board } = require("@/models");

async function createDemo() {
  await User.deleteOne({ username: "DEMO_USER" });
  await Board.deleteOne({ name: "DEMO_BOARD" });

  const demoUser = await new User({
    username: "DEMO_USER",
  }).save();

  const demoBoard = await new Board({
    name: "DEMO_BOARD",
    admin: demoUser._id,
    rules: "Create some threads!",
  }).save();

  demoUser.boards.push(demoBoard._id);
  await demoUser.save();
}

module.exports = createDemo;
