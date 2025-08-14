//logic shii here (db  queries related)
//in this eg: application.controller shoudl be here
// ✅ All database logic, file uploads, external API calls, and non-trivial processing go into services/
// ❌ Controllers should only handle HTTP stuff: req, res, status codes, etc.

// import { createApplication } from "../modules/application.modules.js";
import { db } from "../db/client.js";
import { applications } from "../db/schema.js"; 
import cloudinary from "../utility/cloudinary.js";

export const applyToJob = async ({ name, email, resumeFile, jobId }) => {
  const result = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
    folder: "resumes",
    resource_type: "raw",
  });

const application = await db
.insert(applications)
.values({
    job_id: jobId,
    name,
    email,
    resume: result.secure_url,
  });

  return application;
 };
