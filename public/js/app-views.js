var include_button_input , upcoming_function // helper function variables
init_helper_functions()



function ui_render_ThematicSelectList_Component_ex( theme_data_arr , _eltID){

	var template_theme_selector = `
			 <div class="input-group-prepend">
			    <button class="btn btn-outline btn-dark dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choisir une thématique :</button>
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
  		 <div id="opera-sys-message" style= "padding: 10px; margin : 0px 20px ;position: relative; height:50vh; background-color:#151414;color:#ddd; font-size:0.8em; overflow: scroll;">  
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

	opera_console.addLog(`Vous avez cliqué sur le bouton: ${eltID} et envoyer le message ${ $(input_elt).val()}`)

	Ajaxian.read( "./buyers", 
		function(data){
			opera_console.addLog(`Suppression <b> ${JSON.stringify(data)} </b>`, "success" )
		},

		function(xhr, ajaxOptions, thrownError){
			opera_console.addLog(`Erreur lors du chargement de la table`, "fail");
		}
	)
}
var func_reset_console = function(){
	 opera_console.clearlog()
}
var func_reset_local_storage = function( that, eltID ){
	user_session_manager.reset_token();
}

var func_start_supervision = function(that, eltID){
	    var state = user_session_manager.supervisor("toggle")
	    $(`#${eltID}`).html( !state ?  `${fa_icon("play")} Démarrer superviseur` :`${fa_icon("stop")} Arrêter Superviseur`) 
}  

var fake_historic = get_random_data()
var func_start_traffic_monitoring = function( that, eltID ){
	user_session_manager.supervisor("traffic" , 
		{
			 eventtype:"new-data" , 
			 data: fake_historic, 
			 from: null, 
			 to: null 
		}
	)
}



var navtabController_RASS = new ui_render_navtabs( 
	   "#RASS-NAV-TAB-CONTAINER", {
		id : "nav-tab-01",
		default : "tab-e",	
		nav_position : "top" ,
		tabs : [
			{ 
				id: "tab-a", 
				name: "graphics" , 
				label : "Graphiques", 
				html_content : get_chart_container( "chart-canvas-rass" , 600, 250 ,'96%', '80vh') ,
				enabled : true,
				visible : true
			},
			{ 
				id: "tab-b", 
				name: "table" ,    
				label : "Vue tabulaire" , 
				html_content : ` <div id="dttable_container"  style="margin:10px; padding: 10px;">  </div>`,
				enabled : true,
				visible : true
			},
			{ 
				id: "tab-c", 
				name: "monography" , 
				label : "Monographies", 
				html_content : get_Monography_template_TODO()  ,
				enabled : true,
				visible : true
			},
			{ 
				id: "tab-d", 
				name: "about_us" , 
				label : "Qui-sommes nous?", 
				html_content : get_ourReferences_template_TODO() ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			},
			{ 
				id: "tab-e", 
				name: "sys_console" , 
				label : "Administration", 
				html_content : ` <div id="ADMIN-TAB-WRAPPER" style="background-color: #ee8; 
				                  position:relative; height: 70vh;"> </div>`,
				enabled : true,
				visible : IS_ADMIN_SESSION

			}
		]
    },
    function(info){
    	/* ACTION TO TRIGGER WHEN TABS CHANGED*/
    	
    	switch(info.tabname){
    		case "graphics" :
    			rass_active_panel = "tab-a" ;
    			break;
    		case "table" :
    			rass_active_panel = "tab-b" ;
    			break;
    		default: 
    	} 
    },

    1
)

/*var html_01 = Mustache.render( include_supevision_table(), { users:[]});
			  console.log("Template de la liste des connexions " + html_01 );

var html_02 = get_chart_container( "chart-canvas-traffic" , 600, 250 ,'90%', '35vh');
			  console.log( "Template du graphique de fréquentation : " + html_02  );*/


var navAdminController = new ui_render_navtabs(
	"#ADMIN-TAB-WRAPPER", {
	id : "admin-tabs",
	default : "admin-tab-02",
	nav_position : "top" ,
		tabs : [
			{
				id : "admin-tab-01",
				name : "connected_users",
				label : "Utilisateurs connectés",
				html_content :  Mustache.render( include_supevision_table(), { users:[]}),
				enabled : true,
				visible : true
			}, 
			{
				id : "admin-tab-02",
				name : "attendance_chart",
				label : "Historique des connexions",
				html_content : `${include_button("btn-traffic-monitoring" , "Démarrer", "func_start_traffic_monitoring" )}
								${get_chart_container( "chart-canvas-traffic" , 600, 250 ,'90%', '25vh')}` ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			},
			{ 
				id: "admin-tab-03", 
				name: "sys_audit" , 
				label : "Audit", 
				html_content : get_opera_console_template_TODO() ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			}
		]
	},
	function(info){	/* ACTION TO TRIGGER WHEN TABS CHANGED*/},
	1
)

var navtabController_COVID_UP =  new ui_render_navtabs (

		"#COVID-NAV-TAB-UP", {
		
			 id : "rstuw-1",
		default : "covid-tab-up-01",
   nav_position : "top",
		   tabs : [
			{
				id : "covid-tab-up-01",
				name : "indicators",
				label : "indicateurs de suivi",
				html_content :  `${ get_chart_container( "covid-canvas-up-1" , 650, 300 ,'95%', '35vh')}`,
				enabled : true,
				visible : true
			}, 
			{
				id : "covid-tab-up-02",
				name : "indicators_daily",
				label : "Indicateurs journaliers",
				html_content : `${ get_chart_container( "covid-canvas-up-2" , 650, 300 ,'95%', '35vh')}`,
				enabled : true,
				visible : true
			},
			{ 
				id: "covid-tab-up-03", 
				name: "confirmed_cases_sum" , 
				label : "Cumul des cas confirmés", 
				html_content : `${ get_chart_container( "covid-canvas-up-3" , 650, 300 ,'95%', '35vh')}`,
				enabled : true,
				visible : true
			}
		]
	},
		function (info){ }, 
		1
	)

var navtabController_COVID_BOTTOM =  new ui_render_navtabs (

		"#COVID-NAV-TAB-BOTTOM", {
		
		        id : "rstuow-2",
	       default : "covid-tab-bottom-01",
	  nav_position : "bottom",
       	      tabs : [
				{
					id : "covid-tab-bottom-01",
					name : "indicators",
					label : "Taux d'incidence quotidien",
					html_content :  `${get_chart_container( "covid-canvas-bottom-1" , 650, 300 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				}, 
				/*{
					id : "covid-tab-bottom-02",
					name : "indicators_daily",
					label : "Variation quotidienne des indicateurs",
					html_content : `${get_chart_container( "covid-canvas-bottom-2" , 650, 300 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				},*/
				{ 
					id: "covid-tab-bottom-03", 
					name: "confirmed_cases_sum" , 
					label : "Dépistages réalisés", 
					html_content : `${get_chart_container( "covid-canvas-bottom-3" , 650, 300 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				}
			]
		},
		function(info){}, 
		1
	)



function get_chart_container( canvas_id, width, height, x_width, x_height ){
	var template = 	`
		<div class="chart-container" style="position: relative; width: ${x_width} ; height: ${x_height}; ">
			<canvas id="${canvas_id}" width="${width}" height="${height}"> 	</canvas>
		</div>`
	return template ;
}

function get_Monography_template_TODO  (){ return fake_monography}
function get_table_container_template_TODO(){ return fake_table }
function get_ourReferences_template_TODO(){return fake_about_us }
function get_opera_console_template_TODO(){ return opera_console_tmpl }  //  Template to generate the Identifier VIEW
//function get_opera_table_template_TODO(){ return opera_table_template }



function init_helper_functions(){

	include_button_input = function(eltID , btnCaption , placeHolder, callBackFuncname){
		return(
			`
			<nav class="navbar navbar-light bg-light">
			  <form id="${eltID}" class="form-inline" onSubmit="${callBackFuncname}(this , '${eltID}')">
			    	<input class="form-control mr-sm-2" type="search" placeholder="${placeHolder}" aria-label="Search">
			    	<button class="btn btn-outline-success my-2 my-sm-0" type="submit">${btnCaption}</button>
			  </form>
			</nav>
			`
		)
	};

	include_button = function(eltID , btnCaption, callBackFuncname ){
		return(
			`
			<nav class="navbar navbar-light bg-light">
			  <form id="${eltID}" class="form-inline" onSubmit="${callBackFuncname}(this , '${eltID}')">
			    	<button class="btn btn-outline-success my-2 my-sm-0" type="submit">${btnCaption}</button>
			  </form>
			</nav>
			`
		)
	};

	include_button_group = function( button_arr  ){
		
			var TMPLT = `
				<div id="{{group_id}}" class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"  
				    style="padding: 5px 20px;">
				 	<div class="btn-group btn-group-sm mr-2" role="group" aria-label="First group">
				 	{{#button_list}}
					    <button  id="{{id}}" type="button" class="btn btn-secondary"  onClick="{{callBack}}(this, '{{id}}')"> {{{caption}}} </button>
					 {{/button_list}}
				 	</div>
				</div>
			`
			  return ( Mustache.render(TMPLT , button_arr ))
		
	};

	upcoming_function = function (dataset){
		var html = Mustache.render( 
			`<center>
		       <span style="position:relative; top: 150px; font-size: 20px; color:#999">  
		          <i class="fa {{fa_icon}} fa-5x"  style= "color:#ccc" ></i>
		          <h3> {{messageTitle}}</h3>
		          <h4> {{{messageContent}}}</h4>
		      </span>         
	    	</center> `, 
	    	dataset)
		
	    return html	
	 };

	 include_supevision_table = function(){

	 	return( `
			<div  style="padding: 10px 20px 0px 20px; position: relative; height:80vh; width:90%;background-color: #ddd"> 
				<!--div style="position: absolute; top:0px;height:10vh; width:90%;background-color: #eee;">
				</div-->

				<div style="position:relative; height:35vh; width:90%;margin-top:2vh;overflow:scroll; ">
					<table class="table table-sm">
						<thead>
						    <tr>
						      <th scope="col"> UUID  </th> 
						      <th scope="col"> Démarré à </th> 
						      <th scope="col"> Dernière notif   </th> 
						      <th scope="col"> Requête </th>
						      <th scope="col"> Réponse </th>
						      <th scope="col"> observation </th>
						    </tr>
						</thead>
						<tbody>
							{{#users}}
							    <tr>
							      	<th>  {{uuid}}   </th> 
							      	<td>  {{start_at}} </td>  
							      	<td>  {{when}} </td>  
							      	<td>  {{req}} </td>  
							      	<td>  {{res}} </td>
							      	<td>  {{comments}} </td>
							    </tr>
							{{/users}}   
						  </tbody>
					</table>
				</div>
			</div>`)
	 }



	 // Template to generate the monography //VIEW

     get_table_container  = function(){

      	return  `
      	<div id="table-view-container" style= "position: relative; height:80vh;"> 
            <div id="tableview-wrapper" class="enveloppe">
                <table class="table table-bordered display compact" id="data_table_id" width="100%" cellspacing="0" 
                        style=" white-space: nowrap ;background-color: #ccc;color:#444; width:100%;font-size: 8pt; 
                        font-family:Verdana">
                    <thead> </thead>
                    <tfoot> </tfoot>
                </table>
                <br>
            </div>
		 </div>  ` 
    }



	 fa_icon = function(ico_name){
	 	return ( ` <i class="fa fa-${ico_name}" aria-hidden="true"></i> `)
	 }
}