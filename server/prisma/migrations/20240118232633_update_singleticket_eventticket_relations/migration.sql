/*
  Warnings:

  - You are about to drop the column `singleticket_fk` on the `eventtickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[singleticketid_fk]` on the table `eventtickets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "eventtickets" DROP CONSTRAINT "eventtickets_singleticket_fk_fkey";

-- AlterTable
ALTER TABLE "eventtickets" DROP COLUMN "singleticket_fk",
ADD COLUMN     "singleticketid_fk" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "eventtickets_singleticketid_fk_key" ON "eventtickets"("singleticketid_fk");

-- AddForeignKey
ALTER TABLE "eventtickets" ADD CONSTRAINT "eventtickets_singleticketid_fk_fkey" FOREIGN KEY ("singleticketid_fk") REFERENCES "singletickets"("singleticketid") ON DELETE SET NULL ON UPDATE CASCADE;
