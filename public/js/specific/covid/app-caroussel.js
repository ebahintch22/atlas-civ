//app-covid-caroussel.js

function load_covid_caroussel(elt_id){

	var slides = GET_BADGES();
	//alert("update_covid_badges")
	//console.log(slides)



	var covid_slideController = new ui_render_caroussel( elt_id , 
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


	function GET_BADGES( ){


		var d  = extract_late_datarow();
		var d1 = extract_late_datarow(1);

		return {
			"badge_01" : update_one_badge( {color_class : "badge-orange-dark", label : "Cas confirmés (Covid-19)", value : d.sum_case , delta : d.new_case , date : d.date_raw	}),
			"badge_02" : update_one_badge( {color_class : "badge-yellow-dark", 	label : "Cas actifs (Covid-19)", value : d.active_case  , delta : d.active_case - d1.active_case, date : d.date_raw }),
			"badge_03" : update_one_badge( {color_class : "badge-red-dark",	   label : "Décès (Covid-19)", value : d.sum_deceased, 	delta : d.new_deceased, date : d.date_raw  }),
			"badge_04" : update_one_badge( {color_class : "badge-green-dark",  label : "Guéris (Covid-19)", value : d.sum_healed,   delta : d.new_healed,   date : d.date_raw  }),	
			"badge_05" : update_one_badge( {color_class : "badge-white-dark",  label : "Prélèvements (Covid-19)", value : d.sum_sample, delta : d.nb_sample, date : d.date_raw })
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
