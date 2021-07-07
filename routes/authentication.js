//authentication
var express = require('express');
var router = express.Router();
var employeeData = require('../server/data/employees.json');

var idfield = "emp_matricule"



/* Get covid records  */

router.post('/atlas-admin', function(req, res, next) {

  var actor_id = req.params.id;
  var data = req.body;

  console.log( "Checking password value = " + data.info )

  if (data.info == "Awa@88"){
  		res.send({ success: true }) 
  } else {
  		res.send({ success: false })  	
  }
});


module.exports = router;