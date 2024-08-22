const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const logger = require("@/middleware/logging/winston");

logger.info("Initializing firebase app...");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
logger.info("Firebase app initialized");

const bucket = admin.storage().bucket();

module.exports = bucket;
