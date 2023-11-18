/*
  Warnings:

  - The `type` column on the `accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `email_status` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fund_type` column on the `opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_type` column on the `opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `name` column on the `recordtype` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sobject_type` column on the `recordtype` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `ticketorderitem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `order_status` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subscription_status` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `order_origin` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_method` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `item_type` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_method` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "type",
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "email_status",
ADD COLUMN     "email_status" TEXT;

-- AlterTable
ALTER TABLE "opportunity" DROP COLUMN "type",
ADD COLUMN     "type" TEXT,
DROP COLUMN "fund_type",
ADD COLUMN     "fund_type" TEXT,
DROP COLUMN "payment_type",
ADD COLUMN     "payment_type" TEXT;

-- AlterTable
ALTER TABLE "recordtype" DROP COLUMN "name",
ADD COLUMN     "name" TEXT,
DROP COLUMN "sobject_type",
ADD COLUMN     "sobject_type" TEXT;

-- AlterTable
ALTER TABLE "ticketorderitem" DROP COLUMN "status",
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "ticketorders" DROP COLUMN "type",
ADD COLUMN     "type" TEXT,
DROP COLUMN "order_status",
ADD COLUMN     "order_status" TEXT,
DROP COLUMN "subscription_status",
ADD COLUMN     "subscription_status" TEXT,
DROP COLUMN "order_origin",
ADD COLUMN     "order_origin" TEXT,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" TEXT;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "item_type",
ADD COLUMN     "item_type" TEXT,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT;

-- DropEnum
DROP TYPE "emailStatus";

-- DropEnum
DROP TYPE "opportunity_fundtype";

-- DropEnum
DROP TYPE "opportunity_paymenttype";

-- DropEnum
DROP TYPE "opportunity_type";

-- DropEnum
DROP TYPE "patronType";

-- DropEnum
DROP TYPE "recordtype_name";

-- DropEnum
DROP TYPE "recordtype_sobjecttype";

-- DropEnum
DROP TYPE "ticketorder_order_origin";

-- DropEnum
DROP TYPE "ticketorder_order_status";

-- DropEnum
DROP TYPE "ticketorder_payment_method";

-- DropEnum
DROP TYPE "ticketorder_subscription_status";

-- DropEnum
DROP TYPE "ticketorder_type";

-- DropEnum
DROP TYPE "ticketorderitem_status";

-- DropEnum
DROP TYPE "transaction_item_type";

-- DropEnum
DROP TYPE "transaction_payment_method";

-- DropEnum
DROP TYPE "transaction_status";
