--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2022-09-14 18:28:56

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 20418)
-- Name: my_visitors; Type: TABLE; Schema: public; Owner: vhscgsdlvpqnqo
--

CREATE TABLE public.my_visitors (
    uuid character varying(50) NOT NULL,
    login character varying(50),
    firstname character varying(50),
    lastname character varying(50),
    registered boolean,
    conn_count integer,
    created_on timestamp without time zone,
    last_conn_started_at timestamp without time zone,
    last_conn_ended_at timestamp without time zone,
    online character varying(50),
    email character varying(50),
    job character varying(50),
    new_visitor boolean,
    ua_browser_name character varying(50),
    ua_browser_version character varying(50),
    ua_engine_name character varying(50),
    ua_engine_version character varying(50),
    ua_os_name character varying(50),
    ua_os_version character varying(50),
    ua_device_type character varying(50),
    ua_cpu_architecture character varying(50),
    boot_exit character varying(50),
    boot_exit_how character varying(50),
    boot_exit_why character varying(50),
    user_type character varying(50),
    user_url character varying(50)
);


ALTER TABLE public.my_visitors OWNER TO vhscgsdlvpqnqo;

--
-- TOC entry 3888 (class 0 OID 20418)
-- Dependencies: 211
-- Data for Name: my_visitors; Type: TABLE DATA; Schema: public; Owner: vhscgsdlvpqnqo
--

COPY public.my_visitors (uuid, login, firstname, lastname, registered, conn_count, created_on, last_conn_started_at, last_conn_ended_at, online, email, job, new_visitor, ua_browser_name, ua_browser_version, ua_engine_name, ua_engine_version, ua_os_name, ua_os_version, ua_device_type, ua_cpu_architecture, boot_exit, boot_exit_how, boot_exit_why, user_type, user_url) FROM stdin;
b926e724-b577-11ea-98f7-00ff58043689	anonymous (reloaded)	n/a	n/a	\N	1109	2020-06-23 17:34:00	2020-06-23 17:34:00	2021-03-31 09:30:46	true	\N	\N	\N	Chrome	83.0.4103.106	Blink	83.0.4103.106	Windows	8.1	desktop	amd64	completed	n/a	n/a	\N	/visitors
39105e06-bae7-11ea-ad0f-00ff58043689	anonymous (unqualified)	n/a	n/a	\N	0	2020-06-30 15:34:44	2020-06-30 15:34:44	2020-06-30 15:34:44	true	\N	\N	\N	Chrome	83.0.4103.116	Blink	83.0.4103.116	Windows	8.1	desktop	amd64	uncompleted	aborted without notification	\N	\N	\N
f34701f2-a440-11ea-9287-00ff58043689	anonymous (unqualified)	n/a	n/a	\N	0	2020-06-01 19:49:05	2020-06-01 19:49:05	2020-06-01 19:49:05	true	\N	\N	\N	Chrome	83.0.4103.61	Blink	83.0.4103.61	Windows	8.1	desktop	amd64	uncompleted	aborted without notification	\N	\N	\N
9c9c1bcc-a435-11ea-9ae8-00ff58043689	anonymous (reloaded)	n/a	n/a	\N	419	2020-06-01 18:27:55	2020-06-01 18:27:55	2020-06-23 17:33:10	true	\N	\N	\N	Chrome	83.0.4103.61	Blink	83.0.4103.61	Windows	8.1	desktop	amd64	completed	n/a	n/a	\N	\N
6fbd5e48-fa90-11ea-9630-00ff58043689	anonymous (unqualified)	n/a	n/a	\N	0	2020-09-19 15:54:44	2020-09-19 15:54:44	2020-09-19 15:54:44	true	\N	\N	\N	Chrome	85.0.4183.102	Blink	85.0.4183.102	Windows	8.1	desktop	amd64	uncompleted	aborted without notification	\N	DEFAULT	/visitors
1cae04aa-a437-11ea-b348-00ff58043689	anonymous (reloaded)	n/a	n/a	\N	25	2020-06-01 18:38:39	2020-06-01 18:38:39	2020-07-27 09:01:17	true	\N	\N	\N	Firefox	76.0	Gecko	76.0	Windows	8.1	desktop	amd64	completed	n/a	n/a	\N	/guest-acf/visitors
dc05829c-1615-11eb-801b-00ff58043689	anonymous (reloaded)	n/a	n/a	\N	3	2020-10-24 16:27:50	2020-10-24 16:27:50	2020-10-24 19:39:20	true	\N	\N	\N	Chrome	86.0.4240.75	Blink	86.0.4240.75	Windows	8.1	desktop	amd64	completed	n/a	n/a	DEFAULT	/visitors
750a5218-985e-11eb-85a2-040e3c569eaa	anonymous (reloaded)	n/a	n/a	\N	77	2021-04-08 11:35:02	2021-04-08 11:35:02	2022-09-14 16:20:14	true	\N	\N	\N	Chrome	89.0.4389.114	Blink	89.0.4389.114	Windows	10	desktop	amd64	completed	n/a	n/a	DEFAULT	/visitors
\.


--
-- TOC entry 3752 (class 2606 OID 20471)
-- Name: my_visitors my_visitors_pkey; Type: CONSTRAINT; Schema: public; Owner: vhscgsdlvpqnqo
--

ALTER TABLE ONLY public.my_visitors
    ADD CONSTRAINT my_visitors_pkey PRIMARY KEY (uuid);


-- Completed on 2022-09-14 18:28:57

--
-- PostgreSQL database dump complete
--

