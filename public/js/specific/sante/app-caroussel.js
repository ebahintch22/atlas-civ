


function load_standard_caroussel(elt_id){

	var slides = new ATLAS_BADGES();

	var covid_slideController = new ui_render_caroussel( elt_id , 
			{
				id : "slide-atlas-infos",
				default : "slide-0",
				addCursor : true,
				addLink : false,
				transition : "fade",
		   		slides : [
		   			{ id: "slide-0", name: "slide #1" , label : "Graphiques"    ,  Html_content : slides.badge_01  , visible: true , color: "blue"},
		   			{ id: "slide-1", name: "slide #2" , label : "Vue tabulaire" ,  Html_content : slides.badge_02  , visible: true , color: "orange"},
		   			{ id: "slide-2", name: "slide #3" , label : "Comentaire"    ,  Html_content : slides.badge_03  , visible: true , color: "yellow"},
		   			{ id: "slide-3", name: "slide #4" , label : "Comentaire"    ,  Html_content : slides.badge_04  , visible: true , color: "green"},
		   			{ id: "slide-5", name: "slide #5" , label : "Comentaire"    ,  Html_content : slides.badge_05  , visible: true , color: "green"}
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
			"badge_02" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> les données du RASS passées au moule de la DataViz... </span>`),
			"badge_03" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> une contribution à la valorisation des statistiques sanitaires...  </span>`),
			"badge_04" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> un contenu appelé à évoluer regulièrement...</span>`),
			"badge_05" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> vers une version mobile pour une ubiquité d'accès </div>` )	
		 }

		function _render_cool(html){
		 	var template =  `
				<div class="card text-center align-middle  badge-white-dark "  style="position:relative; height:60px;">
				    <div class="card-body"  style="padding: 0.1em;">
					     <span  style="display: inline-block; position: relative;height:100%;font-weight: 500 ;font-size: 0.9em; 
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
