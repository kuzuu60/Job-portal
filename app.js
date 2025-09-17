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
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
// console.log(" Application routes mounted at /api/applications");


app.route("/api/applications", applicationRoutes);
app.route("/api/jobs", jobRoutes);


export default app;
