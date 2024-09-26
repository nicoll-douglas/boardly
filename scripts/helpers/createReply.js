const { Reply } = require("@/models");
const { faker } = require("@faker-js/faker");
const createUser = require("./createUser");

async function createReply(quantity = 1, threadId, parentify) {
  const replies = [];

  for (let i = 0; i < quantity; i++) {
    const [author] = await createUser();

    let reply = await new Reply({
      body: faker.lorem.sentence(),
      author: author._id,
      thread: threadId,
    }).save();

    author.replies.push(reply._id);
    await author.save();

    if (parentify) {
      const parent =
        replies[faker.number.int({ min: 0, max: replies.length - 1 })];
      reply.parent = Math.random() < 0.5 ? parent._id : undefined;
      reply = await reply.save();
    }

    replies.push(reply);
  }

  console.log(`info: `);
  return replies;
}

module.exports = createReply;
