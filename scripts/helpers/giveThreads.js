const createThread = require("./createThread");
const createBoard = require("./createBoard");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

async function giveThreads(userDoc) {
  const threadCount = faker.number.int({ min: 1, max: 10 });
  const userThreads = await createThread(threadCount);

  for (let i = 0; i < threadCount; i++) {
    userThreads[i].board = (await createBoard())._id;
    userThreads[i].replies = Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      () => new mongoose.Types.ObjectId()
    );
    await userThreads[i].save();
  }
  userDoc.threads = userThreads;
}

module.exports = giveThreads;
