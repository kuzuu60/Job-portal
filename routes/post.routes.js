import express from "express";
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controller/post.controller");

const router = express.Router();

router.route("/")
  .get(getJobs)
  .post(createJob);

router.route("/:id")
  .get(getJobById)
  .patch(updateJob)
  .delete(deleteJob);

module.exports = router;
