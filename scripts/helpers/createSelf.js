const { User } = require("@/models");
const { faker } = require("@faker-js/faker");

async function createSelf(username, password) {
  const user = new User({
    email: "user123@example.com",
    username: username,
    verified: true,
    hasAvatar: faker.image.avatar(),
    age: faker.number.int({ min: 18, max: 120 }),
    bio: faker.lorem.sentence(),
    pronouns: "they/them",
  });
  await user.setPassword(password);
  return user.save();
}

module.exports = createSelf;
