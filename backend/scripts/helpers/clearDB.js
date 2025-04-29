const models = require("@/models");

async function clearDB() {
  let totalDelete = 0;
  const modelsArray = Object.values(models);
  for (let i = 0; i < modelsArray.length; i++) {
    const model = modelsArray[i];
    const { deletedCount } = await model.deleteMany({});
    totalDelete += deletedCount;
  }
  console.log(
    `info: deleted ${totalDelete} documents, database cleared successfully`
  );
}

module.exports = clearDB;
