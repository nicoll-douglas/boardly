import { faker } from "@faker-js/faker";
import config from "@/config";

function newBoard() {
  return {
    _id: `board-${faker.string.uuid()}`,
    name: faker.word.noun(),
    createdAt: faker.date.past(),
    admin: {
      _id: `admin-${faker.string.uuid()}`,
      username: faker.internet.userName(),
    },
  };
}

const boardData = {
  boards: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () =>
    newBoard()
  ),
  userPrivilege: config.userPrivilege.self,
};

export default boardData;
