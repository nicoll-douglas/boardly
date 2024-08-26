const express = require("express");

const router = express.Router();

router.get("/:boardID", require("@/controllers/boards/get"));

module.exports = router;
