const corsOptions = {
  origin: process.env.HTTP_CLIENT,
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
