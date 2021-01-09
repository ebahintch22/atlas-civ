//globals var déclaration
//const http_server_exe_mode = false;
var color_helper = Chart.helpers.color
var navigate = function (path) {
	  	var current = window.location.href;
	    window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
	}

var test_capture_serie = []
var winResizeTimerID = 0;
var before_app_initialization = true
var geo_dataset_is_load = false;
var ENV_VIEW_SIZE = getEnvSize()
// We add a listener to the browser window, calling updateLegend when the window is resized.
window.onresize //= after_window_resized ;

var initialTable = "MUST_BE_SET_IN_THE_MODULE_SPECIFIC_MANIFEST"  
var initialKey = "FLD1";
    
var currentTable;
var currentMetaTable;
var currentKey;
var currentMetaField ;
var currentGeodataset;
var currentMetaGeo;
var currentSelectStyle = "reddish"; // variable String référençcant l'un des styles prédéfinis pour les entité spatiales sélectionnées
	 
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
	.attr("height", "100%")



var mapBackground = svg.append('g').append('rect')
						.attr('class', 'rect-background')	
						.attr("width", "200%")
						.attr("height", "200%")	
						.attr("transform", "translate(-200 -200)");


var mapFeatures   = svg.append('g').attr('class', 'features YlGnBu');



var mapFeaturesOverlay = svg.append('g').attr('class', 'selectedfeatures overlay')
var centered 
var projection = d3.geo.mercator().scale(1);
var zoom 

var tooltip = d3.select("#map").append("div").attr("class", "tooltip hidden");

var quantize = d3.scale.quantize().range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));			
var path = d3.geo.path().projection(projection);


var formatNumber = d3.format('.2f'); // We prepare a number format which will always return 2 decimal places.
var legendX = d3.scale.linear();     // For the legend, we prepare a very simple linear scale. 
 // Domain and range will be set later as they depend on the data currently shown.

var keyController ; // Controller de sélection de la variable de base pour la cartographie et le diagrammes
var spatialLayerController ; // Controller pour la sélection du nveau de représentation spatiale (echelle cartographique)
var managerController;
var slideController;
var chartController_admin;
var chartController_rass;
var legendControllervar ;

//Structure de MEMOISATION DES DONNEES
var GEO_CACHE = {}
    GEO_CACHE.geoJsonDataSets={};


var COVIDATA = null;
var COVIDATA_STATUS = "UNLOAD";
var COVID_SPINNER_ARR = [];
var COVIDATA_ACCESS_MODE = "database"

var dataTableController
var ZOOM_IS_DISABLE = true
var rass_active_panel = "tab-b" 

var DATE_FORMATTER = (function(){

	var format_short = new window.Intl.DateTimeFormat( "fr-FR" ,
		{
			 year : "numeric",
			month : "2-digit",
			  day : "2-digit"
		}
	);
	var format_long = new window.Intl.DateTimeFormat( "fr-FR" , 
		{
			weekday : "long",
			   year : "numeric",
			  month : "2-digit",
			    day : "2-digit"
		}
	);
	return {
		short: function(in_date){
			return format_short.format( in_date )
		},
		long : function(in_date){
			return format_long.format( in_date )
		}
	}
})()



function getEnvSize(){
	return {

		browser : {
			height : $(window).height(),
			 width : $(window).width()
		},
		page :{
			height : $(document).height(),
		     width : $(document).width()
		},
		screen :{
			height : window.screen.height,
		     width : window.screen.width
		}

	}
}