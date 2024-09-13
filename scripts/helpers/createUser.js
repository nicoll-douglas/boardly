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
    refreshToken: issueRefreshToken(),
    age:
      Math.random() < 0.5 ? faker.number.int({ min: 18, max: 120 }) : undefined,
    bio: Math.random() < 0.5 ? faker.lorem.sentence() : undefined,
    pronouns: pronounValues[faker.number.int({ min: 0, max: 3 })],
    hasAvatar: Math.random() < 0.5 ? faker.image.avatar() : undefined,
    email: faker.internet.email(),
  });
  await user.setPassword(faker.internet.password());
  return user.save();
}

async function createUser(quantity = 1, options) {
  const verified = options?.verified ?? true;
  const users = [];

  for (let i = 0; i < quantity; i++) {
    let user;
    if (verified) {
      user = await createVerifiedUser();
    } else {
      user = await createUnverifiedUser();
    }
    users.push(user);
  }
  return quantity === 1 ? users[0] : users;
}

module.exports = createUser;
