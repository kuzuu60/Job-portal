import dotenv from "dotenv";
import { serve } from "@hono/node-server";

import app from "./app.js";
import { connectDB } from "./db/client.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  serve({
    fetch: app.fetch,
    port: Number(PORT),
    onListen: ({ port }) => {
      console.log(`🚀 Server listening on http://localhost:${port}`);
    },
  });
});
