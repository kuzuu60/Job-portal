//logic shii here (db  queries related)
//in this eg: application.controller shoudl be here
// ✅ All database logic, file uploads, external API calls, and non-trivial processing go into services/
// ❌ Controllers should only handle HTTP stuff: req, res, status codes, etc.

// import { createApplication } from "../modules/application.modules.js";
import { db } from "../db/client.js";
import { applications } from "../db/schema.js"; 
import cloudinary from "../utility/cloudinary.js";

export const applyToJob = async ({ name, email, resumeFile, postId }) => {
  const result = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
    folder: "resumes",
    resource_type: "raw",
  });

 await db
  .insert(applications)
  .values({
    post_id: postId,
    name,
    email,
    resume_url: String(result.secure_url),
  })
  
  return {
    success:true,
    message:"application read"
  };
 };
