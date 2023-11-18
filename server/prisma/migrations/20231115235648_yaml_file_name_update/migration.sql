/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createddate` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `firstdonationamount` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `hasoptedoutofemail` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `isdeleted` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `largestdonationdate` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `lastactivitydate` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `lastmodifiedbyid` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `lastmodifieddate` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `lifetimesingleticketamount` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `lifetimesubscriptionamount` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `shippingcity` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `shippingcountry` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `shippingpostalcode` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `shippingstate` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `shippingstreet` on the `accounts` table. All the data in the column will be lost.
  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthdate` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `contactorigin` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `createdbyid` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `createddate` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `donnotcall` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `emailbouncedate` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `emailbouncereason` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `emailstatus` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `genderidentity` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `hasoptedoutofemail` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `hasoptedoutoffax` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `homephone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `lastactivitydate` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `lastmodifiedbyid` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `lastmodifieddate` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailingcity` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailingcountry` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailingpostalcode` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailingstate` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mailingstreet` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `middlename` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `mobilephone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `othercity` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `othercountry` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `otherphone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `otherpostalcode` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `otherstate` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `otherstreet` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `systemmodstamp` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `accountid` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `contactid` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `createddate` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `isdeleted` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `lastmodifieddate` on the `notes` table. All the data in the column will be lost.
  - The primary key for the `opportunity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountid` on the `opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `contactid` on the `opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `opportunity` table. All the data in the column will be lost.
  - The primary key for the `recordtype` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recordtype` table. All the data in the column will be lost.
  - Added the required column `last_modified_date` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_status` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_id` to the `opportunity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_account_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donoid_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_accountid_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_contactid_fkey";

-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_accountid_fkey";

-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_contactid_fkey";

-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_record_type_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_contactid_fkey";

-- DropForeignKey
ALTER TABLE "ticketorderitem" DROP CONSTRAINT "ticketorderitem_account_id_fkey";

-- DropForeignKey
ALTER TABLE "ticketorderitem" DROP CONSTRAINT "ticketorderitem_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "ticketorders" DROP CONSTRAINT "ticketorders_account_id_fkey";

-- DropForeignKey
ALTER TABLE "ticketorders" DROP CONSTRAINT "ticketorders_contact_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "createddate",
DROP COLUMN "firstdonationamount",
DROP COLUMN "hasoptedoutofemail",
DROP COLUMN "id",
DROP COLUMN "isdeleted",
DROP COLUMN "largestdonationdate",
DROP COLUMN "lastactivitydate",
DROP COLUMN "lastmodifiedbyid",
DROP COLUMN "lastmodifieddate",
DROP COLUMN "lifetimesingleticketamount",
DROP COLUMN "lifetimesubscriptionamount",
DROP COLUMN "shippingcity",
DROP COLUMN "shippingcountry",
DROP COLUMN "shippingpostalcode",
DROP COLUMN "shippingstate",
DROP COLUMN "shippingstreet",
ADD COLUMN     "account_id" SERIAL NOT NULL,
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_donation_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
ADD COLUMN     "has_opted_out_of_email" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_deleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "largest_donation_date" TIMESTAMP(3),
ADD COLUMN     "last_activity_date" TIMESTAMP(3),
ADD COLUMN     "last_modified_by_id" VARCHAR(255),
ADD COLUMN     "last_modified_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lifetime_single_ticket_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
ADD COLUMN     "lifetime_subscription_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
ADD COLUMN     "shipping_city" VARCHAR(255),
ADD COLUMN     "shipping_country" VARCHAR(255),
ADD COLUMN     "shipping_postalcode" VARCHAR(255),
ADD COLUMN     "shipping_state" VARCHAR(255),
ADD COLUMN     "shipping_street" VARCHAR(255),
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id");

-- AlterTable
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
DROP COLUMN "birthdate",
DROP COLUMN "contactorigin",
DROP COLUMN "createdbyid",
DROP COLUMN "createddate",
DROP COLUMN "donnotcall",
DROP COLUMN "emailbouncedate",
DROP COLUMN "emailbouncereason",
DROP COLUMN "emailstatus",
DROP COLUMN "firstname",
DROP COLUMN "genderidentity",
DROP COLUMN "hasoptedoutofemail",
DROP COLUMN "hasoptedoutoffax",
DROP COLUMN "homephone",
DROP COLUMN "id",
DROP COLUMN "lastactivitydate",
DROP COLUMN "lastmodifiedbyid",
DROP COLUMN "lastmodifieddate",
DROP COLUMN "lastname",
DROP COLUMN "mailingcity",
DROP COLUMN "mailingcountry",
DROP COLUMN "mailingpostalcode",
DROP COLUMN "mailingstate",
DROP COLUMN "mailingstreet",
DROP COLUMN "middlename",
DROP COLUMN "mobilephone",
DROP COLUMN "othercity",
DROP COLUMN "othercountry",
DROP COLUMN "otherphone",
DROP COLUMN "otherpostalcode",
DROP COLUMN "otherstate",
DROP COLUMN "otherstreet",
DROP COLUMN "systemmodstamp",
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "contact_id" SERIAL NOT NULL,
ADD COLUMN     "contact_origin" VARCHAR(255),
ADD COLUMN     "created_by_id" VARCHAR(255),
ADD COLUMN     "created_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "do_not_call" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "email_bounce_date" TIMESTAMP(3),
ADD COLUMN     "email_bounce_reason" VARCHAR(255),
ADD COLUMN     "email_status" "emailStatus" NOT NULL,
ADD COLUMN     "first_name" VARCHAR(255),
ADD COLUMN     "gender_identity" VARCHAR(255),
ADD COLUMN     "has_opted_out_of_email" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "has_opted_out_of_fax" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "home_phone" VARCHAR(255),
ADD COLUMN     "last_activity_date" TIMESTAMP(3),
ADD COLUMN     "last_modified_by_id" VARCHAR(255),
ADD COLUMN     "last_modified_date" TIMESTAMP(3),
ADD COLUMN     "last_name" VARCHAR(255),
ADD COLUMN     "mailing_city" VARCHAR(255),
ADD COLUMN     "mailing_country" VARCHAR(255),
ADD COLUMN     "mailing_postal_code" VARCHAR(255),
ADD COLUMN     "mailing_state" VARCHAR(255),
ADD COLUMN     "mailing_street" VARCHAR(255),
ADD COLUMN     "middle_name" VARCHAR(255),
ADD COLUMN     "mobile_phone" VARCHAR(255),
ADD COLUMN     "other_city" VARCHAR(255),
ADD COLUMN     "other_country" VARCHAR(255),
ADD COLUMN     "other_phone" VARCHAR(255),
ADD COLUMN     "other_postal_code" VARCHAR(255),
ADD COLUMN     "other_state" VARCHAR(255),
ADD COLUMN     "other_street" VARCHAR(255),
ADD COLUMN     "system_modstamp" TIMESTAMP(3),
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("contact_id");

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "accountid",
DROP COLUMN "contactid",
DROP COLUMN "createddate",
DROP COLUMN "isdeleted",
DROP COLUMN "lastmodifieddate",
ADD COLUMN     "account_id" INTEGER NOT NULL,
ADD COLUMN     "contact_id" INTEGER,
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "last_modified_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_pkey",
DROP COLUMN "accountid",
DROP COLUMN "contactid",
DROP COLUMN "id",
ADD COLUMN     "account_id" INTEGER NOT NULL,
ADD COLUMN     "contact_id" INTEGER NOT NULL,
ADD COLUMN     "opportunity_id" SERIAL NOT NULL,
ADD CONSTRAINT "opportunity_pkey" PRIMARY KEY ("opportunity_id");

-- AlterTable
ALTER TABLE "recordtype" DROP CONSTRAINT "recordtype_pkey",
DROP COLUMN "id",
ADD COLUMN     "record_type_id" SERIAL NOT NULL,
ADD CONSTRAINT "recordtype_pkey" PRIMARY KEY ("record_type_id");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donoid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contact_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contactid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contact_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticketorders" ADD CONSTRAINT "ticketorders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorders" ADD CONSTRAINT "ticketorders_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_record_type_id_fkey" FOREIGN KEY ("record_type_id") REFERENCES "recordtype"("record_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id") ON DELETE RESTRICT ON UPDATE CASCADE;
