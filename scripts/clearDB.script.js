require("dotenv").config({ override: true });
require("module-alias/register");

const clearDB = require("./helpers/clearDB");
const runScript = require("./helpers/runScript");

runScript(clearDB);
