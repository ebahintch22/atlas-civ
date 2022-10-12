-- Table: public.atlas_sys_infos
DROP TABLE IF EXISTS public.atlas_sys_infos;
CREATE TABLE public.atlas_sys_infos
(
    id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    app_name character varying(50) COLLATE pg_catalog."default",
    app_version character varying(10) COLLATE pg_catalog."default",
    app_author character varying(50) COLLATE pg_catalog."default",
    app_year integer,
    CONSTRAINT atlas_sys_infos_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;
ALTER TABLE public.atlas_sys_infos
    --OWNER to postgres;
    OWNER to dzgquppnwobosq;
    
    
INSERT INTO public.atlas_sys_infos
VALUES ( 1, 'Atlas Côte d''Ivoire Santé', 'v1.1.0', 'ebahintch@gmail.com', 2020 );


-- Table: public.atlas_visitors
-- DROP TABLE public.atlas_visitors;
CREATE TABLE public.atlas_visitors
(
    visitor_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    description character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT atlas_visitors_pkey PRIMARY KEY (visitor_id)
)
TABLESPACE pg_default;
ALTER TABLE public.atlas_visitors
    OWNER to vhscgsdlvpqnqo;

-- SEQUENCE: public.covid_records_gid_seq
-- DROP SEQUENCE IF EXISTS public.covid_records_gid_seq;
CREATE SEQUENCE public.covid_records_gid_seq
    INCREMENT 1
    START 135
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.covid_records_gid_seq
    OWNER TO vhscgsdlvpqnqo;

-- Table: public.covid_records
-- DROP TABLE public.covid_records;
CREATE TABLE public.covid_records
(
    id integer NOT NULL DEFAULT nextval('covid_records_gid_seq'::regclass),
    ref_date date,
    new_case integer,
    new_healed integer,
    new_deceased integer,
    nb_sample integer,
    sum_case integer,
    sum_healed integer,
    sum_deceased integer,
    sum_sample integer,
    active_case integer,
    incidence_rate numeric,
    remission_rate numeric,
    letality_rate numeric,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT covid_record_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;
ALTER TABLE public.covid_records
    OWNER to vhscgsdlvpqnqo;


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
TABLESPACE pg_default;
ALTER TABLE public.my_visitors
    OWNER to vhscgsdlvpqnqo;