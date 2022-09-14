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


    },
    get_uuid : function( callBack){

	  db.query( "SELECT uuid_generate_v1() as uuid_key" , [], function(err, dbResult){
	  	if (err) { 
	  		callBack(err, null)
	  	} 
	  	else {
		 callBack(null, dbResult.rows[0].uuid_key );
	  	}
	  })

    },
    delete_temp_badge : function(key, callBack){
      var login = "anonymous(in garbage)";
      var status = "TO-BE-DELETE";
 	 /* db.query( "UPDATE my_visitors SET login = $1, boot_exit = $2 WHERE (uuid = $3)" , [ login, status , key], function(err, dbResult){
	  	if (err) { 
	  		callBack(err, null)
	  	} 
	  	else {
		 callBack( null, dbResult.rows);
	  	}
	  })*/

	  
 	  db.query("DELETE FROM my_visitors WHERE (uuid = $1) " , [key], function(err, dbResult){
	  	if (err) { 
	  		callBack(err, null)
	  	} 
	  	else {
		 callBack(null, dbResult.rows );
	  	}
	  })  	
    }
}