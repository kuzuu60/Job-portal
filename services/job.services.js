import { jobs } from "../db/schema.js";
import { db } from "../db/client.js";
import { desc,eq } from "drizzle-orm";
import { generateIdBasedSlug } from "../utility/slug.js";


export const createJobPost = async (data) => {
  const inserted = await db.insert(jobs).values(data).returning();
  const newJob = inserted[0];

  const slug = generateIdBasedSlug(newJob.job_title, newJob.id);

  const updated = await db
  .update(jobs)
  .set({slug})
  .where(eq(jobs.id, newJob.id))
  .returning();
  
  return updated[0];
};



export const getJobs = async ({ status } = {}) => {
  let query = db.select().from(jobs);

  if(status) {
    query = query.where(eq(jobs.job_status, status));
  }
  return await query.orderBy(desc(jobs.created_at));
};


export const getJobBySlug = async (slug) => {
  const result = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);
  return result[0] || null;
};

// export const getJobBySlug = async (slug, { onlyActive = false } = {}) => {
//   let query = db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);

//   if (onlyActive) {
//     query = query.where(eq(jobs.status, "active"));
//   }

//   const result = await query;
//   return result[0] || null;
// };



export const getJobById = async (id) => {
  const result = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, id))
    .limit(1);

  return result[0] || null; 
};

export const updateJobById = async (id, data) => {
  console.log("🚀 ~ updateJobById ~ id:", id)
  console.log("🚀 ~ updateJobById ~ data:", data)
  return await db
    .update(jobs)
    .set({
      ...data,
    updated_at: new Date()
    })
    .where(eq(jobs.id, id))
    .returning();
};


export const deleteJobById = async (id) => {
  return await db
    .delete(jobs)
    .where(eq(jobs.id, id))
    .returning();
};
