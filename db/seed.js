import { db, pool } from "./client.js";
import { applications} from "./schema.js";
import { posts } from "./schema.js";
// import { users } from "./schema.js";

// async function seedUsers() {
//   try {
//     const inserted = await db.insert(users).values([
//       { name: "Naruto Uzumaki", email: "naruto@example.com" },
//       { name: "Sasuke Uchiha", email: "sasuke@example.com" },
//       { name: "Sakura Haruno", email: "sakura@example.com" },
//     ]).returning();

//     console.log("✅ Seeded users:", inserted);
//   } catch (error) {
//     console.error("❌ Seeding error:", error);
//   }finally{
//     pool.end()
//   }
// }

async function seedPosts() {
  try {
    const inserted = await db.insert(posts).values([
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
    ]).returning();

    console.log("✅ Seeded posts:", inserted);
  } catch (error) {
    console.error("❌ Seeding posts error:", error);
  }
}

async function seedApplications() {
  try {
    const inserted = await db.insert(applications).values([
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
    ]).returning();

    console.log("✅ Seeded applications:", inserted);
  } catch (error) {
    console.error("❌ Seeding applications error:", error);
  }
}

async function seed() {
  await seedPosts();
  await seedApplications();
  console.log('seeded');
  pool.end(); 
}

seed();


