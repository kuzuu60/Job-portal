import {
  createJobPost,
  getJobs as getJobsService,
  getJobBySlug as getJobBySlugService,
  getJobById as getJobByIdService,
  updateJobById as updateJobByIdService,
  deleteJobById as deleteJobByIdService,
} from "../services/job.services.js";

export const createJob = async (c) => {
  const body = await c.req.json();

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
  } = body;

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
    return c.json({ message: "Please provide all required fields" }, 400);
  }

  const jobData = {
    ...body,
    apply_before: new Date(apply_before),
  };

  const data = await createJobPost(jobData);

  return c.json(
    {
      message: "Job post created successfully",
      data,
    },
    201
  );
};

export const getActiveJobs = async (c) => {
  const jobs = await getJobsService({ status: "active" });
  return c.json(
    {
      message: "Jobs retrieved successfully",
      data: jobs,
    },
    200
  );
};

export const getAllJobs = async (c) => {
  const jobs = await getJobsService();
  return c.json(
    {
      message: "Jobs retrieved successfully",
      data: jobs,
    },
    200
  );
};

export const getJobBySlug = async (c) => {
  const slug = c.req.param("slug");
  const job = await getJobBySlugService(slug);

  if (!job) {
    return c.json({ message: "Job post not found" }, 404);
  }

  return c.json(
    {
      message: "Job retrieved successfully",
      data: job,
    },
    200
  );
};

export const getJobById = async (c) => {
  const id = Number(c.req.param("id"));
  const job = await getJobByIdService(id);

  if (!job) {
    return c.json({ message: "Job post not found" }, 404);
  }

  return c.json(
    {
      message: "Job retrieved successfully",
      data: job,
    },
    200
  );
};

export const updateJob = async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const job = await updateJobByIdService(id, body);

  if (job.length === 0) {
    return c.json({ message: "Job post not found" }, 404);
  }

  return c.json(
    {
      message: "Job updated",
      data: job,
    },
    200
  );
};

export const deleteJob = async (c) => {
  const id = Number(c.req.param("id"));
  const job = await deleteJobByIdService(id);

  if (job.length === 0) {
    return c.json({ message: "Job post not found" }, 404);
  }

  return c.json(
    {
      message: "Job post deleted successfully",
      deleted: job[0],
    },
    200
  );
};
