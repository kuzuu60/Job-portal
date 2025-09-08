import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: "postgres://postgres:database123@localhost:5432/postgres",
});


export const db = drizzle(pool, { schema });

export const connectDB = async () => {
  try {
    await pool.query("SELECT 1"); 
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); 
  }
};
