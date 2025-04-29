require("dotenv").config({ path: ".env.development" });
require("module-alias/register");
const seed = require("./helpers/seed");
const setupAndRun = require("./helpers/setupAndRun");

setupAndRun(seed);
