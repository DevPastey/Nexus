/*
  Warnings:

  - You are about to drop the column `appliedAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[job_id,user_id]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `job_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropIndex
DROP INDEX "Application_jobId_userId_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "appliedAt",
DROP COLUMN "jobId",
DROP COLUMN "userId",
ADD COLUMN     "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "job_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Application_job_id_user_id_key" ON "Application"("job_id", "user_id");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
