import { pgTable, serial, text, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  created_at: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  job_title: varchar("job_title", { length: 255 }).notNull(),
  job_type: varchar("job_type", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  description: text("description").notNull(),
  deadline: timestamp("deadline", { mode: "date" }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),                             
  email: text("email").notNull(),
  resume_url: text("resume_url").notNull(),                 
  post_id: integer("post_id").notNull().references(() => posts.id), 
  created_at: timestamp("created_at").defaultNow(),
});
