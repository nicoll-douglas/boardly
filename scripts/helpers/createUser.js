const { faker } = require("@faker-js/faker");
const { User } = require("@/models");
const { issueRefreshToken } = require("@/middleware/auth/issueTokens");

async function createUnverifiedUser() {
  const user = new User({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    verified: false,
  });
  await user.setPassword(faker.internet.password());
  return user.save();
}

async function createVerifiedUser() {
  const pronounValues = [undefined, "he/him", "she/her", "they/them"];
  const user = new User({
    username: faker.internet.userName(),
    verified: true,
    age:
      Math.random() < 0.5 ? faker.number.int({ min: 18, max: 120 }) : undefined,
    bio: Math.random() < 0.5 ? faker.lorem.sentence() : undefined,
    pronouns: pronounValues[faker.number.int({ min: 0, max: 3 })],
    hasAvatar: Math.random() < 0.5 ? faker.image.avatar() : undefined,
    email: faker.internet.email(),
  });
  user.refreshToken = issueRefreshToken(user._id);
  await user.setPassword(faker.internet.password());
  return user.save();
}

async function createUser(quantity = 1, options) {
  const verified = options?.verified ?? true;
  const users = [];

  for (let i = 0; i < quantity; i++) {
    users.push(
      await (verified ? createVerifiedUser() : createUnverifiedUser())
    );
  }
  return users;
}

module.exports = createUser;
