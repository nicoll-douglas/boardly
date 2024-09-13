const models = require("@/models");

async function clearDB() {
  const modelsArray = Object.values(models);

  for (let i = 0; i < modelsArray.length; i++) {
    const model = modelsArray[i];

    console.log(`info: deleting ${model.modelName} documents...`);
    const { deletedCount } = await model.deleteMany({});
    console.log(
      `info: successfully deleted ${deletedCount} ${model.modelName} documents`
    );
  }

  console.log("info: database cleared successfully");
}

module.exports = clearDB;
