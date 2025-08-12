import { users,posts } from "../db/schema.js";
import { db } from "../db/client.js";
import { eq } from "drizzle-orm";

// Create a job post (MongoDB)
export const createJobPost = async (data) => {
  return await db.insert(posts).values[data]
};

// Get all job posts (Postgres example here, probably needs adjusting)
export const getAllJobs = async () => {
  return await db.insert(users).values([
    {
      name: "",
      password // ⚠ This is undefined right now — you probably want to pass a real value
    }
  ]);
};

// Get a job by ID (MongoDB)
export const getJobById = async (id) => {
  return await db.select().from(posts).where(eq(posts.id,id))
};

// Update job by ID (MongoDB)
export const updateJobById = async (id, data) => {

  return await db.update(posts).set(data).where(eq(posts.id,id))
};

// Delete job by ID (MongoDB)
// export const deleteJobById = async (id) => {
//   const post = await Post.findById(id);
//   if (!post) return null;
//   await post.deleteOne();
//   return post;
// };
