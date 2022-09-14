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