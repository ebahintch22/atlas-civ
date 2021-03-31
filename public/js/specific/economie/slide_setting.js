//slide_setting.js


var random_data = get_data()
var my_scale = d3.time.scale().domain([Date.now(), Date.now() + 1000*60*30 ]).range([ 0,random_data.length] )

function get_random_data(){

	return ( random_data.map(function( d,i){	
		d.id = i;
		d.when = my_scale.invert(i);
		d.alive = Math.round( d.alive *0.065);
		d.iddle = Math.round( d.iddle *0.3);
		d.total = d.alive + d.iddle ; 
		return (d);
		})	
	)
}




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
}





function display_atlas_infos_slide(){

	var slides = new ATLAS_BADGES();

	var covid_slideController = new ui_render_caroussel( "#card-2", 
			{
				id : "slide-atlas-infos",
				default : "slide-0",
				addCursor : true,
				addLink : false,
				transition : "fade",
		   		slides : [
		   			{ id: "slide-0", name: "Cas confirmés" , label : "slide-1"    ,  Html_content : slides.badge_01  , visible: true , color: "blue"},
		   			{ id: "slide-1", name: "Cas actifs"    , label : "slide-2" 	  ,  Html_content : slides.badge_02  , visible: true , color: "orange"},
		   			{ id: "slide-2", name: "Décès" , 		 label : "slide-3"    ,  Html_content : slides.badge_03  , visible: true , color: "yellow"},
		   			{ id: "slide-3", name: "Guéris" , 		 label : "slide-4"    ,  Html_content : slides.badge_04  , visible: true , color: "green"}
		   		]			   
			},
			function(){}
	);

	$('#slide-atlas-infos').carousel({
	  interval: 2000,
	  ride : "carousel"
	})	


	function ATLAS_BADGES( ){
		return {
			"badge_01" : _render_cool(`<span> Atlas Eco CI, </span> <br> <span> pourquoi? </span>`),
			"badge_02" : _render_cool(`<span> Atlas Eco CI, </span> <br> <span> les données financières passées au moule de la DataViz... </span>`),
			"badge_03" : _render_cool(`<span> Atlas Eco CI, </span> <br> <span> une contribution à la valorisation des statistiques financières...  </span>`),
			"badge_04" : _render_cool(`<span> Atlas Eco CI, </span> <br> <span> un contenu et des fonctionnalités adaptables à vos besoins...</span>`)
		 }

		function _render_cool(html){
		 	var template =  `
				<div class="card text-center align-middle  badge-white-dark "  style="position:relative; height:60px;">
				    <div class="card-body"  style="padding: 0.1em;">
					     <span  style="display: inline-block; position: relative;height:100%;font-weight: 500 ;font-size: 1.2em; 
					     		padding-bottom: 0.3em; line-height: 1;"> 
					     		${html}
					     </span>
					     <span style="display: block; font-weight: 750;  font-size: 1.5em; padding-bottom: 0.3em; line-height: 1;"> 
				              
					 	</span>
				  </div>
				</div>
			`;
			return (template);
		}
	}	
}

function extract_late_datarow(index=0){
	var n = COVIDATA.length
	return COVIDATA[n-1-index];
}




function get_data(){
	return (
	 [{
	 	"alive": 52,"iddle": 17
	 }, {
	 	"alive": 270,"iddle": 16
	 }, {
	 	"alive": 270,"iddle": 16
	 }, {
	 	"alive": 270,"iddle": 16
	 }, {
	 	"alive": 270,"iddle": 17
	 }, {
	 	"alive": 169,"iddle": 13
	 }, {
	 	"alive": 171,"iddle": 13
	 }, {
	 	"alive": 173,"iddle": 14
	 }, {
	 	"alive": 176,"iddle": 14
	 }]
	)
}