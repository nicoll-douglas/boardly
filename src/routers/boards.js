const express = require("express");

const router = express.Router();

router.get("/main", require("@/controllers/boards/main/get"));

module.exports = router;
