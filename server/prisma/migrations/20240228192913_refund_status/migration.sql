-- AlterEnum
ALTER TYPE "state" ADD VALUE 'failed';

-- AlterTable
ALTER TABLE "refunds" ADD COLUMN     "refund_status" "state" NOT NULL DEFAULT 'in_progress';
