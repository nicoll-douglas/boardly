require("dotenv").config({ override: true });
require("module-alias/register");

const createSelf = require("./helpers/createSelf");
const createBoard = require("./helpers/createBoard");
const runScript = require("./helpers/runScript");
const createUser = require("./helpers/createUser");

const SELF_USERNAME = "username123";
const SELF_PASSWORD = "password123";

async function seedBoards() {
  console.log("info: creating self...");
  await createSelf(SELF_USERNAME, SELF_PASSWORD);
  console.log(
    `info: self created. you should now be able to login on the client. username: ${SELF_USERNAME}, password: ${SELF_PASSWORD}`
  );

  for (let i = 0; i < 15; i++) {
    const [board] = await createBoard();
    const [user] = await createUser();
    board.admin = user._id;
    user.boards.push(board._id);
    await board.save();
    await user.save();
  }
  console.log("info: created 15 boards");
  console.log(`info: seed complete`);
}

runScript(seedBoards);
