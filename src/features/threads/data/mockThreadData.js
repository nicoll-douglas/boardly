import { faker } from "@faker-js/faker";

class SimpleAuthor {
  constructor() {
    this._id = `user-${faker.string.uuid()}`;
    this.username = faker.internet.userName();
  }
}

class SimpleReply {
  constructor() {
    this.author = new SimpleAuthor();
    this.body = faker.lorem.sentence();
    this.createdAt = faker.date.recent({ days: 30 });
    this._id = `reply-${faker.string.uuid()}`;
  }
}

class Reply extends SimpleReply {
  constructor() {
    super();
    this.parent = Math.random() < 0.5 ? new SimpleReply() : null;
  }
}

function getReplies(n) {
  return Array.from({ length: n }, () => new Reply());
}

// mock data associated with GET /api/threads/:threadName
const threadData = {
  thread: {
    _id: `thread-${faker.string.uuid()}`,
    title: faker.lorem.sentence(),
    body:
      Math.random() < 0.5
        ? faker.lorem.paragraphs({ min: 1, max: 5 }, "\n\n")
        : null,
    createdAt: faker.date.recent({ days: 30 }),
    board: {
      _id: `board-${faker.string.uuid()}`,
      name: faker.word.noun(),
    },
    author: {
      _id: `user-${faker.string.uuid()}`,
      username: faker.internet.userName(),
    },
    replies: getReplies(5),
  },
  // user: {
  //   username: "username123",
  //   id: "123",
  // },
};

export default threadData;
