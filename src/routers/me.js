const express = require("express");
const processImg = require("@/middleware/common/imgUploads");
const validateBody = require("@/middleware/validation/validateBody");
const profileSchema = require("@/lib/validationSchemas/profile");
const validateImg = require("@/middleware/validation/validateImg");

const router = express.Router();

router.get("/", require("@/controllers/me/get"));
router.post(
  "/profile/info",
  validateBody(profileSchema),
  require("@/controllers/me/profile/info/post")
);
router.delete(
  "/profile/avatar",
  require("@/controllers/me/profile/avatar/delete")
);
router.put(
  "/profile/avatar",
  processImg("avatar"),
  validateImg({ optional: true }),
  require("@/controllers/me/profile/avatar/put")
);

module.exports = router;
