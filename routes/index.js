var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  var options = {
  	root: path.join(__dirname, '../public')
  }
  res.sendFile( 'v7-index.html', options);

});

module.exports = router;