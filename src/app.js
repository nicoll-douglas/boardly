require("dotenv").config({ override: true });
require("module-alias/register");
require("./models/index");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/cors");
const customMethods = require("./middleware/common/customMethods");
const errorHandler = require("./middleware/common/errorHandler");
const notFoundHandler = require("./middleware/common/notFoundHandler");
const limiter = require("@/middleware/common/limiter");
const validateHTTPAuth = require("@/middleware/validation/validateHTTPAuth");
const verifyAuth = require("@/middleware/auth/verifyAuth");
const requestLogger = require("./middleware/logging/requestLogger");
const initializeMainBoardAndAdmin = require("./middleware/common/initializeMainBoardAndAdmin");

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(customMethods);
app.use(initializeMainBoardAndAdmin);

// unprotected routes
app.use("/api/auth", require("./routers/auth"));

// protected routes
app.use(limiter(100, 0.6));
app.use(validateHTTPAuth);
app.use(verifyAuth);
app.use("/api/me", require("./routers/me"));
app.use("/api/boards", require("./routers/boards"));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
