import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import postRoutes from "./routes/post.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { users } from "./db/schema.js"; // your Drizzle users table

dotenv.config();

const app = express();
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool); // Export db so you can import it elsewhere

// Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/posts", postRoutes);

// Example users endpoint (PostgreSQL with Drizzle)
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db.insert(users).values({ name, email }).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
