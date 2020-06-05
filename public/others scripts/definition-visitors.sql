CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE public.atlas_visitors
(
	visitor_id uuid,  
    info json NOT NULL,
    CONSTRAINT atlas_visitors_pkey PRIMARY KEY (visitor_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.atlas_visitors
    OWNER to postgres;






-- Table: public.my_visitors

-- DROP TABLE public.my_visitors;

CREATE TABLE public.my_visitors
(
    visitor_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    info json NOT NULL,
    CONSTRAINT my_visitors_pkey PRIMARY KEY (visitor_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.my_visitors
    OWNER to postgres;






CREATE TABLE public.my_visitors
(
	visitor_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
	login    character varying(50),
	firstname character varying(50),
	lastname  character varying(50), 
	registered boolean,
	last_conn_started_at  TIMESTAMP,
	last_conn_ended_at  TIMESTAMP,
	online  character varying(50),
	email character varying(50),
	job  character varying(50),
	new_visitor  boolean
    CONSTRAINT my_visitors_pkey PRIMARY KEY (visitor_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.my_visitors
    OWNER to postgres;