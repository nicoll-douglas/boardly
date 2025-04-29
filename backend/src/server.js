const dotenv = require("dotenv");

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = require("./app");
const mongoose = require("mongoose");
const logger = require("@/middleware/logging/logger");

const PORT = process.env.HTTP_PORT;
const HOST = process.env.HTTP_HOST;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info(`Connected to ${MONGO_URI}`);
    app.listen(PORT, HOST, () => {
      logger.info(`Server running on ${HOST}:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
