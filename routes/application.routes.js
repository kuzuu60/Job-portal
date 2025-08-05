const express = require("express");
const { applyToJob } = require("../controller/application.controller");

const router = express.Router();

router.post("/:jobId", applyToJob);

module.exports = router;
