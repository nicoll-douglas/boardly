import { faker } from "@faker-js/faker";

// mock data associated with GET /api/boards/:boardName

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
    }, // author info
  };
}

// response body will look like this
const boardData = {
  board: {
    name: faker.word.noun(),
    threads: Array.from({ length: faker.number.int({ min: 0, max: 30 }) }, () =>
      newThread()
    ), // threads array
    // threads: [],
    createdAt: faker.date.recent(),
    admin: {
      username: faker.internet.userName(),
    },
  },
  user: {
    username: "username123",
    id: "123",
  },
};

export default boardData;
