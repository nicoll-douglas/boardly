const request = require("supertest");
const { connect, disconnect, clearDB } = require("@root/tests/testDB");
const app = require("@/app");
const User = require("@/models/User");
const sendResetPasswordEmail = require("@/services/sendResetPasswordEmail");

const email = "valid.email@gmail.com";
const credentials = {
  email,
  confirmEmail: email,
};

jest.mock("@/services/sendResetPasswordEmail", () => jest.fn());

describe("POST /api/auth/forgot", () => {
  beforeAll(async () => await connect());
  beforeEach(async () => {
    await clearDB();
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await disconnect();
    jest.resetModules();
  });

  test("responds correctly if user with email not found", async () => {
    const res = await request(app).post("/api/auth/forgot").send(credentials);
    expect(sendResetPasswordEmail).not.toHaveBeenCalled();
    expect(res.status).toBe(404);
  });

  test("responds correctly if user with email found", async () => {
    sendResetPasswordEmail.mockResolvedValue();
    const user = await new User({ email }).save();
    const res = await request(app).post("/api/auth/forgot").send(credentials);
    expect(sendResetPasswordEmail).toHaveBeenCalledWith(user.email, user._id);
    expect(res.status).toBe(200);
  });

  test("responds correctly if async error", async () => {
    sendResetPasswordEmail.mockRejectedValue(new Error());
    const user = await new User({ email }).save();
    const res = await request(app).post("/api/auth/forgot").send(credentials);
    expect(sendResetPasswordEmail).toHaveBeenCalledWith(user.email, user._id);
    expect(res.status).toBe(500);
  });
});
