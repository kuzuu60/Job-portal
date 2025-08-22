DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "slug" varchar(255) NOT NULL;