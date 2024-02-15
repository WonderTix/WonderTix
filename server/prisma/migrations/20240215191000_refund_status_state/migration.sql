/*
  Warnings:

  - The `refund_status` column on the `donations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `refund_status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "state" ADD VALUE 'failed';

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "refund_status",
ADD COLUMN     "refund_status" "state";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "refund_status",
ADD COLUMN     "refund_status" "state";
