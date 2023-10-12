-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_seasonid_fkey";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "seasonid_fk" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_seasonid_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE SET NULL ON UPDATE CASCADE;
