import { faker } from "@faker-js/faker";

function newThread() {
  return {
    _id: `thread-${faker.string.uuid()}`,
    title: faker.lorem.sentence(),
    body:
      Math.random() < 0.5
        ? faker.lorem.paragraphs({ min: 1, max: 5 }, "\n\n")
        : null,
    createdAt: faker.date.recent({ days: 30 }),
    board: {
      _id: `board-${faker.string.uuid()}`,
      name: faker.word.noun(),
    },
  };
}

const threadData = {
  threads: Array.from({ length: faker.number.int({ min: 0, max: 30 }) }, () =>
    newThread()
  ),
};

export default threadData;
