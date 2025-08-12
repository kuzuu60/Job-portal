import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
// import { applications } from "./application.table.js";  

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

export async function createApplication({ job_id, name, email, resume }) {
  const [application] = await db
    .insert(applications)
    .values({ job_id, name, email, resume })
    .returning();
  return application;
}

export async function findApplicationById(id) {
  const application = await db
    .select()
    .from(applications)
    .where(applications.id.eq(id));
  return application;
}

export { applications };
