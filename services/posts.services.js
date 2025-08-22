import { posts } from "../db/schema.js";
import { db } from "../db/client.js";
import { eq } from "drizzle-orm";
// import slugify from "slugify";

export const createJobPost = async (data) => {
  const result = await db.insert(posts).values(data).returning();
  return result[0] || null;
};

// export const createJobPost = async (data) => {
//   let baseSlug = slugify(data.job_title, { lower: true, strict: true });
//   let slug = baseSlug;
//   let counter = 1;

//   while (true) {
//     const existing = await db
//       .select()
//       .from(posts)
//       .where(eq(posts.slug, slug))
//       .limit(1);

//     if (existing.length === 0) break; 
//     slug = `${baseSlug}-${counter++}`; 
//   }

//   const result = await db
//     .insert(posts)
//     .values({ ...data, slug })
//     .returning();

//   return result[0];
// };


export const getAllJobs = async () => {
  return await db.select().from(posts);
};

// export const getJobBySlug = async (slug) => {
//   const result = await db
//     .select()
//     .from(posts)
//     .where(eq(posts.slug, slug))
//     .limit(1);

//   return result[0] || null;
// };


export const getJobById = async (id) => {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  return result[0] || null; // Return single object or null
};

export const updateJobById = async (id, data) => {
  return await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, id))
    .returning();
};


export const deleteJobById = async (id) => {
  return await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();
};
