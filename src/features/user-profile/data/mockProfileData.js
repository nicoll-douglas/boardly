import { faker } from "@faker-js/faker";
import config from "@/config";

const pronounValues = [undefined, "he/him", "she/her", "they/them"];

const profileData = {
  profile: {
    username: faker.internet.userName(),
    avatar: Math.random() < 0.75 ? faker.image.avatar() : null,
    age: Math.random() < 0.75 ? faker.number.int({ min: 18, max: 28 }) : null,
    bio: Math.random() < 0.75 ? faker.lorem.sentence() : null,
    pronouns: pronounValues[faker.number.int({ min: 0, max: 3 })],
    createdAt: faker.date.past(),
  },
  userPrivilege: config.userPrivilege.self,
};

export default profileData;
