/*
  Warnings:

  - The `last_modified_by_id` column on the `accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `campaign_id` column on the `opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `owner_id` column on the `opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `donor_id` column on the `opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subscription_order_item_id` column on the `ticketorderitem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `discount_code_id` column on the `ticketorderitem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `item_id` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `credit_card_last_four` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_record_type_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "last_modified_by_id",
ADD COLUMN     "last_modified_by_id" INTEGER;

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "owner_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "body" DROP NOT NULL,
ALTER COLUMN "body" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "opportunity" ALTER COLUMN "record_type_id" DROP NOT NULL,
DROP COLUMN "campaign_id",
ADD COLUMN     "campaign_id" INTEGER,
DROP COLUMN "owner_id",
ADD COLUMN     "owner_id" INTEGER,
ALTER COLUMN "fiscal_year" DROP NOT NULL,
ALTER COLUMN "fiscal_quarter" DROP NOT NULL,
DROP COLUMN "donor_id",
ADD COLUMN     "donor_id" INTEGER;

-- AlterTable
ALTER TABLE "ticketorderitem" DROP COLUMN "subscription_order_item_id",
ADD COLUMN     "subscription_order_item_id" INTEGER,
DROP COLUMN "discount_code_id",
ADD COLUMN     "discount_code_id" INTEGER;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "patron_transaction_id" DROP NOT NULL,
DROP COLUMN "item_id",
ADD COLUMN     "item_id" INTEGER,
DROP COLUMN "credit_card_last_four",
ADD COLUMN     "credit_card_last_four" INTEGER;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_record_type_id_fkey" FOREIGN KEY ("record_type_id") REFERENCES "recordtype"("record_type_id") ON DELETE SET NULL ON UPDATE CASCADE;
