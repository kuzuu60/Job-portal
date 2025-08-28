import { posts } from "../db/schema.js";
import { db } from "../db/client.js";
import { desc,eq } from "drizzle-orm";
import { generateIdBasedSlug } from "../utility/slug.js";


export const createJobPost = async (data) => {
  const inserted = await db.insert(posts).values(data).returning();
  const newPost = inserted[0];

  const slug = generateIdBasedSlug(newPost.job_title, newPost.id);

  const updated = await db
  .update(posts)
  .set({slug})
  .where(eq(posts.id, newPost.id))
  .returning();
  
  return updated[0];
};



export const getJobs = async ({ status } = {}) => {
  let query = db.select().from(posts);

  if(status) {
    query = query.where(eq(posts.job_status, status));
  }
  return await query.orderBy(desc(posts.created_at));
};


export const getJobBySlug = async (slug) => {
  const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return result[0] || null;
};

// export const getJobBySlug = async (slug, { onlyActive = false } = {}) => {
//   let query = db.select().from(posts).where(eq(posts.slug, slug)).limit(1);

//   if (onlyActive) {
//     query = query.where(eq(posts.status, "active"));
//   }

//   const result = await query;
//   return result[0] || null;
// };



export const getJobById = async (id) => {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  return result[0] || null; 
};

export const updateJobById = async (id, data) => {
  return await db
    .update(posts)
    .set({
      ...data,
    updated_at: new Date()
    })
    .where(eq(posts.id, id))
    .returning();
};


export const deleteJobById = async (id) => {
  return await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();
};
