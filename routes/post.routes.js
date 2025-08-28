import express from "express";
import {
  createJob,
  getAllJobs,
  getActiveJobs,
  getJobBySlug,
  getJobById,
  updateJob,
  deleteJob,
} from "../controller/post.controller.js"

const router = express.Router();

router.route("/")
  .get(getAllJobs)
  .post(createJob);

router.route("/frontend")
  .get(getActiveJobs);

router.route("/:id")
  .get(getJobById)
  .patch(updateJob)
  .delete(deleteJob);

router.route("/slug/:slug").get(getJobBySlug);

export default router;
