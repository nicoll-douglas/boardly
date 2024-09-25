import { faker } from "@faker-js/faker";

const pronounValues = [undefined, "he/him", "she/her", "they/them"];

// mock data associated with /api/users/:username and /api/me

function getIdArray(n) {
  return Array.from({ length: faker.number.int({ min: 0, max: n }) }, () =>
    faker.string.uuid()
  );
}

const profileData = {
  profile: {
    username: faker.internet.userName(),
    avatar: Math.random() < 0.75 ? faker.image.avatar() : null,
    age: Math.random() < 0.75 ? faker.number.int({ min: 18, max: 28 }) : null,
    bio: Math.random() < 0.75 ? faker.lorem.sentence() : null,
    pronouns: pronounValues[faker.number.int({ min: 0, max: 3 })],
    createdAt: faker.date.past(),
    threads: getIdArray(20),
    replies: getIdArray(20),
    boards: getIdArray(20),
  },
  user: {
    username: "username123",
    id: "123",
    avatar: faker.image.avatar(),
  },
};

export default profileData;
