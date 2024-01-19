/*
  Warnings:

  - Made the column `salestatus` on table `eventinstances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalseats` on table `eventinstances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availableseats` on table `eventinstances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ispreview` on table `eventinstances` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "eventinstances" ADD COLUMN     "detail" VARCHAR(255),
ALTER COLUMN "salestatus" SET NOT NULL,
ALTER COLUMN "salestatus" SET DEFAULT true,
ALTER COLUMN "totalseats" SET NOT NULL,
ALTER COLUMN "totalseats" SET DEFAULT 0,
ALTER COLUMN "availableseats" SET NOT NULL,
ALTER COLUMN "availableseats" SET DEFAULT 0,
ALTER COLUMN "ispreview" SET NOT NULL;
