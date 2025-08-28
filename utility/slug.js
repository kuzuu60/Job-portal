import slugify from "slugify";

export const generateIdBasedSlug = ( job_title,id ) => {
  return slugify(`${job_title}-${id}`, { lower: true, strict: true });
};




//code used to create a unique slug based on title,level,salary
// export const generateUniqueSlug = async ({ job_title, job_level, offered_salary }, db, postsTable) => {
//   let baseSlug = slugify(`${job_title}-${job_level}-${offered_salary}`, { lower: true, strict: true });
//   let slug = baseSlug;
//   let counter = 1;

//   while (
//     await db.select().from(postsTable).where(eq(postsTable.slug, slug)).limit(1).then(r => r.length > 0)
//   ) {
//     slug = `${baseSlug}-${counter}`;
//     counter++;
//   }

//   return slug;
// };
