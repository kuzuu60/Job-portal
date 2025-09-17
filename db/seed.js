import { db, pool } from "./client.js";
import { jobs, applications } from "./schema.js";
import { eq } from "drizzle-orm";
import { generateIdBasedSlug } from "../utility/slug.js";

// ------------------------
// Seed Jobs
// ------------------------
async function seedJobs() {
  const seedJobsData = [
    {
      job_title: "Frontend Developer",
      job_category: "Engineering",
      job_description: "Build and maintain UI for web applications",
      job_level: "Junior",
      no_of_vacancy: 3,
      employee_type: "Full-time",
      offered_salary: 55000.0,
      apply_before: new Date("2025-09-01"),
      experience_required: "1 year",
      professional_skill_required: "HTML, CSS, JavaScript, React",
      responsibility: "Develop features, fix bugs, write tests",
      qualifications: "Bachelor in CS or related field",
      job_status: "active",
    },
    {
      job_title: "Backend Developer",
      job_category: "Engineering",
      job_description: "Develop API and database logic",
      job_level: "Mid",
      no_of_vacancy: 2,
      employee_type: "Full-time",
      offered_salary: 65000.0,
      apply_before: new Date("2025-09-15"),
      experience_required: "2 years",
      professional_skill_required: "Node.js, PostgreSQL, REST APIs",
      responsibility: "Build backend services and maintain DB",
      qualifications: "Bachelor in CS or related field",
      job_status: "active",
    },
    {
      job_title: "Backend Developer",
      job_category: "Engineering",
      job_description: "Develop API and database logic",
      job_level: "Mid",
      no_of_vacancy: 2,
      employee_type: "Full-time",
      offered_salary: 65000.0,
      apply_before: new Date("2025-09-15"),
      experience_required: "2 years",
      professional_skill_required: "Node.js, PostgreSQL, REST APIs",
      responsibility: "Build backend services and maintain DB",
      qualifications: "Bachelor in CS or related field",
      job_status: "active",
    },
  ];

  // Map to store inserted job IDs
  const jobIdMap = {};

  for (const job of seedJobsData) {
    // Check for existing job with same title + status
    const existing = await db
      .select()
      .from(jobs)
      .where(eq(jobs.job_title, job.job_title))
      .where(eq(jobs.job_status, job.job_status));

    if (existing.length === 0) {
      // Insert job without slug first
      const inserted = await db.insert(jobs).values(data).returning();
      const id = inserted[0].id;

      // Generate slug using actual DB id
      const slug = generateIdBasedSlug(job.job_title, id);

      // Update row with slug
      await db.update(jobs).set({ slug }).where(eq(jobs.id, id));

      // Save ID for mapping to applications
      jobIdMap[job.job_title + job.job_status] = id;

      console.log(`✅ Inserted job with slug: ${slug}`);
    } else {
      console.log(`⚠️ Job already exists, skipped: ${job.job_title} (${job.job_status})`);
      // Map existing ID as well
      jobIdMap[job.job_title + job.job_status] = existing[0].id;
    }
  }

  return jobIdMap; // Return map for application seeding
}

// ------------------------
// Seed Applications
// ------------------------
async function seedApplications(jobIdMap) {
  const seedApplicationsData = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      resume_url: "https://resumes.example.com/alice.pdf",
      job_id: jobIdMap["Frontend Developeractive"],
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      resume_url: "https://resumes.example.com/bob.pdf",
      job_id: jobIdMap["Backend Developeractive"],
    },
  ];

  for (const app of seedApplicationsData) {
    const existing = await db
      .select()
      .from(applications)
      .where(eq(applications.email, app.email))
      .where(eq(applications.job_id, app.job_id));

    if (existing.length === 0) {
      const inserted = await db.insert(applications).values(app).returning();
      console.log(`✅ Inserted application: ${inserted[0].name}`);
    } else {
      console.log(`⚠️ Application already exists, skipped: ${app.name} for job ${app.job_id}`);
    }
  }
}

// ------------------------
// Main Seed Function
// ------------------------
async function seed() {
  try {
    const jobIdMap = await seedJobs();       // Seed jobs first
    await seedApplications(jobIdMap);        // Then seed applications
    console.log("🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally { 
  }
}

// Run seeding
seed();
