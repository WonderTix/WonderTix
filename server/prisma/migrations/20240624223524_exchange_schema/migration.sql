-- CreateEnum
CREATE TYPE "type" AS ENUM ('subscription', 'ticket', 'donation');

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_orderid_fk_fkey";

-- DropForeignKey
ALTER TABLE "orderticketitems" DROP CONSTRAINT "orderticketitems_orderid_fk_fkey";

-- DropForeignKey
ALTER TABLE "refunditems" DROP CONSTRAINT "refunditems_donationid_fk_fkey";

-- DropForeignKey
ALTER TABLE "refunditems" DROP CONSTRAINT "refunditems_orderticketitemid_fk_fkey";

-- DropForeignKey
ALTER TABLE "refunditems" DROP CONSTRAINT "refunditems_refundid_fk_fkey";

-- DropForeignKey
ALTER TABLE "refunditems" DROP CONSTRAINT "refunditems_subscriptionid_fk_fkey";

-- DropForeignKey
ALTER TABLE "refunds" DROP CONSTRAINT "refunds_orderid_fk_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_orderid_fk_fkey";

-- DropForeignKey
ALTER TABLE "ticketitems" DROP CONSTRAINT "ticketitems_orderticketitemid_fk_fkey";

-- DropIndex
DROP INDEX "donations_orderid_fk_key";

-- DropIndex
DROP INDEX "orders_checkout_sessions_key";

-- DropIndex
DROP INDEX "orders_payment_intent_key";

-- DropIndex
DROP INDEX "refunditems_donationid_fk_key";

-- DropIndex
DROP INDEX "refunditems_orderticketitemid_fk_key";

-- DropIndex
DROP INDEX "refunditems_subscriptionid_fk_key";

-- DropIndex
DROP INDEX "ticketitems_orderticketitemid_fk_key";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "amount",
DROP COLUMN "orderid_fk",
ADD COLUMN     "orderitemid_fk" INTEGER NOT NULL,
ADD COLUMN     "orderitemtype" "type" NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "checkout_sessions",
DROP COLUMN "payment_intent",
ADD COLUMN     "refundtotal" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "refunditems" DROP COLUMN "donationid_fk",
DROP COLUMN "orderticketitemid_fk",
DROP COLUMN "refundid_fk",
DROP COLUMN "subscriptionid_fk",
ADD COLUMN     "orderid_fk" INTEGER NOT NULL,
ADD COLUMN     "orderitemid_fk" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "orderid_fk",
DROP COLUMN "price",
ADD COLUMN     "orderitemid_fk" INTEGER NOT NULL,
ADD COLUMN     "orderitemtype" "type" NOT NULL;

-- AlterTable
ALTER TABLE "ticketitems" DROP COLUMN "orderticketitemid_fk",
ADD COLUMN     "orderitemid_fk" INTEGER,
ADD COLUMN     "orderitemtype" "type";

-- DropTable
DROP TABLE "orderticketitems";

-- DropTable
DROP TABLE "refunds";

-- CreateTable
CREATE TABLE "orderitems" (
    "id" SERIAL NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "type" "type" NOT NULL,
    "price" MONEY NOT NULL,
    "discount" MONEY NOT NULL DEFAULT 0,
    "fee" MONEY NOT NULL DEFAULT 0,
    "department" VARCHAR(255),

    CONSTRAINT "orderitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refund_intents" (
    "refund_intent" TEXT NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "payment_intent_fk" TEXT NOT NULL,
    "status" "state" NOT NULL,
    "amount" MONEY NOT NULL,

    CONSTRAINT "refund_intents_pkey" PRIMARY KEY ("refund_intent")
);

-- CreateTable
CREATE TABLE "payment_intents" (
    "payment_intent" TEXT NOT NULL,
    "checkout_sessions" TEXT,
    "amount" MONEY NOT NULL,
    "status" "state" NOT NULL,

    CONSTRAINT "payment_intents_pkey" PRIMARY KEY ("payment_intent")
);

-- CreateTable
CREATE TABLE "order_payment_intents" (
    "payment_intent_fk" TEXT NOT NULL,
    "orderid_fk" INTEGER NOT NULL,
    "amount" MONEY NOT NULL,

    CONSTRAINT "order_payment_intents_pkey" PRIMARY KEY ("orderid_fk","payment_intent_fk")
);

-- CreateTable
CREATE TABLE "temporarystore" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "temporarystore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orderitems_id_type_key" ON "orderitems"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "payment_intents_checkout_sessions_key" ON "payment_intents"("checkout_sessions");

-- CreateIndex
CREATE UNIQUE INDEX "donations_orderitemid_fk_orderitemtype_key" ON "donations"("orderitemid_fk", "orderitemtype");

-- CreateIndex
CREATE UNIQUE INDEX "refunditems_orderitemid_fk_key" ON "refunditems"("orderitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_orderitemid_fk_key" ON "subscriptions"("orderitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_orderitemid_fk_orderitemtype_key" ON "subscriptions"("orderitemid_fk", "orderitemtype");

-- CreateIndex
CREATE UNIQUE INDEX "ticketitems_orderitemid_fk_key" ON "ticketitems"("orderitemid_fk");

-- CreateIndex
CREATE UNIQUE INDEX "ticketitems_orderitemid_fk_orderitemtype_key" ON "ticketitems"("orderitemid_fk", "orderitemtype");

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_orderitemid_fk_orderitemtype_fkey" FOREIGN KEY ("orderitemid_fk", "orderitemtype") REFERENCES "orderitems"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_orderitemid_fk_orderitemtype_fkey" FOREIGN KEY ("orderitemid_fk", "orderitemtype") REFERENCES "orderitems"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_orderitemid_fk_orderitemtype_fkey" FOREIGN KEY ("orderitemid_fk", "orderitemtype") REFERENCES "orderitems"("id", "type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refund_intents" ADD CONSTRAINT "refund_intents_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refund_intents" ADD CONSTRAINT "refund_intents_payment_intent_fk_fkey" FOREIGN KEY ("payment_intent_fk") REFERENCES "payment_intents"("payment_intent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refund_intents" ADD CONSTRAINT "refund_intents_orderid_fk_payment_intent_fk_fkey" FOREIGN KEY ("orderid_fk", "payment_intent_fk") REFERENCES "order_payment_intents"("orderid_fk", "payment_intent_fk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment_intents" ADD CONSTRAINT "order_payment_intents_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment_intents" ADD CONSTRAINT "order_payment_intents_payment_intent_fk_fkey" FOREIGN KEY ("payment_intent_fk") REFERENCES "payment_intents"("payment_intent") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_orderitemid_fk_fkey" FOREIGN KEY ("orderitemid_fk") REFERENCES "orderitems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunditems" ADD CONSTRAINT "refunditems_orderid_fk_fkey" FOREIGN KEY ("orderid_fk") REFERENCES "orders"("orderid") ON DELETE RESTRICT ON UPDATE CASCADE;
