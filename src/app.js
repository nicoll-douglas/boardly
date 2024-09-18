require("dotenv").config({ override: true });
require("module-alias/register");
require("./models");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");

const customMethods = require("./middleware/global/customMethods");
const errorHandler = require("./middleware/global/errorHandler");
const notFoundHandler = require("./middleware/global/notFoundHandler");
const devLogger = require("./middleware/logging/devLogger");

const limiter = require("@/middleware/common/limiter");
const verifyAuth = require("@/middleware/auth/verifyAuth");

const app = express();

app.use(cors(config.corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(devLogger);
app.use(customMethods);

// unprotected routes
app.use("/api/auth", require("./routers/auth.router"));

// protected routes
app.use(limiter(100, 0.6));
app.use(verifyAuth);
app.use("/api/users", require("./routers/users.router"));
app.use("/api/me", require("./routers/me.router"));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
