
var server = require('./server');
var client = require('./client');

var express = require('express');
var router = express.Router();

/* START SERVER */
router.get('/start-server', function(req, res, next) {

  server.listen(61337, "localhost", function () {
    console.log("Server Socket on 61337 : Listening");
  });
  res.json({msg: "respond with a resource"})
});

/* STOP SERVER */
router.get('/stop-server', function(req, res, next) {

	  server.close(function () {
	    console.log("Server Socket has been closed");
	  });
	  res.send('Socket Closed');
});


/* CONNECT CLIENT */
router.get('/connect-client', function(req, res, next) {

	client.connect(61337, "localhost", function () {
	    console.log("Client: Connected to server");
	});

	res.send('Connection opened on Server');
});

module.exports = router;
