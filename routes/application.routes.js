// application.routes.js
import express from "express";
import { applyToJob } from "../controller/application.controller.js";

const router = express.Router();

router.post("/:jobId", applyToJob);

export default router;
