import { Hono } from "hono";
import { applyToJob } from "../controller/application.controller.js";

const router = new Hono();

router.get("/test", (c) => c.text("Applications route is working"));

router.post("/:jobId", applyToJob);


export default router;


