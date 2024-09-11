module.exports = {
  storageBucket: require("./firebaseStorage"),
  email: {
    sentPasswordReset: require("./email/sendResetPasswordEmail"),
    sentVerification: require("./email/sendVerificationEmail"),
  },
};
