const createThread = require("./createThread");
const createBoard = require("./createBoard");
const createReply = require("./createReply");
const createUser = require("./createUser");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

async function giveReplies(userDoc) {
  const replyCount = faker.number.int({ min: 1, max: 10 });
  const userReplies = await createReply(replyCount);

  for (let i = 0; i < replyCount; i++) {
    const [replyThread] = await createThread();
    replyThread.board = (await createBoard())[0]._id;
    replyThread.author = (await createReply())[0]._id;
    await replyThread.save();
    userReplies[i].thread = replyThread._id;

    userReplies[i].children = Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      () => new mongoose.Types.ObjectId()
    );

    if (Math.random() < 0.75) {
      const [parentReply] = await createReply();
      parentReply.author = (await createUser())[0]._id;
      await parentReply.save();
      userReplies[i].parent = parentReply._id;
    }

    await userReplies[i].save();
  }
  userDoc.replies = userReplies.map((reply) => reply._id);
}

module.exports = giveReplies;
