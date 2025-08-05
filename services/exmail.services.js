//logic shii here (db  queries related)
//in this eg: application.controller shoudl be here

const Application = require("../modules/application.modules.js");
const cloudinary = require("../utility/cloudinary.js");

const applyToJob = async ({ name, email, resumeFile, jobId }) => {
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

module.exports = {
  applyToJob,
};
