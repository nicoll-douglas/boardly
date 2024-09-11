module.exports = {
  storageBucket: require("./firebaseStorage"),
  email: {
    sendPasswordReset: require("./email/sendResetPasswordEmail"),
    sendVerification: require("./email/sendVerificationEmail"),
  },
};
