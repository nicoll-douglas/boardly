require("dotenv").config({ override: true });
const app = require("./app");
const mongoose = require("mongoose");
const logger = require("@/middleware/logging/winston");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info(`Connected to ${MONGO_URI}`);
    app.listen(PORT, HOSTNAME, () => {
      logger.info(`Server running on ${HOSTNAME}:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
