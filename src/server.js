require("dotenv").config({ override: true });
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running on ${HOSTNAME}:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
