-- AlterTable
CREATE SEQUENCE accounts_account_id_seq;
ALTER TABLE "accounts" ALTER COLUMN "account_id" SET DEFAULT nextval('accounts_account_id_seq');
ALTER SEQUENCE accounts_account_id_seq OWNED BY "accounts"."account_id";

-- AlterTable
CREATE SEQUENCE contacts_contact_id_seq;
ALTER TABLE "contacts" ALTER COLUMN "contact_id" SET DEFAULT nextval('contacts_contact_id_seq');
ALTER SEQUENCE contacts_contact_id_seq OWNED BY "contacts"."contact_id";

-- AlterTable
CREATE SEQUENCE events_event_id_seq;
ALTER TABLE "events" ALTER COLUMN "event_id" SET DEFAULT nextval('events_event_id_seq');
ALTER SEQUENCE events_event_id_seq OWNED BY "events"."event_id";

-- AlterTable
CREATE SEQUENCE notes_note_id_seq;
ALTER TABLE "notes" ALTER COLUMN "note_id" SET DEFAULT nextval('notes_note_id_seq');
ALTER SEQUENCE notes_note_id_seq OWNED BY "notes"."note_id";

-- AlterTable
CREATE SEQUENCE opportunity_opportunity_id_seq;
ALTER TABLE "opportunity" ALTER COLUMN "opportunity_id" SET DEFAULT nextval('opportunity_opportunity_id_seq');
ALTER SEQUENCE opportunity_opportunity_id_seq OWNED BY "opportunity"."opportunity_id";

-- AlterTable
CREATE SEQUENCE recordtype_record_type_id_seq;
ALTER TABLE "recordtype" ALTER COLUMN "record_type_id" SET DEFAULT nextval('recordtype_record_type_id_seq');
ALTER SEQUENCE recordtype_record_type_id_seq OWNED BY "recordtype"."record_type_id";

-- AlterTable
CREATE SEQUENCE ticketorderitem_ticket_order_item_id_seq;
ALTER TABLE "ticketorderitem" ALTER COLUMN "ticket_order_item_id" SET DEFAULT nextval('ticketorderitem_ticket_order_item_id_seq');
ALTER SEQUENCE ticketorderitem_ticket_order_item_id_seq OWNED BY "ticketorderitem"."ticket_order_item_id";

-- AlterTable
CREATE SEQUENCE ticketorders_ticket_order_id_seq;
ALTER TABLE "ticketorders" ALTER COLUMN "ticket_order_id" SET DEFAULT nextval('ticketorders_ticket_order_id_seq');
ALTER SEQUENCE ticketorders_ticket_order_id_seq OWNED BY "ticketorders"."ticket_order_id";

-- AlterTable
CREATE SEQUENCE transactions_transaction_id_seq;
ALTER TABLE "transactions" ALTER COLUMN "transaction_id" SET DEFAULT nextval('transactions_transaction_id_seq');
ALTER SEQUENCE transactions_transaction_id_seq OWNED BY "transactions"."transaction_id";
