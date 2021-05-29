

function app_start_up(){

	if ( APP_START_UNIT_TEST_MODE ){
		notify_application_readiness()
		start_unit_test()
		return null
	}
	//UTIL.go_fullScreen("#app-container");
	//Préparer les elements  HTML devant contenir les caroussel en entête
	include_badge_container( APP_REGISTRY.ui_badge );

	if (APP_REGISTRY.modules.module_def["COVID"]) {

		EXE_IF_COVID_DATA_LOAD(null, function (raw_data){
			console.log( JSON.stringify(raw_data));

			var data = raw_data.map( function(d){ 
					d["date_raw"] =  moment(d["ref_date"] ).format('L')
					return (d)
			 })

			create_navTabControllers_COVID(data);
			build_COVID_chart_component_3_0(  data );
			load_covid_caroussel("#card-1")
		})
	} 

	//Création des elements d'interface
	create_navTabController_RASS();
	create_navTabController_ADMIN();
	load_standard_caroussel("#card-2")

	create_FABMenu_controller( "#fab-menu-container", APP_REGISTRY.modules.ui_FabMenu)
	drawerMenuController = create_drawerMenu_controller( "#drawer-menu-container", APP_REGISTRY.modules.ui_drawerMenu)


	opera_console.addLog( toJSON(user_agent ) );



	var zoom = d3.behavior.zoom().scaleExtent([1, 15])
				.on('zoom', doZoom);
				svg.call(zoom);


	mapBackground.on("click", function(){ MAP_overlay_draw([]) })

	opera_console.addLog("Démarrage d'Atlas Santé Côte d'Ivoire.." , "success")

	legendController = new generate_legend( "#legend", {
			"title"  : "Legend Controller....",
			"width"  : 400,
			"domain"  : [ 1,  4,  15, 100, 800] ,
			"tickSize": 15,
			"offset"  : {	"x": 15,  "y": 23 } ,
			"cell" : { 	"height": 12, "width" : 45} ,
			"colorscale" : [ DARKROUGE, ROUGE, ORANGE, JAUNE, VERT, DARKGREEN ] ,
			"custom_label" : [ "Poor" , "labour", "Middle class", "High class" , "Rich", "billionnaire" ] 
		}
	)

	metaDataBase.orderby_num("index");
	theme_controller = ui_render_dropdown_inputgroup("#opera-theme-selector-1", {
		      "prompt": "Choisir un thème",
		    "options" : metaDataBase.table_details.filter(function(d){ return(d.valid)}),
		        "key" : "name",
		      "label" : "label",
		"class_field" : "group",
	      "transform" : { key: "name", label : "label"	},
	         "filter" : function(d){return (d.valid)}
	}, function(_info){
		if ( navtabController_RASS != undefined ){
			navtabController_RASS.show_tab( "tab-aa");
		}
		Activate_thematic_section( _info.key , false)
		
	})

	theme_controller_drawer = ui_render_drawer_listgroup("#opera-theme-selector-drawer", {
		      "prompt": "Choisir un thème",
		    "options" : metaDataBase.table_details.filter(function(d){ return(d.valid)}),
		        "key" : "name",
		      "label" : "label",
		"class_field" : "group",
	      "transform" : { key: "name", label : "label"	},
	         "filter" : function(d){return (d.valid)}
	}, function(_info){

		if ( navtabController_RASS != undefined ){
			navtabController_RASS.show_tab( "tab-aa");
		}
		
		drawerMenuController.toggle_menu();

		setTimeout( function(){
			Activate_thematic_section( _info.key , false)
		} , 400 )
		UTIL.go_fullScreen("body");


	})



	//theme_controller = ui_render_ThematicSelectList_Component_ex( metaDataBase.table_details , "#opera-theme-selector-1");

	theme_controller.update_view(initialTable)
	Activate_thematic_section(initialTable);	//activate the default dataframe 

	set_routes();
	bind_Scale_Selector()
	bind_layout_reset_to_windowResize();
    
}


function app_start_aborted(){
   //todo lancer une UI indiquant l'echec du chargement
}


function bind_layout_reset_to_windowResize(){

	window.onresize = function(){

	 	if (before_app_initialization)  return;
	 	if (winResizeTimerID) { clearTimeout(winResizeTimerID);}
	 	
	 	winResizeTimerID = setTimeout( 
	 		function(){

	 			ENV_VIEW_SIZE = getEnvSize()
				updateLegend(null, true);
				//updateSizeCard()
				winResizeTimerID = 0;
	 	} ,	450)
	}
}

function after_user_accept_UX_degradation(){
	navigate("home");
	$("#id-address-to-mobile-users").addClass("hidden");
}



function notify_application_readiness(){

		before_app_initialization = false; 
		setTimeout( function(){

			if ( ACCEPT_MOBILE || ( isMobileDevice() == false && force_mobile() == false )){
				// alert("notify_application_readiness")
				 remove_start_up_curtain();
			} else {
			
				remove_start_up_curtain();
				show_address_to_mobile_users();
			}
		}, 1000 )
	
}

function create_or_update_key_selectList( data ){

	if (keyController == undefined ){

		keyController  = ui_render_dropdown_inputgroup("#opera-variablekey-selector-3", {
			     "prompt" : "Variable à cartographier",
		   	    "options" : data,
			        "key" : "fld_name",
			      "label" : "long_name",
		      "transform" : { key: "fld_name", label : "long_name"	},
		         "filter" : null
		}, 
		function after_key_selected(_info){
			after_selectKey_Changed(_info.key )
		})

	} else {
		keyController.refresh_options( data)

	}



	if (keyController_drawer == undefined ){

		keyController_drawer  = ui_render_drawer_listgroup("#opera-variablekey-selector-in-drawer", {
			     "prompt" : "Variable à cartographier",
		   	    "options" : data,
			        "key" : "fld_name",
			      "label" : "long_name",
		      "transform" : { key: "fld_name", label : "long_name"	},
		         "filter" : null
		}, 
		function after_key_selected(_info){
			
			drawerMenuController.toggle_menu() ;

			setTimeout( function(){
				after_selectKey_Changed(_info.key );
			} , 400 )

		})

	} else {
		keyController_drawer.refresh_options( data)
	}



}

function create_or_update_spatialLayer_selectList( data ){

	if (spatialLayerController == undefined ){

		spatialLayerController  = ui_render_dropdown_inputgroup( "#opera-spatiallayer-selector-2", {
			     "prompt" : "Niveau spatial",
		   	    "options" : data,
			        "key" : "name",
			      "label" : "label",
		      "transform" : { key: "name", label : "label"	},
		         "filter" : null
		}, 
		function after_key_selected(_info){
			after_selectLayer_Changed( _info.key )
		})

	} else {
		spatialLayerController.refresh_options( data)
	}



	if (spatialLayerController_drawer == undefined ){

		spatialLayerController_drawer  = ui_render_drawer_listgroup( "#opera-spatiallayer-drawer", {
			     "prompt" : "Niveau spatial",
		   	    "options" : data,
			        "key" : "name",
			      "label" : "label",
		      "transform" : { key: "name", label : "label"	},
		         "filter" : null
		}, 
		function after_key_selected(_info){
			drawerMenuController.toggle_menu();

			setTimeout( function(){
				after_selectLayer_Changed( _info.key );
			} , 400 )
			
		})

	} else {
		spatialLayerController_drawer.refresh_options( data)
	}


}





function Activate_thematic_section(frame_name){
	if (chartController_rass != undefined) chartController_rass.show_spinner(true);
	show_map_spinner( true);	

	load_dataframe(frame_name, 

		function(metaData){	
		    // Here note that the @metaData param  is the active metaDataframe section in metaDataBase
			// look_at("metaData", metaData)
			
			toogle_layout(metaData)
         
			layer_arr = extractLayerObjects( metaDataBase.geo_datasets, metaData.layerList, "name");
			//console.log(layer_arr)
			create_or_update_spatialLayer_selectList( layer_arr )
			//layer_controller = ui_render_spatialLayerSelectList_component( layer_arr , "#opera-spatiallayer-selector-2" );


			create_or_update_key_selectList( metaData.data_fields )	
			keyController.update_view("FLD1");

			currentKey = "FLD1";	// get (refactoring: allow to be read from metabase section and ...
			currentMetaTable = metaData ;	
		
			update_color_palette(metaData.color_palette); //set the current color palette to that of the metaTable
			

			//update the property window html template to the new table columnset					
			tmplt_rowDescription = ui_updateTemplate_details({
				data_fields :  metaData.data_fields,
				tag_open : function(){return "{{"},
				tag_close: function(){return "}}"}
			});

			//create_histogram_object();
			spatialLayerController.update_view( metaData.layerList[0] );
			after_selectLayer_Changed( metaData.layerList[0] ); 
			//console.log( metaData )

			if ( before_app_initialization ) 	notify_application_readiness()

			//update_dataTableView(metaData, currentMetaGeo)


		}, 

		function(errorDesc){
			alert(errorDesc);
		}
	)
}

function toogle_layout(metadata){

	if (metadata.layout == "COVID"){
		d3.select("#COVID-pane").classed( "hidden" , false)
		d3.select("#RASS-pane").classed( "hidden" , true)

	} else {
		d3.select("#COVID-pane").classed( "hidden" , true )
		d3.select("#RASS-pane").classed( "hidden" , false)

	}
}

 function after_selectKey_Changed(inKEY){

 	 currentKey = inKEY;
 	 currentMetaField = currentMetaTable.data_fields.find( function(f){ return (f.fld_name === inKEY) });
 	 updateMapColors();
 	 updateGraphic();
 	 if (currentMetaTable.layout != "COVID"){
 	    navtabController_RASS.show_tab(rass_active_panel)
 	 }
 }

function after_selectLayer_Changed( inLayerKeY ){
	
	var geo_dataset = get_spatialLayer(inLayerKeY)

	show_map_spinner(true);
	//Check if geodataset is available in the GeoCAche
	var features_Cached = geoCache_find(geo_dataset.name)
	currentMetaGeo = geo_dataset;

	get_geoData( geo_dataset.name  , geo_dataset.path, function( error, features){
		
		if (error) {
			alert(`Erreur lors du chargement de la couche : " ${geo_dataset.path}" ${error} `)
			return null
		}

		dataById = stats_table_set[inLayerKeY];
		dataKeyVal = stats_table_set[inLayerKeY + "_raw"];
		mapData = dataKeyVal ;

		geo_dataset_is_load = true;

		currentKey = currentKey? currentKey : "FLD1"
		
		
		update_dataTableView(currentMetaTable , currentMetaGeo, true);
		preload_geoDataSet(features);

		after_selectKey_Changed(currentKey , currentMetaGeo );
	}, features_Cached);
}

function get_statsData( name, path, callBack){
	http_server_exe_mode = true;
	if (http_server_exe_mode) { // server http (local ou distant) actif
		d3.csv( path, function(data) {
			callBack(data);
		});
	} else { // Pas de server actif
		var data = find_statsdata_from_memory(name);
		//sysecho("DATA #" + name + " from get_statsData", data);
			callBack(data);
	}
}
function geoCache_find(dataset_name){
	if ( GEO_CACHE.geoJsonDataSets[dataset_name]) {
		var features = GEO_CACHE.geoJsonDataSets[dataset_name]
		return (features);
	} else {
		return null
	}
}
function geoCache_save(dataset_name, features){
	features = GEO_CACHE.geoJsonDataSets[dataset_name] = features
}

function get_geoData(name, path, callBack, featCached = null ){


	if ( featCached) {
		callBack( null, featCached);
	}

	else if (http_server_exe_mode) { // server http (local ou distant) actif
		
		d3.json(path, function( error, features){
			if (error) {
				
				callBack(error, null)

			} else {

				callBack( null, features);
				geoCache_save( name, features )
			}
			
		});
		
	} else {
		var features = find_geodata_from_memory(name);
			callBack(null, features);
	}
}


function after_thematic_section_Changed(frame_name){
 	//alert("user asked dataFrame " + frame_name)
 	Activate_thematic_section(frame_name)
}

function after_colorPalette_selected(palette_name){
	//this fonction must exit if app not initialized yet
	if (before_app_initialization) return;

	currentMetaTable.color_palette = palette_name;
	update_color_palette(palette_name);
	navigate("home");

}
function create_histogram_object(){
	histogram = new BarChart();
	histogram.initChart();

}

/*Vérifie l'existence dans l'objet "data" des propriétés figurant dans
"propertyList". Retourne un array des propriétés manquantes (ie propriété de 
"chl_fld_arr" manquante dans "data")
*/
function  get_missing_fields (in_data, searchFields){
	var base_fields = Object.keys(in_data)
	var missing_fields = searchFields.reduce(function( accum, fld_name ){
		if ( base_fields.indexOf(fld_name)==-1) {
			accum.push(fld_name)
		} 
		return accum;
	}, []);

	return missing_fields;
		
}

function load_dataframe(frame_name, callBack,  errCallBack){
	

	var newframe = metaDataBase.table_details.find(function(frame){ return frame.name === frame_name});
    //currentMetaTable = (!newframe)? currentMetaTable : newframe;
    //look_at("newframe", newframe)
    if (!newframe) { 
    	errCallBack( "invalid dataframe " + frame_name + " encoutered. Check metaDataBase"); 
    	return null;
    }

    //Two case may exist :
    // 1- load from file and 
    // 2- read from memory
    //sysecho("(load_dataframe)newframe", newframe);

    get_statsData( newframe.name, newframe.path, function(data) {
    	//sysecho("DATA from get_statsData", data);
    	var meta = newframe;
    	var parser = meta.data_parser,
    	    defaultlayer  = meta.layerList[0];

    	//console.log("-------------------------------------newframe")
    	//console.log(newframe)

		stats_table_set = generate_statistic_tables_ex (data , parser);
		dataById = stats_table_set[defaultlayer];
		dataKeyVal = stats_table_set[defaultlayer + "_raw"];
		var geo_dataset = get_spatialLayer(newframe.layerList[0])
		mapData = dataKeyVal ;

        callBack( newframe )
    });


    function get_statsData( name, path, callBack){
    	http_server_exe_mode = true;
    	if (http_server_exe_mode) { // server http (local ou distant) actif
    		d3.csv( path, function(data) {
    			callBack(data);
    		});
    	} else { // Pas de server actif
    		var data = find_statsdata_from_memory(name);
    		//sysecho("DATA #" + name + " from get_statsData", data);
    		callBack(data);
    	}
    }

    function get_geoData(name, path, callBack){
    	if (http_server_exe_mode) { // server http (local ou distant) actif
			d3.json(path, function( error, features){
				callBack(error, features);
    		});
    	} else {
    		var features = find_geodata_from_memory(name);
    			callBack(null, features);
    	}
    }
}

function geo_data_load_needed( cur_layer, new_layer ){
	if (cur_layer == null) return true;
	return (cur_layer.id != new_layer.id)
}

function extractLayerObjects( Layers , layer_names, field ){
	return( Layers.reduce( function(accu, layer){
		if (layer_names.indexOf( layer.name ) != -1 ){
			accu.push(layer)
		}
		return accu;
	}, []))
}
function get_spatialLayer( lyr_name ){
	return ( metaDataBase.geo_datasets.find(function(lyr){
		return(lyr.name == lyr_name)
	}) )
}

function preload_geoDataSet(features){
	projection = d3.geo.mercator().scale(1);			
	path = d3.geo.path()
	    .projection(projection);

	currentGeodataset = features

	var scaleCenter = calculateScaleCenter(features);
	projection.scale(scaleCenter.scale)
		.center(scaleCenter.center)
		.translate([width/2, height/2]);


	mapFeatures.selectAll('path')
	   .remove()	
		
	mapFeatures.selectAll('path')
			.data(features.features)
		.enter().append('path')
			.attr('class', "ogis-nocolor")
			.attr('d', path)
            .on( 'mousemove'   , showTooltip )// When the mouse moves over a feature, show the tooltip.
			.on( 'mouseout'    , hideTooltip ) // When the mouse moves out of a feature, hide the tooltip.
			.on( 'click'       , after_feature_clicked );	// When a feature is clicked, show the details of it.
}

function after_feature_clicked(f){
	MAP_overlay_draw([f])
	clicked(f)
}

function MAP_find_feature( feat_code  ){
	var f = currentGeodataset.features.find( function(d){
		return( d.properties[currentMetaGeo.idfield] == feat_code )
	});
	return (f)
}

function MAP_zoom_on_feature(feat_code , action_code){
	/*
		action_code :
		  1 : xxxxxxxxxxxxxx
		  0 : xxxxxxxxxxxxxx
	*/
	var f  = MAP_find_feature(feat_code)
	if (f){
		after_feature_clicked(f)
	} 
}

function MAP_overlay_draw( feature_arr ){

	var overlayClass = `selected selected-${currentSelectStyle}`;

	mapFeaturesOverlay.selectAll('path')
	   .remove();

    mapFeaturesOverlay.selectAll('path')
        .data( feature_arr )
        .enter().append('path')
        	//.attr('class', 'selected-feature-centered')
        	.attr('pointer-events', 'none')
        	.attr('d' , function(d) {return path(d)})
        	.attr('class' ,  overlayClass	)
}


function show_map_spinner( isVisible) {
	var useless = (isVisible) ? 	
	     $("#map-spinner").removeClass("hidden") : 
	     $("#map-spinner").addClass("hidden") ;			
}

function updateMapColors(){
 	
 	var vmin , vmax , metaData = currentMetaTable, class_count, r, renderer

 	vmin = d3.min(mapData, function(d) { return (getValueOfData(d)); });
	vmax =	d3.max(mapData, function(d) { return (getValueOfData(d)); });

	//If Exists, we get the field renderer, otherwise we use the metatable renderer
	r = _get_relevant_renderer()
	

	// le moteur de rendu "auto" doit actualiser son domaine de valeur en fonction du champ actif
	// il est forcement le moteur par defaut car la classification étant établie automatiquement
	// il est valable pour toutes les niveaux d'échelle
	if (r.source == "auto") {

		renderer = get_renderer( r.count, [ (1 + vmin ) , vmax ] , r.color_range )["default"]
		metaData.renderer_interpolated = renderer;

	} else {
	// Par principe, le moteur de rendu "manual" doit pas être modifié;
		renderer = r
		metaData.renderer_interpolated = r;
	}

	var color_mapper = d3.scale.threshold()
		.domain( renderer.threshold )
		.range(  renderer.colormap );

	var line_color = renderer.linecolor || "#444";
	currentSelectStyle = renderer.select_style || "redish"

	mapFeatures.selectAll('path')
		.style( "stroke-width", 0.5 )
		.style( "stroke", line_color)
		.style('fill', function(d){
		  var attr_line = dataById[getIdOfFeature(d)]; 
		  var attr_value = !attr_line ? 0: getValueOfData(attr_line) ;
		  	return color_mapper( attr_value );
	    })


	// We call the function to update the legend.
    updateLegend( renderer , true);
    show_map_spinner(false);

    function _get_relevant_renderer(){
    	var rndr_mtable, r
		var rndr_fld = currentMetaField.renderer
		var rnd_key

		if (rndr_fld === undefined) {

			rndr_mtable = currentMetaTable.renderer
			rnd_key = select_render_key(rndr_mtable)  

			r = rndr_mtable[rnd_key];		
			r.legendtitle = currentMetaField.short_name ;

		} else {

			if ( rndr_fld == "default" ) {

				rndr_mtable = currentMetaTable.renderer
				rnd_key = select_render_key(rndr_mtable) 

				r = rndr_mtable[ rnd_key ]
				r.legendtitle = currentMetaField.short_name

			} else {
				//We use a field level renderer : we check if render depend on Spatial_layer
				rnd_key = select_render_key(rndr_fld)  
		        r = rndr_fld[rnd_key]
			}
		} 

			return (r);    	
	    }

	    function select_render_key( in_rndr){
	    	return ( (in_rndr[ currentMetaGeo.name] === undefined)? "default" : currentMetaGeo.name )
	    }
 }

//Si le Layout est approprié, la mise à jour du tableau de données est enclenchée
function update_dataTableView( metadata , metageo, geoLyrChanged = false ){
	var _generateCol_HTML_TAG = false
	if ( metadata.layout !=  "COVID" ) {
		//Generate IF NOT EXISTS the datatable column definition for the metadata
		metadata.dt = metadata.dt || {}

		//console.log(metageo)

		if (geoLyrChanged) metadata.dt.colArray = generate_colArray(metadata , metageo) //generate new columns when layer changed

		metadata.dt.colArray = metadata.dt.colArray || generate_colArray(metadata , metageo)	

		//Build the dataTableController if needed
		dataTableController = dataTableController || 
		new ui_render_dataTable( "#dttable_container", 
			{
				id : "dttable_object",
				colMapArray : metadata.dt.colArray,
				height : "30vh"
			}, 
			mapData,
			after_row_selected,
			after_row_unselected,
			_generateCol_HTML_TAG
		)

		if (  dataTableController.reloadNeeded(geoLyrChanged)  ){
			//console.log(metadata.dt.colArray)
			dataTableController.reloadData( metadata.dt.colArray , mapData )
		}
	}
   //--------------------------------------------------------------
	function after_row_selected(row){
		var feature_code = row["CODE"];
		MAP_zoom_on_feature(  feature_code, 0  )
	};

	function after_row_unselected(row){
		var feature_code = row["CODE"];
		MAP_zoom_on_feature(  feature_code , -1  )
	}
}



function clicked(d) {

	  opera_console.addLog( " Objet paramètre d'exécution de la function dans clicked : " + JSON.stringify(d))
	  var x, y, k;
	  var g = mapFeatures;
	  var g0 = mapFeaturesOverlay;

	  if (d && centered !== d) {
		    var centroid = path.centroid(d),  x = centroid[0]; y = centroid[1];  k = 4;
		    centered = d;
		    g0.selectAll("path").attr("class", "selected-feature-centered")

	  } else {
		    x = width / 2;
		    y = height / 2;
		    k = 1;
		    centered = null;
		    g0.selectAll("path").attr("class", "selected-feature")
	  }

	  g.selectAll("path")
	      .classed("active", centered && function(d) { return d === centered; });


	  g.transition()
	      .duration(750)
	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
	      .style("stroke-width", 0.5 / k + "px");
  
  	  g0.transition()
	      .duration(750)
	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
	      .style("stroke-width", 0.25 / k + "px");
}




// Function to update the legend inspired somewhat by example from on http://bl.ocks.org/mbostock/4573883
 function updateLegend( _renderer , forceUpdate = false) {
 	var renderer = (_renderer ) ? 
 				   _renderer : 
 				   currentMetaTable.renderer_interpolated

 	opera_console.addLog("_renderer is equal to" + JSON.stringify(renderer))
 	opera_console.addLog("currentMetaTable.renderer is " + JSON.stringify(currentMetaTable.renderer))
 	opera_console.addLog("render for legend update is " + JSON.stringify(renderer))

    var field = currentMetaField
 	//Exit if initialization is on course
 	if (before_app_initialization && !forceUpdate)  return;

 	//Capture legend container size (WIDTH)
 	if ( renderer == undefined ) {
 		alert( "INVALID Renderer Encountered!! Mesure must be taken" )
 	}

	var legendWidth = d3.select('#map').node().getBoundingClientRect().width - 30;
	var title = renderer.legendtitle ? renderer.legendtitle : field.short_name

	//opera_console.log("Legend Width : " + legendWidth )
	legendController.set_prop(        "title" ,  title );
	legendController.set_prop(        "width" ,  legendWidth );
	legendController.set_prop(       "domain" ,  renderer.threshold );
	legendController.set_prop(   "colorscale" ,  renderer.colormap );
	legendController.set_prop( "custom_label" ,  renderer.labelmap );

	legendController.refresh();
 }




 function update_color_palette(palette_name){
 	//mapFeatures.attr('class', 'features ' + palette_name);
    //g.attr("class", "legend-key " + palette_name);
 }

function calculateScaleCenter(features) {
 // Get the bounding box of the paths (in pixels!) and calculate a
 // scale factor based on the size of the bounding box and the map size.
	 var bbox_path = path.bounds(features),
	 scale = 0.95 / Math.max(
		(bbox_path[1][0] - bbox_path[0][0]) / width,
		(bbox_path[1][1] - bbox_path[0][1]) / height
	 );

// Get the bounding box of the features (in map units!) and use it
// to calculate the center of the features.
	 var bbox_feature = d3.geo.bounds(features),
	 center = [
		 (bbox_feature[1][0] + bbox_feature[0][0]) / 2,
		 (bbox_feature[1][1] + bbox_feature[0][1]) / 2];
	 return {
		 'scale': scale,
		 'center': center
	 };
 }

function getValueOfData(d) {
	//console.log(d);
	return +d[currentKey];
}  	 			


function doZoom() {
	if (ZOOM_IS_DISABLE) return
 	mapFeatures.attr("transform",
 	  "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
		// Keep the stroke width proportional. The initial stroke width
		// (0.5) must match the one set in the CSS.
	.style("stroke-width", 0.5 / d3.event.scale + "px");
	//opera_console.addLog(  "ZOOM PARAMS : translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")"  )
}

function getIdOfFeature(f) {
	//console.log(f.properties.code);
	var  idfield = currentMetaGeo.idfield
	return f.properties[idfield];
}

function getNameOfFeature(f) {
	//console.log(f.properties.code);
	var  namefield = currentMetaGeo.labelField
	return f.properties[namefield];
}

/**
 * Show a tooltip with the name of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showTooltip(f) {
	var _show_featureSetName = metaDataBase.MODULE_SPECIFIC ? metaDataBase.MODULE_SPECIFIC.tooltips.show_featureset_name : true;

	var id = getIdOfFeature(f);// Get the ID of the feature.
	var name = getNameOfFeature(f);// Get the Label/name of the feature.

	var d = dataById[id];// Use the ID to get the data entry.
	
	var feat_data_value = d? 
				UTIL.format_number(d[currentKey], false) : 
				"Pas de données";
				
	var feat_name = d? d.ADM_NAME : getNameOfFeature(f);

	//delay_console(d);

	/*var tooltips_text = `
		${ _show_featureSetName ? `<span>${currentMetaGeo.names.value}</span><br>` : ``}
		
		<span style="font-size:11px; color: #111;">
			 ${d.ADM_NAME} 
		</span><hr style="height: 1px; margin: 1px">
		<span style="font-size:14px; color: red;">
			 ${ UTIL.format_number(value)} 
		</span>
		<span>${currentMetaField.unit}
		</span>`*/

	var tooltips_text = `
		${ _show_featureSetName ? `<span> ${currentMetaGeo.names.value}</span><br>` : ``}
		
		<span style="font-size:11px; color: #111;">
			 ${ feat_name} 
		</span><hr style="height: 1px; margin: 1px">
		<span style="font-family: consolas ;font-size:14px; color: red;">
			 ${feat_data_value} 
		</span>
		<span>${ d? currentMetaField.unit : `` } </span> `;



	var place_name = d? tooltips_text : tooltips_text ; //"Région sanitaire Inconnue";
	// Get the current mouse position (as integer)
	var mouse = d3.mouse(d3.select('#map').node()).map(
	 		function(d) { return parseInt(d); }
	);

	 // Calculate  the absolute  left  and  top  offsets  of the tooltip. If the
	 // mouse is close to the right border of the map, show the tooltip on the left.
	 var left =mouse[0] + 5 // Math.min(width - 4 * place_name.length, mouse[0] + 5);
	 var top = mouse[1] + 15;

      //capture_random( left, top)


	 // Show the tooltip (unhide it) and set the name of the data entry.
	 // Set the position as calculated before.
	 tooltip.classed('hidden', false)
	 .attr("style", "left:" + left + "px; top:" + top + "px")
	 .html('<center>' + place_name + '</center>');


	 function delay_console(obj){
	 	if (App.tooltip_delay_on) return;
	 	    	handle_mapMouseover_actions(d)
	 	   App.tooltip_delay_on = true ;

	 	   setTimeout(function(){ App.tooltip_delay_on = false }, App.tooltip_delay)
	 }



 }

 function capture_random(n,m){
 	if (test_capture_serie.length > 500) return
 	test_capture_serie.push({ alive: n, iddle: Math.round(0.05*m)})
 	if (test_capture_serie.length == 500) opera_console.addLog( "SERIE PSEUDO ALEATOIRE =>> " + JSON.stringify(test_capture_serie))
 }
 
function hideTooltip() {
 	tooltip.classed('hidden', true);
 	//console.log("hidding tooltips");
}

function showDetails(f) {
	 // Get the ID of the feature...
	 var id = getIdOfFeature(f);
	 // ...and use the ID to get the data entry.
	 var d = dataById[id];

	var tmplt_data = ui_pre_render_format(tmplt_data)
	ui_render_details(tmplt_data)//  HTML output in the details container.
}


function generate_statistic_tables_ex(data , parser){
	// TODO:: To be generalized for an arbitrairement number of geographique level
	// So far we do support  only 2 levels; code maybe broken if the number of level grow
	// as expected with Atlas REEA.


	var LEVEL   = parser.class_field, 
	    CODE    = parser.id_field,

	    CLASS_1 = parser.classes[0].value,
	    CLASS_2 = parser.classes[1].value,

	    LYR_1   = parser.classes[0].layer,
	    LYR_2   = parser.classes[1].layer

	//console.log("-----------------------------> parser")
	//console.log(parser)

	var tmp_data = d3.nest().key(function(d) { return d[LEVEL]; }).rollup(function(d) { return d; }).map(data);

	//console.log(tmp_data)

	table_1 = d3.nest().key(function(d) { return d[CODE]; }).rollup(function(d) { return d[0]; }).map( tmp_data[ CLASS_1 ] );
	table_2 = d3.nest().key(function(d) { return d[CODE]; }).rollup(function(d) { return d[0]; }).map( tmp_data[ CLASS_2 ] );

	//console.log(table_1)
	//console.log(table_2)

	var  _RSP = {}
	     _RSP[ LYR_1 ] = table_1
	     _RSP[ LYR_1 + "_raw" ] = tmp_data[CLASS_1]

	     _RSP[ LYR_2 ] = table_2
	     _RSP[ LYR_2 + "_raw"] = tmp_data[CLASS_2]

	return _RSP 
}  	



function updateGraphic(){

	var metadata  = currentMetaTable ;
	var metafield = currentMetaField ;
	var metageo   = currentMetaGeo   ;

	if (metadata.layout !=  "COVID" ) { //RASS Chart Layout contain dynamic charts
		console.log(JSON.stringify({
			metafield, 
			metadata, 
			mapData, 
			metageo
		}))
		if (!chartController_rass){

			chartController_rass = Build_Atlas_Chart_Component_3_0( 
				metadata , metafield, mapData, metageo, 
				function( data , indexes){
					/* format of indexes parameter object is :
						{
							"@datasetIndex": item._datasetIndex,
						    "@index": item._index
						}
					*/
					var index = indexes["@index"];
					var feat_code = data.raw[index]["CODE"];

					var f = MAP_find_feature(feat_code)
					MAP_overlay_draw([f])
				},
				CharDataLimit
			)
			chartController_rass.show_spinner(false);

			/*
			chartController_rass = build_RASS_chart_component( 
				metadata , metafield, mapData, metageo, 
				function( data , indexes){
					// format of indexes parameter object is :
					//	{
					//		"@datasetIndex": item._datasetIndex,
					//	    "@index": item._index
					//	}
					//
					var index = indexes["@index"];
					var feat_code = data.raw[index]["CODE"];

					var f = MAP_find_feature(feat_code)
					MAP_overlay_draw([f])
				},
				CharDataLimit
			)
			chartController_rass.show_spinner(false);*/
		
		} else  {
			chartController_rass.show_spinner(false)
			chartController_rass.setParams(metadata , metafield, mapData, metageo, CharDataLimit);
			chartController_rass.updateChart({
				duration: 1500,
				easing : 'linear'
			});
		}
	}
}

function handle_mapMouseover_actions(d){

	if (  metadata.layout ==  "COVID" || !chartController_rass ) return
	chartController_rass

}

function get_graphic_infos() { /*DEPRECATED*/
    return {
        x: currentKey,
        y: "ADM_NAME",
        title: currentMetaTable.label,
        subtitle:  currentMetaField.short_name,
        y_unit: "District",
        x_unit: currentMetaField.short_name,
        deco_infos_1: "Ce graphique dépeint la " + currentMetaField.long_name + " par district en 2017",
        deco_infos_2: currentMetaTable.article + currentMetaTable.unit,
        deco_infos_3: currentMetaTable.article + currentMetaTable.unit,
        deco_source: " Généré par Atlas Santé - Source de données " + currentMetaTable.source
    }
}


function ui_updateTemplate_details(data){
	var tmpltHtml = Mustache.render(tmplt_details_virtual, data);

    Mustache.parse(tmpltHtml);
    return tmpltHtml;
}

function ui_render_details(tmplt_data){
	// note the two-steps rendering here:
	// the first rendering gives the html code to be injected as data property in the second render data
	// the property is then used to resolve the {{html_table_rows}} tag in the hard_detail_templeate

	//step 1 :
	var html_rows_content = Mustache.render(tmplt_rowDescription, tmplt_data);
	// step 2:
	
	var data_details = {};
	data_details.ADM_NAME = tmplt_data.ADM_NAME ;
	data_details.HTML_TABLE_ROWS = html_rows_content;
    //sysecho("data_detail", data_details);

	var detailsHtml = Mustache.render(tmplt_details_hard, data_details);

    sysecho("detailsHtml", detailsHtml);


	d3.select('#details').html(detailsHtml);
	 // Hide the initial container.

	d3.select('#initial').classed("hidden", true);	
	d3.select('#sysinfos').classed("hidden", true);	
	d3.select('#details').classed("hidden", false);
	dyn_width  = svg.style("width");
	dyn_height = svg.style("height");
}

function ui_render_ThematicSelectList_Component(data){
	//sysecho("data for Table select template", data);

	var componentHtml = Mustache.render(tmplt_table_select, data);
	d3.select("#table_selector-wrapper").html(componentHtml);
	d3.select('#select-table').on('change', function(a) {
		// Change to the current option triggers call to the function load metaTable.
		 var tmpTable = d3.select(this).property('value');
		 after_thematic_section_Changed(tmpTable);
	});		
}

function ui_render_colorPaletteSelect(data){
	var componentHtml = Mustache.render( tmplt_palette_select  , data);
	d3.select('#palette_selector-wrapper').html(componentHtml);
}

function ui_render_keySelectList_component(data){
	//console.log("data for select template", data);
	var componentHtml = Mustache.render(tmplt_key_select, data);
	d3.select('#var_selector-wrapper').html(componentHtml);

	d3.select('#select-key').on('change', function(a) { 	// Change to the current key triggers call
		var tmpKey = d3.select(this).property('value');    // to the function to update the colors.
		after_selectKey_Changed(tmpKey)
	 });
	//console.log("Html rendererd for select key :", componentHtml);
}

function ui_render_sysinfos(){
	var data = {
 		table : currentMetaTable,
 		field:  currentMetaField
 	 }
	var componentHtml = Mustache.render(tmplt_sysinfos, data);
	// d3.select('#sysinfos').html(componentHtml);
	 d3.select('#message-box').html(componentHtml);
}




function ui_pre_render_format(obj){
	return ( UTIL.format_number_in_object(obj) )
	//console.log(obj)
}

/********************************
 * Hide the details <div> container and show the initial content instead.
 */
 function showSysInfos(){
  	d3.select('#details').classed("hidden", true);
	d3.select('#initial').classed("hidden", true);	

	d3.select('#sysinfos').classed("hidden", false);	
	
 }
 function hideSysInfos(){
 	d3.select('#details').classed("hidden", true);
	d3.select('#initial').classed("hidden", false);	
	d3.select('#sysinfos').classed("hidden", true);	
 }
 function hideDetails() {
	d3.select('#details').classed("hidden", true);
	d3.select('#initial').classed("hidden", false);
	d3.select('#sysinfos').classed("hidden", true);	
 }


 function showSettings(){
	d3.select('#bttn-setting').classed("hidden", true);
	d3.select('#setting-wrapper').classed("hidden", false);
	d3.select('#barchart-wrapper').classed("hidden", true);		
 }
 function hideSettings(){
	d3.select('#bttn-setting').classed("hidden", false);
	d3.select('#setting-wrapper').classed("hidden", true);
	d3.select('#barchart-wrapper').classed("hidden", false);	
 }

 function in_geojsonfile(d){	
 	return (d.GEOLOC == 'YES');
 }



function start_server(command){

	$.ajax({
        url: `/socket/${command}`,
        method: 'GET',
        data : {
            time: 1,
            user: 5
        },
        success: function(data){
            //console.log(data) // Correctly logs data to console
        		d3.json(data, function(dataSet){
            		//console.log(dataSet) // Null with error 404
        		})   
        },
        error: function(error_data){

        //console.log(error_data.responseText)
        $("#socket-report").html(error_data.responseText)
 }
})}

function histogram_draw(){
	//console.log("Histogram reload asked");
	histogram.draw();
	navigate("home");
}


function look_at(varName, varValue ){
	alert (varName + ":" + varValue)
}

function sysecho(the_title, the_value){
	return
	if (typeof  the_value === "object" ){
			the_value = JSON.stringify(the_value);
	} 
	//console.log (the_title + ":" + the_value);
}


function bind_Scale_Selector(){

	$("#scale-selector .dropdown-item").on({

		"click": function(evt){
			var _elt = $(this),  
				_data = evt.currentTarget.dataset,
				_info = { "key": _data.key, "label": _data.label};
				$("#current_admin_level").val(_info.label);
				do_action(_info.key);
		}
	})	
	function do_action(){

	}
}