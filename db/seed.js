const { db, pool } = require("./client");
const { users } = require("./schema");

async function seedUsers() {
  try {
    const inserted = await db.insert(users).values([
      { name: "Naruto Uzumaki", email: "naruto@example.com" },
      { name: "Sasuke Uchiha", email: "sasuke@example.com" },
      { name: "Sakura Haruno", email: "sakura@example.com" },
    ]).returning();

    console.log("✅ Seeded users:", inserted);
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }finally{
    pool.end()
  }
}

seedUsers();
