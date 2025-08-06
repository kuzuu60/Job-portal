const Post = require("../modules/post.modules");
const {users} = require("../db/schema")
const {db} = require("../db/client")
// Create a job post
const createJobPost = async (data) => {
  return await Post.create(data);
};

// Get all job posts
const getAllJobs = async () => {
  return await db.insert(users).values([{
    name:"",
    password
  }])
};

// Get a job by ID
const getJobById = async (id) => {
  return await Post.findById(id);
};

// Update job by ID
const updateJobById = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete job by ID
const deleteJobById = async (id) => {
  const post = await Post.findById(id);
  if (!post) return null;
  await post.deleteOne();
  return post;
};

module.exports = {
  createJobPost,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
};
