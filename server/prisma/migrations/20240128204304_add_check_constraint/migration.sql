-- This is an empty migration.

--Add check constraint to refunditems table
ALTER TABLE "refunditems" ADD CONSTRAINT "refund_ticketitems_check" CHECK (("donationid_fk" is null AND "order_ticketitemid_fk" is not null) OR ("order_ticketitemid_fk" is null AND "donationid_fk" is not null));

