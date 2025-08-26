import { db } from "../db/client.js";
import { posts as postsTable } from "../db/schema.js";
import { generateUniqueSlug } from "../utility/slug.js";
import { eq } from "drizzle-orm"; // needed for comparisons

async function addSlugsToExistingPosts() {
  const allPosts = await db.select().from(postsTable);

  for (const post of allPosts) {
    if (post.slug && post.slug !== "") continue; // skip if slug exists

    const slug = await generateUniqueSlug(post, db, postsTable);

    await db.update(postsTable)
      .set({ slug })
      .where(eq(postsTable.id, post.id)); // use eq helper

    console.log(`Updated post ID ${post.id} with slug: ${slug}`);
  }

  console.log("All slugs generated!");
}

addSlugsToExistingPosts()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
