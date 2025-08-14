import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

export const pool = new Pool({
  connectionString: "postgres://postgres:database123@localhost:5432/postgres",
});


export const db = drizzle(pool, { schema });

 
