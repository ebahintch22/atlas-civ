//v7-utility.js
var UTIL = (function(){
	var _Number = new Intl.NumberFormat();
	return {
		format_number : function(nombre){
			return( _Number.format(nombre))
		},
		format_number_in_object : function(obj){
			var f_obj = {}
			for (var property in obj) {
			    if (obj.hasOwnProperty(property)) {
			        if( property.indexOf("FLD", 0)==0) {
			        	f_obj[property] = _Number.format( obj[property])
			        } else {
			        	f_obj[property] =  obj[property]
			        }
			    }
			}	
			return(f_obj)
		}
	}
})()

//UTIL.format_number()

