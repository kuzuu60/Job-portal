// ❌ Controllers should only handle HTTP stuff: req, res, status codes, etc.
import asyncHandler from "express-async-handler";
import applicationService from "../services/application.services";

// @route   POST /api/applications/:jobId
// @access  Public
exports.applyToJob = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const { jobId } = req.params;

  // Basic validation
  if (!name || !email || !req.files || !req.files.resume) {
    return res.status(400).json({ message: "Name, email, and resume are required." });
  }

  const resumeFile = req.files.resume;

  const application = await applicationService.applyToJob({
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
