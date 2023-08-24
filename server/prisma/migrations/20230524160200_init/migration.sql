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
    "address" VARCHAR(255),
    "phone" VARCHAR(15),
    "donorbadge" BOOLEAN DEFAULT false,
    "seatingaccom"  BOOLEAN DEFAULT false,
    "vip" BOOLEAN DEFAULT false,
    "volunteerlist" BOOLEAN DEFAULT false,
    "newsletter" BOOLEAN DEFAULT false,

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
    "code" VARCHAR(32),
    "amount" INTEGER,
    "percent" INTEGER,
    "startdate" INTEGER,
    "enddate" INTEGER,
    "tickettypeid_fk" INTEGER,
    "createdby_fk" INTEGER,
    "usagelimit" INTEGER,
    "min_tickets" INTEGER,
    "min_events" INTEGER,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("discountid")
);

-- CreateTable
CREATE TABLE "donations" (
    "donationid" SERIAL NOT NULL,
    "contactid_fk" INTEGER,
    "isanonymous" BOOLEAN DEFAULT false,
    "amount" MONEY,
    "donorname" VARCHAR(255),
    "frequency" "freq",
    "comments" VARCHAR(255),
    "payment_intent" VARCHAR(255),
    "refund_intent" VARCHAR(255),
    "donationdate" INTEGER,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("donationid")
);

-- CreateTable
CREATE TABLE "eventinstances" (
    "eventinstanceid" SERIAL NOT NULL,
    "eventid_fk" INTEGER NOT NULL,
    "eventdate" INTEGER NOT NULL,
    "eventtime" TIMETZ(6) NOT NULL,
    "salestatus" BOOLEAN,
    "totalseats" INTEGER,
    "availableseats" INTEGER,
    "purchaseuri" VARCHAR(255),
    "ispreview" BOOLEAN DEFAULT false,
    "defaulttickettype" INTEGER,

    CONSTRAINT "eventinstances_pkey" PRIMARY KEY ("eventinstanceid")
);

-- CreateTable
CREATE TABLE "events" (
    "eventid" SERIAL NOT NULL,
    "seasonid_fk" INTEGER NOT NULL,
    "eventname" VARCHAR(255) NOT NULL,
    "eventdescription" VARCHAR(255),
    "active" BOOLEAN,
    "seasonticketeligible" BOOLEAN,
    "imageurl" VARCHAR(255),

    CONSTRAINT "events_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "eventtickets" (
    "eventticketid" SERIAL NOT NULL,
    "eventinstanceid_fk" INTEGER NOT NULL,
    "tickettypeid_fk" INTEGER,
    "purchased" BOOLEAN DEFAULT false,
    "redeemed" BOOLEAN DEFAULT false,
    "redeemed_ts" TIMETZ(6),
    "donated" BOOLEAN DEFAULT false,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("eventticketid")
);

-- CreateTable
CREATE TABLE "orderitems" (
    "orderitemid" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "price" MONEY,

    CONSTRAINT "orderitems_pkey" PRIMARY KEY ("orderitemid")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderid" SERIAL NOT NULL,
    "contactid_fk" INTEGER NOT NULL,
    "orderdate" INTEGER NOT NULL,
    "ordertime" TIMETZ(6),
    "discountid_fk" INTEGER,
    "payment_intent" VARCHAR(255),
    "refund_intent" VARCHAR(255),
    "ordertotal" MONEY,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderid")
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

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("seasonid")
);

-- CreateTable
CREATE TABLE "seasontickets" (
    "seasonticketid" SERIAL NOT NULL,
    "orderitemid_fk" INTEGER NOT NULL,
    "eventticketid_fk" INTEGER,
    "eventid_fk" INTEGER NOT NULL,
    "seasontickettypeid_fk" INTEGER NOT NULL,
    "ticketwasswapped" BOOLEAN DEFAULT false,

    CONSTRAINT "seasontickets_pkey" PRIMARY KEY ("seasonticketid")
);

-- CreateTable
CREATE TABLE "seasontickettype" (
    "seasontickettypeid" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "seasontickettype_pkey" PRIMARY KEY ("seasontickettypeid")
);

-- CreateTable
CREATE TABLE "singletickets" (
    "singleticketid" SERIAL NOT NULL,
    "eventticketid_fk" INTEGER NOT NULL,
    "orderitemid_fk" INTEGER NOT NULL,
    "ticketwasswapped" BOOLEAN DEFAULT false,

    CONSTRAINT "singletickets_pkey" PRIMARY KEY ("singleticketid")
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
CREATE TABLE "testInfo" (
    "id" SERIAL NOT NULL,
		"token" TEXT
);

-- CreateTable
CREATE TABLE "ticketrestrictions" (
    "ticketrestrictionsid" SERIAL NOT NULL,
    "eventinstanceid_fk" INTEGER NOT NULL,
    "tickettypeid_fk" INTEGER NOT NULL,
    "ticketlimit" INTEGER NOT NULL,
    "ticketssold" INTEGER DEFAULT 0,

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

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_createdby_fk_fkey" FOREIGN KEY ("createdby_fk") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_enddate_fkey" FOREIGN KEY ("enddate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_startdate_fkey" FOREIGN KEY ("startdate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_tickettypeid_fk_fkey" FOREIGN KEY ("tickettypeid_fk") REFERENCES "tickettype"("tickettypeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donationdate_fkey" FOREIGN KEY ("donationdate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donoid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contactid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_defaulttickettype_fkey" FOREIGN KEY ("defaulttickettype") REFERENCES "tickettype"("tickettypeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_eventdate_fkey" FOREIGN KEY ("eventdate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventinstances" ADD CONSTRAINT "eventinstances_eventid_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("eventid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_seasonid_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventtickets" ADD CONSTRAINT "eventtickets_tickettypeid_fk_fkey" FOREIGN KEY ("tickettypeid_fk") REFERENCES "tickettype"("tickettypeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eventtickets" ADD CONSTRAINT "tickets_eventinstanceid_fkey" FOREIGN KEY ("eventinstanceid_fk") REFERENCES "eventinstances"("eventinstanceid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_orderid_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contactid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contactid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_discountid_fkey" FOREIGN KEY ("discountid_fk") REFERENCES "discounts"("discountid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderdate_fkey" FOREIGN KEY ("orderdate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_enddate_fkey" FOREIGN KEY ("enddate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_startdate_fkey" FOREIGN KEY ("startdate") REFERENCES "date"("dateid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickets" ADD CONSTRAINT "seasontickets_eventid_fk_fkey" FOREIGN KEY ("eventid_fk") REFERENCES "events"("eventid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickets" ADD CONSTRAINT "seasontickets_eventticketid_fk_fkey" FOREIGN KEY ("eventticketid_fk") REFERENCES "eventtickets"("eventticketid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickets" ADD CONSTRAINT "seasontickets_orderitemid_fk_fkey" FOREIGN KEY ("orderitemid_fk") REFERENCES "orderitems"("orderitemid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seasontickets" ADD CONSTRAINT "seasontickets_seasontickettypeid_fk_fkey" FOREIGN KEY ("seasontickettypeid_fk") REFERENCES "seasontickettype"("seasontickettypeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "singletickets" ADD CONSTRAINT "singletickets_eventticketid_fk_fkey" FOREIGN KEY ("eventticketid_fk") REFERENCES "eventtickets"("eventticketid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "singletickets" ADD CONSTRAINT "singletickets_orderitemid_fk_fkey" FOREIGN KEY ("orderitemid_fk") REFERENCES "orderitems"("orderitemid") ON DELETE NO ACTION ON UPDATE NO ACTION;

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

ALTER SEQUENCE contacts_contactid_seq RESTART WITH 8193;
ALTER SEQUENCE discounts_discountid_seq RESTART WITH 4;
ALTER SEQUENCE donations_donationid_seq RESTART WITH 2893;
ALTER SEQUENCE eventinstances_eventinstanceid_seq RESTART WITH 452;
ALTER SEQUENCE events_eventid_seq RESTART WITH 37;
ALTER SEQUENCE eventtickets_eventticketid_seq RESTART WITH 45101;
ALTER SEQUENCE orderitems_orderitemid_seq RESTART WITH 25528;
ALTER SEQUENCE orders_orderid_seq RESTART WITH 8618;
ALTER SEQUENCE seasons_seasonid_seq RESTART WITH 8;
ALTER SEQUENCE seasontickets_seasonticketid_seq RESTART WITH 247;
ALTER SEQUENCE seasontickettype_seasontickettypeid_seq RESTART WITH 4;
ALTER SEQUENCE singletickets_singleticketid_seq RESTART WITH 25479;
ALTER SEQUENCE ticketrestrictions_ticketrestrictionsid_seq RESTART WITH 42;
ALTER SEQUENCE tickettype_tickettypeid_seq RESTART WITH 4;
ALTER SEQUENCE users_userid_seq RESTART WITH 4;