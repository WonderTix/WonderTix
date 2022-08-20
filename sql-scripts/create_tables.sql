/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
-- Create Customers table
----Note that this will have to have a prefilled row for anonymous
CREATE TABLE public.customers
(
    id integer NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
    custname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default",
    phone character varying(15) COLLATE pg_catalog."default",
    custaddress character varying(255) COLLATE pg_catalog."default",
    newsletter boolean DEFAULT false,
    donorbadge character varying(100) COLLATE pg_catalog."default",
    seatingaccom boolean,
    vip boolean DEFAULT false,
    "volunteer list" boolean NOT NULL DEFAULT false,
    CONSTRAINT customers_pkey PRIMARY KEY (id)
)

-- Create Donations table
create type freq as enum('one-time', 'weekly', 'monthly', 'yearly');
CREATE TABLE public.donations
(
    donationid integer NOT NULL DEFAULT nextval('donations_donationid_seq'::regclass),
    donorid integer,
    isanonymous boolean DEFAULT false,
    amount money,
    dononame character varying(255) COLLATE pg_catalog."default",
    frequency freq,
    comments character varying(255) COLLATE pg_catalog."default",
    donodate date,
    CONSTRAINT donations_pkey PRIMARY KEY (donationid),
    CONSTRAINT donations_donorid_fkey FOREIGN KEY (donorid)
        REFERENCES public.customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Create Discounts
CREATE TABLE public.discounts
(
    id integer NOT NULL DEFAULT nextval('discounts_id_seq'::regclass),
    code character varying(255) COLLATE pg_catalog."default",
    amount money,
    enddate date,
    startdate date,
    usagelimit integer,
    min_tickets integer,
    min_events integer,
    CONSTRAINT discounts_pkey PRIMARY KEY (id)
)

-- Create Reservation table
CREATE TABLE public.reservation
(
    transno integer NOT NULL DEFAULT nextval('reservation_transno_seq'::regclass),
    custid integer,
    eventid integer,
    eventname character varying(255) COLLATE pg_catalog."default",
    eventdate date,
    showtime time without time zone,
    numtickets integer,
    CONSTRAINT reservation_pkey PRIMARY KEY (transno),
    CONSTRAINT reservation_custid_fkey FOREIGN KEY (custid)
        REFERENCES public.customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Create Seasons table
CREATE TABLE public.seasons
(
    id integer NOT NULL DEFAULT nextval('seasons_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    startdate timestamp without time zone,
    enddate timestamp without time zone,
    CONSTRAINT seasons_pkey PRIMARY KEY (id)
)

-- Create TicketType
CREATE TABLE public.tickettype
(
    id integer NOT NULL,
    name character varying(100) COLLATE pg_catalog."default",
    isseason boolean,
    seasonid integer,
    price money,
    concessions money,
    CONSTRAINT tickettype_pkey PRIMARY KEY (id),
    CONSTRAINT tickettype_seasonid_fkey FOREIGN KEY (seasonid)
        REFERENCES public.seasons (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Create Events table
CREATE TABLE public.events
(
    id integer NOT NULL DEFAULT nextval('plays_id_seq'::regclass),
    seasonid integer,
    eventname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    eventdescription character varying(255) COLLATE pg_catalog."default",
    active boolean,
    image_url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT plays_pkey PRIMARY KEY (id),
    CONSTRAINT plays_seasonid_fkey FOREIGN KEY (seasonid)
        REFERENCES public.seasons (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Create Event_Instances table
CREATE TABLE public.event_instances
(
    id integer NOT NULL DEFAULT nextval('showtimes_id_seq'::regclass),
    eventid integer,
    eventdate date,
    starttime time without time zone,
    salestatus boolean,
    totalseats integer,
    availableseats integer,
    purchaseuri character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT showtimes_pkey PRIMARY KEY (id),
    CONSTRAINT showtimes_playid_fkey FOREIGN KEY (eventid)
        REFERENCES public.events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Create Tickets table
CREATE TABLE public.tickets
(
    ticketno integer NOT NULL DEFAULT nextval('tickets_ticketno_seq'::regclass),
    type integer,
    eventinstanceid integer,
    custid integer,
    paid boolean,
    active boolean,
    checkedin boolean,
    checkedin_ts timestamp without time zone,
    payment_intent character varying COLLATE pg_catalog."default",
    comments character varying(500) COLLATE pg_catalog."default",
    CONSTRAINT tickets_pkey PRIMARY KEY (ticketno),
    CONSTRAINT tickets_custid_fkey FOREIGN KEY (custid)
        REFERENCES public.customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT tickets_eventid_fkey FOREIGN KEY (eventinstanceid)
        REFERENCES public.event_instances (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT tickets_type_fkey FOREIGN KEY (type)
        REFERENCES public.tickettype (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(255) COLLATE pg_catalog."default",
    pass_hash character varying(255) COLLATE pg_catalog."default",
    is_superadmin boolean DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
)
