-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "refund_status" VARCHAR(10);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "refund_status" VARCHAR(10);
