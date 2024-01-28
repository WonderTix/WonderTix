-- AlterTable
CREATE SEQUENCE order_ticketitems_id_seq;
ALTER TABLE "order_ticketitems" ALTER COLUMN "id" SET DEFAULT nextval('order_ticketitems_id_seq');
ALTER SEQUENCE order_ticketitems_id_seq OWNED BY "order_ticketitems"."id";
