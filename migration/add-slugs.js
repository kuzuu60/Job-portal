import { db } from "../db/client.js";
import { posts as postsTable } from "../db/schema.js";
import { generateIdBasedSlug } from "../utility/slug.js";
import { eq } from "drizzle-orm"; 

async function addSlugsToExistingPosts() {
  const allPosts = await db.select().from(postsTable);

  for (const post of allPosts) {
    if (post.slug && post.slug !== "") continue; 

    const slug = await generateIdBasedSlug(post, db, postsTable);

    await db.update(postsTable)
      .set({ slug })
      .where(eq(postsTable.id, post.id)); 

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
