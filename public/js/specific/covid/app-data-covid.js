function load_COVID_DATA_IF_NEEDED( the_spinner){
	
	var load_function_abstraction = ( COVIDATA_ACCESS_MODE == "file")? fileLoad_JSON : fileLoad_PGSQL
	var COVID_PATH_Or_URL = ( COVIDATA_ACCESS_MODE == "file")? PATH_PREFIX + "data/covid-data.json" : "covid/get_records"


	COVID_SPINNER_ARR.push( the_spinner )

	if ( COVIDATA_STATUS != "UNLOAD") return (COVIDATA_STATUS)
	if ( COVIDATA == null) {
		COVIDATA_STATUS = "LOADING"
		load_function_abstraction( 
			"Données épidémiologique sur le COVID-19", 
			COVID_PATH_Or_URL , 
			function( data) {

				COVIDATA = data;
				update_covid_badges();
				build_COVID_chart_component(  data );
				COVIDATA_STATUS = "LOAD-ENDED";

				COVID_SPINNER_ARR.forEach( function (spin){
					spin.remove()
				}) ;
				Spinners.removeDetached();
		    }, 
		    function(error){
				alert("erreur " + error)
			}
		);			
	}		
}

function EXE_IF_COVID_DATA_LOAD( the_spinner , exe_func_def ){
	
	var load_function_abstraction = ( COVIDATA_ACCESS_MODE == "file")? fileLoad_JSON : fileLoad_PGSQL
	var COVID_PATH_Or_URL = ( COVIDATA_ACCESS_MODE == "file")? PATH_PREFIX + "data/covid-data.json" : "covid/get_records"


	if ( the_spinner ) COVID_SPINNER_ARR.push( the_spinner );

	if ( COVIDATA_STATUS != "UNLOAD") return (COVIDATA_STATUS)
	if ( COVIDATA == null) {
		COVIDATA_STATUS = "LOADING"
		load_function_abstraction( 
			"Données épidémiologique sur le COVID-19", 
			COVID_PATH_Or_URL , 
			function( data) {

				COVIDATA = data;
				exe_func_def(data)

				COVIDATA_STATUS = "LOAD-ENDED";

				COVID_SPINNER_ARR.forEach( function (spin){
					spin.remove()
				}) ;
				Spinners.removeDetached();
		    }, 

		    function(error){
				alert("erreur " + error)
			}
		);			
	}		
}
/*
function load_COVID_DATA_IF_NEEDED( the_spinner){
	
	var load_function_abstraction = ( COVIDATA_ACCESS_MODE == "file")? fileLoad_JSON : fileLoad_PGSQL
	var COVID_PATH_Or_URL = ( COVIDATA_ACCESS_MODE == "file")? PATH_PREFIX + "data/covid-data.json" : "covid/get_records"


	COVID_SPINNER_ARR.push( the_spinner )

	if ( COVIDATA_STATUS != "UNLOAD") return (COVIDATA_STATUS)
	if ( COVIDATA == null) {
		COVIDATA_STATUS = "LOADING"
		load_function_abstraction( 
			"Données épidémiologique sur le COVID-19", 
			COVID_PATH_Or_URL , 
			function( data) {

				COVIDATA = data;
				update_covid_badges();
				display_atlas_infos_slide();
				build_COVID_chart_component(  data );
				COVIDATA_STATUS = "LOAD-ENDED";

				COVID_SPINNER_ARR.forEach( function (spin){
					spin.remove()
				}) ;
				Spinners.removeDetached();
		    }, 
		    function(error){
				alert("erreur " + error)
			}
		);			
	}		
}*/
function extract_late_datarow(index=0){
	var n = COVIDATA.length
	return COVIDATA[n-1-index];
}


function fileLoad_PGSQL( name, URL, callBack){

    Ajaxian.read( 
        URL, 
        function(data){

            data.sort(function(a, b) {
                return a.ref_date - b.ref_date;
            });   

            data.forEach(function(d) {
                    var tmp_date =  Date.parse(d.ref_date);

                    d.date_raw = DATE_FORMATTER.short(d.ref_date);
                        d.date = d.ref_date;
                    d.new_case = +d.new_case;
                  d.new_healed = +d.new_healed;
                d.new_deceased = +d.new_deceased;
                    d.sum_case = +d.sum_case;
                  d.sum_healed = +d.sum_healed;
                d.sum_deceased = +d.sum_deceased;
                 d.active_case = + d.sum_case - d.sum_healed - d.sum_deceased;
                   d.nb_sample = +d.nb_sample;
                  d.sum_sample = +d.sum_sample;
                   d.incidence = +d.incidence_rate * 100;
                   d.remission = +d.remission_rate * 100;
                    d.letalite = +d.letality_rate * 100;
                
            });

            callBack(data)
        },

        function( xhr, ajaxOptions, thrownError ){

        }
    )
}


function fileLoad_JSON( name, path, callBack){
    d3.json( path , function(error, data) {

        data.sort(function(a, b) {
            return parseTime(a.date) - parseTime(b.date);
        });                 
        data.forEach(function(d) {

                d.date_raw = d.date;
                    d.date = parseTime(d.date);
                d.new_case = +d.new_case;
              d.new_healed = +d.new_healed;
            d.new_deceased = +d.new_deceased;
                d.sum_case = +d.sum_case;
              d.sum_healed = +d.sum_healed;
            d.sum_deceased = +d.sum_deceased;
             d.active_case = + d.sum_case - d.sum_healed - d.sum_deceased;
               d.nb_sample = +d.nb_sample;
              d.sum_sample = +d.sum_sample;
               d.incidence = +d.incidence * 100;
               d.remission = +d.remission * 100;
                d.letalite = +d.letalite * 100;
            
        });

        callBack(data);
        return data;          
    })
}