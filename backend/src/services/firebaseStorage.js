const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-service-account.json");
const logger = require("@/middleware/logging/logger");

logger.info("Initializing firebase app...");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
logger.info("Firebase app initialized");

const bucket = admin.storage().bucket();

module.exports = bucket;
