//const http_server_exe_mode = false;
var navigate = function (path) {
	  	var current = window.location.href;
	    window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
	}


var winResizeTimerID = 0;
var before_app_initialization = true
var geo_dataset_is_load = false;

// We add a listener to the browser window, calling updateLegend when the window is resized.
window.onresize = after_window_resized ;

var initialTable = "demographic";
var initialKey = "FLD1"

var currentTable;
var currentMetaTable ;
var currentKey ;
var currentMetaField ;


	 
var currentDetailTemplate;

var dataById = d3.map();
var dataKeyVal ;
var quantize = d3.scale.quantize().range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));
var mapData;

//this is a meta template (ie: a template of template) is processes in two steps :
//  step 1: At dataframe load to generate the details template
//  step 2: At User click on mapFeature to generate details informations
var tmplt_details_virtual = " \
{{#data_fields}}  \
    <tr>\
 	    <th>\
 	        <i class='fa fa-info-circle fa-2x css-tooltip'  aria-hidden='true'> \
 	           <span class='css-tooltiptext'> {{ long_name }} </span>  \
 	        </i> {{ short_name }} :\
		</th>\
		<td> \
 	    	{{ tag_open }} {{ fld_name }} {{ tag_close }}\
 	    </td> \
 	</tr> 	\
{{/data_fields}}";

    Mustache.parse(tmplt_details_virtual);


var tmplt_rowDescription;
var tmplt_details_hard = d3.select('#template-details').html();  
    Mustache.parse(tmplt_details_hard);

var tmplt_key_select = d3.select('#template-key_selector').html();
    Mustache.parse(tmplt_key_select);

var tmplt_table_select = d3.select('#template-table_selector').html();
    Mustache.parse(tmplt_table_select);

var tmplt_palette_select = d3.select('#template-palette_selector').html();
    Mustache.parse(tmplt_table_select);

var tmplt_sysinfos = d3.select('#template-sysinfos_pane').html();
    Mustache.parse(tmplt_table_select);


var width = 500, height = 500;
var dyn_width = width ,  dyn_height = height;

var svg = d3.select('#map').append('svg')
	.attr("preserveAspectRatio", "xMidYMid")
	.attr("viewBox", "0 0 " + width + " " + height);

var mapFeatures = svg.append('g').attr('class', 'features YlGnBu');
var projection = d3.geo.mercator().scale(1);

var zoom = d3.behavior.zoom()
				.scaleExtent([1, 15])
				.on('zoom', doZoom);
	svg.call(zoom);

var tooltip = d3.select("#map")
				.append("div")
				.attr("class", "tooltip hidden");

var path = d3.geo.path()
    .projection(projection);

var formatNumber = d3.format('.2f'); // We prepare a number format which will always return 2 decimal places.
var legendX = d3.scale.linear();     // For the legend, we prepare a very simple linear scale. 
 // Domain and range will be set later as they depend on the data currently shown.

var legendXAxis = d3.svg.axis()   // We use the scale to define an axis. The tickvalues will 
			 .scale(legendX)           //be set later as they also depend on the data.
			 .orient("bottom")
			 .tickSize(13)
			 .tickFormat(function(d) {
				 return formatNumber(d);
		 });

 // We create an SVG element in the legend container and give it some dimensions.
var legendSvg = d3.select('#legend').append('svg')
	 	.attr('width', '100%')
	 	.attr('height', '44');

 // To this SVG element, we add a <g> element which will hold all of our legend entries.
var g = legendSvg.append('g')
	 .attr("class", "legend-key YlGnBu")
	 .attr("transform", "translate(" + 20 + "," + 20 + ")");

 // We add a <rect> element for each quantize category. The width and color of the rectangles will be set later.
 g.selectAll("rect")
	 .data(quantize.range().map(function(d) {
	 		return quantize.invertExtent(d);
	 })).enter().append("rect");

 // We add a <text> element acting as the caption of the legend. The text will be set later.
 g.append("text")
	 .attr("class", "caption")
	 .attr("y", -6);


ui_render_selectTable_Components(metaDataBase);
ui_render_colorPaletteSelect(metaDataBase)
create_histogram_object();
Activated_dataFrame("demographic");	//activate the default dataframe 
before_app_initialization = false ;
set_routes();




function create_histogram_object(){
	histogram = new BarChart();
	histogram.initChart();
	//sysecho("dataKeyVal", dataKeyVal);
	//histogram.setData(dataKeyVal);
	
}

function Activated_dataFrame(frame_name){
	load_dataframe(frame_name, 
		function(data){	// Here note that the @data param  is the active dataframe section in metaDataBase
			//sysecho("data for Table select template", data);
			ui_render_selectKey_component(data);	// update key selectlist control
			currentKey = "FLD1";					// get (refactoring: allow to be read from metabase section and ...
			currentMetaTable = data ;	

			//set the current color palette to that of the metaTable
			update_color_palette(data.color_palette);

			//update the property window html template to the new table columnset					
			tmplt_rowDescription = ui_updateTemplate_details({
				data_fields :  data.data_fields,
				tag_open : function(){return "{{"},
				tag_close: function(){return "}}"}
			});
			// ...apply default KEY as map chloropeth rendering KEY
			histogram.setData(dataKeyVal, currentMetaTable);
			//create_histogram_object();
			after_selectKey_Changed("FLD1");//TO DO: transform this code to more parametrizable version 
		}, 

		function(errorDesc){
			alert(errorDesc);
		})
}


function load_dataframe(frame_name, callBack,  errCallBack){

	var newframe = metaDataBase.table_details.find(function(frame){ return frame.name === frame_name});
    //currentMetaTable = (!newframe)? currentMetaTable : newframe;
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
		stats_table_set = generate_statistic_tables (data);
		dataById = stats_table_set["district"];
		dataKeyVal = stats_table_set["district_raw"];
		mapData = data ;
		if (!geo_dataset_is_load) {
			get_geoData(metaDataBase.geo_dataset.name  ,metaDataBase.geo_dataset.path, function( error, features){
				geo_dataset_is_load = true;
				preload_geoDataSet(features)	
				callBack(newframe);
			});

		} else {
			callBack(newframe);
		}   	

    });


    function get_statsData( name, path, callBack){
    	if (http_server_exe_mode) { // server http (local ou distant) actif
    		d3.csv( path, function(data) {
    			callBack(data);
    		});
    	} else { // Pas de server actif
    		var data = find_statsdata_from_memory(name);
    		sysecho("DATA #" + name + " from get_statsData", data);
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
	/*d3.csv( newframe.path, function(data) {
		sysecho("JSON_TABLE for " + newframe.path , data);
		stats_table_set = generate_statistic_tables (data)
		dataById = stats_table_set["district"];
		dataKeyVal = stats_table_set["district_raw"];
		mapData = data;
		if (!geo_dataset_is_load) {

			d3.json(metaDataBase.geo_dataset.path, function( error, features){
				geo_dataset_is_load = true;
				preload_geoDataSet(features)	
				//sysecho("newframe ", newframe);
				callBack(newframe);
			});

		} else {
			callBack(newframe);
		}
	});	*/
}


function preload_geoDataSet(features){
	var scaleCenter = calculateScaleCenter(features);
	projection.scale(scaleCenter.scale)
		.center(scaleCenter.center)
		.translate([width/2, height/2]);
		
	mapFeatures.selectAll('path')
			.data(features.features)
		.enter().append('path')
			.attr('class', "ogis-nocolor")
			.attr('d', path)
			// When the mouse moves over a feature, show the tooltip.
            .on('mousemove', showTooltip)
			 // When the mouse moves out of a feature, hide the tooltip.
			.on('mouseout', hideTooltip)
			// When a feature is clicked, show the details of it.
			.on('click', showDetails);	
}

function updateMapColors(){
 	
 	var value_min = d3.min(mapData, function(d) { return (in_geojsonfile(d)? getValueOfData(d): null); });
	var value_max =	d3.max(mapData, function(d) { return (in_geojsonfile(d)? getValueOfData(d): null); });

		console.log("[min, max]=", value_min + ", " + value_max );
		quantize.domain([value_min, value_max]);

		mapFeatures.selectAll('path')
				.attr('class', function(d){
				  var attr_line = dataById[getIdOfFeature(d)]; 
				  var attr_value = !attr_line ? 0: getValueOfData(attr_line) ;
				  return quantize( attr_value );
		})
	// We call the function to update the legend.
   // updateLegend();
 }
 function update_color_palette(palette_name){
 	mapFeatures.attr('class', 'features ' + palette_name);
    g.attr("class", "legend-key " + palette_name);
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
  					

function generate_statistic_tables(data){

	var tmp_data = d3.nest().key(function(d) { return d.LEVEL; }).rollup(function(d) { return d; }).map(data);
	//sysecho("tmp_data extracted from d3.nest", tmp_data);
	
	var data_keyVal_region = tmp_data.REGION;
	var data_keyVal_district = tmp_data.DISTRICT;

	table_region = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map(tmp_data.REGION);
	table_district = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map(tmp_data.DISTRICT);
	//sysecho("table_region", table_region);
	//sysecho("table_didtrict", table_district);
	return { 
		"district": table_district, 
		"region": table_region,
		"region_raw" : tmp_data.REGION,
		"district_raw" : tmp_data.DISTRICT
	};
}  	 	



function sysecho(the_title, the_value){
	if (typeof  the_value === "object" ){
			the_value = JSON.stringify(the_value);
	} 
	//console.log (the_title + ":" + the_value);
}

function doZoom() {
 	mapFeatures.attr("transform",
 	  "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
// Keep the stroke width proportional. The initial stroke width
// (0.5) must match the one set in the CSS.
	.style("stroke-width", 0.5 / d3.event.scale + "px");
}

function getIdOfFeature(f) {
	return f.properties.code;
}



// Function to update the legend inspired somewhat by example from on http://bl.ocks.org/mbostock/4573883
 function updateLegend(forceUpdate = false) {
 	//Exit if initialization is on course
 	if (before_app_initialization && !forceUpdate)  return;
 	// We determine the width of the legend. It is based on the width of the map minus some spacing left and right.
 	var legendWidth = d3.select('#map').node().getBoundingClientRect().width - 50;
	
	//We determine the domain of the quantize scale which will be used as tick values. We cannot directly use the scale via quantize.scale()
	//as this returns only the minimum and maximum values but we need all the steps of the scale. The range() function returns all categories
	//and we need to map the category values (q0-9, ..., q8-9) to the 
	//number values. To do this, we can use invertExtent().
	 var legendDomain = quantize
			.range().map(
		 	 function(d) {
	 			var r = quantize.invertExtent(d);
	 			return r[1];
		 	});										

	 legendDomain.unshift(quantize.domain()[0]); // Since we always only took the upper 
	 // limit of the category, we also need to add the lower limit of the very first category to the top of the domain.


	//On smaller screens, there is not enough room to show
	//all 10 category values. In this case, we add a filter leaving only every third value of the domain.
	 
	 if ( legendWidth < 400) { 								
		 legendDomain = legendDomain.filter(
		 	function(d, i){
			 return i % 3 == 0;								
		 });
	 }

	//We set the domain and range for the x scale of the legend.
	//The domain is the same as for the quantize scale and the
	//range takes up all the space available to draw the legend.
		legendX.domain(quantize.domain()).range([0, legendWidth]);			

	 // We update the rectangles by (re)defining their position and width
	 // (both based on the legend scale) and setting the correct class.
		 g.selectAll("rect")
			 .data(quantize.range()
			 	.map(
			 		function(d) {
			 			return quantize.invertExtent(d);
			 		}
		 	)).attr("height", 8)
			.attr("x", function(d)       { return legendX(d[0]); })
			.attr("width", function(d)   { return legendX(d[1]) - legendX(d[0]); })
			.attr('class', function(d,i) { return quantize.range()[i]; } );

	 // We update the legend caption. To do this, we take the text of the
	 // currently selected dropdown option. 
	 // var keyDropdown    = d3.select('#select-key').node(); //TODO : BE SIMPLIFYED We just need to 
	 // var selectedOption = keyDropdown.options[keyDropdown.selectedIndex]; // take the current short_name value of KEY
	 // g.selectAll('text.caption').text(selectedOption.text);

	 	g.selectAll('text.caption').text(currentMetaField.short_name); 
		legendXAxis.tickValues(legendDomain)// We set the calculated domain as tickValues for the legend axis.
	 	g.call(legendXAxis); // We call the axis to draw the axis
 }


function updateGraphic(){
	var graph_infos = get_graphic_infos();
	histogram.draw( graph_infos);
}
// function get_graphic_infos(){

// 	return {
// 		x: currentKey,
// 		y: "ADM_NAME",
// 		title : currentMetaTable.label + " : " + currentMetaField.short_name ,
// 		y_unit  : "District",
// 		x_unit  : currentMetaField.unit,
// 		deco_infos_1 : "Ce graphique dépeint le nombre de cas " + currentMetaField.long_name + " par district en 2017",
// 		deco_infos_2 : "Le département de TOUBA enregistre le plus de cas enregistrés",
// 		deco_infos_3 : "Le département de TOUBA enregistre le moins de cas enregistrés",
// 		deco_source : " Généré par Atlas Santé - Source de données " + currentMetaTable.source
// 	}
// } 

function get_graphic_infos() {
    return {
        x: currentKey,
        y: "ADM_NAME",
        title: currentMetaTable.label + " : " + currentMetaField.short_name,
        y_unit: "District",
        x_unit: currentMetaField.unit,
        deco_infos_1: "Ce graphique dépeint le nombre de cas " + currentMetaField.long_name + " par district en 2017",
        deco_infos_2: currentMetaTable.article + currentMetaTable.unit,
        deco_infos_3: currentMetaTable.article + currentMetaTable.unit,
        deco_source: " Généré par Atlas Santé - Source de données " + currentMetaTable.source
    }
}
/**
 * Show a tooltip with the name of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showTooltip(f) {
	var id = getIdOfFeature(f);// Get the ID of the feature.
	var d = dataById[id];// Use the ID to get the data entry.
	//sysecho("ID of feature", id)
	//sysecho("Attr_object", d)
	var place_name = d? d.ADM_NAME : "Région sanitaire Abidjan";
	// Get the current mouse position (as integer)
	var mouse = d3.mouse(d3.select('#map').node()).map(
	 		function(d) { return parseInt(d); }
	);

	 // Calculate the absolute left and top offsets of the tooltip. If the
	 // mouse is close to the right border of the map, show the tooltip on the left.
	
	 var left =mouse[0] + 5 // Math.min(width - 4 * place_name.length, mouse[0] + 5);
	 var top = mouse[1] + 15;

	 // Show the tooltip (unhide it) and set the name of the data entry.
	 // Set the position as calculated before.
	 tooltip.classed('hidden', false)
	 .attr("style", "left:" + left + "px; top:" + top + "px")
	 .html(place_name);
 }
 

function hideTooltip() {
 	tooltip.classed('hidden', true);
 	//console.log("hidding tooltips");
}

function ui_updateTemplate_details(data){
	var tmpltHtml = Mustache.render(tmplt_details_virtual, data);

	/*sysecho("1-tmplt_details_virtual (parsed!)", data);
	sysecho("2-virtual_tmplt_data", data);
	sysecho("3-tmplt after update", tmpltHtml);*/


    Mustache.parse(tmpltHtml);
    return tmpltHtml;
}

function ui_render_details(tmplt_data){
	// note the two-steps rendering here:
	// the first rending gives the html code to be injected as data property in the second render data
	// the property is then used to resolve the {{html_table_rows}} tag in the hard_detail_templeate

	//step 1 :
	var html_rows_content = Mustache.render(tmplt_rowDescription, tmplt_data);
	// step 2:
	//sysecho("tmplt_rowDescription", tmplt_rowDescription);
	//sysecho("tmplt_data", tmplt_data);
	//sysecho("html_rows_content", html_rows_content);
	
	var data_details = {};
	data_details.ADM_NAME = tmplt_data.ADM_NAME ;
	data_details.HTML_TABLE_ROWS = html_rows_content;
    //sysecho("data_detail", data_details);

	var detailsHtml = Mustache.render(tmplt_details_hard, data_details);

    //sysecho("detailsHtml", detailsHtml);


	d3.select('#details').html(detailsHtml);
	 // Hide the initial container.
	d3.select('#initial').classed("hidden", true);	
	d3.select('#sysinfos').classed("hidden", true);	
	d3.select('#details').classed("hidden", false);
	dyn_width  = svg.style("width");
	dyn_height = svg.style("height");
}

function ui_render_selectTable_Components(data){
	//sysecho("data for Table select template", data);

	var componentHtml = Mustache.render(tmplt_table_select, data);
	d3.select("#table_selector-wrapper").html(componentHtml);
	d3.select('#select-table').on('change', function(a) {
		// Change to the current option triggers call to the function load metaTable.
		 var tmpTable = d3.select(this).property('value');
		 after_dataFrame_Changed(tmpTable);
	});		
}
function ui_render_colorPaletteSelect(data){
	var componentHtml = Mustache.render( tmplt_palette_select  , data);
	d3.select('#palette_selector-wrapper').html(componentHtml);
}

function ui_render_selectKey_component(data){
	//console.log("data for select template", data);
	var componentHtml = Mustache.render(tmplt_key_select, data);
	d3.select('#var_selector-wrapper').html(componentHtml);

	d3.select('#select-key').on('change', function(a) { 	// Change to the current key triggers call
		var tmpKey  = d3.select(this).property('value');		// to the function to update the colors.
		after_selectKey_Changed(tmpKey)
	 });
	//console.log("Html rendererd for select key :", componentHtml);
}

function ui_render_sysinfos(data){
	var componentHtml = Mustache.render(tmplt_sysinfos, data);
	 d3.select('#sysinfos').html(componentHtml);
}





function showDetails(f) {
	 // Get the ID of the feature.
	 var id = getIdOfFeature(f);
	 // Use the ID to get the data entry.
	 var d = dataById[id];

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
	//sysecho("details template DATA structure", tmplt_data);
	ui_render_details(tmplt_data)//  HTML output in the details container.
}

/**
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

 function after_selectKey_Changed(inKEY){
 	 currentKey = inKEY;
 	 currentMetaField = currentMetaTable.data_fields.find( function(f){ return (f.fld_name === inKEY) });
 	 updateMapColors();
 	 updateLegend(true);
 	 updateGraphic();
 }
 function after_dataFrame_Changed(frame_name){
 	Activated_dataFrame(frame_name)
 }

function after_colorPalette_selected(palette_name){
	//this fonction must exit if app not initialized yet
	if (before_app_initialization) return;

	currentMetaTable.color_palette = palette_name;
	update_color_palette(palette_name);
	navigate("home");

}

function after_window_resized(){
	//Exit if initialization is on course
 	if (before_app_initialization)  return;
 	if (winResizeTimerID) { clearTimeout(winResizeTimerID);}
 		
 	winResizeTimerID = setTimeout( 
 		function(){
			updateLegend();
			histogram.resize();
			winResizeTimerID = 0;
 	} ,	1500)
}

function set_routes(){
	var routes = {
		"/action/select-palette/:color_palette" : after_colorPalette_selected,
		"/action/test-debug/:reload_chart" : histogram_draw,
		//"/action/app-settings": load_setting_pane,
		"/home" : function(){}
	}
	var router = Router(routes);
     	router.init();
}


function histogram_draw(){
	console.log("Histogram reload asked");
	histogram.draw();
	navigate("home");
}
