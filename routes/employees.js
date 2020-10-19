//employee.js

var express = require('express');
var router = express.Router();
var employeeData = require('../server/data/employees.json');

var idfield = "emp_matricule"



/* Get covid records  */
router.get('/list', function(req, res, next) {

	  res.send( {ok: true, rows: employeeData }) 
	}
);

router.get('/get/:objectId', function(req, res, next) {

	var objectId = req.params.objectId

	var employee = employeeData.find( 
		function(emp){	return( emp[idfield] == objectId ) ;}
	);

	var Result = ( employee !== undefined) ? 
	  	{ ok: true ,   rows: employee } :
	  	{ ok: false,   rows: -1 } 

	res.send( Result )
});



module.exports = router;


