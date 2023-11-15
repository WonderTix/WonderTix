/*
  Warnings:

  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `contactid` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `donorbadge` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `newsletter` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `seatingaccom` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `vip` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `volunteerlist` on the `contacts` table. All the data in the column will be lost.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventdescription` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventid` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `eventname` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `imageurl` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `seasonid_fk` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `seasonticketeligible` on the `events` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailstatus` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_modified_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performance_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `run_time` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "patronType" AS ENUM ('Business', 'Corporate_Foundation', 'Corporation', 'Federal_Agency', 'Foundation', 'Household', 'Individual', 'Local_Agency', 'Nonprofit_Arts', 'Nonprofit_Community_Development', 'Nonprofit_Education', 'Nonprofit_Environment', 'Nonprofit_Health_Services', 'Nonprofit_Human_Services', 'Nonprofit_Public_Policy', 'Private_Foundation', 'School', 'State_Agency', 'Partnership', 'SoleProprietorship', 'Trust', 'Estate', 'ReligiousInstitution', 'University', 'Hospital', 'Library', 'TradeAssociation', 'InternationalOrganization', 'CommunityGroup', 'Club', 'Cooperative', 'GovernmentBody', 'ResearchInstitution', 'TradeUnion', 'ProfessionalAssociation', 'PoliticalParty', 'Charity', 'PublicInstitution', 'Military', 'NewsMedia', 'EntertainmentIndustry', 'StartUp', 'MultinationalCorporation', 'SmallMediumEnterprise', 'MicroEnterprise', 'ThinkTank', 'CulturalInstitution', 'SportsOrganization', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "emailStatus" AS ENUM ('Opt_Out', 'Bounced', 'Collected', 'Confirmed_Opt_In', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "transaction_item_type" AS ENUM ('Subscription', 'Subscription_Distribution', 'Fulfullment_Item', 'Tickets', 'Refund', 'Exchange_Item', 'Fulfillment_Item_Return', 'Donation', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "transaction_payment_method" AS ENUM ('Cash', 'Credit_Card', 'Comp', 'Exchange', 'Third_Party', 'Donation', 'Check', 'In_Kind', 'Other', 'Stock', 'Soft_Credit', 'Direct_Deposit', 'Group_Sale_Payment', 'Gift_Certificate_Credit', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "transaction_status" AS ENUM ('Payment_Complete', 'Refund', 'Exchange', 'Refund_Donation', 'Partial_Payment', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ticketorder_type" AS ENUM ('Tickets', 'Tickets_Subscription', 'Subscription', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ticketorder_order_status" AS ENUM ('Complete', 'Fully_Refunded', 'Partially_Paid', 'Deleted', 'To_Be_Qualified', 'Reservation', 'Payment_Exception', 'Draft', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ticketorder_subscription_status" AS ENUM ('Not_Applicable', 'Filled', 'Awaiting_Fulfillment', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ticketorder_order_origin" AS ENUM ('Import', 'Online', 'Walk_up', 'Phone', 'Imported', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ticketorder_payment_method" AS ENUM ('Third_Party', 'Cash', 'Credit_Card', 'Comp', 'Check', 'Group_Sale_Payment', 'Gift_Certificate_Credit', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ticketorderitem_status" AS ENUM ('Active', 'Deleted', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "recordtype_sobjecttype" AS ENUM ('Campaign', 'Account', 'Opportunity', 'Contact', 'Question', 'Reply', 'Idea', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "recordtype_name" AS ENUM ('MailChimp', 'Salesforce', 'Deceased', 'SoftCredit', 'Pledge', 'PledgePayment', 'Organization', 'InKind', 'FundraiserTickets', 'RiseShineRegistration', 'MatchingDonation', 'Household', 'Government', 'Nonprofit', 'Individual', 'Foundation', 'Business', 'PatronContact', 'OtherContact', 'Donation', 'CorporateDonation', 'MajorGift', 'Grant', 'Membership', 'PatronTicketDonation', 'ToBeQualified', 'GroupSalePayment', 'GroupSale', 'GrantPayment', 'InternalIdeasQuestionRecordType', 'InternalIdeasReplyRecordType', 'InternalIdeasIdeaRecordType', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "opportunity_type" AS ENUM ('InKind', 'Individual', 'Corporate', 'SpecialEvent', 'FoundationGrant', 'SoftCredit', 'Board', 'MajorEvent', 'SpecialProject', 'GovernmentLocal', 'GovernmentFederal', 'GovernmentState', 'OtherEvent4720', 'Individual4450', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "opportunity_paymenttype" AS ENUM ('InKind', 'Other', 'CreditCardHistorical', 'Cash', 'Check', 'GiftCert', 'CreditCard', 'Stock', 'SoftCredit', 'TicketOrderRefund', 'DirectDeposit', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "opportunity_fundtype" AS ENUM ('GeneralFund', 'CapitalCampaign', 'EducationFund', 'CapitalCampaignBuyTheBuilding', 'UNKNOWN');

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
DROP COLUMN "newsletter",
DROP COLUMN "seatingaccom",
DROP COLUMN "vip",
DROP COLUMN "volunteerlist",
ADD COLUMN     "account_id" INTEGER NOT NULL,
ADD COLUMN     "attending_next_dinner" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "board_member" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "chocolate_and_card" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "company" VARCHAR(255),
ADD COLUMN     "contactorigin" VARCHAR(255),
ADD COLUMN     "createdbyid" VARCHAR(255),
ADD COLUMN     "createddate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_season_subscriber" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "deceased" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "department" VARCHAR(255),
ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "do_not_mail" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "donate_date_entered" TIMESTAMP(3),
ADD COLUMN     "donnotcall" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "donor_recognition" VARCHAR(255),
ADD COLUMN     "email_list_notes" VARCHAR(255),
ADD COLUMN     "email_lists" VARCHAR(255),
ADD COLUMN     "emailbouncedate" TIMESTAMP(3),
ADD COLUMN     "emailbouncereason" VARCHAR(255),
ADD COLUMN     "emailstatus" "emailStatus" NOT NULL,
ADD COLUMN     "fax" VARCHAR(255),
ADD COLUMN     "formalsalutation" VARCHAR(255),
ADD COLUMN     "genderidentity" VARCHAR(255),
ADD COLUMN     "hasoptedoutofemail" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hasoptedoutoffax" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homephone" VARCHAR(255),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "informal_address_name" VARCHAR(255),
ADD COLUMN     "informal_salutation" VARCHAR(255),
ADD COLUMN     "is_deleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastactivitydate" TIMESTAMP(3),
ADD COLUMN     "lastmodifiedbyid" VARCHAR(255),
ADD COLUMN     "lastmodifieddate" TIMESTAMP(3),
ADD COLUMN     "legacy_membership_circle" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "mailingcity" VARCHAR(255),
ADD COLUMN     "mailingcountry" VARCHAR(255),
ADD COLUMN     "mailingpostalcode" VARCHAR(255),
ADD COLUMN     "mailingstate" VARCHAR(255),
ADD COLUMN     "mailingstreet" VARCHAR(255),
ADD COLUMN     "middlename" VARCHAR(255),
ADD COLUMN     "mobilephone" VARCHAR(255),
ADD COLUMN     "other_email" VARCHAR(255),
ADD COLUMN     "othercity" VARCHAR(255),
ADD COLUMN     "othercountry" VARCHAR(255),
ADD COLUMN     "otherphone" VARCHAR(255),
ADD COLUMN     "otherpostalcode" VARCHAR(255),
ADD COLUMN     "otherstate" VARCHAR(255),
ADD COLUMN     "otherstreet" VARCHAR(255),
ADD COLUMN     "pronouns" VARCHAR(255),
ADD COLUMN     "reserved_seating" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "salutation" VARCHAR(255),
ADD COLUMN     "seating_accomodation" DECIMAL(10,2) DEFAULT 0.0,
ADD COLUMN     "suffix" VARCHAR(255),
ADD COLUMN     "systemmodstamp" TIMESTAMP(3),
ADD COLUMN     "title" VARCHAR(255),
ADD COLUMN     "volunteer_interests" VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");

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
ADD COLUMN     "event_id" SERIAL NOT NULL,
ADD COLUMN     "last_modified_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "owner_id" INTEGER NOT NULL,
ADD COLUMN     "performance_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pre_post_show_email_flag" DOUBLE PRECISION,
ADD COLUMN     "pre_show_email_cutoff_minutes" DOUBLE PRECISION,
ADD COLUMN     "pre_show_email_minutes" DOUBLE PRECISION,
ADD COLUMN     "run_time" TEXT NOT NULL,
ADD COLUMN     "season" TEXT,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("event_id");

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "isdeleted" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR(255),
    "type" "patronType" NOT NULL,
    "shippingstreet" VARCHAR(255),
    "shippingcity" VARCHAR(255),
    "shippingstate" VARCHAR(255),
    "shippingpostalcode" VARCHAR(255),
    "shippingcountry" VARCHAR(255),
    "phone" VARCHAR(20),
    "fax" VARCHAR(20),
    "website" VARCHAR(255),
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastmodifieddate" TIMESTAMP(3) NOT NULL,
    "lastmodifiedbyid" VARCHAR(255),
    "lastactivitydate" TIMESTAMP(3),
    "do_not_call" INTEGER NOT NULL DEFAULT 0,
    "do_not_mail" INTEGER NOT NULL DEFAULT 0,
    "donor_recognition" VARCHAR(255),
    "donor_email" VARCHAR(255),
    "formal_salutation" VARCHAR(255),
    "hasoptedoutofemail" INTEGER NOT NULL DEFAULT 0,
    "informal_address_name" VARCHAR(255),
    "informal_salutation" VARCHAR(255),
    "attn" VARCHAR(255),
    "grant_size" VARCHAR(255),
    "will_give_it" VARCHAR(255),
    "first_donation_date" TIMESTAMP(3),
    "last_donation_date" TIMESTAMP(3),
    "lifetime_donation_history_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetime_donation_number" INTEGER NOT NULL DEFAULT 0,
    "this_year_donation_history_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_this_fiscal_year" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "last_donation_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetimesingleticketamount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetimesubscriptionamount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "board_member" INTEGER NOT NULL DEFAULT 0,
    "show_sponsor" INTEGER NOT NULL DEFAULT 0,
    "seating_accomodation" INTEGER NOT NULL DEFAULT 0,
    "amount_donated_CY20" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_CY18" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "sort_name" VARCHAR(255),
    "amount_donated_last_fiscal_year" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_CY21" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_CY19" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_FY20" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_FY19" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_donated_FY18" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "lifetime_donations_included_pledged" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "first_donation_date_incl_pledged" TIMESTAMP(3),
    "amount_donated_FY21" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "firstdonationamount" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "largestdonationdate" TIMESTAMP(3),
    "amount_donated_FY22" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_Donated_FY23" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "amount_Donated_FY24" DECIMAL(10,2) NOT NULL DEFAULT 0.0,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "isdeleted" INTEGER NOT NULL DEFAULT 0,
    "contactid" INTEGER,
    "accountid" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "createddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastmodifieddate" TIMESTAMP(3),

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "transaction_id" SERIAL NOT NULL,
    "patron_transaction_id" INTEGER NOT NULL,
    "ticket_order_id" INTEGER,
    "item_id" TEXT,
    "ticket_order_item_id" INTEGER,
    "item_type" "transaction_item_type" NOT NULL DEFAULT 'UNKNOWN',
    "item_name" TEXT NOT NULL,
    "payment_method" "transaction_payment_method" NOT NULL DEFAULT 'UNKNOWN',
    "status" "transaction_status" NOT NULL DEFAULT 'UNKNOWN',
    "payment_processor" TEXT,
    "exchange_type" TEXT,
    "order_origin" TEXT,
    "entry_method" TEXT,
    "credit_card_entry_method" TEXT,
    "credit_card_last_four" TEXT,
    "name_on_card" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
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

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "ticketorders" (
    "ticket_order_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "ticket_order_name" INTEGER NOT NULL,
    "type" "ticketorder_type" NOT NULL DEFAULT 'UNKNOWN',
    "order_status" "ticketorder_order_status" NOT NULL DEFAULT 'UNKNOWN',
    "subscription_status" "ticketorder_subscription_status" NOT NULL DEFAULT 'UNKNOWN',
    "email" TEXT NOT NULL,
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
    "order_origin" "ticketorder_order_origin" NOT NULL DEFAULT 'UNKNOWN',
    "order_source" TEXT,
    "payment_method" "ticketorder_payment_method" NOT NULL DEFAULT 'UNKNOWN',
    "amount_paid" DECIMAL(10,2) DEFAULT 0.00,
    "fees" DECIMAL(10,2) DEFAULT 0.00,
    "exchange_fee" DECIMAL(10,2) DEFAULT 0.00,
    "donation_id" INTEGER,
    "donation_amount" DECIMAL(10,2) DEFAULT 0.00,
    "delivery_method" TEXT,
    "salutation" TEXT,
    "shipping_salutation" TEXT,
    "email_opt_in" INTEGER NOT NULL DEFAULT 0,
    "anonymous_purchase_flag" INTEGER,
    "update_contact_record" DOUBLE PRECISION,
    "send_confirmation_email_flag" DOUBLE PRECISION,
    "request_accommodation" TEXT,
    "external_id" TEXT,
    "comments" TEXT,
    "notes" TEXT,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticketorders_pkey" PRIMARY KEY ("ticket_order_id")
);

-- CreateTable
CREATE TABLE "ticketorderitem" (
    "ticket_order_item_id" SERIAL NOT NULL,
    "ticket_order_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "status" "ticketorderitem_status" NOT NULL DEFAULT 'UNKNOWN',
    "season" TEXT,
    "event_id" INTEGER,
    "subscription_order_item_id" TEXT,
    "price_level_id" INTEGER,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "ticket_price" DECIMAL(10,2) DEFAULT 0.00,
    "unit_price" DECIMAL(10,2) DEFAULT 0.00,
    "amount_paid" DECIMAL(10,2) DEFAULT 0.00,
    "sales_tax" DECIMAL(10,2) DEFAULT 0.00,
    "discount_code_id" TEXT,
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
    "id" SERIAL NOT NULL,
    "name" "recordtype_name" NOT NULL DEFAULT 'UNKNOWN',
    "description" TEXT,
    "sobject_type" "recordtype_sobjecttype" NOT NULL DEFAULT 'UNKNOWN',
    "is_active" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "system_modstamp" TIMESTAMP(3) NOT NULL,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "recordtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunity" (
    "id" SERIAL NOT NULL,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,
    "accountid" INTEGER NOT NULL,
    "record_type_id" INTEGER NOT NULL,
    "is_private" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "close_date" TIMESTAMP(3) NOT NULL,
    "type" "opportunity_type" NOT NULL DEFAULT 'UNKNOWN',
    "campaign_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "fiscal_year" INTEGER NOT NULL,
    "fiscal_quarter" INTEGER NOT NULL,
    "contactid" INTEGER NOT NULL,
    "is_anonymous" INTEGER NOT NULL,
    "amount_paid" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "dedication_honoree_name" TEXT,
    "dedication_type" TEXT,
    "donor_id" TEXT NOT NULL,
    "fund_type" "opportunity_fundtype" NOT NULL DEFAULT 'UNKNOWN',
    "grant_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "payment_type" "opportunity_paymenttype" NOT NULL DEFAULT 'UNKNOWN',
    "sub_type" TEXT,
    "fiscal_year_season" TEXT,
    "grant_ask_amount" DECIMAL(10,2) DEFAULT 0.00,
    "appeal" TEXT,
    "tax_deductible_amount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "acknowledged_by_letter" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donoid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_eventid_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_contactid_fkey" FOREIGN KEY ("contactid") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_accountid_fkey" FOREIGN KEY ("accountid") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contactid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickets" ADD CONSTRAINT "seasontickets_eventid_fk_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "ticketorders"("ticket_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_ticket_order_item_id_fkey" FOREIGN KEY ("ticket_order_item_id") REFERENCES "ticketorderitem"("ticket_order_item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorders" ADD CONSTRAINT "ticketorders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorders" ADD CONSTRAINT "ticketorders_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "ticketorders"("ticket_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketorderitem" ADD CONSTRAINT "ticketorderitem_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_accountid_fkey" FOREIGN KEY ("accountid") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_record_type_id_fkey" FOREIGN KEY ("record_type_id") REFERENCES "recordtype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_contactid_fkey" FOREIGN KEY ("contactid") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
