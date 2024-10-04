import { faker } from "@faker-js/faker";

// mock data associated with /api/users/:username/boards

function newBoard() {
  return {
    _id: `board-${faker.string.uuid()}`, // board id for a subsequent fetch
    name: faker.word.noun(), // board name
    createdAt: faker.date.past(), // creation date
    rules: faker.lorem.paragraphs({ min: 1, max: 3 }, "\n\n"),
  };
}

const boardData = {
  boards: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () =>
    newBoard()
  ), // boards array
  user: {
    username: "username123",
    id: "123",
  },
};

export default boardData;
