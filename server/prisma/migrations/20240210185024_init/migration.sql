-- CreateEnum
CREATE TYPE "freq" AS ENUM ('one-time', 'weekly', 'monthly', 'yearly');

-- CreateEnum
CREATE TYPE "state" AS ENUM ('not_started', 'in_progress', 'completed');

-- CreateTable
CREATE TABLE "contacts" (
    "contactid" SERIAL NOT NULL,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "email" VARCHAR(100),
    "phone" VARCHAR(15),
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "country" VARCHAR(255),
    "postalcode" VARCHAR(255),
    "seatingaccom" VARCHAR(255),
    "comments" VARCHAR(255),
    "donorbadge" BOOLEAN DEFAULT false,
    "vip" BOOLEAN DEFAULT false,
    "volunteerlist" BOOLEAN DEFAULT false,
    "newsletter" BOOLEAN DEFAULT false,
    "createddate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("contactid")
);

-- CreateTable
CREATE TABLE "date" (
    "dateid" INTEGER NOT NULL,
    "date_actual" DATE NOT NULL,
    "day_name" VARCHAR(9) NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "day_of_month" INTEGER NOT NULL,
    "day_of_quarter" INTEGER NOT NULL,
    "day_of_year" INTEGER NOT NULL,
    "week_of_month" INTEGER NOT NULL,
    "week_of_year" INTEGER NOT NULL,
    "month_actual" INTEGER NOT NULL,
    "month_name" VARCHAR(9) NOT NULL,
    "quarter" INTEGER NOT NULL,
    "year_actual" INTEGER NOT NULL,
    "first_day_of_week" DATE NOT NULL,
    "last_day_of_week" DATE NOT NULL,
    "first_day_of_month" DATE NOT NULL,
    "last_day_of_month" DATE NOT NULL,
    "first_day_of_quarter" DATE NOT NULL,
    "last_day_of_quarter" DATE NOT NULL,
    "first_day_of_year" DATE NOT NULL,
    "last_day_of_year" DATE NOT NULL,
    "weekend" BOOLEAN NOT NULL,

    CONSTRAINT "date_pkey" PRIMARY KEY ("dateid")
);

-- CreateTable
CREATE TABLE "discounts" (
    "discountid" SERIAL NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "amount" MONEY,
    "percent" INTEGER,
    "tickettypeid_fk" INTEGER,
    "usagelimit" INTEGER,
    "min_tickets" INTEGER,
    "min_events" INTEGER,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("discountid")
);

-- CreateTable
CREATE TABLE "donations" (
    "donationid" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "amount" MONEY NOT NULL,
    "frequency" "freq" NOT NULL,
    "comments" VARCHAR(255),

    CONSTRAINT "donations_pkey" PRIMARY KEY ("donationid")
);

-- CreateTable
CREATE TABLE "eventinstances" (
    "eventinstanceid" SERIAL NOT NULL,
    "eventid_fk" INTEGER NOT NULL,
    "eventdate" INTEGER NOT NULL,
    "eventtime" TIMETZ(6) NOT NULL,
    "salestatus" BOOLEAN NOT NULL DEFAULT true,
    "totalseats" INTEGER NOT NULL DEFAULT 0,
    "availableseats" INTEGER NOT NULL DEFAULT 0,
    "detail" VARCHAR(255),
    "purchaseuri" VARCHAR(255),
    "ispreview" BOOLEAN NOT NULL DEFAULT false,
    "deletedat" TIMESTAMP(3),

    CONSTRAINT "eventinstances_pkey" PRIMARY KEY ("eventinstanceid")
);

-- CreateTable
CREATE TABLE "events" (
    "eventid" SERIAL NOT NULL,
    "seasonid_fk" INTEGER,
    "eventname" VARCHAR(255) NOT NULL,
    "eventdescription" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "seasonticketeligible" BOOLEAN NOT NULL DEFAULT true,
    "imageurl" VARCHAR(255),
    "deletedat" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "order_ticketitems" (
    "id" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "order_ticketitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketitems" (
    "id" SERIAL NOT NULL,
    "order_ticketitemid_fk" INTEGER NOT NULL,
    "ticketrestrictionid_fk" INTEGER NOT NULL,
    "donated" BOOLEAN NOT NULL DEFAULT false,
    "redeemed" TIMESTAMP(3),

    CONSTRAINT "ticketitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderid" SERIAL NOT NULL,
    "orderdatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactid_fk" INTEGER NOT NULL,
    "discountid_fk" INTEGER,
    "payment_intent" VARCHAR(255),
    "checkout_sessions" VARCHAR(255),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderid")
);

-- CreateTable
CREATE TABLE "refunds" (
    "id" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "refund_intent" VARCHAR(255) NOT NULL,

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refunditems" (
    "id" SERIAL NOT NULL,
    "refundid_fk" INTEGER NOT NULL,
    "order_ticketitemid_fk" INTEGER,
    "donationid_fk" INTEGER,
    "amount" MONEY NOT NULL,

    CONSTRAINT "refunditems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savedreports" (
    "savedreportid" SERIAL NOT NULL,
    "tablename" VARCHAR(255),
    "queryattr" TEXT,

    CONSTRAINT "savedreports_pkey" PRIMARY KEY ("savedreportid")
);

-- CreateTable
CREATE TABLE "seasons" (
    "seasonid" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "startdate" INTEGER NOT NULL,
    "enddate" INTEGER NOT NULL,
    "imageurl" VARCHAR(255),
    "deletedat" TIMESTAMP,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("seasonid")
);

-- CreateTable
CREATE TABLE "seasontickettypepricedefault" (
    "id" SERIAL NOT NULL,
    "seasonid_fk" INTEGER NOT NULL,
    "tickettypeid_fk" INTEGER NOT NULL,
    "price" MONEY NOT NULL DEFAULT 0,
    "concessionprice" MONEY NOT NULL DEFAULT 0,

    CONSTRAINT "seasontickettypepricedefault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "taskid" SERIAL NOT NULL,
    "parentid_fk" INTEGER,
    "assignto_fk" INTEGER,
    "reportto_fk" INTEGER,
    "subject" VARCHAR(255),
    "description" VARCHAR(255),
    "status" "state",
    "datecreated" INTEGER,
    "dateassigned" INTEGER,
    "datedue" INTEGER,
    "ref_contact" INTEGER,
    "ref_donation" INTEGER,
    "ref_order" INTEGER,
    "ref_user" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("taskid")
);

-- CreateTable
CREATE TABLE "tasknotes" (
    "tasknoteid" SERIAL NOT NULL,
    "taskid_fk" INTEGER,
    "date" INTEGER,
    "notes" TEXT,

    CONSTRAINT "tasknotes_pkey" PRIMARY KEY ("tasknoteid")
);

-- CreateTable
CREATE TABLE "ticketrestrictions" (
    "ticketrestrictionsid" SERIAL NOT NULL,
    "eventinstanceid_fk" INTEGER NOT NULL,
    "tickettypeid_fk" INTEGER NOT NULL,
    "ticketlimit" INTEGER NOT NULL,
    "price" MONEY NOT NULL DEFAULT 0,
    "concessionprice" MONEY NOT NULL DEFAULT 0,
    "seasontickettypepricedefaultid_fk" INTEGER,
    "deletedat" TIMESTAMP(3),

    CONSTRAINT "ticketrestrictions_pkey" PRIMARY KEY ("ticketrestrictionsid")
);

-- CreateTable
CREATE TABLE "tickettype" (
    "tickettypeid" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "price" MONEY NOT NULL,
    "concessions" MONEY NOT NULL,
    "deprecated" BOOLEAN DEFAULT false,

    CONSTRAINT "tickettype_pkey" PRIMARY KEY ("tickettypeid")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "is_superadmin" BOOLEAN NOT NULL DEFAULT false,
    "auth0_id" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "StripeWebhook" (
    "id" SERIAL NOT NULL,
    "eventid" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "livemode" BOOLEAN NOT NULL,
    "created" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "requestid" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "StripeWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Error" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "donations_orderid_fk_key" ON "donations"("orderid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "ticketitems_order_ticketitemid_fk_key" ON "ticketitems"("order_ticketitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_intent_key" ON "orders"("payment_intent");

-- CreateIndex
CREATE UNIQUE INDEX "orders_checkout_sessions_key" ON "orders"("checkout_sessions");

-- CreateIndex
CREATE UNIQUE INDEX "refunds_refund_intent_key" ON "refunds"("refund_intent");

-- CreateIndex
CREATE UNIQUE INDEX "refunditems_order_ticketitemid_fk_key" ON "refunditems"("order_ticketitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "refunditems_donationid_fk_key" ON "refunditems"("donationid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "seasontickettypepricedefault_seasonid_fk_tickettypeid_fk_key" ON "seasontickettypepricedefault"("seasonid_fk", "tickettypeid_fk");

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_tickettypeid_fk_fkey" FOREIGN KEY ("tickettypeid_fk") REFERENCES "tickettype"("tickettypeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_eventdate_fkey" FOREIGN KEY ("eventdate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_eventid_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("eventid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_seasonid_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_ticketitems" ADD CONSTRAINT "order_ticketitems_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_ticketrestrictionid_fk_fkey" FOREIGN KEY ("ticketrestrictionid_fk") REFERENCES "ticketrestrictions"("ticketrestrictionsid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_order_ticketitemid_fk_fkey" FOREIGN KEY ("order_ticketitemid_fk") REFERENCES "order_ticketitems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contactid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contactid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_discountid_fkey" FOREIGN KEY ("discountid_fk") REFERENCES "discounts"("discountid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_refundid_fk_fkey" FOREIGN KEY ("refundid_fk") REFERENCES "refunds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_donationid_fk_fkey" FOREIGN KEY ("donationid_fk") REFERENCES "donations"("donationid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_order_ticketitemid_fk_fkey" FOREIGN KEY ("order_ticketitemid_fk") REFERENCES "order_ticketitems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_enddate_fkey" FOREIGN KEY ("enddate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_startdate_fkey" FOREIGN KEY ("startdate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickettypepricedefault" ADD CONSTRAINT "seasontickettypepricedefault_seasonid_fk_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasontickettypepricedefault" ADD CONSTRAINT "seasontickettypepricedefault_tickettypeid_fk_fkey" FOREIGN KEY ("tickettypeid_fk") REFERENCES "tickettype"("tickettypeid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assign_to_fkey" FOREIGN KEY ("assignto_fk") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_dateassigned_fkey" FOREIGN KEY ("dateassigned") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_datecreated_fkey" FOREIGN KEY ("datecreated") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_datedue_fkey" FOREIGN KEY ("datedue") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_parent_id_fkey" FOREIGN KEY ("parentid_fk") REFERENCES "task"("taskid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_reportto_fk_fkey" FOREIGN KEY ("reportto_fk") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tasknotes" ADD CONSTRAINT "tasknotes_taskid_fk_fkey" FOREIGN KEY ("taskid_fk") REFERENCES "task"("taskid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticketrestrictions" ADD CONSTRAINT "ticketrestrictions_eventinstanceid_fk_fkey" FOREIGN KEY ("eventinstanceid_fk") REFERENCES "eventinstances"("eventinstanceid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticketrestrictions" ADD CONSTRAINT "ticketrestrictions_tickettypeid_fk_fkey" FOREIGN KEY ("tickettypeid_fk") REFERENCES "tickettype"("tickettypeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticketrestrictions" ADD CONSTRAINT "ticketrestrictions_seasontickettypepricedefaultid_fk_fkey" FOREIGN KEY ("seasontickettypepricedefaultid_fk") REFERENCES "seasontickettypepricedefault"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
