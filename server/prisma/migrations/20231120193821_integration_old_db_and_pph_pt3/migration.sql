/*
  Warnings:

  - You are about to drop the `PPH_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_opportunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_recordtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_ticketorderitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_ticketorders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PPH_transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PPH_contacts" DROP CONSTRAINT "PPH_contacts_account_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_notes" DROP CONSTRAINT "PPH_notes_account_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_notes" DROP CONSTRAINT "PPH_notes_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_opportunity" DROP CONSTRAINT "PPH_opportunity_account_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_opportunity" DROP CONSTRAINT "PPH_opportunity_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_opportunity" DROP CONSTRAINT "PPH_opportunity_record_type_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_ticketorderitem" DROP CONSTRAINT "PPH_ticketorderitem_account_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_ticketorderitem" DROP CONSTRAINT "PPH_ticketorderitem_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_ticketorderitem" DROP CONSTRAINT "PPH_ticketorderitem_ticket_order_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_ticketorders" DROP CONSTRAINT "PPH_ticketorders_account_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_ticketorders" DROP CONSTRAINT "PPH_ticketorders_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_transactions" DROP CONSTRAINT "PPH_transactions_ticket_order_id_fkey";

-- DropForeignKey
ALTER TABLE "PPH_transactions" DROP CONSTRAINT "PPH_transactions_ticket_order_item_id_fkey";

-- DropTable
DROP TABLE "PPH_accounts";

-- DropTable
DROP TABLE "PPH_contacts";

-- DropTable
DROP TABLE "PPH_events";

-- DropTable
DROP TABLE "PPH_notes";

-- DropTable
DROP TABLE "PPH_opportunity";

-- DropTable
DROP TABLE "PPH_recordtype";

-- DropTable
DROP TABLE "PPH_ticketorderitem";

-- DropTable
DROP TABLE "PPH_ticketorders";

-- DropTable
DROP TABLE "PPH_transactions";

-- CreateTable
CREATE TABLE "pphAccounts" (
    "account_id" BIGSERIAL NOT NULL,
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

    CONSTRAINT "pphAccounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "pphContacts" (
    "contact_id" BIGSERIAL NOT NULL,
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

    CONSTRAINT "pphContacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "pphEvents" (
    "event_id" BIGSERIAL NOT NULL,
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

    CONSTRAINT "pphEvents_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "pphNotes" (
    "note_id" BIGSERIAL NOT NULL,
    "is_deleted" INTEGER NOT NULL DEFAULT 0,
    "contact_id" BIGINT,
    "account_id" BIGINT,
    "title" TEXT,
    "body" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3),

    CONSTRAINT "pphNotes_pkey" PRIMARY KEY ("note_id")
);

-- CreateTable
CREATE TABLE "pphTransactions" (
    "transaction_id" BIGSERIAL NOT NULL,
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

    CONSTRAINT "pphTransactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "pphTicketorders" (
    "ticket_order_id" BIGSERIAL NOT NULL,
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

    CONSTRAINT "pphTicketorders_pkey" PRIMARY KEY ("ticket_order_id")
);

-- CreateTable
CREATE TABLE "pphTicketorderitem" (
    "ticket_order_item_id" BIGSERIAL NOT NULL,
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

    CONSTRAINT "pphTicketorderitem_pkey" PRIMARY KEY ("ticket_order_item_id")
);

-- CreateTable
CREATE TABLE "pphRecordtype" (
    "record_type_id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "sobject_type" TEXT,
    "is_active" INTEGER,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified_date" TIMESTAMP(3) NOT NULL,
    "system_modstamp" TIMESTAMP(3) NOT NULL,
    "is_deleted" INTEGER DEFAULT 0,

    CONSTRAINT "pphRecordtype_pkey" PRIMARY KEY ("record_type_id")
);

-- CreateTable
CREATE TABLE "pphOpportunity" (
    "opportunity_id" BIGSERIAL NOT NULL,
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

    CONSTRAINT "pphOpportunity_pkey" PRIMARY KEY ("opportunity_id")
);

-- AddForeignKey
ALTER TABLE "pphContacts" ADD CONSTRAINT "pphContacts_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "pphAccounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphNotes" ADD CONSTRAINT "pphNotes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "pphContacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphNotes" ADD CONSTRAINT "pphNotes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "pphAccounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphTransactions" ADD CONSTRAINT "pphTransactions_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "pphTicketorders"("ticket_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphTransactions" ADD CONSTRAINT "pphTransactions_ticket_order_item_id_fkey" FOREIGN KEY ("ticket_order_item_id") REFERENCES "pphTicketorderitem"("ticket_order_item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphTicketorders" ADD CONSTRAINT "pphTicketorders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "pphAccounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphTicketorders" ADD CONSTRAINT "pphTicketorders_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "pphContacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphTicketorderitem" ADD CONSTRAINT "pphTicketorderitem_ticket_order_id_fkey" FOREIGN KEY ("ticket_order_id") REFERENCES "pphTicketorders"("ticket_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphTicketorderitem" ADD CONSTRAINT "pphTicketorderitem_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "pphAccounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphTicketorderitem" ADD CONSTRAINT "pphTicketorderitem_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "pphContacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphOpportunity" ADD CONSTRAINT "pphOpportunity_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "pphAccounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphOpportunity" ADD CONSTRAINT "pphOpportunity_record_type_id_fkey" FOREIGN KEY ("record_type_id") REFERENCES "pphRecordtype"("record_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pphOpportunity" ADD CONSTRAINT "pphOpportunity_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "pphContacts"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;
