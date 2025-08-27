import asyncHandler from "express-async-handler";
import {
  createJobPost,
  getAllJobs as getAllJobsService,
  getJobBySlug as getJobBySlugService,
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
    qualifications
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
    !qualifications 
  ) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const jobData = {
    ...req.body,
    apply_before: new Date(apply_before),
  };

  const data = await createJobPost(jobData);

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

export const getJobBySlug = asyncHandler(async (req, res) => {
  const post = await getJobBySlugService(req.params.slug);
  if (!post) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.status(200).json({
    message: "Job retrieved successfully",
    data: post,
  });
});

export const getJobById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const post = await getJobByIdService(id);
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
  const id = Number(req.params.id);
  const post = await updateJobByIdService(id, req.body);
  if (post.length === 0) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.status(200).json({
    message:'job updated',
    data:post,
  });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)
  const post = await deleteJobByIdService(id);
  if (post.length === 0) {
    res.status(404);
    throw new Error("Job post not found");
  }
  res.status(200).json({ 
    message: "Job post deleted successfully",
  deleted: post[0]
 });
});

