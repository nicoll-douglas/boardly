import { faker } from "@faker-js/faker";

function newReply() {
  return {
    _id: `reply-${faker.string.uuid()}`,
    body: faker.lorem.sentence(),
    createdAt: faker.date.recent({ days: 45 }),
    thread: {
      _id: `thread-${faker.string.uuid()}`,
      title: faker.lorem.sentence(),
      body:
        Math.random() < 0.75
          ? faker.lorem.paragraphs({ min: 1, max: 4 }, "\n\n")
          : null,
      board: {
        _id: `board-${faker.string.uuid()}`,
        name: faker.word.noun(),
      },
      parent:
        Math.random() < 0.5
          ? {
              _id: `reply-${faker.string.uuid()}`,
              body: faker.lorem.sentence(),
              author: {
                _id: `author-${faker.string.uuid()}`,
                name: faker.internet.userName(),
              },
            }
          : null,
    },
  };
}

const replyData = {
  replies: Array.from({ length: faker.number.int({ min: 0, max: 30 }) }, () =>
    newReply()
  ),
};

export default replyData;
