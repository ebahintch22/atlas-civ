var DARKROUGE = "#550000" , 
	VERT = "#63d617", 
	JAUNE = "#ffff00",   
	ORANGE = "#ffae00" , 
	ROUGE = "#ef2710",
	DARKGREEN = "#005500"

var width = 500,   height = 500;

var projection = d3.geo.mercator()
    .center([ -5.10 , 7.40 ])
    .scale(2650)
    .rotate([0 , 0]);

var path = d3.geo.path()
    .projection(projection);

var layers = [
    "",
	"./data/geojson/health/civ-district-sante.geojson",
	"./data/geojson/health/civ-region-sante.geojson",
	"./data/geojson/tmp/civ-adm2-region-r2.geojson",
	"./data/geojson/tmp/civ-adm1-district-r2.geojson"
]





openMap( 1, "map1");
openMap( 3, "map2");
openMap( 4, "map3");

function openMap( index, eltId){

	var svg = d3.select(`#${eltId}`).append("svg")
	    .attr("id", `svg-${eltId}`)
	    .attr("width",  width )
	    .attr("height", height);

	var mapFeatures = svg.append("g").attr("transform" ,  ` translate( ${ - width/2} ,  ${ 0}) `);

	d3.json( layers[index], function(geojson) {
	    mapFeatures.selectAll("path")
	        .data(geojson.features)
	        .enter()
	        .append("path")
	        .attr("d", path)
	        .attr("class", "feat");
	});
}






 var legendController1 = new generate_legend( "#legend1", {
	
	"title"  : "Legend #1",
	"width"  : 400,
	"domain"  : [ 1, 2, 4,  15, 100, 800],
	"tickSize": 15,
	"offset"  : {	"x": 10,	"y": 20 },
	"cell" : { 	"height": 12, 	"width" : 45},
	"colorscale" : {
		"start" : "#ffffff",
		"end"   : "#f00",
		"stroke": "#fff"
	}
});

 var domain_option = [ 
		{ key: "option-1" , label : [ 1, 2, 3, 4, 5,  15, 100, 800]},
		{ key: "option-2" , label : [ 1, 2, 3,  15, 100, 800, 1500, 10000]},
		{ key: "option-3" , label : [ 1, 2, 3, 4, 5, 10, 15, 20, 50, 100, 800, 1500]},
		{ key: "option-4" , label : [ 15, 100, 600, 800,  1500, 10000]}
	];

ui_render_dropdown_inputgroup( "#opera-controller-1", {
	prompt : "Plage de valeur arbitraire",
	tranform : function(d){ return ( { key: d.key , label : JSON.stringify(d.label)}) },
	option_list :  domain_option
}, function( option ){
		var domain = domain_option.find(function(dom){
			return( dom.key == option.key)
		})
		legendController1.set_prop("domain", domain.label );
		legendController1.refresh();
});

 var color_option_arr = [ 
		{ key: "option-1" , label : [  "#007AFF" , "#FFF500" ]},
		{ key: "option-2" , label : [  "#440000" , "#ff4444" ]},
		{ key: "option-3" , label : [  "#FFF500" , "#ffffff" ]},
		{ key: "option-4" , label : [  "#FF1122" , "#ffff00" ]},
		{ key: "option-5" , label : [  "#0000FF" , "#ffff00" ]}
	];

ui_render_dropdown_inputgroup( "#opera-controller-2", {
	prompt : "Jeu de couleur",
	tranform : function(d){ return ( { key: d.key , label : JSON.stringify(d.label)})},
	option_list :  color_option_arr
}, function( option ){
		var color = color_option_arr.find(function(d){
			return( d.key == option.key)
		})
		legendController1.set_prop("colorscale", { start: color.label[0], end: color.label[1], stroke: "#fff"} );
		legendController1.refresh();
});



var legendController2 = generate_legend( "#legend2", {

	"title"  : "Legend#2",
	"width"  : 400,
	"domain"  : [ 1, 2, 3, 4, 5,  15, 100, 800, 1500, 10000],
	"tickSize": 15,
	"offset"  : {	"x": 2,	"y": 20 },
	"cell" : { "height": 12, 	"width" : 45 },
	"colorscale" : {
		"start" : "#ffffff",
		"end"   : "#f00",
		"stroke": "#fff"
	}
})

 var scenario_option_arr = [ 
		{ key: "option-1" , data : [  "#007AFF" , "#FFF500" ]}, 
		{ key: "option-2" , data : [  "#881111" , "#ff2222" ]},
		{ key: "option-3" , data : [  "#FFF500" , "#ffffff" ]},
		{ key: "option-4" , data : [  "#FF1122" , "#ffff00" ]},
		{ key: "option-5" , data : [  "#0000FF" , "#ffff00" ]}
	];

ui_render_dropdown_inputgroup( "#opera-controller-2", {
	prompt : "Jeu de couleur",
	tranform : function(d){ return ( { key: d.key , label : JSON.stringify(d.data)})},
	option_list :  scenario_option_arr

}, function( option ){
		var color = scenario_option_arr.find(function(d){
			return( d.key == option.key)
		})
		legendController1.set_prop("colorscale", { start: color.data[0], end: color.data[1], stroke: "#fff"} );
		legendController1.refresh();
});






legendController3 = new generate_legend( "#legend3", {

	"title"  : "Legend #3",
	"width"  : 400,
	"domain"  : [ 1,  4,  15, 100, 800] ,
	"tickSize": 15,
	"offset"  : {	"x": 30,  "y": 20 } ,
	"cell" : { 	"height": 12, "width" : 45} ,
	"colorscale" : [ DARKROUGE, ROUGE, ORANGE, JAUNE, VERT, DARKGREEN ] ,
	"custom_label" : [ "Poor" , "labour", "Middle class", "High class" , "Rich", "billionnaire" ] 
		
	}
)

var renderer_profil_arr = [
		{ 
			key: "option-1", 
			label: "Cible PEV" , 
			thresholds : [50, 84], 
			labels : ["moins de  80%","80% - 92%","93% et +"], 
			colors : [ROUGE, JAUNE, VERT] 
		},
		{ 
			key: "option-2", 
			label: "Classification IPC" , 
			thresholds : [50, 84, 200, 500], 
			labels : [ "Très critique" , "Critique" , "Sérieuse", "Alerte", "Acceptable"], 
			colors : [ DARKROUGE, ROUGE, ORANGE, JAUNE, VERT ] 
		},
		{ 
			key: "option-3", 
			label: "Classification Poorest" , 
			thresholds : [ 10, 50, 230, 250, 500 ], 
			labels : [ "Poor" , "labour", "Middle class", "High class" , "Rich", "billionnaire"], 
			colors : [ DARKROUGE, ROUGE, ORANGE, JAUNE, VERT , DARKGREEN ] 
		}
]

ui_render_dropdown_inputgroup( "#opera-controller-3", {

		prompt : "Profil de rendu",
		tranform : null,
		option_list :  renderer_profil_arr

	}, function( option ){
		var profil = renderer_profil_arr.find(function(d){
			return( d.key == option.key)
		})

		legendController3.set_prop( "domain", profil.thresholds );
		legendController3.set_prop( "colorscale", profil.colors );
		legendController3.set_prop( "custom_label", profil.labels )

		legendController3.refresh();
});



function make_toto(){
	var ages_de_la_vie =[
		"Bébé : de la naissance à 2 ans",
		"Enfant : de 2 ans à 10-12 ans",
		"Adolescent : de 10-12 ans à 18 ans environ",
		"Adulte : de 18 ans à 70 ans",
		"Personne âgée : à partir de 70 ans"
	]

	var Threshold = d3.scale.threshold()
		.domain([ 2 , 12,  18, 70])
		.range(  ages_de_la_vie );

	return Threshold

}