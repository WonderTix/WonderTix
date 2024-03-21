-- AlterTable
ALTER TABLE "refunds" ADD COLUMN     "refund_status" "state" NOT NULL DEFAULT 'in_progress';
