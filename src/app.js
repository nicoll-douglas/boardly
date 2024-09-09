require("dotenv").config({ override: true });
require("module-alias/register");
require("./models/index");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors");

const customMethods = require("./middleware/global/customMethods");
const errorHandler = require("./middleware/global/errorHandler");
const notFoundHandler = require("./middleware/global/notFoundHandler");
const devLogger = require("./middleware/logging/devLogger");

const limiter = require("@/middleware/common/limiter");
const validate = require("@/middleware/validation/validate");
const verifyAuth = require("@/middleware/auth/verifyAuth");
const initializeMainBoardAndAdmin = require("./middleware/common/initializeMainBoardAndAdmin");

const app = express();
initializeMainBoardAndAdmin();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(devLogger);
app.use(customMethods);

// unprotected routes
app.use("/api/auth", require("./routers/auth"));

// protected routes
app.use(limiter(100, 0.6));
app.use(validate.auth());
app.use(verifyAuth);
app.use("/api/me", require("./routers/me.router"));
app.use("/api/boards", require("./routers/boards.router"));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
