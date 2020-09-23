
var express = require('express');
var Watchdog = require('../server/watchdog');
var router = express.Router();
const db = require('../db');
const table_name = "covid_records";


/* Get covid records  */
router.get('/get_records', function(req, res, next) {
	  var action = "Get COVID Records"
	  var timers = OPERA.Delays ;
	  
	  db.query( "select * from covid_records ", [], function(err, dbResult){
	  	if (err) { 
	  		Watchdog.app_notify({ uuid : req.params.uuid , when : date_now(), req: action,  res: "failure",  
	  			 status: "", client: "", comments: "System error" });
	  			return next(err)
	  	} 
	  		else 
	  	{
			var records = dbResult.rows.map(
				function(d){ 
					d.ref_date = Date.parse(d.ref_date); 
					return (d);
				}
			);
			res.send( records ) ;
	  	};
	  })
	}
);

router.post('new_record', function(req, res, next){
	
    var d = req.body

	var QryString = `
		  INSERT INTO public.covid_records(
			ref_date, 
			new_case, 
			new_healed, 
			new_deceased, 
			nb_sample, 
			sum_case, 
			sum_healed, 
			sum_deceased, 
			sum_sample, 
			active_case, 
			incidence_rate, 
			remission_rate, 
			letality_rate
		)
		VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 )`;

	db.query( QryString , 
		[
			d.ref_date, 
			d.new_case, 
			d.new_healed, 
			d.new_deceased, 
			d.nb_sample, 
			d.sum_case, 
			d.sum_healed, 
			d.sum_deceased, 
			d.sum_sample, 
			d.active_case, 
			d.incidence_rate, 
			d.remission_rate, 
			d.letality_rate
		], 

		function( err, dbResult ){
			res.send({ result: "success"});
		}
	)
})


module.exports = router;

