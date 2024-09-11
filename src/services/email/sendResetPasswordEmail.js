const jwt = require("jsonwebtoken");
const transporter = require("./mailTransport");
const { PASSWORD_RESET_DURATION } = require("@/config/JWT");

async function sendResetPasswordEmail(email, id) {
  const token = jwt.sign(
    {
      id,
      exp: Math.floor((Date.now() + PASSWORD_RESET_DURATION) / 1000),
    },
    process.env.JWT_SECRET
  );

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Lorem Password Reset",
    html: `<a target="_blank" href="${process.env.HTTP_CLIENT}/auth/reset?token=${token}">reset password</a>`,
  });
}

module.exports = sendResetPasswordEmail;
