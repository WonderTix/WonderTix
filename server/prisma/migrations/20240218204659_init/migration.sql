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
    "subscriptioneligible" BOOLEAN NOT NULL DEFAULT true,
    "imageurl" VARCHAR(255),
    "deletedat" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "subscriptiontypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "previewonly" BOOLEAN NOT NULL DEFAULT false,
    "price" MONEY NOT NULL,
    "deletedat" TIMESTAMP(3),

    CONSTRAINT "subscriptiontypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasonsubscriptiontypes" (
    "seasonid_fk" INTEGER NOT NULL,
    "subscriptiontypeid_fk" INTEGER NOT NULL,
    "subscriptionlimit" INTEGER NOT NULL,
    "price" MONEY NOT NULL,
    "ticketlimit" INTEGER NOT NULL,
    "deletedat" TIMESTAMP(3),

    CONSTRAINT "seasonsubscriptiontypes_pkey" PRIMARY KEY ("seasonid_fk","subscriptiontypeid_fk")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "subscriptiontypeid_fk" INTEGER NOT NULL,
    "seasonid_fk" INTEGER NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptionticketitems" (
    "id" SERIAL NOT NULL,
    "subscriptionid_fk" INTEGER NOT NULL,

    CONSTRAINT "subscriptionticketitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderticketitems" (
    "id" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "orderticketitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketitems" (
    "id" SERIAL NOT NULL,
    "orderticketitemid_fk" INTEGER,
    "subscriptionticketitemid_fk" INTEGER,
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
    "ordersubtotal" MONEY NOT NULL,
    "discounttotal" MONEY NOT NULL DEFAULT 0,

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
    "orderticketitemid_fk" INTEGER,
    "subscriptionid_fk" INTEGER,
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

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "donations_orderid_fk_key" ON "donations"("orderid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "ticketitems_orderticketitemid_fk_key" ON "ticketitems"("orderticketitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "ticketitems_subscriptionticketitemid_fk_key" ON "ticketitems"("subscriptionticketitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_intent_key" ON "orders"("payment_intent");

-- CreateIndex
CREATE UNIQUE INDEX "orders_checkout_sessions_key" ON "orders"("checkout_sessions");

-- CreateIndex
CREATE UNIQUE INDEX "refunds_refund_intent_key" ON "refunds"("refund_intent");

-- CreateIndex
CREATE UNIQUE INDEX "refunditems_orderticketitemid_fk_key" ON "refunditems"("orderticketitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "refunditems_subscriptionid_fk_key" ON "refunditems"("subscriptionid_fk");

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
ALTER TABLE "seasonsubscriptiontypes" ADD CONSTRAINT "seasonsubscriptiontypes_seasonid_fk_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasonsubscriptiontypes" ADD CONSTRAINT "seasonsubscriptiontypes_subscriptiontypeid_fk_fkey" FOREIGN KEY ("subscriptiontypeid_fk") REFERENCES "subscriptiontypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscriptiontypeid_fk_seasonid_fk_fkey" FOREIGN KEY ("subscriptiontypeid_fk", "seasonid_fk") REFERENCES "seasonsubscriptiontypes"("subscriptiontypeid_fk", "seasonid_fk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptionticketitems" ADD CONSTRAINT "subscriptionticketitems_subscriptionid_fk_fkey" FOREIGN KEY ("subscriptionid_fk") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderticketitems" ADD CONSTRAINT "orderticketitems_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_ticketrestrictionid_fk_fkey" FOREIGN KEY ("ticketrestrictionid_fk") REFERENCES "ticketrestrictions"("ticketrestrictionsid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_orderticketitemid_fk_fkey" FOREIGN KEY ("orderticketitemid_fk") REFERENCES "orderticketitems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_subscriptionticketitemid_fk_fkey" FOREIGN KEY ("subscriptionticketitemid_fk") REFERENCES "subscriptionticketitems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_orderticketitemid_fk_fkey" FOREIGN KEY ("orderticketitemid_fk") REFERENCES "orderticketitems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_subscriptionid_fk_fkey" FOREIGN KEY ("subscriptionid_fk") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- Manually Add Refund Constraint
ALTER TABLE "refunditems" ADD CONSTRAINT "refund_ticketitems_check" CHECK (("donationid_fk" is null AND "subscriptionid_fk" is null AND "orderticketitemid_fk" is not null) OR ("orderticketitemid_fk" is null AND "subscriptionid_fk" is null AND "donationid_fk" is not null) or ("orderticketitemid_fk" is null AND "subscriptionid_fk" is not null AND "donationid_fk" is null));

-- Manually Add Ticket Item Constraint
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_check" CHECK (("orderticketitemid_fk" is null AND "subscriptionticketitemid_fk" is not null) OR ("orderticketitemid_fk" is not null AND "subscriptionticketitemid_fk" is null))
