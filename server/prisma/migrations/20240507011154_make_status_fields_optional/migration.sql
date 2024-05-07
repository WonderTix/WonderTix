-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "order_status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "refunds" ALTER COLUMN "refund_status" DROP NOT NULL;
