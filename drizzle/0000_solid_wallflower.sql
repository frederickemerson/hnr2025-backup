CREATE TABLE IF NOT EXISTS "hnr2025_users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"score" integer
);
