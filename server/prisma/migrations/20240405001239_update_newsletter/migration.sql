/*
  Warnings:

  - The `newsletter` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "newsletter",
ADD COLUMN     "newsletter" TIMESTAMP(3);
