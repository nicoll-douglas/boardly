import { faker } from "@faker-js/faker";

const siteData = {
  site: {
    userCount: faker.number.int({ min: 30, max: 50 }),
    threadCount: faker.number.int({ min: 30, max: 50 }),
    replyCount: faker.number.int({ min: 30, max: 50 }),
    boardCount: faker.number.int({ min: 30, max: 50 }),
    createdAt: faker.date.recent(),
  },
};

export default siteData;
