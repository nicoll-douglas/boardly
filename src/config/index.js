module.exports = {
  corsOptions: {
    origin: process.env.HTTP_CLIENT,
    credentials: true,
    optionsSuccessStatus: 200,
  },
  imgUploads: {
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png"],
  },
  jwt: {
    accessDuration: 5 * 60 * 1000,
    refreshDuration: 28 * 24 * 60 * 60 * 1000,
    emailVerificationDuration: 24 * 60 * 60 * 1000,
    passwordResetDuration: 60 * 60 * 1000,
  },
  userRoles: {
    basic: 0,
    self: 1,
    admin: 2,
  },
};
