CREATE TYPE "public"."job_status_enum" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"resume_url" text NOT NULL,
	"job_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"job_category" varchar(100) NOT NULL,
	"job_description" text NOT NULL,
	"job_level" varchar(50) NOT NULL,
	"no_of_vacancy" integer NOT NULL,
	"employee_type" varchar(50) NOT NULL,
	"offered_salary" numeric(12, 2) NOT NULL,
	"apply_before" timestamp NOT NULL,
	"experience_required" varchar(100) NOT NULL,
	"professional_skill_required" text NOT NULL,
	"responsibility" text NOT NULL,
	"qualifications" text NOT NULL,
	"job_status" "job_status_enum" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;