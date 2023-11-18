-- AlterTable
ALTER TABLE "ticketorders" ALTER COLUMN "ticket_order_name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email_opt_in" DROP NOT NULL,
ALTER COLUMN "last_modified_date" DROP NOT NULL,
ALTER COLUMN "last_modified_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL;
