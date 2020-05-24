const db = require('./index');

module.exports = {
  newKey: function (table_name, callback){
    const start = Date.now()

	  db.query("select MAX(_index) as maximum from " + table_name, [], function(err, dbResult){
	  	if (err) { 
	  		callback(err, null)
	  	} 
	  	else {
		 callback(null, dbResult.rows[0].maximum );
	  	}
	  })
    }
}