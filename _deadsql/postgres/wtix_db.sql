--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


--
-- Name: freq; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.freq AS ENUM (
    'one-time',
    'weekly',
    'monthly',
    'yearly'
);


--
-- Name: state; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.state AS ENUM (
    'not_started',
    'in_progress',
    'completed'
);


SET default_tablespace = '';
SET default_table_access_method = heap;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.customers (
    id integer NOT NULL,
    custname character varying(255) NOT NULL,
    email character varying(100),
    phone character varying(15),
    custaddress character varying(255),
    newsletter boolean DEFAULT false,
    donorbadge character varying(100),
    seatingaccom boolean,
    vip boolean DEFAULT false,
    "volunteer list" boolean DEFAULT false NOT NULL
);

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.customers_id_seq
    OWNED BY public.customers.id;
--
-- Name: discounts; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.discounts (
    id integer NOT NULL,
    code character varying(255),
    amount money,
    enddate date,
    startdate date,
    usagelimit integer,
    min_tickets integer,
    min_events integer
);

--
-- Name: discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.discounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.discounts_id_seq
    OWNED BY public.discounts.id;


--
-- Name: donations; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.donations (
    id integer NOT NULL,
    donorid integer,
    isanonymous boolean DEFAULT false,
    amount money,
    dononame character varying(255),
    frequency public.freq,
    comments character varying(255),
    donodate date
);

--
-- Name: donations_donationid_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.donations_donationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.donations_donationid_seq OWNED BY public.donations.id;


--
-- Name: donolist; Type: VIEW; Schema: public; Owner: -
--
CREATE VIEW public.donolist AS
 SELECT donations.dononame,
    count(donations.dononame) AS count
   FROM public.donations
  GROUP BY donations.dononame;


--
-- Name: event_instances; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.event_instances (
    id integer NOT NULL,
    eventid integer,
    eventdate date,
    starttime time without time zone,
    salestatus boolean,
    totalseats integer,
    availableseats integer,
    purchaseuri character varying(255)
);

--
-- Name: showtimes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.showtimes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.showtimes_id_seq OWNED BY public.event_instances.id;

--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.events (
    id integer NOT NULL,
    seasonid integer,
    eventname character varying(255) NOT NULL,
    eventdescription character varying(255),
    active boolean,
    image_url character varying(255)
);

--
-- Name: plays_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.plays_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.plays_id_seq OWNED BY public.events.id;

--
-- Name: exdoorlist; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.exdoorlist (
    id integer NOT NULL,
    name text,
    vip boolean,
    donor boolean,
    accomodations boolean,
    num_tickets integer,
    arrived boolean
);

--
-- Name: linkedtickets; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.linkedtickets (
    id integer NOT NULL,
    event_instance_id integer,
    ticket_type integer
);

--
-- Name: linkedtickets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.linkedtickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.linkedtickets_id_seq OWNED BY public.linkedtickets.id;

--
-- Name: reservation; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.reservation (
    transno integer NOT NULL,
    custid integer,
    eventid integer,
    eventname character varying(255),
    eventdate date,
    showtime time without time zone,
    numtickets integer
);

--
-- Name: reservation_transno_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.reservation_transno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.reservation_transno_seq OWNED BY public.reservation.transno;


--
-- Name: seasons; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.seasons (
    id integer NOT NULL,
    name character varying(100),
    startdate timestamp without time zone,
    enddate timestamp without time zone
);

--
-- Name: seasons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.seasons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.seasons_id_seq OWNED BY public.seasons.id;

--
-- Name: task; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.task (
    id integer NOT NULL,
    parent_id integer,
    subject character varying,
    description character varying,
    status public.state,
    assign_to integer,
    report_to integer,
    date_created timestamp with time zone,
    date_assigned timestamp with time zone,
    due_date timestamp with time zone,
    rel_contact integer,
    rel_donation integer,
    rel_ticket_order integer,
    rel_account integer
);
ALTER TABLE public.task ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- Name: task_notes; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.task_notes (
    id integer NOT NULL,
    task_id integer,
    notes character varying,
    date_created timestamp with time zone
);
ALTER TABLE public.task_notes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.task_notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.tickets (
    ticketno integer NOT NULL,
    type integer,
    eventinstanceid integer,
    custid integer,
    paid boolean,
    active boolean,
    checkedin boolean,
    checkedin_ts timestamp without time zone,
    payment_intent character varying,
    comments character varying(500)
);

--
-- Name: tickets_ticketno_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.tickets_ticketno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tickettype; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.tickettype (
    id integer NOT NULL,
    name character varying(100),
    isseason boolean,
    seasonid integer,
    price money,
    concessions money
);

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    pass_hash character varying(255),
    is_superadmin boolean DEFAULT false
);

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: discounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discounts ALTER COLUMN id SET DEFAULT nextval('public.discounts_id_seq'::regclass);


--
-- Name: donations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donations ALTER COLUMN id SET DEFAULT nextval('public.donations_donationid_seq'::regclass);


--
-- Name: event_instances id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_instances ALTER COLUMN id SET DEFAULT nextval('public.showtimes_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.plays_id_seq'::regclass);


-- 
-- Name: linkedtickets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.linkedtickets ALTER COLUMN id SET DEFAULT nextval('public.linkedtickets_id_seq'::regclass);


--
-- Name: reservation transno; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservation ALTER COLUMN transno SET DEFAULT nextval('public.reservation_transno_seq'::regclass);


--
-- Name: seasons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seasons ALTER COLUMN id SET DEFAULT nextval('public.seasons_id_seq'::regclass);


--
-- Name: tickets ticketno; Type: DEFAULT; Schema: public; Owner: - 
--

ALTER TABLE ONLY public.tickets ALTER COLUMN ticketno SET DEFAULT nextval('public.tickets_ticketno_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

-- 
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
 SELECT pg_catalog.setval('public.tickets_ticketno_seq', 13516, true);
 SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
     ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discounts
     ADD CONSTRAINT discounts_pkey PRIMARY KEY (id);


--
-- Name: donations donations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donations
     ADD CONSTRAINT donations_pkey PRIMARY KEY (id);


--
-- Name: linkedtickets linkedtickets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.linkedtickets
     ADD CONSTRAINT linkedtickets_pkey PRIMARY KEY (id);


--
-- Name: events plays_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
     ADD CONSTRAINT plays_pkey PRIMARY KEY (id);


--
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservation
     ADD CONSTRAINT reservation_pkey PRIMARY KEY (transno);


--
-- Name: seasons seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seasons
     ADD CONSTRAINT seasons_pkey PRIMARY KEY (id);


--
-- Name: event_instances showtimes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_instances
     ADD CONSTRAINT showtimes_pkey PRIMARY KEY (id);


--
-- Name: task_notes task_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_notes
     ADD CONSTRAINT task_notes_pkey PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
     ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
     ADD CONSTRAINT tickets_pkey PRIMARY KEY (ticketno);


--
-- Name: tickettype tickettype_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickettype
     ADD CONSTRAINT tickettype_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
     ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
     ADD CONSTRAINT users_username_key UNIQUE (username);

--
-- Name: donations donations_donorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donations
     ADD CONSTRAINT donations_donorid_fkey FOREIGN KEY (donorid) REFERENCES public.customers(id);


--
-- Name: linkedtickets linkedtickets_showid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.linkedtickets
     ADD CONSTRAINT linkedtickets_showid_fkey FOREIGN KEY (event_instance_id) REFERENCES public.event_instances(id);


--
-- Name: linkedtickets linkedtickets_ticket_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

 ALTER TABLE ONLY public.linkedtickets
     ADD CONSTRAINT linkedtickets_ticket_type_fkey FOREIGN KEY (ticket_type) REFERENCES public.tickettype(id);


--
-- Name: events plays_seasonid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
     ADD CONSTRAINT plays_seasonid_fkey FOREIGN KEY (seasonid) REFERENCES public.seasons(id);


--
-- Name: reservation reservation_custid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservation
     ADD CONSTRAINT reservation_custid_fkey FOREIGN KEY (custid) REFERENCES public.customers(id);


--
-- Name: event_instances showtimes_playid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_instances
     ADD CONSTRAINT showtimes_playid_fkey FOREIGN KEY (eventid) REFERENCES public.events(id);


--
-- Name: task task_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
     ADD CONSTRAINT task_fk0 FOREIGN KEY (parent_id) REFERENCES public.task(id);


--
-- Name: task task_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
     ADD CONSTRAINT task_fk1 FOREIGN KEY (assign_to) REFERENCES public.users(id);


--
-- Name: task task_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--
 
ALTER TABLE ONLY public.task
     ADD CONSTRAINT task_fk2 FOREIGN KEY (report_to) REFERENCES public.users(id);


--
-- Name: task task_fk3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
     ADD CONSTRAINT task_fk3 FOREIGN KEY (rel_contact) REFERENCES public.customers(id);


--
-- Name: task task_fk4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
     ADD CONSTRAINT task_fk4 FOREIGN KEY (rel_donation) REFERENCES public.donations(id);


--
-- Name: task task_fk5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
     ADD CONSTRAINT task_fk5 FOREIGN KEY (rel_ticket_order) REFERENCES public.reservation(transno);


--
-- Name: task_notes task_notes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_notes
     ADD CONSTRAINT task_notes_fk0 FOREIGN KEY (task_id) REFERENCES public.task(id);


--
-- Name: tickets tickets_custid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
     ADD CONSTRAINT tickets_custid_fkey FOREIGN KEY (custid) REFERENCES public.customers(id);


--
-- Name: tickets tickets_eventid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
     ADD CONSTRAINT tickets_eventid_fkey FOREIGN KEY (eventinstanceid) REFERENCES public.event_instances(id);


--
-- Name: tickets tickets_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
     ADD CONSTRAINT tickets_type_fkey FOREIGN KEY (type) REFERENCES public.tickettype(id);


--
-- Name: tickettype tickettype_seasonid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.tickettype
     ADD CONSTRAINT tickettype_seasonid_fkey FOREIGN KEY (seasonid) REFERENCES public.seasons(id);

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.customers (id, custname, email, phone, custaddress, newsletter, donorbadge, seatingaccom, vip, "volunteer list") FROM './csv/customers.csv' DELIMITER ',' CSV HEADER



--
-- Data for Name: discounts Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.discounts (id, code, amount, enddate, startdate, usagelimit, min_tickets, min_events) FROM './csv/discounts.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: donations Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.donations (id, donorid, isanonymous, amount, dononame, frequency, comments, donodate) FROM './csv/donations.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: seasons Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.seasons (id, name, startdate, enddate) FROM './csv/seasons.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: events Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.events (id, seasonid, eventname, eventdescription, active, image_url) FROM './csv/events.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: event_instances Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.event_instances (id, eventid, eventdate, starttime, salestatus, totalseats, availableseats, purchaseuri) FROM './csv/event_instances.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: exdoorlist Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.exdoorlist (id, name, vip, donor, accomodations, num_tickets, arrived) FROM './csv/exdoorlist.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: tickettype Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.tickettype (id, name, isseason, seasonid, price, concessions) FROM './csv/tickettype.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: linkedtickets Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.linkedtickets (id, event_instance_id, ticket_type) FROM './csv/linkedtickets.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: reservation Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.reservation (transno, custid, eventid, eventname, eventdate, showtime, numtickets) FROM './csv/reservation.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: users Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.users (id, username, pass_hash, is_superadmin) FROM './csv/users.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: task Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.task (id, parent_id, subject, description, status, assign_to, report_to, date_created, date_assigned, due_date, rel_contact, rel_donation, rel_ticket_order, rel_account) FROM './csv/task.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: task_notes Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.task_notes (id, task_id, notes, date_created) FROM './csv/task_notes.csv' DELIMITER ',' CSV HEADER


--
-- Data for Name: tickets Type: TABLE DATA; Schema: public; Owner: -
--
\copy public.tickets (ticketno, type, eventinstanceid, custid, paid, active, checkedin, checkedin_ts, payment_intent, comments) FROM './csv/tickets.csv' DELIMITER ',' CSV HEADER


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.customers_id_seq', 8203, true);


--
-- Name: discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.discounts_id_seq', 1, false);


--
-- Name: donations_donationid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.donations_donationid_seq', 1, false);


--
-- Name: linkedtickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.linkedtickets_id_seq', 203, true);


--
-- Name: plays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.plays_id_seq', 8, true);


--
-- Name: reservation_transno_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.reservation_transno_seq', 1, false);


--
-- Name: seasons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.seasons_id_seq', 1, true);


--
-- Name: showtimes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.showtimes_id_seq', 201, true);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.task_id_seq', 1, false);


--
-- Name: task_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.task_notes_id_seq', 1, false);


--
-- Name: tickets_ticketno_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.tickets_ticketno_seq', 13516, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
SELECT pg_catalog.setval('public.users_id_seq', 6, true);
