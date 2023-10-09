-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "imageurl" VARCHAR(255);

-- CreateTable
CREATE TABLE "StripeWebhook" (
    "id" SERIAL NOT NULL,
    "eventid" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "livemode" BOOLEAN NOT NULL,
    "created" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "requestid" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "StripeWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Error" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);
