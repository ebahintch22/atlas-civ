
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



function load_COVID_DATA_IF_NEEDED( the_spinner ){

	COVID_SPINNER_ARR.push( the_spinner )

	if ( COVIDATA_STATUS != "UNLOAD") return (COVIDATA_STATUS)
	if ( COVIDATA == null) {
		COVIDATA_STATUS = "LOADING"
		fileLoad_JSON( 
			"Données épidémiologique sur le COVID-19", PATH_PREFIX + "data/covid-data.json", 
			function(data) {

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




function update_covid_badges(){

	var slides = new COVID_BADGES();
	//alert("update_covid_badges")
	console.log(slides)



	var covid_slideController = new ui_render_caroussel( "#card-1", 
			{
				id : "slide-covid-figures",
				default : "slide-0",
				addCursor : true,
				addLink : false,
		   		slides : [
		   			{ id: "slide-0", name: "Cas confirmés" , label : "Graphiques"    ,  Html_content : slides.badge_01  , visible: true , color: "blue"},
		   			{ id: "slide-1", name: "Cas actifs"    , label : "Vue tabulaire" ,  Html_content : slides.badge_02  , visible: true , color: "orange"},
		   			{ id: "slide-2", name: "Décès" , 		 label : "Comentaire"    ,  Html_content : slides.badge_03  , visible: true , color: "yellow"},
		   			{ id: "slide-3", name: "Guéris" , 		 label : "Comentaire"    ,  Html_content : slides.badge_04  , visible: true , color: "green"},
		   			{ id: "slide-3", name: "Prélèvements" ,  label : "Comentaire"    ,  Html_content : slides.badge_05  , visible: true , color: "white"}
		   		]			   
			},
			function(){}
	);

	$('#slide-covid-figures').carousel({
	  interval: 2000,
	  ride : "carousel"
	})
	$('#slide-covid-figures').carousel(1)	


	function COVID_BADGES( ){


		var d = extract_late_datarow();
		var d1 = extract_late_datarow(1);

		return {
			"badge_01" : update_one_badge( { 
						color_class : "badge-orange-dark", 
						label : "Cas confirmés (Covid-19)", 
						value : d.sum_case ,     
						delta : d.new_case , 	   
						 date : d.date_raw   
					}),
			"badge_02" : update_one_badge( {
						color_class : "badge-yellow-dark", 
						label : "Cas actifs (Covid-19)",    
						value : d.active_case  , 
						delta : d.active_case - d1.active_case,  
						 date : d.date_raw   
					}),
			"badge_03" : update_one_badge( { 
				       color_class : "badge-red-dark",	  
				       label : "Décès (Covid-19)", 		   
				       value : d.sum_deceased, 	
				       delta : d.new_deceased, 	
				        date : d.date_raw   
				   }),
			"badge_04" : update_one_badge( { 
				        color_class : "badge-green-dark",  
				        label : "Guéris (Covid-19)", 	   
				        value : d.sum_healed,    
				        delta : d.new_healed, 		
				         date : d.date_raw   
				   }),	
			"badge_05" : update_one_badge( { 
				        color_class : "badge-white-dark",  
				        label : "Prélèvements (Covid-19)", 	   
				        value : d.sum_sample,    
				        delta : d.nb_sample, 		
				         date : d.date_raw   
				   })
		 }

		function  update_one_badge( data ){
			var extended =  ( ENV_VIEW_SIZE.browser.width > 1200 )

			data["symbol"] = function(){return (((this.delta < 0) ? "" : "+" ))}
			return (Mustache.render(badge_template(extended), data));
		}	

		function badge_template( extended = true ){
			var deltas = extended ?  `
		       <span style="font-weight: 350; font-weight: 500; font-size: 0.6em; padding-bottom: 0.3em;
		     				line-height: 1;"> 
		         ( {{symbol}}{{delta}},  <span style="font-weight: 650;  font-size: 0.8em; ">au {{date}} </span> )  
		       </span>` : "";

			var badge_template = `
			<div class="card text-center  {{color_class}}"  style="position:relative; height:60px;">
			    <div class="card-body" style="padding: 0.5em;">
				     <span style="display: block; font-weight: 500 ;font-size: 0.9em; 
				     		padding-bottom: 0.3em; line-height: 1;"> 
				     		{{label}} 
				     </span>
				     <span style="display: block; font-weight: 750;  font-size: 1.5em; padding-bottom: 0.3em; line-height: 1;"> 
			               {{value}} ${deltas}
				 	</span>
			  </div>
			</div>`;
			return(badge_template)
		}
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
		   			{ id: "slide-0", name: "Cas confirmés" , label : "Graphiques"    ,  Html_content : slides.badge_01  , visible: true , color: "blue"},
		   			{ id: "slide-1", name: "Cas actifs"    , label : "Vue tabulaire" ,  Html_content : slides.badge_02  , visible: true , color: "orange"},
		   			{ id: "slide-2", name: "Décès" , 		 label : "Comentaire"    ,  Html_content : slides.badge_03  , visible: true , color: "yellow"},
		   			{ id: "slide-3", name: "Guéris" , 		 label : "Comentaire"    ,  Html_content : slides.badge_04  , visible: true , color: "green"},
		   			{ id: "slide-5", name: "Prélèvements" ,  label : "Comentaire"    ,  Html_content : slides.badge_05  , visible: true , color: "green"}
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
			"badge_01" : _render_cool(`Atlas Santé CI ? ...`),
			"badge_02" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...les données du RASS passées au moule de la DATAVIZ... </span>`),
			"badge_03" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...une contribution à la valorisation des statistiques sanitaires...  </span>`),
			"badge_04" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...un contenu appelé à évoluer regulièrement...</span>`),
			"badge_05" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...vers une version mobile pour une ubiquité d'accès </div>` )	
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
 	"alive": 52,
 	"iddle": 17
 }, {
 	"alive": 53,
 	"iddle": 17
 }, {
 	"alive": 71,
 	"iddle": 13
 }, {
 	"alive": 88,
 	"iddle": 12
 }, {
 	"alive": 138,
 	"iddle": 11
 }, {
 	"alive": 171,
 	"iddle": 11
 }, {
 	"alive": 208,
 	"iddle": 10
 }, {
 	"alive": 258,
 	"iddle": 10
 }, {
 	"alive": 305,
 	"iddle": 10
 }, {
 	"alive": 344,
 	"iddle": 9
 }, {
 	"alive": 370,
 	"iddle": 9
 }, {
 	"alive": 382,
 	"iddle": 9
 }, {
 	"alive": 385,
 	"iddle": 9
 }, {
 	"alive": 385,
 	"iddle": 9
 }, {
 	"alive": 381,
 	"iddle": 9
 }, {
 	"alive": 374,
 	"iddle": 9
 }, {
 	"alive": 363,
 	"iddle": 10
 }, {
 	"alive": 352,
 	"iddle": 10
 }, {
 	"alive": 343,
 	"iddle": 10
 }, {
 	"alive": 335,
 	"iddle": 10
 }, {
 	"alive": 329,
 	"iddle": 10
 }, {
 	"alive": 323,
 	"iddle": 10
 }, {
 	"alive": 320,
 	"iddle": 10
 }, {
 	"alive": 318,
 	"iddle": 10
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 318,
 	"iddle": 11
 }, {
 	"alive": 322,
 	"iddle": 11
 }, {
 	"alive": 332,
 	"iddle": 11
 }, {
 	"alive": 338,
 	"iddle": 11
 }, {
 	"alive": 345,
 	"iddle": 11
 }, {
 	"alive": 347,
 	"iddle": 11
 }, {
 	"alive": 347,
 	"iddle": 11
 }, {
 	"alive": 345,
 	"iddle": 11
 }, {
 	"alive": 337,
 	"iddle": 11
 }, {
 	"alive": 326,
 	"iddle": 11
 }, {
 	"alive": 317,
 	"iddle": 11
 }, {
 	"alive": 308,
 	"iddle": 11
 }, {
 	"alive": 299,
 	"iddle": 12
 }, {
 	"alive": 297,
 	"iddle": 12
 }, {
 	"alive": 296,
 	"iddle": 12
 }, {
 	"alive": 296,
 	"iddle": 12
 }, {
 	"alive": 298,
 	"iddle": 12
 }, {
 	"alive": 300,
 	"iddle": 12
 }, {
 	"alive": 303,
 	"iddle": 12
 }, {
 	"alive": 305,
 	"iddle": 12
 }, {
 	"alive": 308,
 	"iddle": 12
 }, {
 	"alive": 308,
 	"iddle": 12
 }, {
 	"alive": 308,
 	"iddle": 12
 }, {
 	"alive": 306,
 	"iddle": 12
 }, {
 	"alive": 304,
 	"iddle": 12
 }, {
 	"alive": 300,
 	"iddle": 12
 }, {
 	"alive": 298,
 	"iddle": 12
 }, {
 	"alive": 297,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 297,
 	"iddle": 13
 }, {
 	"alive": 300,
 	"iddle": 13
 }, {
 	"alive": 302,
 	"iddle": 13
 }, {
 	"alive": 303,
 	"iddle": 13
 }, {
 	"alive": 304,
 	"iddle": 13
 }, {
 	"alive": 304,
 	"iddle": 13
 }, {
 	"alive": 303,
 	"iddle": 13
 }, {
 	"alive": 299,
 	"iddle": 13
 }, {
 	"alive": 293,
 	"iddle": 14
 }, {
 	"alive": 284,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 272,
 	"iddle": 14
 }, {
 	"alive": 270,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 271,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 280,
 	"iddle": 14
 }, {
 	"alive": 281,
 	"iddle": 14
 }, {
 	"alive": 281,
 	"iddle": 14
 }, {
 	"alive": 279,
 	"iddle": 14
 }, {
 	"alive": 278,
 	"iddle": 14
 }, {
 	"alive": 277,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 273,
 	"iddle": 16
 }, {
 	"alive": 272,
 	"iddle": 16
 }, {
 	"alive": 271,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 17
 }, {
 	"alive": 169,
 	"iddle": 13
 }, {
 	"alive": 171,
 	"iddle": 13
 }, {
 	"alive": 173,
 	"iddle": 14
 }, {
 	"alive": 176,
 	"iddle": 14
 }]
		 )
}