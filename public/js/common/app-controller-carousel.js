//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ui_render_caroussel ( _eltID , Cfg , callBack , delay = 1){

	/* Config structure
	   var Cfg = {
	   		id : "slide-covid-figures",
	   		default : "slide-a",
	   		slides : [
	   			{ id: "slide-1", name: "Cas confirmés" , label : "Graphiques"    ,  Html_content : "" , visible: true},
	   			{ id: "slide-2", name: "Cas actifs"    , label : "Vue tabulaire" ,  Html_content : "" , visible: true},
	   			{ id: "slide-3", name: "Décès" , 		 label : "Comentaire"    ,  Html_content : "" , visible: true},
	   			{ id: "slide-4", name: "Guéris" , 		 label : "Comentaire"    ,  Html_content : "" , visible: true}
	   		]
	   }
	*/

	var transition = (Cfg.transition == "fade")? "carousel-fade" : "";
    
    var template_carousel = `
		<div id="${Cfg.id}" class="carousel slide ${transition}" data-ride="carousel" >



			${ !Cfg.addLink? "" : `
				<ol class="carousel-indicators">
					{{#slides_arr}} 
						<li data-target="#${Cfg.id}" data-slide-to="{{index}}" class="{{active}}"> </li>
					{{/slides_arr}}
				</ol>` 
			}

			<div class="carousel-inner">
				{{#slides_arr}}
					<div class="carousel-item {{active}}" id="{{id}}">
					  	{{{Html_content}}}
					</div>
				{{/slides_arr}}		
			</div>


			${ !Cfg.addCursor? "" : `<a class="carousel-control-prev" href="#${Cfg.id}" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			
			<a class="carousel-control-next" href="#${Cfg.id}" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>` }
		</div>
	`

	//Add helper func for mustache render for Bootstrap-wise properties

		var data = Cfg
		data.slides_arr = data.slides.filter(function(d){return(d.visible)});
		data.slides_arr = data.slides_arr.map( function(d,i){
			d["active"] = (d.id == data.default)? "active" : "";
			d["selected"] = (d.id == data.default)? "true" : "false";
			d["disable"] = (d.enabled == false)? "disabled" : "";
			d["index"] = i;
			return (d)
		});

	var componentHtml = Mustache.render( template_carousel,  data );


	setTimeout(  
		function(){ d3.select(`${_eltID}`).html(componentHtml ); 
	    }, 
		delay
	)
    return {
    	componentHtml : componentHtml,
    	api_func : function(theme){},
    	show_slide : function(tab_id){
    		$(`#${tab_id}-tab`).tab('show');
    	}
    }
}