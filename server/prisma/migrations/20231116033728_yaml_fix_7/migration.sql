/*
  Warnings:

  - The `last_modified_by_id` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phone` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `other_phone` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_contact_id_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "last_modified_by_id",
ADD COLUMN     "last_modified_by_id" INTEGER;

-- AlterTable
ALTER TABLE "opportunity" ALTER COLUMN "contact_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ticketorders" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER,
DROP COLUMN "other_phone",
ADD COLUMN     "other_phone" INTEGER;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;
