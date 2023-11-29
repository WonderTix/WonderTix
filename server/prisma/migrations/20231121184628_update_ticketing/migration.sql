/*
  Warnings:

  - You are about to drop the column `tickettypeid_fk` on the `eventtickets` table. All the data in the column will be lost.
  - You are about to drop the column `ticketssold` on the `ticketrestrictions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "eventtickets_tickettypeid_fk_fkey";

-- DropForeignKey
ALTER TABLE "ticketrestrictions" DROP CONSTRAINT "ticketrestrictions_eventinstanceid_fk_fkey";

-- AlterTable
ALTER TABLE "eventtickets" DROP COLUMN "tickettypeid_fk",
ADD COLUMN     "ticketrestrictionid_fk" INTEGER;

-- AlterTable
ALTER TABLE "ticketrestrictions" DROP COLUMN "ticketssold";

-- AddForeignKey
ALTER TABLE "eventtickets" ADD CONSTRAINT "eventtickets_ticketrestrictionid_fk_fkey" FOREIGN KEY ("ticketrestrictionid_fk") REFERENCES "ticketrestrictions"("ticketrestrictionsid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketrestrictions" ADD CONSTRAINT "ticketrestrictions_eventinstanceid_fk_fkey" FOREIGN KEY ("eventinstanceid_fk") REFERENCES "eventinstances"("eventinstanceid") ON DELETE CASCADE ON UPDATE CASCADE;
