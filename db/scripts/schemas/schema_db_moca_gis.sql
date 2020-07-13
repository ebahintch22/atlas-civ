--schema_db_moca_gis
-- Table: public.moca_actor_relations

-- DROP TABLE public.moca_actor_relations;

CREATE TABLE public.moca_actor_relations
(
    _index integer NOT NULL,
    _index1 integer NOT NULL,
    _index2 integer NOT NULL,
    code integer NOT NULL,
    info json NOT NULL,
    CONSTRAINT moca_actor_relations_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_actor_relations
    OWNER to qpmsllscptmnak;




-- SEQUENCE: public.moca_adm_entities_gid_seq
-- DROP SEQUENCE public.moca_adm_entities_gid_seq;
CREATE SEQUENCE public.moca_adm_entities_gid_seq
    INCREMENT 1
    START 509
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.moca_adm_entities_gid_seq
    OWNER TO qpmsllscptmnak;
-- Table: public.moca_adm_entities
-- DROP TABLE public.moca_adm_entities;

CREATE TABLE public.moca_adm_entities
(
    gid integer NOT NULL DEFAULT nextval('moca_adm_entities_gid_seq'::regclass),
    admin4name character varying(254) COLLATE pg_catalog."default",
    admin4pcod character varying(254) COLLATE pg_catalog."default",
    admin4refn character varying(254) COLLATE pg_catalog."default",
    admin3name character varying(254) COLLATE pg_catalog."default",
    admin3pcod character varying(254) COLLATE pg_catalog."default",
    admin2name character varying(254) COLLATE pg_catalog."default",
    admin2pcod character varying(254) COLLATE pg_catalog."default",
    admin1name character varying(254) COLLATE pg_catalog."default",
    admin1pcod character varying(254) COLLATE pg_catalog."default",
    admin0name character varying(254) COLLATE pg_catalog."default",
    admin0pcod character varying(254) COLLATE pg_catalog."default",
    date date,
    validon date,
    shape_leng numeric,
    shape_area numeric,
    geom geometry(MultiPolygon,4326),
    CONSTRAINT moca_adm_entities_pkey PRIMARY KEY (gid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_adm_entities
    OWNER to qpmsllscptmnak;




-- Table: public.moca_agrodealers

-- DROP TABLE public.moca_agrodealers;

CREATE TABLE public.moca_agrodealers
(
    _index integer NOT NULL,
    info json NOT NULL,
    CONSTRAINT moca_agrodealers_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_agrodealers
    OWNER to qpmsllscptmnak;



-- Table: public.moca_buyers

-- DROP TABLE public.moca_buyers;

CREATE TABLE public.moca_buyers
(
    _index integer NOT NULL,
    info json NOT NULL,
    CONSTRAINT moca_buyers_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_buyers
    OWNER to qpmsllscptmnak;



-- Table: public.moca_imf

-- DROP TABLE public.moca_imf;

CREATE TABLE public.moca_imf
(
    _index integer NOT NULL,
    info json NOT NULL,
    CONSTRAINT moca_imf_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_imf
    OWNER to qpmsllscptmnak;



-- Table: public.moca_planters

-- DROP TABLE public.moca_planters;

CREATE TABLE public.moca_planters
(
    _index integer NOT NULL,
    info jsonb NOT NULL,
    CONSTRAINT moca_planters_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_planters
    OWNER to qpmsllscptmnak;



-- Table: public.moca_providers

-- DROP TABLE public.moca_providers;

CREATE TABLE public.moca_providers
(
    _index integer NOT NULL,
    info json NOT NULL,
    CONSTRAINT moca_providers_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_providers
    OWNER to qpmsllscptmnak;



-- Table: public.moca_scoop_sections

-- DROP TABLE public.moca_scoop_sections;

CREATE TABLE public.moca_scoop_sections
(
    _index integer NOT NULL,
    info jsonb NOT NULL,
    CONSTRAINT moca_scoop_sections_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_scoop_sections
    OWNER to qpmsllscptmnak;




-- Table: public.moca_scoops

-- DROP TABLE public.moca_scoops;

CREATE TABLE public.moca_scoops
(
    _index integer NOT NULL,
    info json NOT NULL,
    CONSTRAINT moca_scoops_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_scoops
    OWNER to qpmsllscptmnak;





-- SEQUENCE: public.moca_settlements_gid_seq

-- DROP SEQUENCE public.moca_settlements_gid_seq;

CREATE SEQUENCE public.moca_settlements_gid_seq
    INCREMENT 1
    START 8377
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.moca_settlements_gid_seq
    OWNER TO qpmsllscptmnak;
-- Table: public.moca_settlements

-- DROP TABLE public.moca_settlements;

CREATE TABLE public.moca_settlements
(
    gid integer NOT NULL DEFAULT nextval('moca_settlements_gid_seq'::regclass),
    objectid_1 bigint,
    nom character varying(50) COLLATE pg_catalog."default",
    point_x numeric,
    point_y numeric,
    objectid bigint,
    admin3name character varying(50) COLLATE pg_catalog."default",
    admin3pcod character varying(50) COLLATE pg_catalog."default",
    admin2name character varying(50) COLLATE pg_catalog."default",
    admin2pcod character varying(50) COLLATE pg_catalog."default",
    admin1name character varying(50) COLLATE pg_catalog."default",
    admin1pcod character varying(50) COLLATE pg_catalog."default",
    popplacecl integer,
    popplace_1 character varying(50) COLLATE pg_catalog."default",
    geom geometry(Point,4326),
    CONSTRAINT moca_settlements_pkey PRIMARY KEY (gid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_settlements
    OWNER to qpmsllscptmnak;





-- Table: public.moca_supportorgs

-- DROP TABLE public.moca_supportorgs;

CREATE TABLE public.moca_supportorgs
(
    _index integer NOT NULL,
    info json NOT NULL,
    CONSTRAINT moca_supportorgs_pkey PRIMARY KEY (_index)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_supportorgs
    OWNER to qpmsllscptmnak;



-- Table: public.moca_users

-- DROP TABLE public.moca_users;

CREATE TABLE public.moca_users
(
    uid integer NOT NULL,
    login character varying(32) COLLATE pg_catalog."default" NOT NULL,
    title character varying(140) COLLATE pg_catalog."default",
    hash character(64) COLLATE pg_catalog."default" NOT NULL,
    profil character varying(32) COLLATE pg_catalog."default" NOT NULL,
    roles text[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT moca_users_pkey PRIMARY KEY (uid),
    CONSTRAINT login_unique UNIQUE (login)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.moca_users
    OWNER to qpmsllscptmnak;





-- Table: public.my_visitors

-- DROP TABLE public.my_visitors;

CREATE TABLE public.my_visitors
(
    uuid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    login character varying(50) COLLATE pg_catalog."default",
    firstname character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    registered boolean,
    conn_count integer,
    created_on timestamp without time zone,
    last_conn_started_at timestamp without time zone,
    last_conn_ended_at timestamp without time zone,
    online character varying(50) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    job character varying(50) COLLATE pg_catalog."default",
    new_visitor boolean,
    ua_browser_name character varying(50) COLLATE pg_catalog."default",
    ua_browser_version character varying(50) COLLATE pg_catalog."default",
    ua_engine_name character varying(50) COLLATE pg_catalog."default",
    ua_engine_version character varying(50) COLLATE pg_catalog."default",
    ua_os_name character varying(50) COLLATE pg_catalog."default",
    ua_os_version character varying(50) COLLATE pg_catalog."default",
    ua_device_type character varying(50) COLLATE pg_catalog."default",
    ua_cpu_architecture character varying(50) COLLATE pg_catalog."default",
    boot_exit character varying(50) COLLATE pg_catalog."default",
    boot_exit_how character varying(50) COLLATE pg_catalog."default",
    boot_exit_why character varying(50) COLLATE pg_catalog."default",
    user_type character varying(50) COLLATE pg_catalog."default",
    user_url character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT my_visitors_pkey PRIMARY KEY (uuid)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.my_visitors
    OWNER to qpmsllscptmnak;
