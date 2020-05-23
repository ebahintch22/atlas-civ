//const http_server_exe_mode = false;
var navigate = function (path) {
	  	var current = window.location.href;
	    window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
	}


var winResizeTimerID = 0;
var before_app_initialization = true
var geo_dataset_is_load = false;

// We add a listener to the browser window, calling updateLegend when the window is resized.
window.onresize //= after_window_resized ;

var initialTable = "covid-19" //  "tech_platform" ; //" "covid-19"; //demographic" ;//;"demographic"
var initialKey = "FLD1";

var currentTable;
var currentMetaTable ;
var currentKey ;
var currentMetaField ;
var currentGeoDataset;

	 
var currentDetailTemplate;

var stats_table_set
var dataById = d3.map();
var dataKeyVal ;
var mapData;

var DARKROUGE = "#550000" , 
	VERT = "#63d617", 
	JAUNE = "#ffff00",   
	ORANGE = "#ffae00" , 
	ROUGE = "#ef2710",
	DARKGREEN = "#005500"

//this is a meta template (ie: a template of template) that is processed in two steps :
//  step 1: At dataframe load to generate the details template reflecting the strcture of the thematic table
//  step 2: At User click on mapFeature to generate details informations
var tmplt_details_virtual = ` 
		{{#data_fields}}  
		    <tr>
		 	    <th style='text-align: left; color: #000; font-weight: normal;'>
		 	        <i class='fa fa-info-circle fa-2x css-tooltip'  aria-hidden='true'> 
		 	           <span class='css-tooltiptext'> {{ long_name }} </span>  
		 	        </i> {{ short_name }} 
		 	        {{#show_unit}} 	<em>({{unit}})</em>: {{/show_unit}}
				</th>
				<td  style='text-align: right; color: #1b66a7;font-weight: bold;'> 
		 	    	{{ tag_open }} {{ fld_name }} {{ tag_close }}
		 	    </td> 
		 	</tr> 	
		{{/data_fields}}
	`;

    Mustache.parse(tmplt_details_virtual);


var tmplt_rowDescription;



var width = 400, height = 400;
var dyn_width = width ,  dyn_height = height;

var svg = d3.select('#map').append('svg')
	.attr("preserveAspectRatio", "xMidYMid")
	.attr("viewBox", "0 0 " + width + " " + height)
	.attr("width", "100%")
	.attr("height", "100%");

var mapFeatures = svg.append('g').attr('class', 'features YlGnBu');
var projection = d3.geo.mercator().scale(1);
var zoom = d3.behavior.zoom().scaleExtent([1, 15])
				.on('zoom', doZoom);
	svg.call(zoom);

var tooltip = d3.select("#map")
			.append("div")
			.attr("class", "tooltip hidden");


var quantize = d3.scale.quantize().range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));			
var path = d3.geo.path()
    .projection(projection);


var formatNumber = d3.format('.2f'); // We prepare a number format which will always return 2 decimal places.
var legendX = d3.scale.linear();     // For the legend, we prepare a very simple linear scale. 
 // Domain and range will be set later as they depend on the data currently shown.





var chartController_rass
var legendController = new generate_legend( "#legend", {
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


theme_controller = ui_render_ThematicSelectList_Component_ex( metaDataBase.table_details , "#opera-theme-selector-1");
theme_controller.update_view(initialTable)
Activate_thematic_section(initialTable);	//activate the default dataframe 

before_app_initialization = false ;
set_routes();
bind_Scale_Selector()
bind_layout_reset_to_windowResize();


function bind_layout_reset_to_windowResize(){
	window.onresize = function(){

		//opera_console.addLog("Windows resized detected")

	 	if (before_app_initialization)  return;
	 	if (winResizeTimerID) { clearTimeout(winResizeTimerID);}
	 	
	 	
	 	winResizeTimerID = setTimeout( 
	 		function(){
	 			opera_console.addLog("Windows resized detected")
				updateLegend(null, true);
				//histogram.draw(get_graphic_infos());
				winResizeTimerID = 0;
	 	} ,	450)
	}
}

function Activate_thematic_section(frame_name){
	load_dataframe(frame_name, 
		function(metaData){	// Here note that the @metaData param  is the active metaDataframe section in metaDataBase
			//look_at("metaData", metaData)
			
			toogle_layout(metaData)
			layer_arr = extractLayerObjects( metaDataBase.geo_datasets, metaData.layerList, "name")
			layer_controller = ui_render_spatialLayerSelectList_component( layer_arr , "#opera-spatiallayer-selector-2" )

			key_controller = ui_render_keySelectList_component_ex(metaData , "#opera-variablekey-selector-3");	// update key selectlist control
			currentKey = "FLD1";					// get (refactoring: allow to be read from metabase section and ...
			currentMetaTable = metaData ;	

			//set the current color palette to that of the metaTable
			update_color_palette(metaData.color_palette);

			//update the property window html template to the new table columnset					
			tmplt_rowDescription = ui_updateTemplate_details({
				data_fields :  metaData.data_fields,
				tag_open : function(){return "{{"},
				tag_close: function(){return "}}"}
			});

			//create_histogram_object();
			layer_controller.update_view( metaData.layerList[0] )
			after_selectLayer_Changed( metaData.layerList[0] ); //TO DO: transform this code to more parametrizable version 

			key_controller.update_view("FLD1");//after_selectKey_Changed("FLD1");//TO DO: transform this code to more parametrizable version


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

 }

function after_selectLayer_Changed(inLayerKeY){
	
	var geo_dataset = get_spatialLayer(inLayerKeY)

	get_geoData( geo_dataset.name  , geo_dataset.path, function( error, features){

		dataById = stats_table_set[inLayerKeY];
		dataKeyVal = stats_table_set[inLayerKeY + "_raw"];
		mapData = dataKeyVal ;

		geo_dataset_is_load = true;

		currentKey = currentKey? currentKey : "FLD1"
		currentGeoDataset = geo_dataset;
		
		preload_geoDataSet(features);

		after_selectKey_Changed(currentKey);
	});
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
            .on('mousemove', showTooltip)// When the mouse moves over a feature, show the tooltip.
			.on('mouseout', hideTooltip) // When the mouse moves out of a feature, hide the tooltip.
			.on('click', showDetails);	// When a feature is clicked, show the details of it.
}

function updateMapColors(){
 	
 	var vmin , vmax , metaData = currentMetaTable, class_count, r, renderer

 	vmin = d3.min(mapData, function(d) { return (getValueOfData(d)); });
	vmax =	d3.max(mapData, function(d) { return (getValueOfData(d)); });

	r = metaData.renderer

	// le moteur de rendu "auto" doit actualiser son domaine de valeur en fonction du champ actif
	if (r.source == "auto") {

		renderer = get_renderer( r.count, [ (1 + vmin ) , vmax ] , r.color_range )

	} else {
	// le moteur de rendu "manual" doit pas atre modifié, par définition
		renderer = r
	}


	 var color_mapper = d3.scale.threshold()
		.domain( renderer.threshold )
		.range(  renderer.colormap );

	mapFeatures.selectAll('path')
		.style('fill', function(d){
		  var attr_line = dataById[getIdOfFeature(d)]; 
		  var attr_value = !attr_line ? 0: getValueOfData(attr_line) ;
		  //return quantize( attr_value );
		  return color_mapper( attr_value );
	})


	// We call the function to update the legend.
    updateLegend( renderer , true);
 }




// Function to update the legend inspired somewhat by example from on http://bl.ocks.org/mbostock/4573883
 function updateLegend( _renderer , forceUpdate = false) {
 	var renderer = (_renderer ) ? 
 				   _renderer : 
 				   currentMetaTable.renderer

 	opera_console.addLog("_renderer is equal to" + JSON.stringify(renderer))
 	opera_console.addLog("currentMetaTable.renderer is " + JSON.stringify(currentMetaTable.renderer))
 	opera_console.addLog("render for legend update is " + JSON.stringify(renderer))

    var field = currentMetaField
 	//Exit if initialization is on course
 	if (before_app_initialization && !forceUpdate)  return;

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
 	mapFeatures.attr("transform",
 	  "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
// Keep the stroke width proportional. The initial stroke width
// (0.5) must match the one set in the CSS.
	.style("stroke-width", 0.5 / d3.event.scale + "px");
}

function getIdOfFeature(f) {
	//console.log(f.properties.code);
	var  idfield = currentGeoDataset.idfield
	return f.properties[idfield];
}


/**
 * Show a tooltip with the name of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showTooltip(f) {
	var id = getIdOfFeature(f);// Get the ID of the feature.
	var d = dataById[id];// Use the ID to get the data entry.
	//console.log(dataById)
	var value = d[currentKey];
	//delay_console(d);

	var tooltips_text = `
		<span>${currentGeoDataset.names.value}</span><br>
		<span style="font-size:11px; color: #111;">
			 ${d.ADM_NAME} 
		</span><hr style="height: 1px; margin: 1px">
		<span style="font-size:14px; color: red;">
			 ${ UTIL.format_number(value)} 
		</span>
		<span>${currentMetaField.unit}
		</span>`

	var place_name = d? tooltips_text : "Région sanitaire Inconnue";
	// Get the current mouse position (as integer)
	var mouse = d3.mouse(d3.select('#map').node()).map(
	 		function(d) { return parseInt(d); }
	);

	 // Calculate  the absolute  left  and  top  offsets  of the tooltip. If the
	 // mouse is close to the right border of the map, show the tooltip on the left.
	 
	 var left =mouse[0] + 5 // Math.min(width - 4 * place_name.length, mouse[0] + 5);
	 var top = mouse[1] + 15;

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
 
function hideTooltip() {
 	tooltip.classed('hidden', true);
 	//console.log("hidding tooltips");
}

function showDetails(f) {
	 // Get the ID of the feature...
	 var id = getIdOfFeature(f);
	 // ...and use the ID to get the data entry.
	 var d = dataById[id];

	 // 
	 // The details HTML output is just the name
	 var tmplt_data = d? d :  {
		 	 ADM_NAME: "Région Sanitaire Abidjan", 
			 FLD1: "n/a", 
			 FLD2: "n/a",
			 FLD3: "n/a",
			 FLD4: "n/a",
			 FLD5: "n/a",
			 FLD6: "n/a",
			 FLD7: "n/a",
			 FLD8: "n/a",
			 FLD9: "n/a",
			 FLD10:"n/a",
			 FLD11:"n/a",
			 FLD12:"n/a"
		};

	// Render the Mustache template with the data object and put the resulting
	// sysecho("details template DATA structure", tmplt_data);

	var tmplt_data = ui_pre_render_format(tmplt_data)
	ui_render_details(tmplt_data)//  HTML output in the details container.
}


function generate_statistic_tables_ex(data , parser){
	// TODO:: To be generalized for an arbitrairement number of geographique level
	var LEVEL   = parser.class_field, 
	    CODE    = parser.id_field,

	    CLASS_1 = parser.classes[0].value,
	    CLASS_2 = parser.classes[1].value,

	    LYR_1   = parser.classes[0].layer,
	    LYR_2   = parser.classes[1].layer

	//console.log("-----------------------------> parser")
	//console.log(parser)
	var tmp_data = d3.nest().key(function(d) { return d[LEVEL]; }).rollup(function(d) { return d; }).map(data);

	table_1 = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map( tmp_data[CLASS_1] );
	table_2 = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map( tmp_data[CLASS_2] );

	var  _RSP = {}
	     _RSP[ LYR_1 ] = table_1
	     _RSP[ LYR_1 + "_raw" ] = tmp_data[CLASS_1]

	     _RSP[ LYR_2 ] = table_2
	     _RSP[ LYR_2 + "_raw"] = tmp_data[CLASS_2]

	return _RSP 
}  	



function updateGraphic(){
	var metadata = currentMetaTable
	var metafield = currentMetaField
	var metageo = currentGeoDataset

	if (metadata.layout !=  "COVID" ) { //RASS Chart Layout contain dynamic charts

		if (!chartController_rass){
			
			chartController_rass = build_RASS_chart_component( metadata , metafield, mapData, metageo)
		
		} else  {

			chartController_rass.setParams(metadata , metafield, mapData, metageo);
			chartController_rass.updateChart({
				duration: 1500,
				easing : 'linear'
			});
		}
	}
}

function handle_mapMouseover_actions(d){

	if (metadata.layout ==  "COVID" || !chartController_rass) return
	chartController_rass

}

function get_graphic_infos() {
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


/*
function after_window_resized(){
	//Exit if initialization is on course
 	if (before_app_initialization)  return;
 	opera_console.log()
 	if (winResizeTimerID) { clearTimeout(winResizeTimerID);}
 		
 	winResizeTimerID = setTimeout( 
 		function(){
			updateLegend(null, true);
			histogram.draw(get_graphic_infos());
			winResizeTimerID = 0;
 	} ,	1500)
}*/

function set_routes(){
	var routes = {
		"/action/select-palette/:color_palette" : after_colorPalette_selected,
		"/action/test-debug/:reload_chart" : histogram_draw,
		"/action/:start-server" : start_server,
		"/action/:stop-server"  : start_server,
		"/action/:connect-client" : start_server,
		"/action/app-settings": function(){}, 
		"/home" : function(){}
	}
	var router = Router(routes);
     	router.init();
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