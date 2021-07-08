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

  if (data.info == process.env.ADMIN_CODE){
     // console.log( "Success : " + data.info + " == " + process.env.ADMIN_CODE )
  		res.send({ success: true }) 
  } else {
     // console.log( "Fail : " + data.info + " <> " + process.env.ADMIN_CODE )
  		res.send({ success: false })  	
  }
});


router.post('/getenv', function(req, res, next) {

      res.send({
        PORT : process.env.PORT,
        USER : process.env.USER,
        PGDATABASE : process.env.PGDATABASE,
        USE_SSL : process.env.USE_SSL
    }) 

});

module.exports = router;