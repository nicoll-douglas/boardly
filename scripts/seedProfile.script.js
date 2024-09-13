require("dotenv").config({ override: true });
require("module-alias/register");

const mongoose = require("mongoose");
const createSelf = require("./helpers/createSelf");
const createUser = require("./helpers/createUser");
const giveReplies = require("./helpers/giveReplies");
const giveBoards = require("./helpers/giveBoards");
const giveThreads = require("./helpers/giveThreads");
const runScript = require("./helpers/runScript");

const MONGO_URI = process.env.MONGO_URI;
const SELF_USERNAME = "username123";
const SELF_PASSWORD = "password123";

async function seedProfile() {
  console.log("info: initialising user seed...");
  await mongoose.connect(MONGO_URI);
  console.log(`info: connected to ${MONGO_URI}`);

  console.log("info: creating self...");
  await createSelf(SELF_USERNAME, SELF_PASSWORD);
  console.log(
    `info: self created. you should now be able to login on the client. username: ${SELF_USERNAME}, password: ${SELF_PASSWORD}`
  );
  const user = await createUser();
  console.log(`info: successfully created user profile "${user.username}"`);

  await giveThreads(user);
  console.log(`info: successfully gave "${user.username}" threads`);

  await giveReplies(user);
  console.log(`info: successfully gave "${user.username}" replies`);

  await giveBoards(user);
  console.log(`info: successfully gave "${user.username}" boards`);

  console.log(`info: seed complete`);
}

runScript(seedProfile);
