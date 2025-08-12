//logic shii here (db  queries related)
//in this eg: application.controller shoudl be here
// ✅ All database logic, file uploads, external API calls, and non-trivial processing go into services/
// ❌ Controllers should only handle HTTP stuff: req, res, status codes, etc.

// application.service.js
import Application from "../modules/application.modules.js";
import cloudinary from "../utility/cloudinary.js";

export const applyToJob = async ({ name, email, resumeFile, jobId }) => {
  // Upload resume to Cloudinary
  const result = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
    folder: "resumes",
    resource_type: "raw",
  });

  // Create and return application record
  const application = await Application.create({
    job: jobId,
    name,
    email,
    resume: result.secure_url,
  });

  return application;
};
