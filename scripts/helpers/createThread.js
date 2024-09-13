const { faker } = require("@faker-js/faker");
const { Thread } = require("@/models");

async function createThread(quantity = 1) {
  const threads = [];

  for (let i = 0; i < quantity; i++) {
    const thread = await new Thread({
      title: faker.lorem.sentence(),
      body:
        Math.random() < 0.5
          ? faker.lorem.paragraphs({ min: 1, max: 5 }, "\n\n")
          : undefined,
    }).save();
    threads.push(thread);
  }

  return quantity === 1 ? threads[0] : threads;
}

module.exports = createThread;
