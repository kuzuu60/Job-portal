CREATE TYPE "public"."job_status_enum" AS ENUM('active', 'inactive');--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "job_category" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "job_description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "job_level" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "no_of_vacancy" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "employee_type" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "offered_salary" numeric(12, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "apply_before" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "experience_required" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "professional_skill_required" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "responsibility" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "qualifications" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "job_status" "job_status_enum" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "job_type";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "deadline";