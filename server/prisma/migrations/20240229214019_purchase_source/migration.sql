-- CreateEnum
CREATE TYPE "purchase_source" AS ENUM ('online_ticketing', 'admin_ticketing', 'card_reader', 'online_donation');

-- AlterEnum
ALTER TYPE "state" ADD VALUE 'failed';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_source" "purchase_source",
ADD COLUMN     "order_status" "state";
