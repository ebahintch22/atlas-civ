var include_button_input , upcoming_function // helper function variables


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
  	 	  messageTitle :   "Monographies",
  	 	  messageContent : "Bientot disponible, cette section contiendra les monographies générées <br> à la volée sur les circonscriptions sanitaires sélectionnées"
  	 }) }
  </div> `

var fake_about_us = `<div id="opera-about-us" style= "position: relative; height:80vh;"> 
   	 ${ upcoming_function({
  	 	  fa_icon :        "fa-cogs",
  	 	  messageTitle :   "A propos du cabinet Improve",
  	 	  messageContent : "Cette section décrira l'offre de service du cabinet Improve"
  	 }) }
  
  </div>  ` ;


var opera_console_tmpl = `
	<div  style= "position: relative; height:80vh;"> 
		${ include_button_group({
			group_id : "console_button",
			button_list : [
				{ id: "cmd_reset_console", caption : "Reset console"  ,       callBack : "func_reset_console" },
				{ id: "cmd_reset_storage", caption : "Reset Local Storage"  , callBack : "func_reset_local_storage" },
				{ id: "cmd_supervisor",    caption : `${fa_icon("play")} Démarrer superviseur`  , callBack : "func_start_supervision"  , caption_alt: `${fa_icon("stop")} Arrêter Superviseur` }
			]
		  })
		}
  		 <div id="opera-sys-message" style= "padding: 10px; margin : 0px 20px ;position: relative; height:70vh; background-color:#151414;color:#ddd; font-size:0.8em; overflow: scroll;">  
  		  	<p> Informations systèmes: </p> 
  		</div>

  </div>  ` ;

	var user = { 
		uuid: "8888-8898-8521-9652-9689-3265", 
		start_at: "25/05/2020", 
		when: "26/05/2020", 
		req:  "notification", 
		res:  "fail", 
		comments: "hehehe"
	};

	var connList = Array(50).fill(0).map(function(d){
		return user;
	});



var submit_function = function( that, eltID ){

	var input_elt = `#${eltID} input`

	PUB_SUB.publish("opera.logs", 
		[
			{message : `Vous avez cliqué sur le bouton: ${eltID} et envoyer le message ${ $(input_elt).val()}` , type: "info" }
		]
	)

	Ajaxian.read( "./buyers", 
		function(data){
				PUB_SUB.publish("opera.logs", 
					[
						{message : `Suppression <b> ${JSON.stringify(data)} </b>` , type: "success" }
					]
				)
		},

		function(xhr, ajaxOptions, thrownError){
				PUB_SUB.publish("opera.logs", 
					[
						{message : `Erreur lors du chargement de la table` , type: "fail" }
					]
				)
		}
	)
}
var func_reset_console = function(){
	 opera_console.clearlog()				
	 PUB_SUB.publish("opera.logs", 
			[
				{message : `xxxxx` , type: "iiiii" }
			]
		)

}
var func_reset_local_storage = function( that, eltID ){
		user_session_manager.reset_token();
}

var func_start_supervision = function(that, eltID){
	    var state = user_session_manager.supervisor("toggle")
	    $(`#${eltID}`).html( !state ?  `${fa_icon("play")} Démarrer superviseur` :`${fa_icon("stop")} Arrêter Superviseur`) 
}  


var func_start_traffic_monitoring = function( that, eltID ){
	user_session_manager.supervisor("traffic" , 
		{
			 eventtype:"new-data" , 
			 data: get_random_data(), 
			 from: null, 
			 to: null 
		}
	)
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
}

//alert ( "IS_ADMIN_SESSION = " + IS_ADMIN_SESSION)
var color_data = {
	colors : object_to_array(chartColors)
}

var navtabController_RASS 
var navAdminController 
var navtabController_COVID_UP
var navtabController_COVID_BOTTOM


function create_navTabController_RASS(){

	navtabController_RASS = new ui_render_navtabs( 
		   "#RASS-NAV-TAB-CONTAINER", {
			id : "nav-tab-01",
			default : "tab-aa",	
			nav_position : "top" ,  
			color_theme  : "light",
			tabs : [
				{ 
					id: "tab-a", 
					name: "table-graphics" , 
					label : "Vue graphique", 
					html_content : `
						<div id="wrapper-pane" class="col-sm-12 no-padding" style= "height:75vh; overflow-y: scroll;" >
						  	<div  id="RASS-ROW-TOP" class="row" style= "padding: 0px 15px;">
						  		<div class="col-sm-12 no-padding"  >
									 ${get_chart_container( "chart-canvas-rass" , 600, 250 ,'96%', '55vh', true)}	
						  		</div>
						  	</div>
						  	<div  id="RASS-ROW-BOTTOM" class="row"  style= "padding: 0px 15px;">
							  	<div  class="col-sm-12 no-padding"  >
									 <div id="@dttable_container"  style="margin:10px; padding: 10px;">  </div>		
						  		</div>		  		
						  	</div>
						</div>` ,
					enabled : true,
					visible : true
				},
				{ 
					id: "tab-b", 
					name: "table" ,    
					label : "Vue tabulaire" , 
					html_content : `<div id="dttable_container"  style="height: 70vh; margin:10px; padding: 10px;">  </div>`,
					enabled : true,
					visible : true
				},
				{ 
					id: "tab-f", 
					name: "dev_testing" , 
					label : "Developpement", 
					html_content : get_chart_container_augmented( "@chart-canvas-rass-test" , 600, 250 ,'96%', '35vh'),
					enabled : false,
					visible : false
				}
			]
	    },
	    function(info){
	    	// ACTION TO TRIGGER WHEN TABS CHANGED
	    	
	    	switch(info.tabname){

	    		case "table-graphics" : 
	    			rass_active_panel = "tab-a" ; break;

	    		case "graphics" :
	    			break;

	    		case "table" :
	    			rass_active_panel = "tab-b" ;
	    			// Align datatable columns ::
	    			setTimeout( function(){ dataTableController.adjustColumns() }, 500 )
	    			break;

	    		default: 
	    	} 
	    },

		function on_navtabs_load(){
			// Init data load
		}
	)
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

function get_Monography_template_TODO(){ return fake_monography}
function get_table_container_template_TODO(){ return fake_table }
function get_ourReferences_template_TODO(){return fake_about_us }
function get_opera_console_template_TODO(){ return opera_console_tmpl }  //  Template to generate the Identifier VIEW
//function get_opera_table_template_TODO(){ return opera_table_template }


