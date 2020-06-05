

function date_now(){
	return( new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') )
}

module.exports = {
    check_buffer_func : function(){
	/*
  check buffer to detect :
      - iddle session : (now - last notification time) > idletimeout
	*/
	var currentTime = date_now();

	var attendance_record  = global.OPERA.USER_BUFFER.reduce( function(accu , data){
		if  (data.req == "notify alive") {

			if ( inactive_too_long( data.when, currentTime ) ){
				data.status = "iddle";
			}

			if (data.status == "iddle") accu.iddle = accu.iddle + 1 ;
			if (data.status == "alive") accu.alive = accu.alive + 1 ;
			   accu.total = accu.total + 1 ;
		}

		return (accu);

	}, 
	{ 
		when: currentTime, 
		total:0, 
		alive : 0, 
		iddle: 0 
	});
	OPERA.ATTENDANCE_BUFFER.push(attendance_record)
  },

   app_notify : function ( data, preventDuplicate = false ){

		var prev_data
		if (!preventDuplicate){

			global.OPERA_DATA_BUS.push(data)

		} else {

			var dataIndex = global.OPERA_DATA_BUS.findIndex( 
				function(d){ return (d.uuid == data.uuid && d.req == data.req);
			});

			if (dataIndex == -1) {
				//this the fisrt notification : we must set the start-time in start_at
				//=============================================================================
				data.start_at = date_now();
				global.OPERA_DATA_BUS.push(data)

			} else {
				//subsequent notification update the time when notification occur in when property
				//==============================================================================
				prev_data = global.OPERA_DATA_BUS[dataIndex ];
				prev_data.when = data.when

			}
		}
	}
}