/*
  Warnings:

  - Added the required column `order_status` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `refund_status` on table `refunds` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "purchase_source" AS ENUM ('online_ticketing', 'admin_ticketing', 'card_reader', 'online_donation');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_source" "purchase_source",
ADD COLUMN     "order_status" "state" NOT NULL;

-- AlterTable
ALTER TABLE "refunds" ALTER COLUMN "refund_status" SET NOT NULL;
