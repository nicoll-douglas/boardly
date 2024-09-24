import { faker } from "@faker-js/faker";

// mock data associated with GET /api/boards

function newBoard() {
  const boardName = faker.word.noun();
  const adminUsername = faker.internet.userName();

  return {
    _id: `board-${boardName}`,
    name: boardName, // board name
    createdAt: faker.date.past(), // creation date
    admin: {
      _id: `admin-${adminUsername}`,
      username: adminUsername,
      avatar: Math.random() < 0.75 ? faker.image.avatar() : null,
    },
  };
}

const boardListData = {
  boards: Array.from({ length: faker.number.int({ min: 0, max: 20 }) }, () =>
    newBoard()
  ), // boards array
  user: {
    username: "username123",
    id: "123",
    avatar: faker.image.avatar(),
  },
};

export default boardListData;
