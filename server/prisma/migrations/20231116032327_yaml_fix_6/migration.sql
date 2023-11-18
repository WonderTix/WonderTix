/*
  Warnings:

  - The `created_by_id` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_account_id_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by_id" INTEGER;

-- AlterTable
ALTER TABLE "opportunity" ALTER COLUMN "account_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ticketorders" ALTER COLUMN "postal_code" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;
