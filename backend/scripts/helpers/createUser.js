const { faker } = require("@faker-js/faker");
const { User } = require("@/models");

async function createUser(quantity = 1) {
  const pronounValues = [undefined, "he/him", "she/her", "they/them"];
  const users = [];

  for (let i = 0; i < quantity; i++) {
    const user = await new User({
      username: faker.internet.userName(),
      verified: true,
      age:
        Math.random() < 0.5
          ? faker.number.int({ min: 18, max: 120 })
          : undefined,
      bio: Math.random() < 0.5 ? faker.person.bio() : undefined,
      pronouns: pronounValues[faker.number.int({ min: 0, max: 3 })],
      hasAvatar: Math.random() < 0.75 ? faker.image.avatar() : "",
    }).save();
    users.push(user);
  }

  return users;
}

module.exports = createUser;
