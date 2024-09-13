const { Reply } = require("@/models");
const { faker } = require("@faker-js/faker");

async function createReply(quantity = 1) {
  const replies = [];

  for (let i = 0; i < quantity; i++) {
    const reply = await new Reply({
      body: faker.lorem.sentence(),
    }).save();
    replies.push(reply);
  }

  return quantity === 1 ? replies[0] : replies;
}

module.exports = createReply;
