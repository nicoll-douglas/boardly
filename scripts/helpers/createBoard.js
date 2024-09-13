const { Board } = require("@/models");
const { faker } = require("@faker-js/faker");

async function createBoard(quantity = 1) {
  const boards = [];

  for (let i = 0; i < quantity; i++) {
    const board = await new Board({
      name: faker.word.noun(),
    }).save();
    boards.push(board);
  }

  return quantity === 1 ? boards[0] : boards;
}

module.exports = createBoard;
