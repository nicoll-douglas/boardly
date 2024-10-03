import { faker } from "@faker-js/faker";

class SimpleAuthor {
  constructor() {
    this._id = `user-${faker.string.uuid()}`;
    this.username = faker.internet.userName();
    this.avatar = faker.image.avatar();
    this.deleted = true;
  }
}

class SimpleReply {
  constructor() {
    this.author = new SimpleAuthor();
    this.body = faker.lorem.paragraphs({ min: 1, max: 2 }, "\n\n");
    this.createdAt = faker.date.recent({ days: 30 });
    this._id = `reply-${faker.string.uuid()}`;
    this.deleted = Math.random() < 0.15;
  }
}

class Reply extends SimpleReply {
  constructor() {
    super();
    this.parent = Math.random() < 0.75 ? new SimpleReply() : null;
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
      admin: {
        _id: faker.string.uuid(),
        username: faker.internet.userName(),
        deleted: true,
      },
      threads: Array.from(
        { length: faker.number.int({ min: 0, max: 30 }) },
        () => faker.string.uuid()
      ),
      createdAt: faker.date.recent({ days: 45 }),
      rules: faker.lorem.paragraphs({ min: 1, max: 3 }, "\n\n"),
      deleted: Math.random() < 0.4,
    },
    author: {
      _id: `user-${faker.string.uuid()}`,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      deleted: true,
    },
    replies: getReplies(10),
    deleted: false,
  },
  user: {
    username: "username123",
    id: "123",
  },
};

export default threadData;
