-- Step 1:

-- Step 2:
CREATE SERVER server_heroku_free_2022 FOREIGN DATA WRAPPER dblink_fdw OPTIONS (host 'ec2-54-228-125-183.eu-west-1.compute.amazonaws.com', dbname 'd87kvtji5e7m2r', port '5432');
-- Step 3:
CREATE USER MAPPING FOR postgres SERVER server_heroku_free_2022 OPTIONS (user 'vhscgsdlvpqnqo', password '258163c89e73ef0b55d868184d2e9c41cf1a21bca79c9fe2b2e1240795b99da4');
-- Step 4:
GRANT USAGE ON FOREIGN SERVER server_heroku_free_2022 TO postgres;
-- Step 5: etablir la connexion avec le serveur distant
SELECT dblink_connect('conn_db_link','server_heroku_free_2022');


-- Step 6
dblink( 'conn_db_link','INSERT INTO covid_records(
		    id ,
		    ref_date ,
		    new_case ,
		    new_healed ,
		    new_deceased ,
		    nb_sample ,
		    sum_case ,
		    sum_healed ,
		    sum_deceased ,
		    sum_sample ,
		    active_case ,
		    incidence_rate ,
		    remission_rate ,
		    letality_rate ,
		    created_at ,
		    updated_at
		) ') SELECT * FROM public.covid_records ;


/*

--Step 6 : Exécuter la requête
SELECT * from  dblink(  'conn_db_link', 
	  'SELECT  
		    id ,
		    ref_date ,
		    new_case ,
		    new_healed ,
		    new_deceased ,
		    nb_sample ,
		    sum_case ,
		    sum_healed ,
		    sum_deceased ,
		    sum_sample ,
		    active_case ,
		    incidence_rate ,
		    remission_rate ,
		    letality_rate ,
		    created_at ,
		    updated_at
	  	FROM 
	  		public.atlas_sys_infos' 
	  	) AS x( id int, app_version text, app_name text, app_author text, app_year text)
    


    -- Table: public.covid_records

-- DROP TABLE public.covid_records;

	CREATE TABLE public.covid_records
	AS x(
	    id integer,
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
	    created_at timestamp with time zone,
	    updated_at timestamp with time zone
	)
*/