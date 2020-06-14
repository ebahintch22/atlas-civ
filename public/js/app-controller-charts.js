

    function create_Chart( in_data , elt_id, Cfg ){
    	

		var dateFormat = d3.time.format("%d-%m-%Y");
		var time_pattern = "DD/MM/YYYY";
		var label_list = in_data.map(function (d){ return (d[ Cfg.label_field]) } ) ;

		Cfg.label_min = label_list[0]
		Cfg.label_max = label_list[label_list.length -1]

    	var chart_configurator = {

		    data: {
		        labels: in_data.map(function (d){ return (d[ Cfg.label_field]) } ) ,
		        datasets: Cfg.charts.map(function(chart){
					return {
						label: chart.label,
						type : chart.type ,
						yAxisID : chart.yAxisID,
						backgroundColor : get_color(chart.backgroundColor, 0.45),
						borderColor : get_color( chart.borderColor, 0.99),
						borderWidth : ( chart.type == "bar")? 1 : (chart.borderWidth? chart.borderWidth : 1),
						fill : (chart.type == "line") ? false : true ,
						data : in_data.map(function (d){ return d[chart.field]}) 

					}
				}),
		    },

		    options: {
		    	maintainAspectRatio : false,
		        title: {
		            display: true,
		            text: Cfg.title
		        },

				tooltips : {
					intersect : true,
					titleFontColor : '#333',
					backgroundColor  : get_color( "WHITE", 0.8),
					bodyFontColor : '#555',
					borderWidth : 1,
					cornerRadius : 2,
					borderColor : get_color( "RED", 0.99),		
				},
		        scales: {
		            xAxes: generate_xAxes_section(Cfg),		        	
		            yAxes: generate_yAxes_section(Cfg)
		        }
		    }
		}
		//var CHART_CONFIG = JSON.stringify(chart_configurator)
		//console.log(CHART_CONFIG)

		var canvas = document.getElementById(elt_id);
		var ctx = canvas.getContext("2d");
			canvas.style.backgroundColor = "#333";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

		var myChart = new Chart( canvas, chart_configurator)
		return myChart

    }

    function generate_yAxes_section(Cfg){
    	//Génère la section de l'objet options relatives aux axes Yaxis
    	var axes_def = [];
    	var no_yAxis = true;
  
 		[ "y-axis-1" , "y-axis-2" ].forEach(function(axis_name){
 			if (Cfg[axis_name])	{
 				axes_def.push( new_yAxis( Cfg[axis_name], axis_name ) )
 				no_yAxis = false
 			}
 		})

 		if (axes_def.length == 0 ){
 			axes_def.push({
	       		id: "y-axis-1",
        		display: "true",
        		position: "left",
            	gridLines : {
            		borderDash : [ 3, 3],
        			color : get_color( "GRAY", 0.7)
        		},
                ticks: {
                    beginAtZero: false
                },
                scaleLabel : {
                	display: true,
                	labelString : "Nombre de cas"
                }
 			})
 		}

 		return (axes_def)

    	function new_yAxis( axe, axe_id ){
    		return {
        		id: axe_id,
        		display: axe.display,
        		position: axe.position,
            	gridLines : {
            		borderDash : [ 3, 3],
        			color : get_color( "GRAY", 0.7)
        		},
                ticks: {
                    beginAtZero: false
                },
                scaleLabel : {
                	display: true,
                	labelString : axe.labelString ? axe.labelString : "Title axe y1"
                }
			}
    	}
    }

    function generate_xAxes_section( Cfg ){
    	var time_pattern = "DD/MM/YYYY"
    	var xaxis_type = Cfg["x-axis-style"];

    	var scale_set = {
    		"RASS" : {
            	gridLines : {
            		borderDash : [ 2, 2],
        			color : get_color( "GRAY", 0.7)
        		},
            	type : 'category',
                ticks:{
                	min: Cfg.label_min,
                	max: Cfg.label_max,
                	source: "auto",
                	autoSkip: false,
                	autoSkipPadding: 0,
                	maxRotation: 90,
                	minRotation: 60, 
                	fontColor: "gray",
                	fontSize: 9,
					fontFamily: "Univers Condensed,arial",
					callback: function(value, index, values){
						return(truncateString(value, 15))
					}
                }
            },
    		"COVID" :  {
            	gridLines : {
            		borderDash : [ 2, 2],
        			color : get_color( "GRAY", 0.7)
        		},
            	type : 'time',
            	display: true,
                time: {		 
                	format: time_pattern,        
                    displayFormats: {
                    	day : "DD MMM"
                    }
                },
                ticks:{
                	source: "auto",
                	autoSkip: true,
                	autoSkipPadding: 25,
                	maxRotation: 0
                }
		    }
    	}
    	return [scale_set[ xaxis_type]];
    }


	function truncateString(str, num) {
	  if (str.length <= num) {
	    return str
	  }
	  return str.slice(0, num) + '...'
	}

	function get_color( named_color , alpha){
		return color_helper( chartColors[named_color]).alpha(alpha).rgbString()
	}


'use strict';


INIT_NAMED_COLOR_LIST();

(function(global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */

}(this));


function INIT_NAMED_COLOR_LIST(){
	window.chartColors = {
		INDIANRED: 'RGB(205, 92, 92)',
		LIGHTCORAL: 'RGB(240, 128, 128)',
		SALMON: 'RGB(250, 128, 114)',
		DARKSALMON: 'RGB(233, 150, 122)',
		LIGHTSALMON: 'RGB(255, 160, 122)',
		CRIMSON: 'RGB(220, 20, 60)',
		RED: 'RGB(255, 0, 0)',
		FIREBRICK: 'RGB(178, 34, 34)',
		DARKRED: 'RGB(139, 0, 0)',
		PINK: 'RGB(255, 192, 203)',
		LIGHTPINK: 'RGB(255, 182, 193)',
		HOTPINK: 'RGB(255, 105, 180)',
		DEEPPINK: 'RGB(255, 20, 147)',
		MEDIUMVIOLETRED: 'RGB(199, 21, 133)',
		PALEVIOLETRED: 'RGB(219, 112, 147)',
		LIGHTSALMON: 'RGB(255, 160, 122)',
		CORAL: 'RGB(255, 127, 80)',
		TOMATO: 'RGB(255, 99, 71)',
		ORANGERED: 'RGB(255, 69, 0)',
		DARKORANGE: 'RGB(255, 140, 0)',
		ORANGE: 'RGB(255, 165, 0)',
		GOLD: 'RGB(255, 215, 0)',
		YELLOW: 'RGB(255, 255, 0)',
		LIGHTYELLOW: 'RGB(255, 255, 224)',
		LEMONCHIFFON: 'RGB(255, 250, 205)',
		LIGHTGOLDENRODYELLOW: 'RGB(250, 250, 210)',
		PAPAYAWHIP: 'RGB(255, 239, 213)',
		MOCCASIN: 'RGB(255, 228, 181)',
		PEACHPUFF: 'RGB(255, 218, 185)',
		PALEGOLDENROD: 'RGB(238, 232, 170)',
		KHAKI: 'RGB(240, 230, 140)',
		DARKKHAKI: 'RGB(189, 183, 107)',
		LAVENDER: 'RGB(230, 230, 250)',
		THISTLE: 'RGB(216, 191, 216)',
		PLUM: 'RGB(221, 160, 221)',
		VIOLET: 'RGB(238, 130, 238)',
		ORCHID: 'RGB(218, 112, 214)',
		FUCHSIA: 'RGB(255, 0, 255)',
		MAGENTA: 'RGB(255, 0, 255)',
		MEDIUMORCHID: 'RGB(186, 85, 211)',
		MEDIUMPURPLE: 'RGB(147, 112, 219)',
		REBECCAPURPLE: 'RGB(102, 51, 153)',
		BLUEVIOLET: 'RGB(138, 43, 226)',
		DARKVIOLET: 'RGB(148, 0, 211)',
		DARKORCHID: 'RGB(153, 50, 204)',
		DARKMAGENTA: 'RGB(139, 0, 139)',
		PURPLE: 'RGB(128, 0, 128)',
		INDIGO: 'RGB(75, 0, 130)',
		SLATEBLUE: 'RGB(106, 90, 205)',
		DARKSLATEBLUE: 'RGB(72, 61, 139)',
		MEDIUMSLATEBLUE: 'RGB(123, 104, 238)',
		GREENYELLOW: 'RGB(173, 255, 47)',
		CHARTREUSE: 'RGB(127, 255, 0)',
		LAWNGREEN: 'RGB(124, 252, 0)',
		LIME: 'RGB(0, 255, 0)',
		LIMEGREEN: 'RGB(50, 205, 50)',
		PALEGREEN: 'RGB(152, 251, 152)',
		LIGHTGREEN: 'RGB(144, 238, 144)',
		MEDIUMSPRINGGREEN: 'RGB(0, 250, 154)',
		SPRINGGREEN: 'RGB(0, 255, 127)',
		MEDIUMSEAGREEN: 'RGB(60, 179, 113)',
		SEAGREEN: 'RGB(46, 139, 87)',
		FORESTGREEN: 'RGB(34, 139, 34)',
		GREEN: 'RGB(0, 128, 0)',
		DARKGREEN: 'RGB(0, 100, 0)',
		YELLOWGREEN: 'RGB(154, 205, 50)',
		OLIVEDRAB: 'RGB(107, 142, 35)',
		OLIVE: 'RGB(128, 128, 0)',
		DARKOLIVEGREEN: 'RGB(85, 107, 47)',
		MEDIUMAQUAMARINE: 'RGB(102, 205, 170)',
		DARKSEAGREEN: 'RGB(143, 188, 139)',
		LIGHTSEAGREEN: 'RGB(32, 178, 170)',
		DARKCYAN: 'RGB(0, 139, 139)',
		TEAL: 'RGB(0, 128, 128)',
		AQUA: 'RGB(0, 255, 255)',
		CYAN: 'RGB(0, 255, 255)',
		LIGHTCYAN: 'RGB(224, 255, 255)',
		PALETURQUOISE: 'RGB(175, 238, 238)',
		AQUAMARINE: 'RGB(127, 255, 212)',
		TURQUOISE: 'RGB(64, 224, 208)',
		MEDIUMTURQUOISE: 'RGB(72, 209, 204)',
		DARKTURQUOISE: 'RGB(0, 206, 209)',
		CADETBLUE: 'RGB(95, 158, 160)',
		STEELBLUE: 'RGB(70, 130, 180)',
		LIGHTSTEELBLUE: 'RGB(176, 196, 222)',
		POWDERBLUE: 'RGB(176, 224, 230)',
		LIGHTBLUE: 'RGB(173, 216, 230)',
		SKYBLUE: 'RGB(135, 206, 235)',
		LIGHTSKYBLUE: 'RGB(135, 206, 250)',
		DEEPSKYBLUE: 'RGB(0, 191, 255)',
		DODGERBLUE: 'RGB(30, 144, 255)',
		CORNFLOWERBLUE: 'RGB(100, 149, 237)',
		MEDIUMSLATEBLUE: 'RGB(123, 104, 238)',
		ROYALBLUE: 'RGB(65, 105, 225)',
		BLUE: 'RGB(0, 0, 255)',
		MEDIUMBLUE: 'RGB(0, 0, 205)',
		DARKBLUE: 'RGB(0, 0, 139)',
		NAVY: 'RGB(0, 0, 128)',
		MIDNIGHTBLUE: 'RGB(25, 25, 112)',
		CORNSILK: 'RGB(255, 248, 220)',
		BLANCHEDALMOND: 'RGB(255, 235, 205)',
		BISQUE: 'RGB(255, 228, 196)',
		NAVAJOWHITE: 'RGB(255, 222, 173)',
		WHEAT: 'RGB(245, 222, 179)',
		BURLYWOOD: 'RGB(222, 184, 135)',
		TAN: 'RGB(210, 180, 140)',
		ROSYBROWN: 'RGB(188, 143, 143)',
		SANDYBROWN: 'RGB(244, 164, 96)',
		GOLDENROD: 'RGB(218, 165, 32)',
		DARKGOLDENROD: 'RGB(184, 134, 11)',
		PERU: 'RGB(205, 133, 63)',
		CHOCOLATE: 'RGB(210, 105, 30)',
		SADDLEBROWN: 'RGB(139, 69, 19)',
		SIENNA: 'RGB(160, 82, 45)',
		BROWN: 'RGB(165, 42, 42)',
		MAROON: 'RGB(128, 0, 0)',
		WHITE: 'RGB(255, 255, 255)',
		SNOW: 'RGB(255, 250, 250)',
		HONEYDEW: 'RGB(240, 255, 240)',
		MINTCREAM: 'RGB(245, 255, 250)',
		AZURE: 'RGB(240, 255, 255)',
		ALICEBLUE: 'RGB(240, 248, 255)',
		GHOSTWHITE: 'RGB(248, 248, 255)',
		WHITESMOKE: 'RGB(245, 245, 245)',
		SEASHELL: 'RGB(255, 245, 238)',
		BEIGE: 'RGB(245, 245, 220)',
		OLDLACE: 'RGB(253, 245, 230)',
		FLORALWHITE: 'RGB(255, 250, 240)',
		IVORY: 'RGB(255, 255, 240)',
		ANTIQUEWHITE: 'RGB(250, 235, 215)',
		LINEN: 'RGB(250, 240, 230)',
		LAVENDERBLUSH: 'RGB(255, 240, 245)',
		MISTYROSE: 'RGB(255, 228, 225)',
		GAINSBORO: 'RGB(220, 220, 220)',
		LIGHTGRAY: 'RGB(211, 211, 211)',
		SILVER: 'RGB(192, 192, 192)',
		DARKGRAY: 'RGB(169, 169, 169)',
		GRAY: 'RGB(128, 128, 128)',
		DIMGRAY: 'RGB(105, 105, 105)',
		LIGHTSLATEGRAY: 'RGB(119, 136, 153)',
		SLATEGRAY: 'RGB(112, 128, 144)',
		DARKSLATEGRAY: 'RGB(47, 79, 79)',
		BLACK:'RGB(0, 0, 0)'
	}
}

/*
var ctx = document.getElementById('myChart').getContext("2d")
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
        datasets: [{
            label: "Data",
            borderColor: "#80b6f4",
            pointBorderColor: "#80b6f4",
            pointBackgroundColor: "#80b6f4",
            pointHoverBackgroundColor: "#80b6f4",
            pointHoverBorderColor: "#80b6f4",
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
            data: [100, 120, 150, 170, 180, 170, 160]
        }]
    },
    options: {
        legend: {
            position: "bottom"
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }
}],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
},
                ticks: {
                    padding: 20,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold"
                }
            }]
        }
    }
});*/