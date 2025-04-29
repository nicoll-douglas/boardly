const express = require("express");
const validate = require("@/middleware/validation/validate");
const profileSchema = require("@/validation/profile.schema");
const handleImage = require("@/middleware/common/handleImage");
const userController = require("@/controllers/users.controller");
const authSchemas = require("@/validation/auth.schema");
const limiter = require("@/middleware/common/limiter");

const router = express.Router();

router
  .get("/", userController.getUser({ me: true }))
  .get("/boards", userController.boards.getAllBoards({ me: true }))
  .get("/replies", userController.replies.getAllReplies({ me: true }))
  .get("/threads", userController.threads.getAllThreads({ me: true }))
  .patch("/", validate.body(profileSchema), userController.updateUser)
  .put(
    "/avatar",
    handleImage.one("avatar"),
    validate.image(),
    userController.avatar.updateAvatar
  )
  .delete("/avatar", userController.avatar.deleteAvatar)
  .patch(
    "/password",
    limiter(),
    validate.body(authSchemas.change),
    userController.password.changePassword
  )
  .delete(
    "/",
    limiter(),
    validate.body(authSchemas.deleteAccount),
    userController.deleteUser
  );

module.exports = router;
