const { connect, clearDB, disconnect } = require("./tests/testDB");

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await disconnect();
});
