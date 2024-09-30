import { faker } from "@faker-js/faker";

// mock data associated with /api/users/:username/threads

function newThread() {
  return {
    _id: `thread-${faker.string.uuid()}`, // thread id for new fetch
    title: faker.lorem.sentence(), // title the user gave
    body:
      Math.random() < 0.5
        ? faker.lorem.paragraphs({ min: 1, max: 5 }, "\n\n")
        : null, // body the user gave if any
    createdAt: faker.date.recent({ days: 30 }), // creation date
    board: {
      _id: `board-${faker.string.uuid()}`, // board id for new fetch
      name: faker.word.noun(), // board name where thread lives
    },
    replies: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () =>
      faker.string.uuid()
    ), // we may or may not want to know the id's of the replies
    deleted: false,
  };
}

// response body will look like this
const threadData = {
  threads: Array.from({ length: faker.number.int({ min: 0, max: 30 }) }, () =>
    newThread()
  ), // threads array
  user: {
    username: "username123",
    id: "123",
  },
};

export default threadData;
