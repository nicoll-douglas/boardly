require("module-alias/register");
require("./models");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");
const path = require("path");
const fs = require("fs/promises");

// Ensure public folders exist
const PUBLIC_DIR = path.join(process.cwd(), "public");
const AVATARS_DIR = path.join(PUBLIC_DIR, "avatars");

// Create public and avatars directories if they don't exist
fs.mkdir(PUBLIC_DIR, { recursive: true })
  .then(() => fs.mkdir(AVATARS_DIR, { recursive: true }))
  .catch(err => console.error("Error creating public directories:", err));

const customMethods = require("./middleware/global/customMethods");
const errorHandler = require("./middleware/global/errorHandler");
const notFoundHandler = require("./middleware/global/notFoundHandler");
const devLogger = require("./middleware/logging/devLogger");
const seed = require("../scripts/helpers/seed");

const verifyAuth = require("@/middleware/auth/verifyAuth");

const app = express();
seed();

app.use(cors(config.corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(devLogger);
app.use(customMethods);

// unprotected routes
app.use("/api/auth", require("./routers/auth.router"));
app.use("/api/demo", require("./routers/demo.router"));
app.use("/public", express.static(path.join(process.cwd(), "public")));

// protected routes
app.use(verifyAuth);
app.use("/api/users", require("./routers/users.router"));
app.use("/api/me", require("./routers/me.router"));
app.use("/api/boards", require("./routers/boards.router"));
app.use("/api/threads", require("./routers/threads.router"));
app.use("/api/replies", require("./routers/replies.router"));
app.use("/api/info", require("./controllers/info.controller").getInfo);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
