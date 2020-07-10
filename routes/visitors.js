
var express = require('express');
var Watchdog = require('../server/watchdog');
var router = express.Router();
const db = require('../db');
const KEY_SERVER = require('../db/server');
const table_name = "atlas_visitors";
var ACCESS_URL = {};
const query_string = `
	select
		_index,
		info->'date' As Date, 
		info->'userid' As Identifiant, 
		info->'login' As Pseudo
	from atlas_visitors`;

router.use( function(req, res, next) {

	ACCESS_URL.base = req.baseUrl
	ACCESS_URL.original = req.originalUrl

	next()
})


/* Get existing visitor  */
router.post('/boot_app',  function(req, res, next) {

	var action = "boot-app"
	var ua = req.body;
	var new_uuid

	 //var timers = OPERA.Delays ;

		KEY_SERVER.get_uuid( function(err, key_value){
			if (err){ return next(err) }
			new_uuid = key_value;

			// on affecte un uuid temporaire qui sera conservé si le visiteur est nouveau  
			// (recherche fructueuse dans le local storage)
			// mais ecrasée le cas échéant par la clé trouvée dans le local storage

			var usrBadge = {
			 	uuid : null,
			    _uuid : new_uuid,
			 	login : "anonymous (unqualified)",
			 	firstname : "n/a",
			 	lastname  : "n/a", 
			 	registered : null,
			 	user_type : qualify_user( ACCESS_URL.base ),
			 	user_url : ACCESS_URL.base ,
			 	conn_count : 0,
			 	created_on : date_now(),
			 	last_conn_started_at : date_now(),
			 	last_conn_ended_at : date_now(),
			 	UA : ua,
			 	online : true,
			 	email: null,
			 	job : null,
			 	new_visitor : null,
			 	boot_exit : "uncompleted",
			 	boot_exit_how : "aborted without notification"
			 };			

			
			Watchdog.app_notify({ uuid : new_uuid , when : date_now(), req : action,  res : "success",  comments: "N/A" });
			console.log(usrBadge)

			db.query(  ` INSERT INTO my_visitors ( 
				       uuid, 
				       login, 
				       firstname, 
				       lastname, 
				       registered,

				       conn_count,
				       created_on,
				       last_conn_started_at, 
				       last_conn_ended_at , 
				       online, 

				       email, 
				       job,  
				       new_visitor,
				       ua_browser_name,
				       ua_browser_version,

				       ua_engine_name,
				       ua_engine_version,
				       ua_os_name,
				       ua_os_version,
				       ua_device_type,

				       ua_cpu_architecture,
				       boot_exit,
				       boot_exit_how,
				       boot_exit_why,

				       user_type,
				       user_url
				     ) 
				    VALUES( $1,  $2,   $3,  $4,   $5,  $6,  $7,  $8,  $9, $10, 
				           $11, $12,  $13, $14,  $15, $16, $17, $18, $19, $20, 
				           $21, $22,  $23, $24,  $25, $26 )`, 
				    [  
				       usrBadge._uuid, 
				       usrBadge.login, 
				       usrBadge.firstname, 
				       usrBadge.lastname, 
				       usrBadge.registered, 

				       usrBadge.conn_count, 
				       usrBadge.created_on, 
				       usrBadge.last_conn_started_at, 
				       usrBadge.last_conn_ended_at , 
				       usrBadge.online, 

				       usrBadge.email, 
				       usrBadge.job, 
				       usrBadge.new_visitor,
				       usrBadge.UA.browser.name,
				       usrBadge.UA.browser.version,

				       usrBadge.UA.engine.name,
				       usrBadge.UA.engine.version,
				       usrBadge.UA.os.name,
				       usrBadge.UA.os.version,
				       usrBadge.UA.device_type,

				       usrBadge.UA.cpu.architecture,
				       usrBadge.boot_exit,
				       usrBadge.boot_exit_how,
				       usrBadge.boot_exit_why,
				       usrBadge.user_type,
				       usrBadge.user_url
				    ], 
				
				function(err, dbResult){

					if (err) { 

						Watchdog.app_notify({ uuid : usrBadge.uuid, when: date_now(), req: action,  res : "failure",  comments: "Database System Error" });
						return next(err)
					}
				
			    res.send( usrBadge)  	
			})
		})

		function qualify_user( str){
			var user_classes = {
				"/visitors" : "DEFAULT",
				"/guest-acf/visitors" : "ACF-GUEST",
				"/guest-unicef/visitors" : "UNICEF-GUEST",
				"/guest-cepici/visitors" : "CEPICI"
			}
			return user_classes[str]
		}
	}
);



router.post('/new_visitor',  function(req, res, next) {
	//Confirm that local storage is implemented but no key found 
	// So we confirm the temp key produce during boot request

	                  var action = "new visitor"
	                var usrBadge = req.body;

                   usrBadge.uuid = usrBadge._uuid;
                  usrBadge.login = "anonymous (new visitor)";
     usrBadge.last_conn_ended_at = date_now();
              usrBadge.boot_exit = "uncompleted";
          usrBadge.boot_exit_how = "confirming user on registry table";
          usrBadge.boot_exit_why = "n/a";
             usrBadge.conn_count = 1;

	db.query( ` 
		UPDATE my_visitors 
		SET   
			uuid = $1, 
			login = $2, 
			last_conn_ended_at = $3, 
			boot_exit = $4,
			boot_exit_how = $5,
			boot_exit_why = $6,
			conn_count = $7
		WHERE 
			uuid = $8 ` , 

	    [  
	       usrBadge.uuid,
	       usrBadge.login,
	       usrBadge.last_conn_ended_at , 
	       usrBadge.boot_exit,
	       usrBadge.boot_exit_how,
	       usrBadge.boot_exit_why,
	       usrBadge.conn_count , 
	       usrBadge._uuid
	    ], 
		
		function(err, dbResult){

			if (err) { 
				Watchdog.app_notify({ uuid : usrBadge.uuid, when: date_now(), req: action,  res : "failure",  comments: "Database System Error" });
				return next(err)
			}
	    res.send( usrBadge )  	
	})
})





/* Get existing visitor  */
router.get('/read_visitor/:uuid', function(req, res, next) {
	  var action = "registered visitor checking"
	  var timers = OPERA.Delays ;
	  
	  db.query( "select * from my_visitors where uuid = $1", [ req.params.uuid ], function(err, dbResult){
	  	if (err) { 
	  		Watchdog.app_notify({ uuid : req.params.uuid , when : date_now(), req : action,  res : "failure",  
	  			 status: "", client: "", comments: "System error" });
	  		return next(err)}

	  	if (dbResult.rows.length == 0){

	  		Watchdog.app_notify({ uuid : "0000-0000-0000-0000-0000-0000", when : date_now(), req : action,  res : "failure",  
	  			comments: "Invalid User key :" + req.params.uuid });
	  		res.send({
	  			uuid: req.params.uuid,
	  			valid : false,
	  			comments : `No token found for visitor ${req.params.uuid } retrouvé. Client should request new token`
	  		})

	  	} else {

			var r = dbResult.rows[0];
			var conn_count = r.conn_count++ ;
			var usrBadge = {};
			
					        usrBadge.uuid = r.uuid ;
					       usrBadge.login = r.login ;
					   usrBadge.firstname = r.firstname ;
					    usrBadge.lastname = r.lastname ;
					  usrBadge.registered = r.registered ;

					   usrBadge.user_type = r.user_type ;
					    usrBadge.user_url = r.user_url ;

					  usrBadge.conn_count = r.conn_count ;
			          usrBadge.created_on = r.created_on ;
			usrBadge.last_conn_started_at = r.last_conn_started_at ;
			  usrBadge.last_conn_ended_at = date_now() ;
			              usrBadge.online = r.online ;
			               usrBadge.email = r.email ;

			                 usrBadge.job = r.job ;
			         usrBadge.new_visitor = false ;
			                  usrBadge.UA = {};
			          usrBadge.UA.browser = {};
      		     usrBadge.UA.browser.name = r.ua_browser_name;
      		  usrBadge.UA.browser.version = r.ua_browser_version;
			               usrBadge.UA.os = {};
			          usrBadge.UA.os.name = r.ua_os_name;

			       usrBadge.UA.os.version = r.ua_os_version;			           
			           usrBadge.UA.engine = {};
      		      usrBadge.UA.engine.name = r.ua_engine_name;
      		   usrBadge.UA.engine.version = r.ua_engine_version;			                  	
			              usrBadge.UA.cpu = {};
			 usrBadge.UA.cpu.architecture = r.ua_cpu_architecture ;
			           usrBadge.UA.device = {};
           usrBadge.UA.device.device_type = r.ua_device_type; 


		               usrBadge.boot_exit = r.boot_exit     ;
		           usrBadge.boot_exit_how = r.boot_exit_how ;
		           usrBadge.boot_exit_why = r.boot_exit_why ;
			              usrBadge.timers = { 
			              	   notifyClient : OPERA.Delays.notifyClient , 
			              	    adminClient : OPERA.Delays.adminClient 
			              	};
			          usrBadge.appIsReady = true;

			

			Watchdog.app_notify({ uuid : r.uuid, when : date_now(), req : action,  res : "success",  status: "", client: "", comments: "N/A" })
			res.send( usrBadge ) ;
	  	};

	  })
	}
);



router.post('/boot_success',  function(req, res, next) {
	 var action = "confirmation";
	 var usrBadge = req.body;
	 	
	 	usrBadge.boot_exit = "completed";
	 	usrBadge.boot_exit_how = "n/a";
	 	usrBadge.boot_exit_why = "n/a";
	 	usrBadge.last_conn_ended_at = date_now();
	 	usrBadge.online = true;		

	 	if ( usrBadge.new_visitor == true  ){
	 		console.log("--------------------->>> NOUVEAU VISITEUR")


	 		//NOUVEAU VISITEUR
	 		// Confirmer la bonne fin
	 		db.query(`
	 			UPDATE my_visitors 
	 			SET
	 				boot_exit = $1 ,
	 				boot_exit_how = $2,
	 				boot_exit_why = $3
	 			WHERE
	 				uuid = $4`,
	 			[
	 				"Completed",
	 				"New visitor confirmed",
	 				"Fisrt time visit",
	 				usrBadge.uuid
	 			],
		 		 function( err, dbResult ){
		 			console.log("BOOT-END : REQUALIFICATION OF TEMP BADGE IN PERMANENT !!!")	
		 			usrBadge.appIsReady = true;
					usrBadge.timers = OPERA.Delays	
					res.send( usrBadge ) ;	
		 		}
	 		)


	 	} else if ( usrBadge.new_visitor == false){
	 		//ANCIEN VISITEURS :
	 		//Effacer la clé temporaire
	 		console.log("--------------------->>> ANCIENS VISITEURS")

			usrBadge.login = "anonymous (reloaded)";
			usrBadge.boot_exit = "completed";
			usrBadge.boot_exit_how = "n/a";
			usrBadge.boot_exit_why = "n/a";
			usrBadge.last_conn_ended_at = date_now();


	 		db.query(`
	 			UPDATE my_visitors 
	 			SET
					login = $1,
					last_conn_ended_at = $2 , 
					boot_exit = $3,
					boot_exit_how = $4,
					boot_exit_why = $5,
					conn_count = $7,
					user_url = $8
	 			WHERE
	 				uuid = $6
	 			`, 
			    [  
			       usrBadge.login, 
			       usrBadge.last_conn_ended_at, 
			       usrBadge.boot_exit,
			       usrBadge.boot_exit_how,
			       usrBadge.boot_exit_why,
			       usrBadge.uuid,
			       usrBadge.conn_count,
			       usrBadge.user_url 
			    ],

	 		 function( err,dbResult ){
	 		 	KEY_SERVER.delete_temp_badge ( 
	 		 		usrBadge._uuid, 
					function(err, dbRes){

						console.log("BOOT-END : SUCCESSFUL DELETE OF TEMP BADGE # " + usrBadge._uuid)	
						usrBadge.appIsReady = true;
						usrBadge.timers = OPERA.Delays	
					    res.send( usrBadge ) ;						
				    }
			    );
	 		})

	 	}
		Watchdog.app_notify({ uuid :  usrBadge.uuid , when : date_now(), req : action,  res : "success",  comments: "N/A" });
	
});


router.post('/boot_fail',  function(req, res, next) {
	 var action = "boot_failure"
	 var usrBadge = req.body;

	 	         usrBadge.boot_exit = "uncompleted";
	 	     usrBadge.boot_exit_how = "with notification";
	 	     usrBadge.boot_exit_why = usrBadge.abort_message;
	 	usrBadge.last_conn_ended_at = date_now();
	 	            usrBadge.online = false;		

		Watchdog.app_notify({ uuid : new_uuid , when : date_now(), req : action,  res : "success",  comments: "N/A" });

		db.query( ` 
			UPDATE my_visitors 
			SET   
				last_conn_ended_at = $1 , 
				online = $2,
				boot_exit = $3,
				boot_exit_how = $4,
				boot_exit_why = $5
			WHERE 
				uuid = $6 `, 
			    [  
			       usrBadge.last_conn_ended_at , 
			       usrBadge.online, 
			       usrBadge.boot_exit,
			       usrBadge.boot_exit_how,
			       usrBadge.boot_exit_why,
			       usrBadge.uuid
			    ], 
			
			function(err, dbResult){

				if (err) { 
					Watchdog.app_notify({ uuid : usrBadge.uuid, when: date_now(), req: action,  res : "failure",  comments: "Database System Error" });
					return next(err)
				}

		    res.send( u)  	
		})
});


router.post('/connected',  function(req, res, next) {
	//Confirm that local storage is implemented but no key found 
	// So we confirm the temp key produce during boot request
	var action = "new visitor"
	var auth = req.body;

	db.query( `SELECT *, $1 as url_access FROM my_visitors ` ,  [ ACCESS_URL.base ], 
		function(err, dbResult){
			if (err) { 
				Watchdog.app_notify({ uuid : usrBadge.uuid, when: date_now(), req: action,  res : "failure",  comments: "Database System Error" });
				return next(err)
			}
		console.log( dbResult.rows )
	    res.send( dbResult.rows )  	
	})
})




/* Notify user alive  */
router.get('/notify_alive/:uuid', function(req, res, next) {

	var action = "notify alive";

	Watchdog.app_notify({ uuid : req.params.uuid, when: date_now(), start_at: null , req: action, status: "alive", res : "success", client:"", comments: "User is online" }, true);
	res.send({
		uuid: req.params.uuid,
		comments: "thank U"
	})

});

router.get('/admin_query', function(req, res, next) {

	var action = "supervision";

	Watchdog.app_notify({ uuid : req.params.uuid, when: date_now(), start_at: null , req: action, status: "n/a", res : "success", client:"", comments: "AdminUser online" }, true);
	res.send(global.OPERA_DATA_BUS);

});



function date_now(){
	return( new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') )
}

function qualify_user( str){
	var user_classes = {
		"/visitors" : "DEFAULT",
		"/guest-acf/visitors" : "ACF-GUEST",
		"/guest-unicef/visitors" : "UNICEF-GUEST",
		"/guest-cepici/visitors" : "CEPICI"
	}
	return user_classes[str]
}

module.exports = router;

