// post.modules.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    job_title: { type: String, required: true, trim: true },
    job_description: { type: String, required: true },
    Level: {
      type: String,
      enum: ["Intern", "Junior", "Mid", "Senior", "Lead"],
      required: true,
    },
    no_of_vacancy: { type: Number, required: true, min: 1 },
    Time: {
      type: String,
      enum: ["Full Time", "Part Time", "Contract", "Internship"],
      required: true,
    },
    offered_salary: { type: Number, default: 0 },
    // apply_before: { type: Date, required: true },
    experience_required: { type: String, required: true },
    skills_required: { type: [String], required: true },
    responsibility: { type: [String], required: true },
    qualifications: { type: [String], required: true },
    job_status: {
      type: String,
      enum: ["Active", "Inactive", "Closed"],
      default: "Active",
    },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post
