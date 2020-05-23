begin_test = function(){
    get_missing_fields = function(in_data, searchFields){
		var base_fields = Object.keys(in_data)
		console.log(base_fields)
		var missing_fields = searchFields.reduce(function( accum, fld_name ){
			if ( base_fields.indexOf(fld_name)==-1) {
				accum.push(fld_name)
				console.log("- " + fld_name + " is missing !")
			} else {
				console.log("- OK for " + fld_name)
			}
			return accum;
		}, []);

		return missing_fields;
		
	}

	data = {
	  "CODE": "D82",
	  "ADM_NAME": "ADJAME-PLATEAU-ATTECOUBE",
	  "GEOLOC": "YES",
	  "LEVEL": "DISTRICT",
	  "FLD1": "737895",
	  "FLD2": "21055",
	  "FLD3": "95983",
	  "FLD4": "252761",
	  "FLD5": "485134",
	  "FLD6": "202906",
	  "FLD7": "33899",
	  "FLD8": "28249",
	  "FLD9": "4237"
	}
}