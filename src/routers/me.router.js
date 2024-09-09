const express = require("express");
const processImg = require("@/middleware/common/imgUploads");
const validate = require("@/middleware/validation/validate");
const profileSchema = require("@/lib/validationSchemas/profile");
const avatarController = require("@/controllers/me/avatar.controller");

const router = express.Router();

router.get("/", require("@/controllers/me/get"));
router.post(
  "/profile/info",
  validate.body(profileSchema),
  require("@/controllers/me/profile/info/post")
);
router
  .delete("/avatar", avatarController._delete)
  .put(
    "/avatar",
    processImg("avatar"),
    validate.image({ optional: true }),
    avatarController._put
  );

module.exports = router;
