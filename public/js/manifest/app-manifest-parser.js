var default_table_selection = function(){return (this.name === "demographic")? 'selected = "selected"' : "";	};
var default_field_selection = function(){return (this.fld_name === "FLD1")? 'selected = "selected"' : "";	};


function get_renderer ( count, value_range, color_range, labelmap = []){
	var v = value_range
	return {
	    default : {
			      count : count,
	 		  threshold : (v.length==0)? v : get_value_range(count, value_range[0], value_range[1] ),
	 		   colormap : get_color_range(count, color_range[0], color_range[1]),
	 		value_range : array_copy(value_range),
	 		color_range : array_copy(color_range),
	 		   labelmap : array_copy(labelmap),
	 		  linecolor : "#ddd",
	 		     source : "auto"	    	
	    }
	}

	function get_color_range ( count, start = "#ffffff", end = "#000000"){
	    var color = d3.scale.linear()
	    			.domain([ 0, count ])
	                .interpolate(d3.interpolateRgb)
	                .range([d3.rgb(start), d3.rgb(end)]);
	    var A = new Array( count+1 ).fill("0");
	    var B = A.map(function( c,i ){ return (color(i)) })
	    return (B)
	}
	function get_value_range( count, start, end ){

		var N = (count==0)? 10 : count
		var step = (end - start)/N
		return d3.range(start, end, step ).map( function(d){ return(Math.round(d))})
	}
	function array_copy(arr){
		return( arr.map(function(d){return(d) }) )
	}
}


function generate_colArray( metadata , metageo){
   //Build the for the current stats table the definition column to provide to dataTable
   //console.log("generate_colArray Of app-manifest-parser")
   var data_fields = metadata.data_fields;
   var object_name = metadata.object_name
   var  column_arr  = [
        { "data": "CODE", "title" : "Code" },
        { "data": "ADM_NAME", "title": metageo.names.value }
    ]

    column_arr = data_fields.reduce( function( accu , fld){
    		
    		var col_def = {"data": fld.fld_name , "title" : fld.short_name }

    		if (fld.format_as == "number"){
    			col_def.render = function(data, type, row){
    				if (type=="display")	return (UTIL.format_number( data , false))
    				return data
    			}
    		}

            accu.push( col_def )
            return accu
    },  column_arr );
    return(column_arr)
}

function build_colormap ( count, start = "#ffffff", end = "#000000"){
    var color = d3.scale.linear()
    			.domain([ 0, count-1 ])
                .interpolate(d3.interpolateRgb)
                .range([d3.rgb(start), d3.rgb(end)]);
    var A = new Array( count ).fill("0");
    var B = A.map(function( c,i ){ return (color(i)) })
    return (B)
}



var DEFAULT_PARSER = {
		id_field : "CODE",
		name_field : "ADM_NAME",
		class_field : "LEVEL",
		classes : [
			{ ord: 1, value : "REGION", layer : "region_sante"	},
			{ ord: 2, value : "DISTRICT", layer : "district_sante" }
		 ]
	};

var COVID_PARSER = {
		id_field :  "CODE",
		name_field :  "ADM_NAME",
		class_field : "LEVEL",
		classes : [
			{ ord: 1, value : "DISTRICT", layer : "district_admin" },
			{ ord: 2, value : "REGION", layer : "region_admin"	}
		 ]
	};

var ECO_CHANGE_PARSER = {
		id_field :  "CODE",
		name_field :  "ADM_NAME",
		class_field : "LEVEL",
		classes : [
			{ ord: 1, value : "CTR", layer : "world_countries" },
			{ ord: 2, value : "CTN", layer : "world_continents"	}
		 ]
	};
