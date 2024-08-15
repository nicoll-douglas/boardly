const request = require("supertest");
const { connect, disconnect, clearDB } = require("@root/tests/testDB");
const app = require("@/app");
const User = require("@/models/User");
const verifyToken = require("@/middleware/auth/verifyToken");
const bcrypt = require("bcrypt");

const password = "ValidPassword123";
const credentials = {
  password,
  confirmPassword: password,
};

const token = "exampleToken";

jest.mock("@/middleware/auth/verifyToken", () => jest.fn());

describe("/api/auth/reset", () => {
  beforeAll(async () => await connect());
  beforeEach(async () => {
    await clearDB();
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await disconnect();
    jest.resetModules();
  });

  test("responds correctly if token invalid", async () => {
    const res = await request(app)
      .post("/api/auth/reset")
      .set("Authorization", `Bearer ${token}`)
      .send(credentials);
    expect(verifyToken).toHaveBeenCalledWith(token);
    expect(res.status).toBe(401);
  });

  test("responds correctly if token valid", async () => {
    const user = await new User({
      hashedPassword: bcrypt.hashSync(password, 10),
    });
    verifyToken.mockResolvedValue(user);
    const res = await request(app)
      .post("/api/auth/reset")
      .set("Authorization", `Bearer ${token}`)
      .send(credentials);
    expect(verifyToken).toHaveBeenCalledWith(token);
    expect(res.status).toBe(200);
  });
});
