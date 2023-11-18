/*
  Warnings:

  - You are about to drop the column `formalsalutation` on the `contacts` table. All the data in the column will be lost.
  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `notes` table. All the data in the column will be lost.
  - The `postal_code` column on the `ticketorders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "formalsalutation",
ADD COLUMN     "formal_salutation" VARCHAR(255);

-- AlterTable
ALTER TABLE "notes" DROP CONSTRAINT "notes_pkey",
DROP COLUMN "id",
ADD COLUMN     "note_id" SERIAL NOT NULL,
ADD CONSTRAINT "notes_pkey" PRIMARY KEY ("note_id");

-- AlterTable
ALTER TABLE "ticketorders" DROP COLUMN "postal_code",
ADD COLUMN     "postal_code" INTEGER;
