import asyncHandler from "express-async-handler";
import {createJobPost} from "../services/posts.services.js"

export const createJob = asyncHandler(async (req, res) => {
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

  const data = await createJobPost(req.body)

  res.status(201).json({
    message: "Job post created successfully",
    data,
  });
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const posts = await post.getAllJobs();
  res.json(200).json({
    message: "Jobs retrieved successfully",
    data: posts,
  });
});

export const getJobById = asyncHandler(async (req, res) => {
  const post = await post.getJobById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json(200).json({
    message:"job retrieved successfully",
    data: post,
  });
});

export const updateJob = asyncHandler(async (req, res) => {
  const post = await post.updateJobById(req.params.id, req.body);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json(post);
});

export const deleteJob = asyncHandler(async (req, res) => {
  const post = await post.deleteJobById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.json({ message: "Job post deleted successfully" });
});

