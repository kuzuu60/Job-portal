const asyncHandler = require("express-async-handler");
const Application = require("../modules/application.modules.js");
const cloudinary = require("../utility/cloudinary.js");

// POST /api/applications/:jobId
exports.applyToJob = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const { jobId } = req.params;

  // Validate inputs
  if (!name || !email || !req.files || !req.files.resume) {
    return res.status(400).json({ message: "Name, email, and resume are required." });
  }

  const resumeFile = req.files.resume;

  // Upload resume to Cloudinary
  const result = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
    folder: "resumes",
    resource_type: "raw",
  });

  // Create application record
  const application = await Application.create({
    job: jobId,
    name,
    email,
    resume: result.secure_url,
  });

  res.status(201).json({
    message: "Application submitted successfully.",
    applicationId: application._id,
  });
});
