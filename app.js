
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors"
import dotenv from "dotenv";

import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.routes.js";

dotenv.config();

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

console.log("✅ Application routes mounted at /api/applications");


app.use("/api/applications", applicationRoutes);
app.use("/api/jobs", jobRoutes);

export default app;
