/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `donations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `opportunity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `recordtype` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ticketorderitem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ticketorders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_account_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donoid_fkey";

-- DropForeignKey
ALTER TABLE "eventinstances" DROP CONSTRAINT "eventinstances_eventid_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_account_id_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_account_id_fkey";

-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_record_type_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_contactid_fkey";

-- DropForeignKey
ALTER TABLE "seasontickets" DROP CONSTRAINT "seasontickets_eventid_fk_fkey";

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

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_ticket_order_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_ticket_order_item_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
ALTER COLUMN "account_id" SET DATA TYPE BIGINT,
ALTER COLUMN "last_modified_by_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id");

-- AlterTable
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
ALTER COLUMN "account_id" DROP NOT NULL,
ALTER COLUMN "account_id" SET DATA TYPE BIGINT,
ALTER COLUMN "contact_id" SET DATA TYPE BIGINT,
ALTER COLUMN "created_by_id" SET DATA TYPE BIGINT,
ALTER COLUMN "last_modified_by_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("contact_id");

-- AlterTable
ALTER TABLE "donations" DROP CONSTRAINT "donations_pkey",
ALTER COLUMN "donationid" SET DATA TYPE BIGINT,
ALTER COLUMN "contactid_fk" SET DATA TYPE BIGINT,
ADD CONSTRAINT "donations_pkey" PRIMARY KEY ("donationid");

-- AlterTable
ALTER TABLE "eventinstances" ALTER COLUMN "eventid_fk" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
ALTER COLUMN "event_id" SET DATA TYPE BIGINT,
ALTER COLUMN "owner_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("event_id");

-- AlterTable
ALTER TABLE "notes" DROP CONSTRAINT "notes_pkey",
ALTER COLUMN "account_id" DROP NOT NULL,
ALTER COLUMN "account_id" SET DATA TYPE BIGINT,
ALTER COLUMN "contact_id" SET DATA TYPE BIGINT,
ALTER COLUMN "note_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "notes_pkey" PRIMARY KEY ("note_id");

-- AlterTable
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_pkey",
ALTER COLUMN "record_type_id" SET DATA TYPE BIGINT,
ALTER COLUMN "account_id" SET DATA TYPE BIGINT,
ALTER COLUMN "contact_id" SET DATA TYPE BIGINT,
ALTER COLUMN "opportunity_id" SET DATA TYPE BIGINT,
ALTER COLUMN "campaign_id" SET DATA TYPE BIGINT,
ALTER COLUMN "owner_id" SET DATA TYPE BIGINT,
ALTER COLUMN "donor_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "opportunity_pkey" PRIMARY KEY ("opportunity_id");

-- AlterTable
ALTER TABLE "orderitems" ALTER COLUMN "orderid_fk" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "contactid_fk" DROP NOT NULL,
ALTER COLUMN "contactid_fk" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "recordtype" DROP CONSTRAINT "recordtype_pkey",
ALTER COLUMN "record_type_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "recordtype_pkey" PRIMARY KEY ("record_type_id");

-- AlterTable
ALTER TABLE "seasontickets" ALTER COLUMN "eventid_fk" DROP NOT NULL,
ALTER COLUMN "eventid_fk" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ticketorderitem" DROP CONSTRAINT "ticketorderitem_pkey",
ALTER COLUMN "ticket_order_item_id" SET DATA TYPE BIGINT,
ALTER COLUMN "ticket_order_id" SET DATA TYPE BIGINT,
ALTER COLUMN "account_id" SET DATA TYPE BIGINT,
ALTER COLUMN "contact_id" SET DATA TYPE BIGINT,
ALTER COLUMN "event_id" SET DATA TYPE BIGINT,
ALTER COLUMN "price_level_id" SET DATA TYPE BIGINT,
ALTER COLUMN "subscription_order_item_id" SET DATA TYPE BIGINT,
ALTER COLUMN "discount_code_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ticketorderitem_pkey" PRIMARY KEY ("ticket_order_item_id");

-- AlterTable
ALTER TABLE "ticketorders" DROP CONSTRAINT "ticketorders_pkey",
ALTER COLUMN "ticket_order_id" SET DATA TYPE BIGINT,
ALTER COLUMN "account_id" SET DATA TYPE BIGINT,
ALTER COLUMN "contact_id" SET DATA TYPE BIGINT,
ALTER COLUMN "external_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ticketorders_pkey" PRIMARY KEY ("ticket_order_id");

-- AlterTable
ALTER TABLE "ticketrestrictions" ALTER COLUMN "eventinstanceid_fk" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
ADD COLUMN     "capture_transaction_id" BIGINT,
ALTER COLUMN "transaction_id" SET DATA TYPE BIGINT,
ALTER COLUMN "patron_transaction_id" SET DATA TYPE BIGINT,
ALTER COLUMN "ticket_order_id" SET DATA TYPE BIGINT,
ALTER COLUMN "ticket_order_item_id" SET DATA TYPE BIGINT,
ALTER COLUMN "item_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donoid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contact_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_eventid_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contactid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contact_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickets" ADD CONSTRAINT "seasontickets_eventid_fk_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "ticketorders"("ticket_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_ticket_order_item_id_fkey" FOREIGN KEY ("ticket_order_item_id") REFERENCES "ticketorderitem"("ticket_order_item_id") ON DELETE SET NULL ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_record_type_id_fkey" FOREIGN KEY ("record_type_id") REFERENCES "recordtype"("record_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;
