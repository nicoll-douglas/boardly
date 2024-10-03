import { faker } from "@faker-js/faker";

// mock data associated with GET /api/threads

function newThread() {
  return {
    _id: `thread-${faker.string.uuid()}`, // thread id for new fetch
    title: faker.lorem.sentence(), // title the user gave
    body:
      Math.random() < 0.5
        ? faker.lorem.paragraphs({ min: 1, max: 5 }, "\n\n")
        : null, // body the user gave if any
    createdAt: faker.date.recent({ days: 30 }), // creation date
    replies: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () =>
      faker.string.uuid()
    ), // reply id array for length
    author: {
      _id: `user-${faker.string.uuid()}`,
      username: faker.internet.userName(),
      deleted: true,
    }, // author info
    board: {
      _id: faker.string.uuid(),
      name: faker.word.noun(),
      deleted: Math.random() < 0.1,
    },
    deleted: false,
  };
}

// response body will look like this
const feedData = {
  threads: Array.from({ length: faker.number.int({ min: 0, max: 50 }) }, () =>
    newThread()
  ), // threads array
};

export default feedData;
