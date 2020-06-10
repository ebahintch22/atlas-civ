var express = require('express');
var router = express.Router();
var path = require('path');

const { Pool } = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {

  var options = {
  	root: path.join(__dirname, '../public')
  }
  res.sendFile( 'index.html', options);

});

module.exports = router;

//