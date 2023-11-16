/*
  Warnings:

  - You are about to drop the column `tickettypeid_fk` on the `eventtickets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "eventtickets_tickettypeid_fk_fkey";

-- AlterTable
ALTER TABLE "eventtickets" DROP COLUMN "tickettypeid_fk",
ADD COLUMN     "ticketrestrictionid_fk" INTEGER,
ADD COLUMN     "tickettypeTickettypeid" INTEGER;

-- AlterTable
ALTER TABLE "seasonticketpricedefault" ADD COLUMN     "concessionprice" MONEY NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ticketrestrictions" ADD COLUMN     "concessionprice" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "price" MONEY NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "eventtickets" ADD CONSTRAINT "eventtickets_ticketrestrictionid_fk_fkey" FOREIGN KEY ("ticketrestrictionid_fk") REFERENCES "ticketrestrictions"("ticketrestrictionsid") ON DELETE CASCADE ON UPDATE CASCADE;
