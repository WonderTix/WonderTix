/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");
