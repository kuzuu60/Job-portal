import express from "express";
import { applyToJob } from "../controller/application.controller.js";

const router = express.Router();

router.post("/:postId", applyToJob);

export default router;


