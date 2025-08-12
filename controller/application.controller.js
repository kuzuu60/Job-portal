import asyncHandler from "express-async-handler";
import { applyToJob as serviceApplyToJob } from "../services/application.services.js";

export const applyToJob = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const { jobId } = req.params;

  if (!name || !email || !req.files || !req.files.resume) {
    return res.status(400).json({ message: "Name, email, and resume are required." });
  }

  const resumeFile = req.files.resume;

  const application = await serviceApplyToJob({
    name,
    email,
    resumeFile,
    jobId,
  });

  res.status(201).json({
    message: "Application submitted successfully.",
    applicationId: application._id,
  });
});
