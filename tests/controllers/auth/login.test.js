const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("@/app");
const User = require("@/models/User");
const {
  issueAccessToken,
  issueRefreshToken,
} = require("@/middleware/auth/issueTokens");

const credentials = {
  username: "username",
  password: "password",
};

jest.mock("@/middleware/auth/issueTokens", () => ({
  issueAccessToken: jest.fn(),
  issueRefreshToken: jest.fn(),
}));

describe("POST /api/auth/login", () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test("responds correctly if user not found", async () => {
    const res = await request(app).post("/api/auth/login").send(credentials);
    expect(res.status).toBe(404);
  });

  test("responds correctly if password incorrect", async () => {
    await new User({
      username: credentials.username,
      hashedPassword: bcrypt.hashSync(credentials.password.toUpperCase(), 10),
    }).save();
    const res = await request(app).post("/api/auth/login").send(credentials);
    expect(res.status).toBe(404);
  });

  test("responds correctly if user unverified", async () => {
    await new User({
      username: credentials.username,
      hashedPassword: bcrypt.hashSync(credentials.password, 10),
      verified: false,
    }).save();
    const res = await request(app).post("/api/auth/login").send(credentials);
    expect(res.status).toBe(401);
  });

  test("responds correctly if user verified", async () => {
    issueAccessToken.mockReturnValue("1234");
    issueRefreshToken.mockReturnValue("12345");

    const user = await new User({
      username: credentials.username,
      hashedPassword: bcrypt.hashSync(credentials.password, 10),
      verified: true,
    }).save();
    const res = await request(app).post("/api/auth/login").send(credentials);

    expect(issueAccessToken).toHaveBeenCalledWith(user._id);
    expect(issueRefreshToken).toHaveBeenCalledWith(user._id);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      accessToken: "1234",
    });
    const updatedUser = await User.findById(user.id);
    expect(updatedUser.refreshToken).toBe("12345");
    const refreshTokenCookie = res.headers["set-cookie"][0];
    expect(refreshTokenCookie).toMatch(/refreshToken=12345/);
    expect(refreshTokenCookie).toMatch(/HttpOnly/);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
