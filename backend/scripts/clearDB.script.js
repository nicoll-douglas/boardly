require("dotenv").config({ path: ".env.development" });
require("module-alias/register");
const clearDB = require("./helpers/clearDB");

const setupAndRun = require("./helpers/setupAndRun");
setupAndRun(clearDB);
