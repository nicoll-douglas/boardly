const request = require("supertest");
const { connect, disconnect, clearDB } = require("@root/tests/testDB");
const app = require("@/app");
const User = require("@/models/User");
const verifyToken = require("@/middleware/auth/verifyToken");
const {
  issueAccessToken,
  issueRefreshToken,
} = require("@/middleware/auth/issueTokens");

jest.mock("@/middleware/auth/verifyToken", () => jest.fn());
jest.mock("@/middleware/auth/issueTokens", () => ({
  issueAccessToken: jest.fn(),
  issueRefreshToken: jest.fn(),
}));

describe("PATCH /api/auth/verify", () => {
  const token = "token";

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
      .patch("/api/auth/verify")
      .set("Authorization", `Bearer ${token}`);
    expect(verifyToken).toHaveBeenCalledWith(token);
    expect(res.status).toBe(401);
  });

  test("responds correctly if token valid", async () => {
    const accessToken = "1234";
    const refreshToken = "12345";

    const user = await new User({
      email: "email@gmail.com",
    }).save();
    verifyToken.mockResolvedValue(user);
    issueAccessToken.mockReturnValue("1234");
    issueRefreshToken.mockReturnValue("12345");

    const res = await request(app)
      .patch("/api/auth/verify")
      .set("Authorization", `Bearer ${token}`);
    expect(verifyToken).toHaveBeenCalledWith(token);
    expect(issueAccessToken).toHaveBeenCalledWith(user._id);
    expect(issueRefreshToken).toHaveBeenCalledWith(user._id);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      accessToken,
    });
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.refreshToken).toBe(refreshToken);
    expect(updatedUser.verified).toBe(true);
    const refreshTokenCookie = res.headers["set-cookie"][0];
    expect(refreshTokenCookie).toMatch(/refreshToken=12345/);
    expect(refreshTokenCookie).toMatch(/HttpOnly/);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
