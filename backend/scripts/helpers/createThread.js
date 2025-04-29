const { faker } = require("@faker-js/faker");
const { Thread } = require("@/models");
const createUser = require("./createUser");
const createReply = require("./createReply");

async function createThread(quantity = 1, boardId) {
  const threads = [];

  for (let i = 0; i < quantity; i++) {
    const [author] = await createUser();

    let thread = await new Thread({
      title: faker.lorem.sentence(),
      body:
        Math.random() < 0.75
          ? faker.lorem.paragraphs({ min: 1, max: 2 }, "\n\n")
          : undefined,
      author: author._id,
      board: boardId,
    }).save();

    author.threads.push(thread._id);
    await author.save();

    const replies = await createReply(
      faker.number.int({ min: 0, max: 2 }),
      thread._id,
      true
    );
    thread.replies = replies.map((reply) => reply._id);
    thread = await thread.save();

    threads.push(thread);
  }

  return threads;
}

module.exports = createThread;
