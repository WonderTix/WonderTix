/*
  Warnings:

  - You are about to drop the column `createdby_fk` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `enddate` on the `discounts` table. All the data in the column will be lost.
  - You are about to drop the column `startdate` on the `discounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `discounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `active` to the `discounts` table without a default value. This is not possible if the table is not empty.
  - Made the column `code` on table `discounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_createdby_fk_fkey";

-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_enddate_fkey";

-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_startdate_fkey";

-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "createdby_fk",
DROP COLUMN "enddate",
DROP COLUMN "startdate",
DROP COLUMN "amount",
ADD COLUMN "amount" MONEY,
ADD COLUMN "active" BOOLEAN NOT NULL,
ALTER COLUMN "code" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");
