require("dotenv").config({ path: ".env.development" });
require("module-alias/register");

const createSelf = require("./helpers/createSelf");
const setupAndRun = require("./helpers/setupAndRun");

setupAndRun(createSelf);
