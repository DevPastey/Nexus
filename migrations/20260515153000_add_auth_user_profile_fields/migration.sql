-- Add the standard Auth.js Prisma adapter profile fields.
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "name" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "image" TEXT;
