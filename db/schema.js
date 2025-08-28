import { pgTable, serial, text, timestamp, varchar, integer, pgEnum, numeric } from "drizzle-orm/pg-core";

export const JobStatus = pgEnum("job_status_enum", ["active", "inactive"]);



export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  job_title: varchar("job_title", { length: 255 }).notNull(),
  slug: varchar("slug", { length:255 }).notNull(),
  job_category: varchar("job_category", { length: 100 }).notNull(),
  job_description: text("job_description").notNull(),
  job_level: varchar("job_level", { length: 50 }).notNull(), 
  no_of_vacancy: integer("no_of_vacancy").notNull(),
  employee_type: varchar("employee_type", { length: 50 }).notNull(), 
  offered_salary: numeric("offered_salary", { precision: 12, scale: 2 }).notNull(),
  apply_before: timestamp("apply_before", { mode: "date" }).notNull(),
  experience_required: varchar("experience_required", { length: 100 }).notNull(),
  professional_skill_required: text("professional_skill_required").notNull(),
  responsibility: text("responsibility").notNull(),
  qualifications: text("qualifications").notNull(),
  job_status: JobStatus("job_status").default("active").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),                             
  email: text("email").notNull(),
  resume_url: text("resume_url").notNull(),                 
  post_id: integer("post_id").notNull().references(() => posts.id), 
  created_at: timestamp("created_at").defaultNow(),
});


