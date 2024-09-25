import { faker } from "@faker-js/faker";

// mock data associated with /api/users/:username/replies

function newReply() {
  return {
    _id: `reply-${faker.string.uuid()}`, // reply id for new fetch
    body: faker.lorem.sentence(), // body
    createdAt: faker.date.recent({ days: 45 }), // when created
    thread: {
      _id: `thread-${faker.string.uuid()}`, // thread id where reply lives
      title: faker.lorem.sentence(), // thread title
      body:
        Math.random() < 0.75
          ? faker.lorem.paragraphs({ min: 1, max: 4 }, "\n\n")
          : null, // thread body if any
      board: {
        _id: `board-${faker.string.uuid()}`, // board id where thread/reply lives for new fetch
        name: faker.word.noun(), // board name
      },
      author: {
        _id: `author-${faker.string.uuid()}`, // thread author id for new fetch (reply might be to author)
        username: faker.internet.userName(), // author name
      },
    },
    parent:
      Math.random() < 0.5
        ? {
            _id: `reply-${faker.string.uuid()}`, // parent reply id for new fetch
            body: faker.lorem.sentence(), // parent body
            author: {
              _id: `author-${faker.string.uuid()}`, // parent author id
              username: faker.internet.userName(), // parent author username
            },
          }
        : null, // parent may be reply, otherwise it is implicitly the thread
  };
}

// response body will look like this
const replyData = {
  replies: Array.from({ length: faker.number.int({ min: 0, max: 30 }) }, () =>
    newReply()
  ), // replies array
  user: {
    username: "username123",
    id: "123",
  },
};

export default replyData;
