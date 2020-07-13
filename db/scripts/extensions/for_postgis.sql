-- Extension: plpgsql
-- DROP EXTENSION plpgsql;
CREATE EXTENSION plpgsql
    SCHEMA pg_catalog
    VERSION "1.0";


-- Extension: postgis
-- DROP EXTENSION postgis;
CREATE EXTENSION postgis
    SCHEMA public
    VERSION "2.5.3";


-- Extension: postgis_topology
-- DROP EXTENSION postgis_topology;
CREATE EXTENSION postgis_topology
    SCHEMA topology
    VERSION "2.5.3";



-- Extension: "uuid-ossp"
-- DROP EXTENSION "uuid-ossp";
CREATE EXTENSION "uuid-ossp"
    SCHEMA public
    VERSION "1.1";



-- Extension: fuzzystrmatch
-- DROP EXTENSION fuzzystrmatch;
CREATE EXTENSION fuzzystrmatch
    SCHEMA public
    VERSION "1.1";


-- Extension: address_standardizer
-- DROP EXTENSION address_standardizer;
CREATE EXTENSION address_standardizer
    SCHEMA public
    VERSION "2.5.3";

