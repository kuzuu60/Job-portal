const asyncHandler = require("express-async-handler");
const Post = require("../modules/post.modules");

// @desc    Create a new job post
// @route   POST /api/posts
// @access  Admin only
const createJob = asyncHandler(async (req, res) => {
  // destructure all required fields from req.body if you want validation here (optional)
  const {
    job_title,
    job_description,
    Level,
    no_of_vacancy,
    Time,
    offered_salary,
    // apply_before,
    experience_required,
    skills_required,
    responsibility,
    qualifications,
    job_status,
    slug,
  } = req.body;

  
  if (!job_title || !job_description || !Level || !no_of_vacancy || !Time || !experience_required || !skills_required || !responsibility || !qualifications || !slug) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const post = await Post.create(req.body);

  res.status(201).json({
    message: "Job post created successfully",
    post,
  });
});


const getJobs = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

const getJobById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json(post);
});

const updateJob = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json(post);
});

const deleteJob = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  await post.deleteOne();
  res.json({ message: "Job post deleted successfully" });
});

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
