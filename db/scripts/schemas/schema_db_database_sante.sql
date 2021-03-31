-- Database: ddl0biv9are1he

-- DROP DATABASE ddl0biv9are1he;

CREATE DATABASE ddl0biv9are1he
    WITH 
    OWNER = devynsalcoibdi
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

ALTER DATABASE ddl0biv9are1he
    SET search_path TO "$user", public, topology;

GRANT ALL ON DATABASE ddl0biv9are1he TO devynsalcoibdi;


-- My Comments : Maybe we can change the LC_COLLATE and LC_CTYPE  to EUROPEAN