const models = require("@/models");

async function clearDB() {
  const modelsArray = Object.values(models);
  for (let i = 0; i < modelsArray.length; i++) {
    const model = modelsArray[i];
    await model.deleteMany({});
  }
  console.log("info: database cleared successfully");
}

module.exports = clearDB;
