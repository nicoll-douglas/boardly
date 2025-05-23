const { Board } = require("@/models");
const { faker } = require("@faker-js/faker");
const createUser = require("./createUser");
const createThread = require("./createThread");

async function createBoard(quantity = 1) {
  const boards = [];

  for (let i = 0; i < quantity; i++) {
    const [admin] = await createUser();

    let board = await new Board({
      name: faker.word.noun(),
      admin: admin._id,
      rules: faker.lorem.paragraphs({ min: 1, max: 2 }, "\n\n"),
    }).save();

    admin.boards.push(board._id);
    await admin.save();

    const threads = await createThread(3, board._id);
    board.threads = threads.map((thread) => thread._id);
    board = await board.save();

    boards.push(board);
  }

  return boards;
}

module.exports = createBoard;
