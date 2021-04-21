
    var CHART_FONT_COLORS = {
    	"covid" : {
    		legend : "#ddd",
    		  axis : "#ddd",
    		 title : "#ddd",
    	scaleLabel : "#ddd"

    	},
      	"rass" : {
    		legend : "#222",
    		  axis : "#222",
    		 title : "#222",
        scaleLabel : "#222"
    	}	
    }
    

    function create_Chart_covid( in_data , elt_id, Cfg, saveCfg = false ){
    	//Chart.defaults.global.defaultFontColor = "#ddd";
    	Chart.defaults.color = "#ddd";

		var dateFormat = d3.time.format("%d-%m-%Y");
		var time_pattern = "DD/MM/YYYY";

		var label_list = in_data.map(function (d){ return (d[ Cfg.label_field]) } ) ;

		Cfg.label_min = label_list[0];
		Cfg.label_max = label_list[label_list.length -1];
		Cfg.elementId = elt_id;

    	var chart_configurator = {

		    data: {
		        labels: in_data.map(function (d){ return (d[ Cfg.label_field]) } ) ,
		        datasets: Cfg.charts.map(function(chart){
					return {
						label: chart.label,
						type : chart.type || cfg.type ,
						yAxisID : chart.yAxisID,
						backgroundColor : get_color(chart.backgroundColor, 0.45),
						borderColor : get_color( chart.borderColor, 0.99),
						borderWidth : ( chart.type == "bar")? 1 : (chart.borderWidth? chart.borderWidth : 2),
						fill : (chart.type == "line") ? false : true ,
						pointRadius : (chart.type == "line") ? chart.pointRadius : 1 ,

						data : in_data.map(function (d){ return d[chart.field]}) 

					}
				}), 
		    },

		    options: {
		    	responsive : true,
		        title: {
		             display: true,
		                text: Cfg.title,
		           fontColor: Cfg.fontColors.title
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
				scales : generate_scales_specs(Cfg),

		        legend: {
	                labels: {
	                   fontColor: Cfg.fontColors.legend
	                }
       			},
       			plugins : {

			        title: {
			            display: true,
			               text: Cfg.title, 
			          fontColor: Cfg.fontColors.title
			        },
					zoom: {
						pan: {
							enabled: true,
							mode: 'x',
							overScaleMode: 'x'
						},
						zoom: {
							enabled: true,
							mode: 'x',
							overScaleMode: 'x'
						}
					}
				}
		    }
		}
		//var CHART_CONFIG = JSON.stringify(chart_configurator)
		//console.log(CHART_CONFIG)

		var canvas = document.getElementById(elt_id);
		var ctx = canvas.getContext("2d");
			canvas.style.backgroundColor = "#333";

			ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (saveCfg)  { console.log( JSON.stringify(chart_configurator))}

		var myChart = new Chart( canvas, chart_configurator)

		return myChart

    }



function create_Chart_ex( data_struct , elt_id, Cfg, verbose = false ){
	
	var dateFormat = d3.time.format("%d-%m-%Y");
	var time_pattern = "DD/MM/YYYY";

	Cfg.label_min = data_struct.min;
	Cfg.label_max = data_struct.max;
	Cfg.elementId = elt_id;
	var CHART_CONFIG = JSON.stringify(data_struct)
	console.log(CHART_CONFIG)

	var chart_configurator = {
		type: Cfg.type,
	    data: {
	        labels:  data_struct.labels ,
	        datasets: Cfg.charts.map(function(chart){

	        	

				return {

					label: chart.label,
					type : chart.type ,
					yAxisID : chart.yAxisID,
					backgroundColor : get_color(chart.backgroundColor, 0.85),
					borderColor : get_color( chart.borderColor, 0.99),
					borderWidth : ( chart.type == "bar")? 1 : (chart.borderWidth? chart.borderWidth : 1),
					fill : (chart.type == "line") ? false : true ,
					data : data_struct.data

				}
			}),
	    },

	    options: {
	    	
	    	responsive: true,

	        scales : generate_scales_specs(Cfg),

			tooltips : {
				intersect : true,
				titleFontColor : '#333',
				backgroundColor  : get_color( "WHITE", 0.8),
				bodyFontColor : '#555',
				borderWidth : 1,
				cornerRadius : 2,
				borderColor : get_color( "RED", 0.99),
				callbacks : {
					label: function( tooltipItem, data ){
	                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

	                    if (label) label += ': ';
	                    
	                    label += UTIL.format_number(tooltipItem.yLabel, false);
	                    return label;						
					}
				}
			},

	        legend: {
                labels: {
                   fontColor: Cfg.fontColors.legend
                }
   			},
		   hover : {
		       intersect : true, 
		       mode : "index"
		   },
   			onClick : ( Cfg.onClick == undefined ) ? undefined : __onClick,
   			plugins :  {

		        title: {
		            display: true,
		               text: Cfg.title, 
		          fontColor: Cfg.fontColors.title
		        },

				zoom: {
					pan: {
						enabled: true,
						mode: 'x',
						overScaleMode: 'x'
					},
					zoom: {
						enabled: true,
						mode: 'x',
						overScaleMode: 'x'
					}
				}
			}
	    }
	}

	var ctx = document.getElementById(elt_id);
	var myChart = new Chart(ctx, chart_configurator)
	return myChart


    function __onClick(evt){
		var items = this.getElementAtEvent(evt);
		if (items.length == 0) return
		
		var item = items[0];
		Cfg.onClick({
			"@datasetIndex": item._datasetIndex,
		    "@index": item._index
		})
	}
}
	

	function generate_scales_specs(Cfg){

		var RSP = {};

			RSP["x"] = generate_xAxes_section( Cfg.axis.x.style );
			RSP["y"] = generate_yAxes_section( Cfg.axis.y );

			return (RSP);

			function generate_xAxes_section(style){
				// selectionne parmi les styles prédefinis celui 
				// qui est indiqué dans la configuration de graphique
				return {
					 "RASS" : generate_X_axis_for_RASS( Cfg ),
					"COVID" : generate_X_axis_for_COVID( Cfg )
				}[style]
			}


			function generate_X_axis_for_RASS(Cfg){

	    		return  {
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
	                	maxRotation: 65,
	                	minRotation: 60, 
	                	fontColor: Cfg.fontColors.axis,
	                	fontSize: 12,
						fontFamily: "Univers Condensed,arial"
						/*callback: function(value, index, values){
							console.log(values)
							return(truncateString(value, 15))
						}*/
	                },
	                offset: true
	            }

				function truncateString(str, num) {
				  console.log(str)
				  if (str.length <= num) {
				    return str
				  }
				  return str.slice(0, num) + '...'
				}

			}

			function generate_X_axis_for_COVID(Cfg){

				var time_pattern = "DD/MM/YYYY" ;

				return {

	            	type : 'time',
	            	display: true,
	                time: {		 
	                	format: time_pattern,        
	                    displayFormats: {
	                    	day : "DD MMM"
	                    }
	                },
	            	gridLines : {
	            		borderDash : [ 2, 2],
	        			color : get_color( "GRAY", 0.7)
	        		},
	                ticks:{
	                	source: "auto",
	                	autoSkip: true,
	                	autoSkipPadding: 25,
	                	fontColor: Cfg.fontColors.axis,
	                	maxRotation: 0
	                }
			    }
			}


			function generate_yAxes_section( data ){

				var axe_def = {};
				var def_callback = function(value, index, values){ return(value)}
				
				if (Cfg.multicharts == true ) {
					Object.keys(data).forEach(function(key) {

		  				var axe = data[key];
		  				axe_def[key] = set_axe_def(axe)

					})
				} else {

					axe_def = set_axe_def(data)
				}

				return axe_def

				function set_axe_def( axe ){
					return  {
		        		id: key,
		        		offset: axe.offset,
		        		display: axe.display,
		        		position: axe.position,
		            	gridLines : {
		            		borderDash : [ 3, 3],
		        			color : get_color( "GRAY", 0.7)
		        		},
		                ticks: {
		                    beginAtZero: false,
		                      fontColor: Cfg.fontColors.axis,
			                   callback: axe.transform ?  axe.transform.callback : def_callback                
		                },
		                scaleLabel : {
		                	display: true,
		                	labelString : axe.transform ? axe.transform.title : axe.labelString ,
		                	  fontColor : Cfg.fontColors.scaleLabel
		                }
					}
				}
			}


	}






	function get_color( named_color , alpha){

		var color = color_helper( named_color).alpha(alpha).rgbString();
		return color;
	}


//'RGB(250, 128, 114)'


function get_zoomOptions(){
	var subOptions =  {

	   zoom: {
	  // Container for pan options
		   pan: {
		   // Boolean to enable panning
		   enabled: true,

			   // Panning directions. Remove the appropriate direction to disable
			   // Eg. 'y' would only allow panning in the y direction
			   // A function that is called as the user is panning and returns the
			   // available directions can also be used:
			   //   mode: function({ chart }) {
			   //     return 'xy';
			   //   },
			   mode: 'x',
			   // Which of the enabled panning directions should only be available
			   // when the mouse cursor is over one of scale.
		   overScaleMode: 'x',

		   rangeMin: {
			    // Format of min pan range depends on scale type
			    x: null,
			    y: null
		   },
		   rangeMax: {
			    // Format of max pan range depends on scale type
			    x: null,
			    y: null
		   },

		   // On category scale, factor of pan velocity
		   speed: 20,

		   // Minimal pan distance required before actually applying pan
		   threshold: 10,

		   // Function called while the user is panning
		   onPan: function({chart}) { console.log(`I'm panning!!!`); },
		   // Function called once panning is completed
		   onPanComplete: function({chart}) { console.log(`I was panned!!!`); },
		   // Function called when pan fails because modifier key was not detected.
		   // event is the a hammer event that failed - see https://hammerjs.github.io/api#event-object
		   onPanRejected: function({chart, event}) { console.log(`I didn't start panning!`); }
		  },

	  // Container for zoom options
		  zoom: {
		   // Boolean to enable zooming
		   enabled: true,

		   // Enable drag-to-zoom behavior
		   drag: true,

		   // Drag-to-zoom effect can be customized
		   // drag: {
		   //   borderColor: 'rgba(225,225,225,0.3)'
		   //   borderWidth: 5,
		   //   backgroundColor: 'rgb(225,225,225)',
		   //   animationDuration: 0
		   // },

		   // Zooming directions. Remove the appropriate direction to disable
		   // Eg. 'y' would only allow zooming in the y direction
		   // A function that is called as the user is zooming and returns the
		   // available directions can also be used:
		   //   mode: function({ chart }) {
		   //     return 'xy';
		   //   },
		   mode: 'x',

		   // Which of the enabled zooming directions should only be available
		   // when the mouse cursor is over one of scale.
		   overScaleMode: 'x',

		   rangeMin: {
			    // Format of min zoom range depends on scale type
			    x: null,
			    y: null
		   },
		   rangeMax: {
			    // Format of max zoom range depends on scale type
			    x: null,
			    y: null
		   },

		   // Speed of zoom via mouse wheel
		   // (percentage of zoom on a wheel event)
		   speed: 0.1,

		   // Minimal zoom distance required before actually applying zoom
		   threshold: 0.2,

		   // On category scale, minimal zoom level before actually applying zoom
		   sensitivity: 3,

			   // Function called while the user is zooming
			   onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
			   // Function called once zooming is completed
			   onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); },
			   // Function called when wheel input occurs without modifier key
			   onZoomRejected: function({chart, event}) { console.log(`I didn't start zooming!`); }
		  }
	    }
	  }
	  return subOptions
}