/*
  Warnings:

  - You are about to drop the column `shipping_postalcode` on the `accounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ticketorderitem" DROP CONSTRAINT "ticketorderitem_account_id_fkey";

-- DropForeignKey
ALTER TABLE "ticketorderitem" DROP CONSTRAINT "ticketorderitem_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "ticketorderitem" DROP CONSTRAINT "ticketorderitem_ticket_order_id_fkey";

-- DropForeignKey
ALTER TABLE "ticketorders" DROP CONSTRAINT "ticketorders_account_id_fkey";

-- DropForeignKey
ALTER TABLE "ticketorders" DROP CONSTRAINT "ticketorders_contact_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "shipping_postalcode",
ADD COLUMN     "shipping_postal_code" VARCHAR(255),
ALTER COLUMN "do_not_call" DROP NOT NULL,
ALTER COLUMN "do_not_mail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "opportunity" ALTER COLUMN "is_private" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "close_date" DROP NOT NULL,
ALTER COLUMN "last_modified_date" DROP NOT NULL,
ALTER COLUMN "is_anonymous" DROP NOT NULL,
ALTER COLUMN "amount_paid" DROP NOT NULL,
ALTER COLUMN "tax_deductible_amount" DROP NOT NULL,
ALTER COLUMN "acknowledged_by_letter" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recordtype" ALTER COLUMN "is_active" DROP NOT NULL,
ALTER COLUMN "is_deleted" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ticketorderitem" ALTER COLUMN "ticket_order_id" DROP NOT NULL,
ALTER COLUMN "account_id" DROP NOT NULL,
ALTER COLUMN "contact_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ticketorders" ALTER COLUMN "account_id" DROP NOT NULL,
ALTER COLUMN "contact_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "item_name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ticketorders" ADD CONSTRAINT "ticketorders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorders" ADD CONSTRAINT "ticketorders_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "ticketorders"("ticket_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;
