/*
  Warnings:

  - You are about to drop the column `seasonticketeligible` on the `events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subscriptionid_fk]` on the table `refunditems` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscriptionticketitemid_fk]` on the table `ticketitems` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "seasonticketeligible",
ADD COLUMN     "subscriptioneligible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "refunditems" ADD COLUMN     "subscriptionid_fk" INTEGER;

-- AlterTable
ALTER TABLE "ticketitems" ADD COLUMN     "subscriptionticketitemid_fk" INTEGER,
ALTER COLUMN "orderticketitemid_fk" DROP NOT NULL;

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

-- CreateIndex
CREATE UNIQUE INDEX "refunditems_subscriptionid_fk_key" ON "refunditems"("subscriptionid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "ticketitems_subscriptionticketitemid_fk_key" ON "ticketitems"("subscriptionticketitemid_fk");

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
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_subscriptionticketitemid_fk_fkey" FOREIGN KEY ("subscriptionticketitemid_fk") REFERENCES "subscriptionticketitems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_subscriptionid_fk_fkey" FOREIGN KEY ("subscriptionid_fk") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Manually Drop prior Refund Constraint
ALTER TABLE "refunditems" DROP CONSTRAINT "refund_ticketitems_check";

-- Manually Add Refund Constraint
ALTER TABLE "refunditems" ADD CONSTRAINT "refund_ticketitems_check" CHECK (("donationid_fk" is null AND "subscriptionid_fk" is null AND "orderticketitemid_fk" is not null) OR ("orderticketitemid_fk" is null AND "subscriptionid_fk" is null AND "donationid_fk" is not null) or ("orderticketitemid_fk" is null AND "subscriptionid_fk" is not null AND "donationid_fk" is null));

-- Manually Add Ticket Item Constraint
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_check" CHECK (("orderticketitemid_fk" is null AND "subscriptionticketitemid_fk" is not null) OR ("orderticketitemid_fk" is not null AND "subscriptionticketitemid_fk" is null));
