-- AlterTable
ALTER TABLE "eventinstances" ADD COLUMN     "deletedat" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "deletedat" TIMESTAMP(3);
