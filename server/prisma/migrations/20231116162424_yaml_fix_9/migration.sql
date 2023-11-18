-- AlterTable
ALTER TABLE "opportunity" ALTER COLUMN "grant_amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ticketorders" ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "other_phone" SET DATA TYPE TEXT;
