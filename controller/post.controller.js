import asyncHandler from "express-async-handler";
import postService from "../services/posts.services";


const createJob = asyncHandler(async (req, res) => {
  const {
    job_title,
    job_description,
    Level,
    no_of_vacancy,
    Time,
    offered_salary,
    experience_required,
    skills_required,
    responsibility,
    qualifications,
    job_status,
    slug,
  } = req.body;

  if (
    !job_title ||
    !job_description ||
    !Level ||
    !no_of_vacancy ||
    !Time ||
    !experience_required ||
    !skills_required ||
    !responsibility ||
    !qualifications ||
    !slug
  ) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const post = await postService.createJobPost(req.body);

  res.status(201).json({
    message: "Job post created successfully",
    post,
  });
});

const getJobs = asyncHandler(async (req, res) => {
  const posts = await postService.getAllJobs();
  res.json(posts);
});

const getJobById = asyncHandler(async (req, res) => {
  const post = await postService.getJobById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json(post);
});

const updateJob = asyncHandler(async (req, res) => {
  const post = await postService.updateJobById(req.params.id, req.body);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json(post);
});

const deleteJob = asyncHandler(async (req, res) => {
  const post = await postService.deleteJobById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json({ message: "Job post deleted successfully" });
});

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
