CREATE TABLE "public.user_acct" (
	"id" integer NOT NULL,
	"username" character varying(255) UNIQUE,
	"pass_hash" character varying(255),
	"is_superadmin" BOOLEAN NOT NULL DEFAULT '0',
	"is_admin" BOOLEAN NOT NULL DEFAULT '0',
	"user_role" character varying NOT NULL,
	"person_id" integer,
	CONSTRAINT "user_acct_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.contact" (
	"id" integer NOT NULL,
	"custname" character varying(255) NOT NULL,
	"email" character varying(100),
	"phone" character varying(15),
	"newsletter" BOOLEAN NOT NULL,
	"donorbadge" character varying(100),
	"seatingaccom" BOOLEAN,
	"vip" BOOLEAN DEFAULT 'false',
	"board_member" BOOLEAN NOT NULL,
	"staff" BOOLEAN NOT NULL,
	"volunteer list" BOOLEAN NOT NULL DEFAULT 'false',
	"notes" TEXT NOT NULL,
	CONSTRAINT "contact_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.group" (
	"id" integer NOT NULL,
	"group_name" character varying NOT NULL,
	"main_contact" integer NOT NULL,
	"notes" TEXT,
	CONSTRAINT "group_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cust_acct" (
	"id" serial NOT NULL,
	"notes" TEXT,
	"date_created" timestamptz NOT NULL,
	CONSTRAINT "cust_acct_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.address" (
	"id" serial NOT NULL,
	"address1" character varying,
	"address2" character varying,
	"city" character varying,
	"state" character varying,
	"zip_code" character varying,
	CONSTRAINT "address_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.group_rel" (
	"person_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT "group_rel_pk" PRIMARY KEY ("person_id","group_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.entity" (
	"id" serial NOT NULL,
	"acct_id" integer NOT NULL,
	"ent_type" integer NOT NULL,
	"address_id" integer,
	CONSTRAINT "entity_pk" PRIMARY KEY ("id","acct_id","ent_type")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.connection" (
	"conn_type" character varying NOT NULL,
	"ent1" integer NOT NULL,
	"ent2" integer NOT NULL,
	CONSTRAINT "connection_pk" PRIMARY KEY ("conn_type","ent1","ent2")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.task" (
	"id" serial NOT NULL,
	"assigned_to" integer NOT NULL,
	"date_assigned" timestamptz NOT NULL,
	"due_date" timestamptz,
	"completed" BOOLEAN NOT NULL DEFAULT '0',
	"notes" TEXT,
	CONSTRAINT "task_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.reminder" (
	"id" serial NOT NULL,
	"date_and_time" timestamptz NOT NULL,
	"task_id" integer NOT NULL,
	"notes" TEXT,
	CONSTRAINT "reminder_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user_acct" ADD CONSTRAINT "user_acct_fk0" FOREIGN KEY ("person_id") REFERENCES "contact"("id");

ALTER TABLE "contact" ADD CONSTRAINT "contact_fk0" FOREIGN KEY ("id") REFERENCES "entity"("id");

ALTER TABLE "group" ADD CONSTRAINT "group_fk0" FOREIGN KEY ("id") REFERENCES "entity"("id");
ALTER TABLE "group" ADD CONSTRAINT "group_fk1" FOREIGN KEY ("main_contact") REFERENCES "contact"("id");



ALTER TABLE "group_rel" ADD CONSTRAINT "group_rel_fk0" FOREIGN KEY ("person_id") REFERENCES "contact"("id");
ALTER TABLE "group_rel" ADD CONSTRAINT "group_rel_fk1" FOREIGN KEY ("group_id") REFERENCES "group"("id");

ALTER TABLE "entity" ADD CONSTRAINT "entity_fk0" FOREIGN KEY ("acct_id") REFERENCES "cust_acct"("id");
ALTER TABLE "entity" ADD CONSTRAINT "entity_fk1" FOREIGN KEY ("address_id") REFERENCES "address"("id");

ALTER TABLE "connection" ADD CONSTRAINT "connection_fk0" FOREIGN KEY ("conn_type") REFERENCES ""("");
ALTER TABLE "connection" ADD CONSTRAINT "connection_fk1" FOREIGN KEY ("ent1") REFERENCES "entity"("id");
ALTER TABLE "connection" ADD CONSTRAINT "connection_fk2" FOREIGN KEY ("ent2") REFERENCES "entity"("id");

ALTER TABLE "task" ADD CONSTRAINT "task_fk0" FOREIGN KEY ("assigned_to") REFERENCES "user_acct"("id");

ALTER TABLE "reminder" ADD CONSTRAINT "reminder_fk0" FOREIGN KEY ("task_id") REFERENCES "task"("id");


# Additional constraints:

# Add this constraint in order to maintain a 'directionless' relationship between the 2 entities.
# This way, order does not matter: (1,2) == (2,1).
ALTER TABLE "connection" ADD CONSTRAINT "connection_directionless" 
	FOREIGN KEY ("ent2", "ent1") REFERENCES "entity"("ent1", "ent2")

# Allow FK person_id to be NULL for admin/superadmin, so PP folks don't need an customer account use the DB.
ALTER TABLE "user_acct" ADD CONSTRAINT "null_admin"
	CHECK (("is_superadmin" = 1 AND "is_admin" = 0 AND person_id IS NULL) 
	OR ("is_superadmin" = 0 AND "is_admin" = 1 AND person_id IS NULL) 
	OR ("is_superadmin" = 0 AND "is_admin" = 0 AND person_id IS NOT NULL))

# Make sure ent_type is contact, household, or business.
ALTER TABLE "entities" ADD CONSTRAINT "ent_type" 
	CHECK ("ent_type" IN ("contact", "household", "business"))



