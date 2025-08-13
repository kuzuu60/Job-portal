import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  // updateJob,
  // deleteJob,
} from "../controller/post.controller.js"

const router = express.Router();

router.route("/")
  .get(getAllJobs)
  .post(createJob);

router.route("/:id")
  .get(getJobById)
//   .patch(updateJob)
//   .delete(deleteJob);

export default router;
