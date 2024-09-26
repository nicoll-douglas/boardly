require("dotenv").config();
require("dotenv").config({ path: "./scripts/.env.seed" });
require("module-alias/register");

const { faker } = require("@faker-js/faker");
const createSelf = require("./helpers/createSelf");
const createBoard = require("./helpers/createBoard");
const setupAndRun = require("./helpers/setupAndRun");

async function seed() {
  faker.seed(process.env.FAKER_SEED);
  await createSelf();
  console.log("info: creating boards...");
  await createBoard(5);
  console.log("info: successfully created 5 boards");
}

setupAndRun(seed);
