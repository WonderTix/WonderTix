-- Reset primary key id sequence
ALTER SEQUENCE "contacts_contactid_seq" RESTART WITH 1;
ALTER SEQUENCE "discounts_discountid_seq" RESTART WITH 1;
ALTER SEQUENCE "donations_donationid_seq" RESTART WITH 1;
ALTER SEQUENCE "eventinstances_eventinstanceid_seq" RESTART WITH 1;
ALTER SEQUENCE "events_eventid_seq" RESTART WITH 1;
ALTER SEQUENCE "eventtickets_eventticketid_seq" RESTART WITH 1;
ALTER SEQUENCE "orderitems_orderitemid_seq" RESTART WITH 1;
ALTER SEQUENCE "orders_orderid_seq" RESTART WITH 1;
ALTER SEQUENCE "seasons_seasonid_seq" RESTART WITH 1;
ALTER SEQUENCE "seasontickets_seasonticketid_seq" RESTART WITH 1;
ALTER SEQUENCE "seasontickettype_seasontickettypeid_seq" RESTART WITH 1;
ALTER SEQUENCE "singletickets_singleticketid_seq" RESTART WITH 1;
ALTER SEQUENCE "ticketrestrictions_ticketrestrictionsid_seq" RESTART WITH 1;
ALTER SEQUENCE "users_userid_seq" RESTART WITH 1;

-- There are two ticket types that must reserve the id values '0' and '1'
ALTER SEQUENCE "tickettype_tickettypeid_seq" RESTART WITH 2;
