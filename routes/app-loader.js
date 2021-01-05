var express = require('express');
var router = express.Router();
var path = require('path');
var ACCESS_URL = {};
//var UI_THEME = require('@rjsf/material-ui')

router.use( function(req, res, next) {
	console.log( "Base URL is " + req.baseUrl)
	console.log( "Original URL is " + req.originalUrl)

	ACCESS_URL.base = req.baseUrl;
	ACCESS_URL.original = req.originalUrl;
	next();
})




router.get('/', function(req, res, next) {

	var options = {
		root: path.join(__dirname, '../starter')
	}

	switch(ACCESS_URL.base){

		case "/sante" : 
		 	res.sendFile( 'index-admin-mode.html', {
				root: path.join(__dirname, '../starter/sante')
			}); 
		 	break;


		case "/economie-6e448f82-644e-4c4f-8f53-1bcd3a70ea49" : 
		 	res.sendFile( 'index-admin-mode.html', {
				root: path.join(__dirname, '../starter/economie')
			}); 
		 	break;


		case "/preloader" : 
		 	res.sendFile( 'index.html', options); 
		 	break;

		case "/unit-test" : 
		 	res.sendFile( 'unit.html', options); 
		 	break;

		case "/civ" : 
		 	res.sendFile( 'index.html', { root: path.join(__dirname, '../public')}); 
		 	break;

		default: 
		 	next();
	}
});



/*

router.get('/unit-test', function(req, res, next) {

  var options = {
  	root: path.join(__dirname, '../starter/test')
  }
  res.sendFile( 'index.html', options);

});*/


router.get('/get_env', function(req, res, next) {
  	res.send( get_env_params() );
});


router.get('/theming', function(req, res, next) {
  	res.send(  );
});


function get_env_params(){
	return {
		 OGIS_APP_URL : process.env.OGIS_APP_URL || null,
		OGIS_APP_MODE : process.env.OGIS_APP_MODE || null,
		         PORT : process.env.PORT || null
	}
	/*
	return {
		 OGIS_APP_URL : process.env.OGIS_APP_URL || null,
		OGIS_APP_MODE : process.env.OGIS_APP_MODE || null,
		         PORT : process.env.PORT || null,
		       PGUSER : process.env.PGUSER || null,
		   PGDATABASE : process.env.PGDATABASE || null,
		   PGPASSWORD : process.env.PGPASSWORD || null,
		       PGPORT : process.env.PGPORT || null		
	}*/

}
 
module.exports = router; 


