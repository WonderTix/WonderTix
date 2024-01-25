/*
  Warnings:

  - You are about to drop the column `contactid_fk` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `donationdate` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `donorname` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `isanonymous` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `payment_intent` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `refund_intent` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `defaulttickettype` on the `eventinstances` table. All the data in the column will be lost.
  - You are about to drop the column `orderdate` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `ordertime` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `ordertotal` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `refund_intent` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `eventtickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seasontickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seasontickettype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `singletickets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderid_fk` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Made the column `amount` on table `donations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frequency` on table `donations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventdescription` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seasonticketeligible` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donationdate_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donoid_fkey";

-- DropForeignKey
ALTER TABLE "eventinstances" DROP CONSTRAINT "eventinstances_defaulttickettype_fkey";

-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "eventtickets_singleticketid_fk_fkey";

-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "eventtickets_ticketrestrictionid_fk_fkey";

-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "tickets_eventinstanceid_fkey";

-- DropForeignKey
ALTER TABLE "orderitems" DROP CONSTRAINT "orderitems_orderid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_contactid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_discountid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderdate_fkey";

-- DropForeignKey
ALTER TABLE "seasontickets" DROP CONSTRAINT "seasontickets_eventid_fk_fkey";

-- DropForeignKey
ALTER TABLE "seasontickets" DROP CONSTRAINT "seasontickets_eventticketid_fk_fkey";

-- DropForeignKey
ALTER TABLE "seasontickets" DROP CONSTRAINT "seasontickets_orderitemid_fk_fkey";

-- DropForeignKey
ALTER TABLE "seasontickets" DROP CONSTRAINT "seasontickets_seasontickettypeid_fk_fkey";

-- DropForeignKey
ALTER TABLE "singletickets" DROP CONSTRAINT "singletickets_orderitemid_fk_fkey";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "contactid_fk",
DROP COLUMN "donationdate",
DROP COLUMN "donorname",
DROP COLUMN "isanonymous",
DROP COLUMN "payment_intent",
DROP COLUMN "refund_intent",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateDateid" INTEGER,
ADD COLUMN     "orderid_fk" INTEGER NOT NULL,
ADD COLUMN     "refundid_fk" INTEGER,
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "frequency" SET NOT NULL;

-- AlterTable
ALTER TABLE "eventinstances" DROP COLUMN "defaulttickettype";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "eventdescription" SET NOT NULL,
ALTER COLUMN "eventdescription" SET DEFAULT '',
ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "seasonticketeligible" SET NOT NULL,
ALTER COLUMN "seasonticketeligible" SET DEFAULT true;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderdate",
DROP COLUMN "ordertime",
DROP COLUMN "ordertotal",
DROP COLUMN "refund_intent",
ADD COLUMN     "dateDateid" INTEGER,
ADD COLUMN     "orderdateandtime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "deletedat" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ticketrestrictions" ADD COLUMN     "deletedat" TIMESTAMP(3);

-- DropTable
DROP TABLE "eventtickets";

-- DropTable
DROP TABLE "orderitems";

-- DropTable
DROP TABLE "seasontickets";

-- DropTable
DROP TABLE "seasontickettype";

-- DropTable
DROP TABLE "singletickets";

-- CreateTable
CREATE TABLE "order_ticketitems" (
    "orderid_fk" INTEGER NOT NULL,
    "ticketitemid_fk" INTEGER NOT NULL,
    "refundid_fk" INTEGER,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "order_ticketitems_pkey" PRIMARY KEY ("ticketitemid_fk")
);

-- CreateTable
CREATE TABLE "ticketitems" (
    "id" SERIAL NOT NULL,
    "ticketrestrictionid_fk" INTEGER NOT NULL,
    "donated" BOOLEAN NOT NULL DEFAULT false,
    "redeemed" TIMESTAMP(3),

    CONSTRAINT "ticketitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refunds" (
    "id" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "refund_intent" TEXT NOT NULL,
    "refunddateandtime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_ticketitems_ticketitemid_fk_key" ON "order_ticketitems"("ticketitemid_fk");

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_refundid_fk_fkey" FOREIGN KEY ("refundid_fk") REFERENCES "refunds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_dateDateid_fkey" FOREIGN KEY ("dateDateid") REFERENCES "date"("dateid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_ticketitems" ADD CONSTRAINT "order_ticketitems_refundid_fk_fkey" FOREIGN KEY ("refundid_fk") REFERENCES "refunds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_ticketitems" ADD CONSTRAINT "order_ticketitems_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_ticketitems" ADD CONSTRAINT "order_ticketitems_ticketitemid_fk_fkey" FOREIGN KEY ("ticketitemid_fk") REFERENCES "ticketitems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_ticketrestrictionid_fk_fkey" FOREIGN KEY ("ticketrestrictionid_fk") REFERENCES "ticketrestrictions"("ticketrestrictionsid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contactid_fkey" FOREIGN KEY ("contactid_fk") REFERENCES "contacts"("contactid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_discountid_fkey" FOREIGN KEY ("discountid_fk") REFERENCES "discounts"("discountid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_dateDateid_fkey" FOREIGN KEY ("dateDateid") REFERENCES "date"("dateid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;
