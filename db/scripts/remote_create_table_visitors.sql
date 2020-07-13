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
    OWNER to devynsalcoibdi;