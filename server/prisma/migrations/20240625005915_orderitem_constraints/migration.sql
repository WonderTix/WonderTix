-- Manually Add Order Item Type Constraints
ALTER TABLE "ticketitems" ADD CONSTRAINT "ticketitems_type_constraint" CHECK (orderitemtype = 'ticket');

ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_type_constraint" CHECK (orderitemtype = 'subscription');

ALTER TABLE "donations" ADD CONSTRAINT "donations_type_constraint" CHECK (orderitemtype = 'donation');
