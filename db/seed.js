import { db, pool } from "./client.js";
import { applications, posts } from "./schema.js";
import { eq } from "drizzle-orm";

// Helper: insert only if the post doesn't already exist
async function seedPosts() {
  const seedPosts = [
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
      job_status: "inactive",
    },
  ];

  for (const post of seedPosts) {
    const existing = await db
      .select()
      .from(posts)
      .where(eq(posts.job_title, post.job_title));

    if (existing.length === 0) {
      const inserted = await db.insert(posts).values(post).returning();
      console.log("✅ Inserted post:", inserted[0].job_title);
    } else {
      console.log("⚠️ Post already exists, skipped:", post.job_title);
    }
  }
}

// Helper: insert applications only if email for that post doesn't exist
async function seedApplications() {
  const seedApplications = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      resume_url: "https://resumes.example.com/alice.pdf",
      post_id: 1,
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      resume_url: "https://resumes.example.com/bob.pdf",
      post_id: 2,
    },
  ];

  for (const app of seedApplications) {
    const existing = await db
      .select()
      .from(applications)
      .where(eq(applications.email, app.email))
      .where(eq(applications.post_id, app.post_id));

    if (existing.length === 0) {
      const inserted = await db.insert(applications).values(app).returning();
      console.log("✅ Inserted application:", inserted[0].name);
    } else {
      console.log(
        `⚠️ Application already exists, skipped: ${app.name} for post ${app.post_id}`
      );
    }
  }
}

async function seed() {
  await seedPosts();
  await seedApplications();
  console.log("🎉 Seeding complete!");
  pool.end();
}

seed();


//what do u mean i want break free from the boredom
//i want to be more active but idk why im being so lethargic 
//i hope better times will come 
//else ill start doing this shi on my own with 
//after ill im a man the feelings dont matter
//must do what i must do regardless 