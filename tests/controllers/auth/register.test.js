const request = require("supertest");
const app = require("@/app");
const User = require("@/models/User");

const credentials = {
  email: "valid.email@gmail.com",
  confirmEmail: "valid.email@gmail.com",
  username: "validUsername",
  password: "validPassword123",
};

jest.mock("@/services/sendVerificationEmail", () => jest.fn());
const sendVerificationEmail = require("@/services/sendVerificationEmail");

describe("POST /api/auth/register", () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test("responds correctly if username taken", async () => {
    await new User({ username: credentials.username }).save();
    const res = await request(app).post("/api/auth/register").send(credentials);
    expect(sendVerificationEmail).not.toHaveBeenCalled();
    expect(res.status).toBe(409);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });

  test("responds correctly if email taken", async () => {
    await new User({ email: credentials.email }).save();
    const res = await request(app).post("/api/auth/register").send(credentials);
    expect(sendVerificationEmail).not.toHaveBeenCalled();
    expect(res.status).toBe(409);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });

  test("registers user and responds correctly if credentials available", async () => {
    sendVerificationEmail.mockResolvedValue();
    const res = await request(app).post("/api/auth/register").send(credentials);
    const user = await User.findOne({
      username: credentials.username,
      email: credentials.email,
    });
    expect(sendVerificationEmail).toHaveBeenCalled();
    expect(user).toBeDefined();
    expect(user.hashedPassword).toBeDefined();
    expect(user.verified).toBe(false);
    expect(res.status).toBe(200);
  });
});
