-- CreateEnum
CREATE TYPE "purchase_source" AS ENUM ('customer_ticketing', 'admin_ticketing', 'card_reader', 'donation_page');

-- AlterEnum
ALTER TYPE "state" ADD VALUE 'failed';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_source" "purchase_source",
ADD COLUMN     "order_status" "state" NOT NULL DEFAULT 'in_progress';
