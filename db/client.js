import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

const pool = new Pool({
  connectionString: "postgres://postgres:database123@localhost:5432/postgres",
});


const db = drizzle(pool, { schema });

export {db,pool};
