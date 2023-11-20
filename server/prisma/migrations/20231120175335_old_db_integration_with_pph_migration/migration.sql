/*
  Warnings:

  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `attending_next_dinner` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `board_member` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `chocolate_and_card` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `contact_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `contact_origin` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `current_season_subscriber` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `deceased` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `do_not_call` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `do_not_mail` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `donate_date_entered` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `donor_recognition` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `email_bounce_date` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `email_bounce_reason` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `email_list_notes` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `email_lists` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `email_status` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `fax` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `formal_salutation` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `gender_identity` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `has_opted_out_of_email` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `has_opted_out_of_fax` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `home_phone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `informal_address_name` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `informal_salutation` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `last_activity_date` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `last_modified_by_id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `last_modified_date` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `legacy_membership_circle` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailing_city` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailing_country` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailing_postal_code` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailing_state` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailing_street` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mobile_phone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `other_city` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `other_country` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `other_email` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `other_phone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `other_postal_code` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `other_state` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `other_street` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `pronouns` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `reserved_seating` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `salutation` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `seating_accomodation` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `suffix` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `system_modstamp` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `volunteer_interests` on the `contacts` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `day_name` on the `date` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.
  - You are about to alter the column `month_name` on the `date` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.
  - You are about to alter the column `code` on the `discounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - The primary key for the `donations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `donationid` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `contactid_fk` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `donorname` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `comments` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `payment_intent` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `refund_intent` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `eventid_fk` on the `eventinstances` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `purchaseuri` on the `eventinstances` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active_flag` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `create_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `detail` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_category` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `last_modified_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `performance_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `pre_post_show_email_flag` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `pre_show_email_cutoff_minutes` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `pre_show_email_minutes` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `run_time` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `singleticket_fk` on the `eventtickets` table. All the data in the column will be lost.
  - You are about to drop the column `checkout_sessions` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `contactid_fk` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payment_intent` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `refund_intent` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tablename` on the `savedreports` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `imageurl` on the `seasons` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `seasons` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `eventid_fk` on the `seasontickets` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `description` on the `seasontickettype` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `subject` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `tickettype` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `auth0_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `opportunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recordtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticketorderitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticketorders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `orderid_fk` on table `orderitems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactid_fk` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventid_fk` on table `seasontickets` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `eventticketid_fk` to the `singletickets` table without a default value. This is not possible if the table is not empty.
  - Made the column `eventinstanceid_fk` on table `ticketrestrictions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_account_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donoid_fkey";

-- DropForeignKey
ALTER TABLE "eventinstances" DROP CONSTRAINT "eventinstances_eventid_fkey";

-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "eventtickets_singleticket_fk_fkey";

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
ALTER TABLE "orderitems" DROP CONSTRAINT "orderitems_orderid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_contactid_fkey";

-- DropForeignKey
ALTER TABLE "seasontickets" DROP CONSTRAINT "seasontickets_eventid_fk_fkey";

-- DropForeignKey
ALTER TABLE "singletickets" DROP CONSTRAINT "singletickets_orderitemid_fk_fkey";

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
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
DROP COLUMN "account_id",
DROP COLUMN "attending_next_dinner",
DROP COLUMN "birth_date",
DROP COLUMN "board_member",
DROP COLUMN "chocolate_and_card",
DROP COLUMN "company",
DROP COLUMN "contact_id",
DROP COLUMN "contact_origin",
DROP COLUMN "created_by_id",
DROP COLUMN "created_date",
DROP COLUMN "current_season_subscriber",
DROP COLUMN "deceased",
DROP COLUMN "department",
DROP COLUMN "description",
DROP COLUMN "do_not_call",
DROP COLUMN "do_not_mail",
DROP COLUMN "donate_date_entered",
DROP COLUMN "donor_recognition",
DROP COLUMN "email_bounce_date",
DROP COLUMN "email_bounce_reason",
DROP COLUMN "email_list_notes",
DROP COLUMN "email_lists",
DROP COLUMN "email_status",
DROP COLUMN "fax",
DROP COLUMN "first_name",
DROP COLUMN "formal_salutation",
DROP COLUMN "gender_identity",
DROP COLUMN "has_opted_out_of_email",
DROP COLUMN "has_opted_out_of_fax",
DROP COLUMN "home_phone",
DROP COLUMN "informal_address_name",
DROP COLUMN "informal_salutation",
DROP COLUMN "is_deleted",
DROP COLUMN "last_activity_date",
DROP COLUMN "last_modified_by_id",
DROP COLUMN "last_modified_date",
DROP COLUMN "last_name",
DROP COLUMN "legacy_membership_circle",
DROP COLUMN "mailing_city",
DROP COLUMN "mailing_country",
DROP COLUMN "mailing_postal_code",
DROP COLUMN "mailing_state",
DROP COLUMN "mailing_street",
DROP COLUMN "middle_name",
DROP COLUMN "mobile_phone",
DROP COLUMN "other_city",
DROP COLUMN "other_country",
DROP COLUMN "other_email",
DROP COLUMN "other_phone",
DROP COLUMN "other_postal_code",
DROP COLUMN "other_state",
DROP COLUMN "other_street",
DROP COLUMN "pronouns",
DROP COLUMN "reserved_seating",
DROP COLUMN "salutation",
DROP COLUMN "seating_accomodation",
DROP COLUMN "suffix",
DROP COLUMN "system_modstamp",
DROP COLUMN "title",
DROP COLUMN "volunteer_interests",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "contactid" INT NOT NULL,
ADD COLUMN     "donorbadge" BOOLEAN DEFAULT false,
ADD COLUMN     "firstname" VARCHAR(255),
ADD COLUMN     "lastname" VARCHAR(255),
ADD COLUMN     "newsletter" BOOLEAN DEFAULT false,
ADD COLUMN     "seatingaccom" VARCHAR(255),
ADD COLUMN     "vip" BOOLEAN DEFAULT false,
ADD COLUMN     "volunteerlist" BOOLEAN DEFAULT false,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("contactid");

-- AlterTable
ALTER TABLE "date" ALTER COLUMN "day_name" SET DATA TYPE VARCHAR(9),
ALTER COLUMN "month_name" SET DATA TYPE VARCHAR(9);

-- AlterTable
ALTER TABLE "discounts" ALTER COLUMN "code" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "donations" DROP CONSTRAINT "donations_pkey",
ALTER COLUMN "donationid" SET DATA TYPE INT,
ALTER COLUMN "contactid_fk" SET DATA TYPE INTEGER,
ALTER COLUMN "donorname" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "comments" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "payment_intent" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "refund_intent" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "donations_pkey" PRIMARY KEY ("donationid");

-- AlterTable
ALTER TABLE "eventinstances" ALTER COLUMN "eventid_fk" SET DATA TYPE INTEGER,
ALTER COLUMN "purchaseuri" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
DROP COLUMN "active_flag",
DROP COLUMN "create_date",
DROP COLUMN "description",
DROP COLUMN "detail",
DROP COLUMN "event_category",
DROP COLUMN "event_id",
DROP COLUMN "last_modified_date",
DROP COLUMN "name",
DROP COLUMN "owner_id",
DROP COLUMN "performance_date",
DROP COLUMN "pre_post_show_email_flag",
DROP COLUMN "pre_show_email_cutoff_minutes",
DROP COLUMN "pre_show_email_minutes",
DROP COLUMN "run_time",
DROP COLUMN "season",
ADD COLUMN     "active" BOOLEAN,
ADD COLUMN     "eventdescription" VARCHAR(255),
ADD COLUMN     "eventid" INT NOT NULL,
ADD COLUMN     "eventname" VARCHAR(255),
ADD COLUMN     "imageurl" VARCHAR(255),
ADD COLUMN     "seasonid_fk" INTEGER,
ADD COLUMN     "seasonticketeligible" BOOLEAN,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("eventid");

-- AlterTable
ALTER TABLE "eventtickets" DROP COLUMN "singleticket_fk",
ADD COLUMN     "purchased" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "orderitems" ALTER COLUMN "orderid_fk" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "checkout_sessions",
ALTER COLUMN "contactid_fk" SET NOT NULL,
ALTER COLUMN "contactid_fk" SET DATA TYPE INTEGER,
ALTER COLUMN "payment_intent" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "refund_intent" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "savedreports" ALTER COLUMN "tablename" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "seasons" DROP COLUMN "imageurl",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "seasontickets" ALTER COLUMN "eventid_fk" SET NOT NULL,
ALTER COLUMN "eventid_fk" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "seasontickettype" ALTER COLUMN "description" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "singletickets" ADD COLUMN     "eventticketid_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "subject" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "ticketrestrictions" ALTER COLUMN "eventinstanceid_fk" SET NOT NULL;

-- AlterTable
ALTER TABLE "tickettype" ALTER COLUMN "description" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "auth0_id" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "notes";

-- DropTable
DROP TABLE "opportunity";

-- DropTable
DROP TABLE "recordtype";

-- DropTable
DROP TABLE "ticketorderitem";

-- DropTable
DROP TABLE "ticketorders";

-- DropTable
DROP TABLE "transactions";

-- CreateTable
CREATE TABLE "PPH_accounts" (
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

    CONSTRAINT "PPH_accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "PPH_contacts" (
    "contact_id" BIGINT NOT NULL,
    "account_id" BIGINT,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,
    "salutation" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "other_street" TEXT,
    "other_city" TEXT,
    "other_state" TEXT,
    "other_postal_code" TEXT,
    "other_country" TEXT,
    "mailing_street" TEXT,
    "mailing_city" TEXT,
    "mailing_state" TEXT,
    "mailing_postal_code" TEXT,
    "mailing_country" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "mobile_phone" TEXT,
    "home_phone" TEXT,
    "other_phone" TEXT,
    "email" TEXT,
    "title" TEXT,
    "department" TEXT,
    "birth_date" TIMESTAMP(3),
    "description" TEXT,
    "has_opted_out_of_email" INTEGER NOT NULL DEFAULT 0,
    "has_opted_out_of_fax" INTEGER NOT NULL DEFAULT 0,
    "do_not_call" INTEGER NOT NULL DEFAULT 0,
    "created_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" BIGINT,
    "last_modified_date" TIMESTAMP(3),
    "last_modified_by_id" BIGINT,
    "system_modstamp" TIMESTAMP(3),
    "last_activity_date" TIMESTAMP(3),
    "email_bounce_reason" TEXT,
    "email_bounce_date" TIMESTAMP(3),
    "pronouns" TEXT,
    "gender_identity" TEXT,
    "donate_date_entered" TIMESTAMP(3),
    "deceased" INTEGER NOT NULL DEFAULT 0,
    "do_not_mail" INTEGER NOT NULL DEFAULT 0,
    "donor_recognition" TEXT,
    "formal_salutation" TEXT,
    "informal_address_name" TEXT,
    "informal_salutation" TEXT,
    "volunteer_interests" TEXT,
    "other_email" TEXT,
    "company" TEXT,
    "middle_name" TEXT,
    "suffix" TEXT,
    "contact_origin" TEXT,
    "email_status" TEXT,
    "current_season_subscriber" DECIMAL(10,2) DEFAULT 0.0,
    "email_lists" TEXT,
    "board_member" DECIMAL(10,2) DEFAULT 0.0,
    "seating_accomodation" DECIMAL(10,2) DEFAULT 0.0,
    "reserved_seating" DECIMAL(10,2) DEFAULT 0.0,
    "attending_next_dinner" DECIMAL(10,2) DEFAULT 0.0,
    "chocolate_and_card" DECIMAL(10,2) DEFAULT 0.0,
    "legacy_membership_circle" DECIMAL(10,2) DEFAULT 0.0,
    "email_list_notes" TEXT,

    CONSTRAINT "PPH_contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "PPH_events" (
    "event_id" BIGINT NOT NULL,
    "owner_id" BIGINT,
    "name" TEXT,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "active_flag" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "detail" TEXT,
    "event_category" TEXT,
    "season" TEXT,
    "performance_date" TIMESTAMP(3) NOT NULL,
    "pre_post_show_email_flag" DOUBLE PRECISION,
    "pre_show_email_cutoff_minutes" DOUBLE PRECISION,
    "pre_show_email_minutes" DOUBLE PRECISION,
    "run_time" TEXT,

    CONSTRAINT "PPH_events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "PPH_notes" (
    "note_id" BIGINT NOT NULL,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,
    "contact_id" BIGINT,
    "account_id" BIGINT,
    "title" TEXT,
    "body" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3),

    CONSTRAINT "PPH_notes_pkey" PRIMARY KEY ("note_id")
);

-- CreateTable
CREATE TABLE "PPH_transactions" (
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

    CONSTRAINT "PPH_transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "PPH_ticketorders" (
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

    CONSTRAINT "PPH_ticketorders_pkey" PRIMARY KEY ("ticket_order_id")
);

-- CreateTable
CREATE TABLE "PPH_ticketorderitem" (
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

    CONSTRAINT "PPH_ticketorderitem_pkey" PRIMARY KEY ("ticket_order_item_id")
);

-- CreateTable
CREATE TABLE "PPH_recordtype" (
    "record_type_id" BIGINT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "sobject_type" TEXT,
    "is_active" INTEGER,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "system_modstamp" TIMESTAMP(3) NOT NULL,
    "is_deleted" INTEGER DEFAULT 0,

    CONSTRAINT "PPH_recordtype_pkey" PRIMARY KEY ("record_type_id")
);

-- CreateTable
CREATE TABLE "PPH_opportunity" (
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

    CONSTRAINT "PPH_opportunity_pkey" PRIMARY KEY ("opportunity_id")
);

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donoid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contactid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_eventid_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("eventid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_seasonid_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_orderid_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contactid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contactid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickets" ADD CONSTRAINT "seasontickets_eventid_fk_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("eventid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "singletickets" ADD CONSTRAINT "singletickets_eventticketid_fk_fkey" FOREIGN KEY ("eventticketid_fk") REFERENCES "eventtickets"("eventticketid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "singletickets" ADD CONSTRAINT "singletickets_orderitemid_fk_fkey" FOREIGN KEY ("orderitemid_fk") REFERENCES "orderitems"("orderitemid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PPH_contacts" ADD CONSTRAINT "PPH_contacts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PPH_accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_notes" ADD CONSTRAINT "PPH_notes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "PPH_contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_notes" ADD CONSTRAINT "PPH_notes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PPH_accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_transactions" ADD CONSTRAINT "PPH_transactions_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "PPH_ticketorders"("ticket_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_transactions" ADD CONSTRAINT "PPH_transactions_ticket_order_item_id_fkey" FOREIGN KEY ("ticket_order_item_id") REFERENCES "PPH_ticketorderitem"("ticket_order_item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_ticketorders" ADD CONSTRAINT "PPH_ticketorders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PPH_accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_ticketorders" ADD CONSTRAINT "PPH_ticketorders_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "PPH_contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_ticketorderitem" ADD CONSTRAINT "PPH_ticketorderitem_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "PPH_ticketorders"("ticket_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_ticketorderitem" ADD CONSTRAINT "PPH_ticketorderitem_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PPH_accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_ticketorderitem" ADD CONSTRAINT "PPH_ticketorderitem_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "PPH_contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_opportunity" ADD CONSTRAINT "PPH_opportunity_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PPH_accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_opportunity" ADD CONSTRAINT "PPH_opportunity_record_type_id_fkey" FOREIGN KEY ("record_type_id") REFERENCES "PPH_recordtype"("record_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPH_opportunity" ADD CONSTRAINT "PPH_opportunity_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "PPH_contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;
