require("dotenv").config({ override: true });
require("module-alias/register");

const createSelf = require("./helpers/createSelf");
const createUser = require("./helpers/createUser");
const giveReplies = require("./helpers/giveReplies");
const giveBoards = require("./helpers/giveBoards");
const giveThreads = require("./helpers/giveThreads");
const runScript = require("./helpers/runScript");

const SELF_USERNAME = "username123";
const SELF_PASSWORD = "password123";

async function seedProfile() {
  console.log("info: creating self...");
  await createSelf(SELF_USERNAME, SELF_PASSWORD);
  console.log(
    `info: self created. you should now be able to login on the client. username: ${SELF_USERNAME}, password: ${SELF_PASSWORD}`
  );
  const [user] = await createUser();
  console.log(`info: successfully created user profile "${user.username}"`);

  await giveThreads(user);
  console.log(`info: successfully gave "${user.username}" threads`);

  await giveReplies(user);
  console.log(`info: successfully gave "${user.username}" replies`);

  await giveBoards(user);
  console.log(`info: successfully gave "${user.username}" boards`);

  await user.save();
  console.log("info: successfully saved user");

  console.log(`info: seed complete`);
}

runScript(seedProfile);
