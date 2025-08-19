import asyncHandler from "express-async-handler";
import {
  createJobPost,
  getAllJobs as getAllJobsService,
  getJobById as getJobByIdService,
  updateJobById as updateJobByIdService,
  deleteJobById as deleteJobByIdService,
} from "../services/posts.services.js";

export const createJob = asyncHandler(async (req, res) => {
  const {
    job_title,
    job_category,
    job_description,
    job_level,
    no_of_vacancy,
    employee_type,
    offered_salary,
    apply_before,
    experience_required,
    professional_skill_required,
    responsibility,
    qualifications,
    slug,
  } = req.body;

  if (
    !job_title ||
    !job_category ||
    !job_description ||
    !job_level ||
    !no_of_vacancy ||
    !employee_type ||
    !offered_salary ||
    !apply_before ||
    !experience_required ||
    !professional_skill_required ||
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
  const posts = await getAllJobsService ();
  res.status(200).json({
    message: "Jobs retrieved successfully",
    data: posts,
  });
});

export const getJobById = asyncHandler(async (req, res) => {
  const post = await getJobByIdService(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.status(200).json({
    message:"job retrieved successfully",
    data: post,
  });
});

export const updateJob = asyncHandler(async (req, res) => {
  const post = await updateJobByIdService(req.params.id, req.body);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.status(200).json({
    message:'job updated',
    data:post,
  });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const post = await deleteJobByIdService(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.status(200).json({ message: "Job post deleted successfully" });
});

