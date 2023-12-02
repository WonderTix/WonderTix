-- AlterTable
ALTER TABLE "ticketrestrictions" ADD COLUMN     "concessionprice" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "price" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "seasontickettypepricedefaultid_fk" INTEGER;

-- CreateTable
CREATE TABLE "seasontickettypepricedefault" (
    "id" SERIAL NOT NULL,
    "seasonid_fk" INTEGER NOT NULL,
    "tickettypeid_fk" INTEGER NOT NULL,
    "price" MONEY NOT NULL DEFAULT 0,
    "concessionprice" MONEY NOT NULL DEFAULT 0,

    CONSTRAINT "seasontickettypepricedefault_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seasontickettypepricedefault_seasonid_fk_tickettypeid_fk_key" ON "seasontickettypepricedefault"("seasonid_fk", "tickettypeid_fk");

-- AddForeignKey
ALTER TABLE "seasontickettypepricedefault" ADD CONSTRAINT "seasontickettypepricedefault_seasonid_fk_fkey" FOREIGN KEY ("seasonid_fk") REFERENCES "seasons"("seasonid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasontickettypepricedefault" ADD CONSTRAINT "seasontickettypepricedefault_tickettypeid_fk_fkey" FOREIGN KEY ("tickettypeid_fk") REFERENCES "tickettype"("tickettypeid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticketrestrictions" ADD CONSTRAINT "ticketrestrictions_seasontickettypepricedefaultid_fk_fkey" FOREIGN KEY ("seasontickettypepricedefaultid_fk") REFERENCES "seasontickettypepricedefault"("id") ON DELETE SET NULL ON UPDATE CASCADE;
