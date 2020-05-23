


function ui_render_ThematicSelectList_Component_ex( theme_data_arr , _eltID){

	var template_theme_selector = `
			 <div class="input-group-prepend">
			    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choisir une thématique :</button>
			    <div class="dropdown-menu">
				    {{#thematic_arr}}
						<a class="dropdown-item"  data-key="{{name}}" data-label="{{label}}"
						style="line-height:1.2em; padding: 1px 4px; font-size:0.8rem;" href="#"> {{ label }} </a>
					{{/thematic_arr}}
			    </div>
			</div>
		  <input type="text" class="form-control" aria-label="Text input with dropdown button" value="">
		 `;


	
	var data = theme_data_arr.filter(function(d){return (d.valid)});
	var componentHtml = Mustache.render( template_theme_selector , { "thematic_arr": data});
	d3.select( `${_eltID}`).html(componentHtml );
	bind_Selector()

    return {
    	update_view: function(theme){
   			var _info = $(`${_eltID}  a[data-key="${theme}"]`)[0].dataset;
    		$(`${ _eltID} > input.form-control`).val(_info.label);
    	}
    }

	function bind_Selector(){

		$( `${ _eltID }  .dropdown-item` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "key": _data.key, "label": _data.label};
					$(`${ _eltID} > input.form-control`).val(_info.label);
					Activate_thematic_section( _info.key , false)
			}

		})	
	}		
}



function ui_render_keySelectList_component_ex( theme_data_fields, _eltID ){
	var template_theme_selector = `
			 <div class="input-group-prepend">
			    <button class="btn btn-outline-secondary dropdown-toggle" type="button" 
			        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Variable à cartographier :</button>
			    <div class="dropdown-menu">
				    {{#field_arr}}
						<a class="dropdown-item"  data-key="{{fld_name}}" data-label="{{short_name}}"
						style="line-height:1.2em; padding: 1px 4px; font-size:0.8rem;" href="#"> {{ short_name }} </a>
					{{/field_arr}}
			    </div>
			</div>
		  <input type="text" class="form-control" aria-label="Text input with dropdown button" value="">
		 `;

	var data = theme_data_fields.data_fields ;
	var componentHtml = Mustache.render( template_theme_selector , { "field_arr": data});
	d3.select(`${_eltID}`).html(componentHtml );
	bind_Selector();

    return {
    	update_view: function(theme){
   			var _info = $(`${_eltID}  a[data-key="${theme}"]`)[0].dataset;
    		$(`${ _eltID} > input.form-control`).val(_info.label);
    	}
    }

	function bind_Selector(){

		$( `${ _eltID} .dropdown-item` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "key": _data.key, "label": _data.label};
					$(`${ _eltID} > input.form-control`).val(_info.label);
					after_selectKey_Changed( _info.key );
			}
		})			
	}
}


function ui_render_spatialLayerSelectList_component( layer_data_arr, _eltID ){
	var template_theme_selector = `
			 <div class="input-group-prepend">
			    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
			      aria-haspopup="true" aria-expanded="false"> Niveau géographique :</button>
			    <div class="dropdown-menu">
				    {{#layer_arr}}
						<a class="dropdown-item"  data-key="{{name}}" data-label="{{label}}"
						style="line-height:1.2em; padding: 1px 4px; font-size:0.8rem;" href="#"> {{ label }} </a>
					{{/layer_arr}}
			    </div>
			</div>
		  <input type="text" class="form-control" aria-label="Text input with dropdown button" value="">
		 `;

	var data = layer_data_arr ;
	var componentHtml = Mustache.render( template_theme_selector , { "layer_arr": data});
	d3.select(`${_eltID}`).html(componentHtml );
	bind_Selector();

    return {
    	update_view: function(theme){
   			var _info = $(`${_eltID}  a[data-key="${theme}"]`)[0].dataset;
    		$(`${ _eltID} > input.form-control`).val( _info.label );
    	}
    }

	function bind_Selector(){

		$( `${ _eltID} .dropdown-item` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "key": _data.key, "label": _data.label};
					$(`${ _eltID} > input.form-control`).val(_info.label);
					after_selectLayer_Changed( _info.key );
			}
		})			
	}
}






var fake_table = `<div id="opera-rass-table" style= "position: relative; height:80vh;"> 
  	 ${ upcoming_function({
  	 	  fa_icon :        "fa-table",
  	 	  messageTitle :   "Section des vues tabulaires",
  	 	  messageContent : "Cette section présentera sous forme de tableau interactif, <br> le jeu de données associé à la thématique active"
  	 }) }
  </div>  `  

var fake_monography = `<div id="opera-rass-monography" style= "position: relative; height:80vh;"> 
  	 ${ upcoming_function({
  	 	  fa_icon :        "fa-bar-chart",
  	 	  messageTitle :   "Génération autmatique de monographie",
  	 	  messageContent : "Cette section contiendra les monographies générées<br> à la volée sur les circonscriptions sanitaires actives"
  	 }) }
  </div> `

var fake_about_us = `<div id="opera-about-us" style= "position: relative; height:80vh;"> 
   	 ${ upcoming_function({
  	 	  fa_icon :        "fa-cogs",
  	 	  messageTitle :   "A propos du cabinet Improve",
  	 	  messageContent : "Cette section décrira l'offre de service du cabinet Improve"
  	 }) }
  
  </div>  ` ;


var opera_console_tmpl = `<div  style= "position: relative; height:80vh;"> 
 
  		 <div id="opera-sys-message" style= "padding: 10px; margin : 0px 20px ;position: relative; height:70vh; background-color:#666 ;color:#ddd; font-size:0.8em; overflow: scroll;">  
  		  	<p> Informations systèmes: </p> 
  		</div>
  </div>  ` ;



function upcoming_function(dataset){
	var html = Mustache.render( 
		`<center>
       <span style="position:relative; top: 150px; font-size: 20px; color:#999">  
          <i class="fa {{fa_icon}} fa-5x"  style= "color:#ccc" ></i>
          <h3> {{messageTitle}}</h3>
          <h4> {{{messageContent}}}</h4>
      </span>         
    </center> `, dataset)
    return html	
 }

var navtabController_RASS = ui_render_navtabs( 
	   "#RASS-NAV-TAB-CONTAINER", {
		id : "nav-tab-01",
		default : "tab-a",
		tabs : [
			{ 
				id: "tab-a", 
				name: "graphics" , 
				label : "Graphiques", 
				html_content : get_chart_container( "chart-canvas-rass" , 600, 250 ,'90%', '80vh') 
			},
			{ 
				id: "tab-b", 
				name: "table" ,    
				label : "Vue tabulaire" , 
				html_content :  get_table_container_template_TODO() 
			},
			{ 
				id: "tab-c", 
				name: "monography" , 
				label : "Monographies", 
				html_content : get_Monography_template_TODO() 
			},
			{ 
				id: "tab-d", 
				name: "about_us" , 
				label : "Qui-sommes nous?", 
				html_content : get_ourReferences_template_TODO()
			},
			{ 
				id: "tab-e", 
				name: "sys_info" , 
				label : "Historiques des requêtes", 
				html_content : get_opera_console_template_TODO()
			}
		]
    },
    function(info){
    	/* ACTION TO TRIGGER WHEN TABS CHANGED*/
    }
)




function get_chart_container( canvas_id, width, height, x_width, x_height ){
	var template = 	`
		<div class="chart-container" style="position: relative; width: ${x_width} ; height: ${x_height}; ">
			<canvas id="${canvas_id}" width="${width}" height="${height}"> 	</canvas>
		</div>`
	return template ;
}
function get_Monography_template_TODO(){ return fake_monography } // Template to generate the monography //VIEW
function get_table_container_template_TODO(){ return fake_table }
function get_ourReferences_template_TODO(){return fake_about_us }
function get_opera_console_template_TODO(){ return opera_console_tmpl }  //  Template to generate the Identifier VIEW
