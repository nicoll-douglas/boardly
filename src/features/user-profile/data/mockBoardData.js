import { faker } from "@faker-js/faker";

function newBoard() {
  return {
    _id: `board-${faker.string.uuid()}`,
    name: faker.word.noun(),
    createdAt: faker.date.past(),
    admin: {
      _id: `admin-${faker.string.uuid()}`,
      name: faker.internet.userName(),
    },
  };
}

const boardData = {
  boards: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () =>
    newBoard()
  ),
};

export default boardData;
