const express = require("express");
const usersController = require("@/controllers/users.controller");
const checkIfSelf = require("@/middleware/auth/checkIfSelf");

const router = express.Router();

router.get("/:username", checkIfSelf({ reject: false }), usersController._get);

module.exports = router;
