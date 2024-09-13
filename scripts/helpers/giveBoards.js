const { faker } = require("@faker-js/faker");
const createBoard = require("./createBoard");

async function giveBoards(userDoc) {
  const boardCount = faker.number.int({ min: 0, max: 10 });
  const userBoards = await createBoard(boardCount);
  userDoc.boards = userBoards.map((board) => board._id);
}

module.exports = giveBoards;
