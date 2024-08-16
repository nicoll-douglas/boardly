const { connect, disconnect, clearDB } = require("@root/tests/testDB");

describe("GET /api/me", () => {
  beforeAll(async () => await connect());
  beforeEach(async () => {
    await clearDB();
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await disconnect();
    jest.resetModules();
  });
});
