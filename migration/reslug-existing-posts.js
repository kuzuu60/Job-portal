//one time code to remove the slug inconsistency since the old and later updated slug codes gave different slug values

// import { db } from "../db/client.js";
// import { posts as postsTable } from "../db/schema.js";
// import { generateIdBasedSlug } from "../utility/slug.js";
// import { eq } from "drizzle-orm";

// async function reslugPosts() {
//   const allPosts = await db.select().from(postsTable);

//   for (const post of allPosts) {
//     // Generate new slug based on title + id for uniqueness
//     const slug = generateIdBasedSlug(post.job_title, post.id);

//     await db
//       .update(postsTable)
//       .set({ slug })
//       .where(eq(postsTable.id, post.id));

//     console.log(`Re-slugged post ID ${post.id}: ${slug}`);
//   }

//   console.log("✅ All posts reslugged with ID-based slugs!");
// }

// // Run the script
// reslugPosts()
//   .then(() => process.exit())
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });
