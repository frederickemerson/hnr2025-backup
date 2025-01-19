ALTER TABLE "hnr2025_users" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hnr2025_users" ADD COLUMN "finishedAt" timestamp;