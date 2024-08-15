const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const URI = mongoServer.getUri();
  await mongoose.connect(URI);
}

async function disconnect() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

async function clearDB() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}

module.exports = {
  connect,
  disconnect,
  clearDB,
};
