	
var winResizeTimerID = 0;
var behave_as_mobile_device_on_start_up = false;
var before_app_initialization = true;
var COVIDATA;
// We add a listener to the browser window, calling updateLegend when the window is resized.
//window.onresize = after_window_resized ;
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function force_mobile(){
	return (behave_as_mobile_device_on_start_up == true)
}
var badge_template = `<div class="card text-center {{color_class}}">
	    <div class="card-body" style="padding: 0.5em;">
	     <span style="display: block; font-weight: 500 ;font-size: 0.9em; 
	     padding-bottom: 0.3em; line-height: 1;"> {{label}} </span>
	     <span style="display: block; 
	           font-weight: 750; 
	           font-size: 1.5em; 
	           padding-bottom: 0.3em;
	           line-height: 1;"> {{value}}
	             <span style="font-weight: 350; 
	             font-weight: 500; 
	             font-size: 0.6em; 
	             padding-bottom: 0.3em;
	             line-height: 1;"> ( {{symbol}}{{delta}})
	      </span>
	 	</span>
	  </div>
	</div>`



	function update_badges(){

		var d = extract_late_datarow();

	
		update_badge( "#card-1" , {	color_class : "badge-orange", label : "Cas confirmés", 	value : d.sum_case , 		delta : d.new_case    } );
		update_badge( "#card-2" , {	color_class : "badge-yellow", label : "Cas actifs", 	value : d.active_case , 	delta : d.new_case } );
		update_badge( "#card-3" , {	color_class : "badge-red",	  label : "Décès", 			value : d.sum_deceased, 	delta : d.new_deceased } );
		update_badge( "#card-4" , {	color_class : "badge-green",  label : "Guéris", 		value : d.sum_healed, 		delta : d.new_healed   } );	
		
		function  update_badge( eltId, data ){
			data["symbol"] = function(){return (((this.delta < 0) ? "" : "+" ))}
			$( eltId ).html( Mustache.render(badge_template, data));
		}			
	}



	function extract_late_datarow(){
		var n = COVIDATA.length
		return COVIDATA[n-1];
	}

	function USER_INTERFACE_update_layout(){  

		opera_console.addLog("Windows resized");
	}


	var color_helper = Chart.helpers.color

	fileLoad_JSON( 
		"Données épidémiologique sur le COVID-19", "./data/covid-data.json", 
		function(data) {
			COVIDATA = data;
			update_badges()
			build_COVID_chart_component(  data );
			//build_RASS_chart_component(  data );
			before_app_initialization = false;
	    }, 
	    function(error){
			alert("erreur " + error)
		}
	);	

function notify_initialization_abort(){
	$("#start-up-failure-msgbox").html(  `Désolé, cette version d'Atlas Santé Côte d'Ivoire est destinée aux terminaux Desktop!`)
	$("#spinner").html( ``)
	$("#spinner-message").html( ``)
}