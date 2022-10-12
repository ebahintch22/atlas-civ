-- 1.Création du serveur Etranger
CREATE SERVER server_heroku_remote 
   FOREIGN DATA WRAPPER dblink_fdw 
   OPTIONS (host 'ec2-67-202-36-228.compute-1.amazonaws.com', dbname 'd906o4h0t2uq97', port '5432');

-- 2.Mappage de l’utilisateur local sur le serveur distant.
CREATE USER MAPPING FOR postgres SERVER server_heroku_remote OPTIONS (user 'ntewjjoswgbfzg', password '63b91fdbf1564a6f72133e98ce23bd4fce62673c8ec661a4a6554c3bd8748f7b');

-- 3.Octroyer  à postgres la permission d’utiliser le serveur distant.
GRANT USAGE ON FOREIGN SERVER server_heroku_remote TO postgres;

--4.Établissez une connexion avec le serveur étranger à l'aide de la fonction dblink_connect().
SELECT dblink_connect('conn_db_link','server_heroku_remote')

--5.Exécuter une requête sur le serveur Etranger.
-- Example 1
SELECT * from dblink('conn_db_link','select * from emp') AS x(a int,b text);


-- Exemple 1: testé avec succès
CREATE TABLE  new_cocoa_offre_service
 as SELECT  *  from  
    dblink(  'conn_db_link', 'select * from cocoa_offre_service' )
    AS t1( _index integer, info json );


-- Example 3 :  forme non encore testé ( avec chaîne de définition litérale des paramètres de connexion )
create
  table
    delivery_details as select
      *
    from
      dblink(
        'hostaddr=192.168.1.1 dbname=online_store user=STORE_USER password=STORE_DB_PWD',
        'select
          customers.id user_id,
          customers.address delivery_address,
          customers.phone contact_number,
          orders.id order_id,
          orders.total_amount order_amount,
          orders.status order_status
        from
          customers join orders on
          orders.customer_id = customers.id'
          
      ) as t1(
        user_id integer,
        delivery_address text,
        contact_number text,
        order_id integer,
        order_amount integer,
        order_status text
);
