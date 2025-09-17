import { applyToJob as serviceApplyToJob } from "../services/application.services.js";
import cloudinary from "../utility/cloudinary.js";

export const applyToJob = async (c) => {
    console.log("Hit applyToJob route, jobId:", c.req.param("jobId"));
  try {
    const jobId = c.req.param("jobId");
    const formData = await c.req.formData();
    console.log("FormData keys:", Array.from(formData.keys()));

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const resumeFile = formData.get("resume");
    console.log({ name, email, resumeFile });

    if (!name || !email || !resumeFile) {
      return c.json({ message: "Name, email, and resume are required." }, 400);
    }

   const buffer = await resumeFile.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Upload to Cloudinary
    const uploadToCloudinary = (buffer, filename) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "resumes", resource_type: "raw", public_id: filename },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });

    const result = await uploadToCloudinary(fileBuffer, resumeFile.name);

    // Call service with plain data and uploaded URL
    const application = await serviceApplyToJob({
      jobId,
      name,
      email,
      resumeUrl: result.secure_url,
    });

    return c.json(
      { message: "Application submitted successfully", application },
      201
    );
  } catch (err) {
    console.error("Controller error:", err);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};
