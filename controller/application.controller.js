import { applyToJob as serviceApplyToJob } from "../services/application.services.js";

export const applyToJob = async (c) => {
  // Get params
  const postId = c.req.param("postId");

  // Parse form data (needed for file uploads)
  const formData = await c.req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const resumeFile = formData.get("resume"); // File object

  // Validation
  if (!name || !email || !resumeFile) {
    return c.json({ message: "Name, email, and resume are required." }, 400);
  }

  // Call service
  const application = await serviceApplyToJob({
    name,
    email,
    resumeFile,
    postId,
  });

  return c.json(
    {
      message: "Application submitted successfully.",
      application,
    },
    201
  );
};
