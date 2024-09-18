const express = require("express");
const meController = require("@/controllers/me/me.controller");
const validate = require("@/middleware/validation/validate");
const profileSchema = require("@/validation/profile.schema");

const router = express.Router();

router
  .get("/boards", require("@/controllers/me/boards.controller")._get)
  .get("/replies", require("@/controllers/me/replies.controller")._get())
  .get("/threads", require("@/controllers/me/threads.controller")._get())
  .get("/", meController._get())
  .patch("/", validate.body(profileSchema), meController._patch);

module.exports = router;
