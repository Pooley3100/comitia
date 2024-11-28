/*
  Warnings:

  - You are about to drop the column `deatials` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `details` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "deatials",
ADD COLUMN     "details" TEXT NOT NULL;
