import express from "express";
import {
  createJob,
  // getJobs,
  // getJobById,
  // updateJob,
  // deleteJob,
} from "../controller/post.controller.js"

const router = express.Router();

router.route("/")
  // .get(getJobs)
  .post(createJob);

// router.route("/:id")
//   .get(getJobById)
//   .patch(updateJob)
//   .delete(deleteJob);

export default router;
