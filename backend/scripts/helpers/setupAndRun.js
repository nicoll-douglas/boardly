const mongoose = require("mongoose");
const clearDB = require("./clearDB");

const MONGO_URI = process.env.MONGO_URI;

async function setupAndRun(script) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`info: connected to ${MONGO_URI}`);
    await script();
  } catch (err) {
    console.log(err);
    await clearDB();
  } finally {
    mongoose.connection.close();
    console.log(`info: disconnected from ${MONGO_URI}`);
  }
}

module.exports = setupAndRun;
