import { Hono } from "hono";
import {
  createJob,
  getAllJobs,
  getActiveJobs,
  getJobBySlug,
  getJobById,
  updateJob,
  deleteJob,
} from "../controller/job.controller.js"

const router = new Hono();

router.get("/",getAllJobs);
router.post("/",createJob);

router.get("/frontend",getActiveJobs);
router.get("/slug/:slug",getJobBySlug);

router.get("/:id",getJobById);
router.patch("/:id",updateJob);
router.delete("/:id",deleteJob);
  
router.patch("/:id/")

export default router;
