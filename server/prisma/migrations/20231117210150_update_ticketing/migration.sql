/*
  Warnings:

  - You are about to drop the column `tickettypeid_fk` on the `eventtickets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "eventtickets_tickettypeid_fk_fkey";

-- AlterTable
ALTER TABLE "eventtickets" DROP COLUMN "tickettypeid_fk",
ADD COLUMN     "ticketrestrictionid_fk" INTEGER;

-- AlterTable
ALTER TABLE "ticketrestrictions" ADD COLUMN     "concessionprice" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "price" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "seasonticketpriceid_fk" INTEGER;

-- CreateTable
CREATE TABLE "seasonticketpricedefault" (
    "id" SERIAL NOT NULL,
    "seasonid_fk" INTEGER NOT NULL,
    "tickettypeid_fk" INTEGER NOT NULL,
    "price" MONEY NOT NULL DEFAULT 0,
    "concessionprice" MONEY NOT NULL DEFAULT 0,

    CONSTRAINT "seasonticketpricedefault_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seasonticketpricedefault_seasonid_fk_tickettypeid_fk_key" ON "seasonticketpricedefault"("seasonid_fk", "tickettypeid_fk");

-- AddForeignKey
ALTER TABLE "eventtickets" ADD CONSTRAINT "eventtickets_ticketrestrictionid_fk_fkey" FOREIGN KEY ("ticketrestrictionid_fk") REFERENCES "ticketrestrictions"("ticketrestrictionsid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasonticketpricedefault" ADD CONSTRAINT "seasonticketpricedefault_seasonid_fk_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasonticketpricedefault" ADD CONSTRAINT "seasonticketpricedefault_tickettypeid_fk_fkey" FOREIGN KEY ("tickettypeid_fk") REFERENCES "tickettype"("tickettypeid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketrestrictions" ADD CONSTRAINT "ticketrestrictions_seasonticketpriceid_fk_fkey" FOREIGN KEY ("seasonticketpriceid_fk") REFERENCES "seasonticketpricedefault"("id") ON DELETE SET NULL ON UPDATE CASCADE;
