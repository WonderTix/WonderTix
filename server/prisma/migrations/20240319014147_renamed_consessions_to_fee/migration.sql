
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "feetotal" MONEY NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "seasontickettypepricedefault" DROP COLUMN "concessionprice",
ADD COLUMN     "fee" MONEY NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ticketrestrictions" DROP COLUMN "concessionprice",
ADD COLUMN     "fee" MONEY NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tickettype" DROP COLUMN "concessions",
ADD COLUMN     "fee" MONEY NOT NULL;
