	
	

function build_traffic_chart_component(  inData ){
	// A structure to detect any change on datatable or key in 
	// order to trigger accordingy updates to inner data 
	//struct to refresh chart
    var Cfg, myChart ;
	var Result = create_Chart_v2(  "chart-canvas-traffic", inData, {

		      title :  `Atlas Santé Cote d'Ivoire - Historique d'affluence`,
		label_field : "total" ,
	 "x-axis-style" : "COVID",
		 "y-axis-1" : {
			    display : true,
			   position : "left",
			labelString : "Nb connectés"
		           },

		"y-axis-2" : {
			    display : false,
			   position : "right",
			labelString : "n/a"
		},

		charts : [
			{      
				label: "Total connectés",
				type : "line",
				field: "total", 
				backgroundColor: "BLUE",
				borderColor: 'BLUE',
				yAxisID : 'y-axis-1' 
		   },
			{      
				label: "actives",
				type : "line",
				field: "alive", 
				backgroundColor: "GREEN",
				borderColor: 'GREEN',
				yAxisID : 'y-axis-1' 
		   },
			{      
				label: "en veille",
				type : "line",
				field: "iddle", 
				backgroundColor: "RED",
				borderColor: 'RED',
				yAxisID : 'y-axis-1' 
		   }
		],
		data_format_function : function(data){
		   var b =[];
			b[0] =	data.map(function(d){ return d.total})
			b[1] =	data.map(function(d){ return d.alive})
			b[2] =	data.map(function(d){ return d.iddle})
			   a =  data.map(function(d){ return d.when })
	


			return ({
				labels : a,
				   min : a[0],
				   max : a[a.length-1],
				  data : b,
				   raw : data
			})
		}
	});

	myChart = Result.chart ;
	    Cfg = Result.config;

	return {
		updateChart : function ( ){
			myChart.update();
		},
		explain : function(){
			return myChart
		},
		setParams : function( params ){
			
			switch (params.eventtype){

				case "window-changed" :

					//new_struct = update_data_structure(data_struct.raw)
					myChart.data.labels = new_struct.labels;
					//for( i=0; i<=2 ; i++){
						//myChart.data.datasets[i].data = new_struct.data;
						//myChart.data.datasets[i].label = `inchangé normalement ${i}`;

					//}
					myChart.options.scales.xAxes[0].ticks.min = params.from;
					myChart.options.scales.xAxes[0].ticks.max = params.to;	

					//data_struct = new_struct

				break;

				case "new-data" :
					new_struct = Cfg.data_format_function(params.data)	
			
					PUB_SUB.publish("opera.logs", 
						[
							{
								message : " DATA FOR CHART_UPDATE : => " + JSON.stringify(new_struct) ,  
								type : "warning" ,
								group: "chart-traffic"
							}
						]
					)

					myChart.data.labels = new_struct.labels;

					for( i=0; i<=2 ; i++){
						myChart.data.datasets[i].data = new_struct.data[i];
						//myChart.data.datasets[i].label = `inchangé normalement ${i}`;
					}
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	

					myChart.options.title.text =  `Historique des connexions du ${ dateFormat(new_struct.min )} à ${ dateFormat(new_struct.max) }`
					//data_struct = new_struct;
				break;

			}
		}	
	}
    //***********************************************************************

}	




function create_Chart_v2(  elt_id, inData , Cfg ){
	
	var dateFormat = d3.time.format("%d-%m-%Y");
	var time_pattern = "DD/MM/YYYY";


	var data_struct =  Cfg.data_format_function(inData)

	PUB_SUB.publish("opera.logs", 
		[
			{  
				message : " DATA FOR CHART_CREATE : => " + JSON.stringify(data_struct) ,  
				type : "warning",
				group: "chart-traffic"
			}
		]
	)	

	Cfg.label_min = data_struct.min;
	Cfg.label_max = data_struct.max;


	var chart_configurator = {

	    data: {
	        labels:  data_struct.labels ,
	        datasets: Cfg.charts.map(function(chart){
				return {
					label: chart.label,
					type : chart.type ,
					yAxisID : chart.yAxisID,
					backgroundColor : get_color(chart.backgroundColor, 0.45),
					borderColor : get_color( chart.borderColor, 0.99),
					borderWidth : ( chart.type == "bar")? 1 : (chart.borderWidth? chart.borderWidth : 1),
					fill : (chart.type == "line") ? false : true ,
					pointRadius : 0,
					lineTension : 0,
					data : data_struct.data

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

	var ctx = document.getElementById(elt_id);
	var myChart = new Chart(ctx, chart_configurator)
	//We want to return main objects (chart & Cfg) to the wrapper Agent in ordr to handle update events
	return  {
		 chart : myChart,
		config : Cfg
	}
}
