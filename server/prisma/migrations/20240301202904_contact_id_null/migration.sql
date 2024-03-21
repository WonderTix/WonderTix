-- Make contactid_fk Nullable
ALTER TABLE "orders" ALTER COLUMN "contactid_fk" DROP NOT NULL;
