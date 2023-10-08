/*
  Warnings:

  - You are about to drop the column `purchased` on the `eventtickets` table. All the data in the column will be lost.
  - You are about to drop the column `eventticketid_fk` on the `singletickets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderitems" DROP CONSTRAINT "orderitems_orderid_fkey";

-- DropForeignKey
ALTER TABLE "singletickets" DROP CONSTRAINT "singletickets_eventticketid_fk_fkey";

-- DropForeignKey
ALTER TABLE "singletickets" DROP CONSTRAINT "singletickets_orderitemid_fk_fkey";

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "seatingaccom" DROP DEFAULT,
ALTER COLUMN "seatingaccom" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "eventtickets" DROP COLUMN "purchased",
ADD COLUMN     "singleticket_fk" INTEGER;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "checkout_sessions" VARCHAR(255);

-- AlterTable
ALTER TABLE "singletickets" DROP COLUMN "eventticketid_fk";

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

-- AddForeignKey
ALTER TABLE "eventtickets" ADD CONSTRAINT "eventtickets_singleticket_fk_fkey" FOREIGN KEY ("singleticket_fk") REFERENCES "singletickets"("singleticketid") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_orderid_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "singletickets" ADD CONSTRAINT "singletickets_orderitemid_fk_fkey" FOREIGN KEY ("orderitemid_fk") REFERENCES "orderitems"("orderitemid") ON DELETE CASCADE ON UPDATE NO ACTION;
