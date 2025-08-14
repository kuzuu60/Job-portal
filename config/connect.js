import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema.js"; // adjust the path if needed

export const connectDB = async () => {
  const postgresUrl = process.env.DATABASE_URL || "postgres://postgres:database123@localhost:5432/postgres";

  try {
    const pool = new Pool({ connectionString: postgresUrl });
    const db = drizzle(pool, { schema });

    console.log("✅ PostgreSQL connected successfully");
    return { db, pool };
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL:", error);
    process.exit(1);
  }
};
