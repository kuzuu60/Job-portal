import Post from "../modules/post.modules.js";
import { users } from "../db/schema.js";
import { db } from "../db/client.js";

// Create a job post (MongoDB)
export const createJobPost = async (data) => {
  return await Post.create(data);
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
  return await Post.findById(id);
};

// Update job by ID (MongoDB)
export const updateJobById = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete job by ID (MongoDB)
export const deleteJobById = async (id) => {
  const post = await Post.findById(id);
  if (!post) return null;
  await post.deleteOne();
  return post;
};
