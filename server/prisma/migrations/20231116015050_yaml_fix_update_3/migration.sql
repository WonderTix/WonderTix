/*
  Warnings:

  - The `external_id` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ticketorders" DROP COLUMN "external_id",
ADD COLUMN     "external_id" INTEGER;
