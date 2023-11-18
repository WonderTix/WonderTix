/*
  Warnings:

  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `contactid` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `donorbadge` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `newsletter` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `seatingaccom` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `vip` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `volunteerlist` on the `contacts` table. All the data in the column will be lost.
  - The primary key for the `donations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventdescription` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventid` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventname` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `imageurl` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `seasonid_fk` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `seasonticketeligible` on the `events` table. All the data in the column will be lost.
  - Added the required column `last_modified_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performance_date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donoid_fkey";

-- DropForeignKey
ALTER TABLE "eventinstances" DROP CONSTRAINT "eventinstances_eventid_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_seasonid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_contactid_fkey";

-- DropForeignKey
ALTER TABLE "seasontickets" DROP CONSTRAINT "seasontickets_eventid_fk_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
DROP COLUMN "address",
DROP COLUMN "contactid",
DROP COLUMN "donorbadge",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "newsletter",
DROP COLUMN "seatingaccom",
DROP COLUMN "vip",
DROP COLUMN "volunteerlist",
ADD COLUMN     "account_id" BIGINT,
ADD COLUMN     "attending_next_dinner" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "board_member" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "chocolate_and_card" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "contact_id" BIGINT NOT NULL,
ADD COLUMN     "contact_origin" TEXT,
ADD COLUMN     "created_by_id" BIGINT,
ADD COLUMN     "created_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_season_subscriber" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "deceased" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "do_not_call" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "do_not_mail" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "donate_date_entered" TIMESTAMP(3),
ADD COLUMN     "donor_recognition" TEXT,
ADD COLUMN     "email_bounce_date" TIMESTAMP(3),
ADD COLUMN     "email_bounce_reason" TEXT,
ADD COLUMN     "email_list_notes" TEXT,
ADD COLUMN     "email_lists" TEXT,
ADD COLUMN     "email_status" TEXT,
ADD COLUMN     "fax" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "formal_salutation" TEXT,
ADD COLUMN     "gender_identity" TEXT,
ADD COLUMN     "has_opted_out_of_email" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "has_opted_out_of_fax" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "home_phone" TEXT,
ADD COLUMN     "informal_address_name" TEXT,
ADD COLUMN     "informal_salutation" TEXT,
ADD COLUMN     "is_deleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "last_activity_date" TIMESTAMP(3),
ADD COLUMN     "last_modified_by_id" BIGINT,
ADD COLUMN     "last_modified_date" TIMESTAMP(3),
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "legacy_membership_circle" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "mailing_city" TEXT,
ADD COLUMN     "mailing_country" TEXT,
ADD COLUMN     "mailing_postal_code" TEXT,
ADD COLUMN     "mailing_state" TEXT,
ADD COLUMN     "mailing_street" TEXT,
ADD COLUMN     "middle_name" TEXT,
ADD COLUMN     "mobile_phone" TEXT,
ADD COLUMN     "other_city" TEXT,
ADD COLUMN     "other_country" TEXT,
ADD COLUMN     "other_email" TEXT,
ADD COLUMN     "other_phone" TEXT,
ADD COLUMN     "other_postal_code" TEXT,
ADD COLUMN     "other_state" TEXT,
ADD COLUMN     "other_street" TEXT,
ADD COLUMN     "pronouns" TEXT,
ADD COLUMN     "reserved_seating" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "salutation" TEXT,
ADD COLUMN     "seating_accomodation" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "suffix" TEXT,
ADD COLUMN     "system_modstamp" TIMESTAMP(3),
ADD COLUMN     "title" TEXT,
ADD COLUMN     "volunteer_interests" TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("contact_id");

-- AlterTable
ALTER TABLE "date" ALTER COLUMN "day_name" SET DATA TYPE TEXT,
ALTER COLUMN "month_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "discounts" ALTER COLUMN "code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "donations" DROP CONSTRAINT "donations_pkey",
ALTER COLUMN "donationid" SET DATA TYPE BIGINT,
ALTER COLUMN "contactid_fk" SET DATA TYPE BIGINT,
ALTER COLUMN "donorname" SET DATA TYPE TEXT,
ALTER COLUMN "comments" SET DATA TYPE TEXT,
ALTER COLUMN "payment_intent" SET DATA TYPE TEXT,
ALTER COLUMN "refund_intent" SET DATA TYPE TEXT,
ADD CONSTRAINT "donations_pkey" PRIMARY KEY ("donationid");

-- AlterTable
ALTER TABLE "eventinstances" ALTER COLUMN "eventid_fk" SET DATA TYPE BIGINT,
ALTER COLUMN "purchaseuri" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
DROP COLUMN "active",
DROP COLUMN "eventdescription",
DROP COLUMN "eventid",
DROP COLUMN "eventname",
DROP COLUMN "imageurl",
DROP COLUMN "seasonid_fk",
DROP COLUMN "seasonticketeligible",
ADD COLUMN     "active_flag" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "detail" TEXT,
ADD COLUMN     "event_category" TEXT,
ADD COLUMN     "event_id" BIGINT NOT NULL,
ADD COLUMN     "last_modified_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "owner_id" BIGINT,
ADD COLUMN     "performance_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pre_post_show_email_flag" DOUBLE PRECISION,
ADD COLUMN     "pre_show_email_cutoff_minutes" DOUBLE PRECISION,
ADD COLUMN     "pre_show_email_minutes" DOUBLE PRECISION,
ADD COLUMN     "run_time" TEXT,
ADD COLUMN     "season" TEXT,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("event_id");

-- AlterTable
ALTER TABLE "orderitems" ALTER COLUMN "orderid_fk" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "contactid_fk" DROP NOT NULL,
ALTER COLUMN "contactid_fk" SET DATA TYPE BIGINT,
ALTER COLUMN "payment_intent" SET DATA TYPE TEXT,
ALTER COLUMN "refund_intent" SET DATA TYPE TEXT,
ALTER COLUMN "checkout_sessions" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "savedreports" ALTER COLUMN "tablename" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "seasons" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "imageurl" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "seasontickets" ALTER COLUMN "eventid_fk" DROP NOT NULL,
ALTER COLUMN "eventid_fk" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "seasontickettype" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "subject" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ticketrestrictions" ALTER COLUMN "eventinstanceid_fk" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tickettype" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE TEXT,
ALTER COLUMN "auth0_id" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "accounts" (
    "account_id" BIGINT NOT NULL,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT,
    "type" TEXT,
    "shipping_street" TEXT,
    "shipping_city" TEXT,
    "shipping_state" TEXT,
    "shipping_postal_code" TEXT,
    "shipping_country" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "website" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "last_modified_by_id" BIGINT,
    "last_activity_date" TIMESTAMP(3),
    "do_not_call" INTEGER DEFAULT 0,
    "do_not_mail" INTEGER DEFAULT 0,
    "donor_recognition" TEXT,
    "donor_email" TEXT,
    "formal_salutation" TEXT,
    "has_opted_out_of_email" INTEGER NOT NULL DEFAULT 0,
    "informal_address_name" TEXT,
    "informal_salutation" TEXT,
    "attn" TEXT,
    "grant_size" TEXT,
    "will_give_it" TEXT,
    "first_donation_date" TIMESTAMP(3),
    "last_donation_date" TIMESTAMP(3),
    "lifetime_donation_history_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetime_donation_number" INTEGER NOT NULL DEFAULT 0,
    "this_year_donation_history_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_this_fiscal_year" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "last_donation_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetime_single_ticket_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetime_subscription_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "board_member" INTEGER NOT NULL DEFAULT 0,
    "show_sponsor" INTEGER NOT NULL DEFAULT 0,
    "seating_accomodation" INTEGER NOT NULL DEFAULT 0,
    "amount_donated_CY20" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_CY18" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "sort_name" TEXT,
    "amount_donated_last_fiscal_year" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_CY21" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_CY19" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_FY20" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_FY19" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_FY18" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetime_donations_included_pledged" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "first_donation_date_incl_pledged" TIMESTAMP(3),
    "amount_donated_FY21" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "first_donation_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "largest_donation_date" TIMESTAMP(3),
    "amount_donated_FY22" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_Donated_FY23" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_Donated_FY24" DECIMAL(10,2) NOT NULL DEFAULT 0.0,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "notes" (
    "note_id" BIGINT NOT NULL,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,
    "contact_id" BIGINT,
    "account_id" BIGINT,
    "title" TEXT,
    "body" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3),

    CONSTRAINT "notes_pkey" PRIMARY KEY ("note_id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "transaction_id" BIGINT NOT NULL,
    "patron_transaction_id" BIGINT,
    "ticket_order_id" BIGINT,
    "item_id" BIGINT,
    "ticket_order_item_id" BIGINT,
    "item_type" TEXT,
    "item_name" TEXT,
    "payment_method" TEXT,
    "status" TEXT,
    "payment_processor" TEXT,
    "exchange_type" TEXT,
    "order_origin" TEXT,
    "entry_method" TEXT,
    "credit_card_entry_method" TEXT,
    "credit_card_last_four" INTEGER,
    "name_on_card" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "buyer_unit_price" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "gross_unit_price" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "buyer_unit_fee" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "patron_tech_unit_fee" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "unit_fee" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "total_item_quantity" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "buyer_fee_line_item_sub_total" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "patron_tech_fee_line_item_sub_total" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "shipping_fee" DECIMAL(10,2) DEFAULT 0.0,
    "exchange_fee" DECIMAL(10,2) DEFAULT 0.0,
    "discount_amount" DECIMAL(10,2) DEFAULT 0.0,
    "donation_amount" DECIMAL(10,2) DEFAULT 0.0,
    "full_buyer_cost" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "full_gross_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "transaction_total" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_tendered" DECIMAL(10,2) DEFAULT 0.0,
    "capture_transaction_id" BIGINT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "ticketorders" (
    "ticket_order_id" BIGINT NOT NULL,
    "account_id" BIGINT,
    "contact_id" BIGINT,
    "ticket_order_name" TEXT,
    "type" TEXT,
    "order_status" TEXT,
    "subscription_status" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "other_phone" TEXT,
    "street_address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "shipping_first_name" TEXT,
    "shipping_last_name" TEXT,
    "shipping_stress_address" TEXT,
    "shipping_city" TEXT,
    "shipping_state" TEXT,
    "shipping_postal_code" TEXT,
    "shipping_country" TEXT,
    "order_origin" TEXT,
    "order_source" TEXT,
    "payment_method" TEXT,
    "amount_paid" DECIMAL(10,2) DEFAULT 0.00,
    "fees" DECIMAL(10,2) DEFAULT 0.00,
    "exchange_fee" DECIMAL(10,2) DEFAULT 0.00,
    "donation_id" INTEGER,
    "donation_amount" DECIMAL(10,2) DEFAULT 0.00,
    "delivery_method" TEXT,
    "salutation" TEXT,
    "shipping_salutation" TEXT,
    "email_opt_in" INTEGER DEFAULT 0,
    "anonymous_purchase_flag" INTEGER,
    "update_contact_record" DOUBLE PRECISION,
    "send_confirmation_email_flag" DOUBLE PRECISION,
    "request_accommodation" TEXT,
    "external_id" BIGINT,
    "comments" TEXT,
    "notes" TEXT,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3),

    CONSTRAINT "ticketorders_pkey" PRIMARY KEY ("ticket_order_id")
);

-- CreateTable
CREATE TABLE "ticketorderitem" (
    "ticket_order_item_id" BIGINT NOT NULL,
    "ticket_order_id" BIGINT,
    "account_id" BIGINT,
    "contact_id" BIGINT,
    "status" TEXT,
    "season" TEXT,
    "event_id" BIGINT,
    "subscription_order_item_id" BIGINT,
    "price_level_id" BIGINT,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "ticket_price" DECIMAL(10,2) DEFAULT 0.00,
    "unit_price" DECIMAL(10,2) DEFAULT 0.00,
    "amount_paid" DECIMAL(10,2) DEFAULT 0.00,
    "sales_tax" DECIMAL(10,2) DEFAULT 0.00,
    "discount_code_id" BIGINT,
    "discount_amount" DECIMAL(10,2) DEFAULT 0.00,
    "discount_type" TEXT,
    "unit_fee" DECIMAL(10,2) DEFAULT 0.00,
    "ticket_notes" TEXT,
    "barcode" TEXT,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "entry_date" TIMESTAMP(3),

    CONSTRAINT "ticketorderitem_pkey" PRIMARY KEY ("ticket_order_item_id")
);

-- CreateTable
CREATE TABLE "recordtype" (
    "record_type_id" BIGINT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "sobject_type" TEXT,
    "is_active" INTEGER,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "system_modstamp" TIMESTAMP(3) NOT NULL,
    "is_deleted" INTEGER DEFAULT 0,

    CONSTRAINT "recordtype_pkey" PRIMARY KEY ("record_type_id")
);

-- CreateTable
CREATE TABLE "opportunity" (
    "opportunity_id" BIGINT NOT NULL,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,
    "account_id" BIGINT,
    "record_type_id" BIGINT,
    "is_private" INTEGER DEFAULT 0,
    "name" TEXT,
    "description" TEXT,
    "amount" DECIMAL(10,2) DEFAULT 0.00,
    "close_date" TIMESTAMP(3),
    "type" TEXT,
    "campaign_id" BIGINT,
    "owner_id" BIGINT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3),
    "fiscal_year" INTEGER,
    "fiscal_quarter" INTEGER,
    "contact_id" BIGINT,
    "is_anonymous" INTEGER,
    "amount_paid" DECIMAL(10,2) DEFAULT 0.00,
    "dedication_honoree_name" TEXT,
    "dedication_type" TEXT,
    "donor_id" BIGINT,
    "fund_type" TEXT,
    "grant_amount" DECIMAL(10,2) DEFAULT 0.00,
    "payment_type" TEXT,
    "sub_type" TEXT,
    "fiscal_year_season" TEXT,
    "grant_ask_amount" DECIMAL(10,2) DEFAULT 0.00,
    "appeal" TEXT,
    "tax_deductible_amount" DECIMAL(10,2) DEFAULT 0.00,
    "acknowledged_by_letter" DOUBLE PRECISION,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("opportunity_id")
);

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
