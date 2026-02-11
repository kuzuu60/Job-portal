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


  const jobSlugMap = {};

  for (const job of seedJobsData) {
    // Insert job with default slug
    const inserted = await db.insert(jobs).values(job).returning();
    const id = inserted[0].id;

    // Generate real slug
    const slug = generateIdBasedSlug(job.job_title, id);

    // Update slug
    await db.update(jobs).set({ slug }).where(eq(jobs.id, id));

    // Save mapping by job title (or anything unique you want)
    jobSlugMap[slug] = id;

    console.log(`✅ Job seeded: ${job.job_title} → slug: ${slug}`);
  }

  return jobSlugMap;
}
// ------------------------
// Seed Applications
// ------------------------
async function seedApplications(jobSlugMap) {
  const seedApplicationsData = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      resume_url: "https://resumes.example.com/alice.pdf",
      job_slug: "frontend-developer-1",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      resume_url: "https://resumes.example.com/bob.pdf",
      job_slug: "backend-developer-2",
    },
     {
      name: "Charlie Davis",
      email: "charlie@example.com",
      resume_url: "https://resumes.example.com/charlie.pdf",
      job_slug: "backend-developer-3",
    },
  ];

  for (const app of seedApplicationsData) {
    const job_id = jobSlugMap[app.job_slug];
    if (!job_id) {
      console.warn(`⚠️ Skipping ${app.name}, job slug not found: ${app.job_slug}`);
      continue;
    }

    await db.insert(applications).values({
      name: app.name,
      email: app.email,
      resume_url: app.resume_url,
      job_id,
    });

    console.log(`📄 Application seeded for ${app.name} → Job slug ${app.job_slug}`);
  }
}

// ------------------------
// Main Seed Function
// ------------------------
async function seed() {
  try {
    const jobSlugMap = await seedJobs();       // Seed jobs first
    await seedApplications(jobSlugMap);        // Then seed applications
    console.log("🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally { 
  }
}

// Run seeding
seed();
