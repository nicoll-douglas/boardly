require("dotenv").config({ path: ".env.development" });
require("module-alias/register");

const setupAndRun = require("./helpers/setupAndRun");
setupAndRun(async () => {});
