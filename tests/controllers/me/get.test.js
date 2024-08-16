const User = require("@/models/User");
const request = require("supertest");
const app = require("@/app");
const verifyAuth = require("@/middleware/auth/verifyAuth");

const userData = {
  username: "username",
  age: 20,
  pronouns: "he/him",
  bio: "Some bio",
};

jest.mock("@/middleware/validation/validateHTTPAuth", () =>
  jest.fn((req, res, next) => next())
);
jest.mock("@/middleware/auth/verifyAuth", () => jest.fn());

describe("GET /api/me", () => {
  beforeEach(() => {
    verifyAuth.mockImplementation(async (req, res, next) => {
      const user = await new User(userData).save();
      req.user = user;
      next();
    });
  });

  it("Controller should send profile data", async () => {
    const res = await request(app).get("/api/me");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        profile: expect.objectContaining(userData),
      })
    );
  });
});
