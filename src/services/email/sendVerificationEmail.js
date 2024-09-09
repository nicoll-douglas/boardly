const jwt = require("jsonwebtoken");
const transporter = require("@/config/mailTransport");
const { EMAIL_VERIFICATION_DURATION } = require("@/config/JWT");

async function sendVerificationEmail(email, id) {
  const token = jwt.sign(
    {
      id,
      exp: Math.floor((Date.now() + EMAIL_VERIFICATION_DURATION) / 1000),
    },
    process.env.JWT_SECRET
  );

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Lorem Email Verification",
    html: `<a target="_blank" href="${process.env.CLIENT_URL}/auth/verify/${token}">verify</a>`,
  });
}

module.exports = sendVerificationEmail;
