
var express = require('express');
var router = express.Router();
const db = require('../db');
const keyServer = require('../db/server');
const table_name = "atlas_visitors";

const query_string = `
	select
		_index,
		info->'date' As Date, 
		info->'userid' As Identifiant, 
		info->'login' As Pseudo
	from atlas_visitors`;

/* Get visitor list */
router.get('/', function(req, res, next) {
  db.query( query_string, [], function(err, dbResult){
  	if (err) { return next(err)}
	res.send( dbResult)  	
  })
});

router.get('/nextkey/', function(req, res, next) {
  //res.send('You ask new key');
	keyServer.newKey(table_name, function(err, key_value){
		var new_key;
		if (err) {return next(err)}
		new_key = key_value + 1	
	    console.log(new_key);
	    
		res.send({ 
	    	"old key": key_value,
	    	"new key": new_key
	    })  	   	
	})
});
/* GET a specific buyers. */
router.get('/:id', function(req, res, next) {
  //res.send('respond with a resource');
  var actor_id = req.params.id;
  db.query('select * from moca_buyers where _index = $1', [actor_id], function(err, dbResult){
  	if (err) { return next(err)}
	res.send(dbResult.rows[0])   	
  })
});

/* POST a specific Buyers update. */
router.post('/:id/update', function(req, res, next) {

  var actor_id = req.params.id;
  var data = req.body;


  db.query("update moca_buyers set _index=$1, info = $2 where _index=$1", [ actor_id, data], function(err, dbResult){
  	if (err) { return next(err)}
		res.send(dbResult)  	   	
  })
});


/* POST for a new BUYER creation. */
router.post('/create', function(req, res, next) {

	var data = req.body;
	console.log(req.body)

	keyServer.newKey("moca_buyers", function(err, key_value){
		var newKey;
		if (err) {return next(err)}
		newKey = key_value + 1	
		data._index = newKey;
		db.query("INSERT INTO moca_buyers( _index, info ) VALUES( $1, $2)" , [newKey, data], function(err, dbResult){
			if (err) { return next(err)}
			res.send({ "_index": newKey})  	  	   	
		})
	})
});


router.delete('/:id', function(req, res, next ){
	var actor_id = req.params.id;
	
	db.query("DELETE from moca_buyers WHERE ( _index = $1 )" , [actor_id], function(err, dbResult){
		if (err) { return next(err)}
		res.send({ "message": "Acheteur supprimé avec succès"})  	   	
	})	
});


module.exports = router;