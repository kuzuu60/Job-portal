// app.js
import express from "express";
import postRoutes from "./routes/post.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import mongoose from "mongoose";
import { db } from "./db/client.js";
import { users } from "./db/schema.js"; // assuming your users table is here
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });

// Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/posts", postRoutes);

// Example users endpoint (Postgres with Drizzle)
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
  console.log("listening...");
});
