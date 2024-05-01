CREATE TYPE "purchase_source" AS ENUM ('online_ticketing', 'admin_ticketing', 'card_reader', 'online_donation');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_source" "purchase_source",
ADD COLUMN     "order_status" "state" NOT NULL;

-- AlterTable
ALTER TABLE "refunds" ALTER COLUMN "refund_status" SET NOT NULL;
