const express = require("express");

const router = express.Router();

router.get("/:boardName", require("@/controllers/boards/get"));

module.exports = router;
