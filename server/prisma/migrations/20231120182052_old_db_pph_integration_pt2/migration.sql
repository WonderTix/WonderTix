-- AlterTable
CREATE SEQUENCE pph_accounts_account_id_seq;
ALTER TABLE "PPH_accounts" ALTER COLUMN "account_id" SET DEFAULT nextval('pph_accounts_account_id_seq');
ALTER SEQUENCE pph_accounts_account_id_seq OWNED BY "PPH_accounts"."account_id";

-- AlterTable
CREATE SEQUENCE pph_contacts_contact_id_seq;
ALTER TABLE "PPH_contacts" ALTER COLUMN "contact_id" SET DEFAULT nextval('pph_contacts_contact_id_seq');
ALTER SEQUENCE pph_contacts_contact_id_seq OWNED BY "PPH_contacts"."contact_id";

-- AlterTable
CREATE SEQUENCE pph_events_event_id_seq;
ALTER TABLE "PPH_events" ALTER COLUMN "event_id" SET DEFAULT nextval('pph_events_event_id_seq');
ALTER SEQUENCE pph_events_event_id_seq OWNED BY "PPH_events"."event_id";

-- AlterTable
CREATE SEQUENCE pph_notes_note_id_seq;
ALTER TABLE "PPH_notes" ALTER COLUMN "note_id" SET DEFAULT nextval('pph_notes_note_id_seq');
ALTER SEQUENCE pph_notes_note_id_seq OWNED BY "PPH_notes"."note_id";

-- AlterTable
CREATE SEQUENCE pph_opportunity_opportunity_id_seq;
ALTER TABLE "PPH_opportunity" ALTER COLUMN "opportunity_id" SET DEFAULT nextval('pph_opportunity_opportunity_id_seq');
ALTER SEQUENCE pph_opportunity_opportunity_id_seq OWNED BY "PPH_opportunity"."opportunity_id";

-- AlterTable
CREATE SEQUENCE pph_recordtype_record_type_id_seq;
ALTER TABLE "PPH_recordtype" ALTER COLUMN "record_type_id" SET DEFAULT nextval('pph_recordtype_record_type_id_seq');
ALTER SEQUENCE pph_recordtype_record_type_id_seq OWNED BY "PPH_recordtype"."record_type_id";

-- AlterTable
CREATE SEQUENCE pph_ticketorderitem_ticket_order_item_id_seq;
ALTER TABLE "PPH_ticketorderitem" ALTER COLUMN "ticket_order_item_id" SET DEFAULT nextval('pph_ticketorderitem_ticket_order_item_id_seq');
ALTER SEQUENCE pph_ticketorderitem_ticket_order_item_id_seq OWNED BY "PPH_ticketorderitem"."ticket_order_item_id";

-- AlterTable
CREATE SEQUENCE pph_ticketorders_ticket_order_id_seq;
ALTER TABLE "PPH_ticketorders" ALTER COLUMN "ticket_order_id" SET DEFAULT nextval('pph_ticketorders_ticket_order_id_seq');
ALTER SEQUENCE pph_ticketorders_ticket_order_id_seq OWNED BY "PPH_ticketorders"."ticket_order_id";

-- AlterTable
CREATE SEQUENCE pph_transactions_transaction_id_seq;
ALTER TABLE "PPH_transactions" ALTER COLUMN "transaction_id" SET DEFAULT nextval('pph_transactions_transaction_id_seq');
ALTER SEQUENCE pph_transactions_transaction_id_seq OWNED BY "PPH_transactions"."transaction_id";

-- AlterTable
CREATE SEQUENCE contacts_contactid_seq;
ALTER TABLE "contacts" ALTER COLUMN "contactid" SET DEFAULT nextval('contacts_contactid_seq');
ALTER SEQUENCE contacts_contactid_seq OWNED BY "contacts"."contactid";

-- AlterTable
CREATE SEQUENCE events_eventid_seq;
ALTER TABLE "events" ALTER COLUMN "eventid" SET DEFAULT nextval('events_eventid_seq');
ALTER SEQUENCE events_eventid_seq OWNED BY "events"."eventid";
