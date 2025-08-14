import { posts } from "../db/schema.js";
import { db } from "../db/client.js";
import { eq } from "drizzle-orm";

export const createJobPost = async (data) => {
  return await db.insert(posts).values(data).returning();
};

export const getAllJobs = async () => {
  return await db.select().from(posts);
};

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
