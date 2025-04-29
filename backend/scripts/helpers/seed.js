const { User } = require("@/models");

const createSelf = require("./createSelf");
const createBoard = require("./createBoard");

async function seed() {
  try {
    const demoUser = await User.findOne({ username: "DEMO_USER" });
    if (demoUser) {
      console.log("info: seed already in place");
      return;
    }
    await createSelf();
    console.log("info: creating boards...");
    await createBoard(3);
    console.log("info: successfully created 3 boards");
    console.log("info: seed complete");
  } catch (err) {
    console.log("error: unable to seed database");
    console.log(err);
  }
}

module.exports = seed;
