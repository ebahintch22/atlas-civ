	
	

function build_RASS_chart_component(  inMetadata ,inField, inData, inMetageo ){
	// A structure to detect any change on datatable or key in 
	// order to trigger accordingy updates to inner data 
	//struct to refresh chart


	var metadata = inMetadata ,
		field    = inField, 
		metageo  = inMetageo

	var stamps = {
		table : "empty", 
	    field : "empty",
	   geolyr : "empty"
	}

	var data_struct =  update_data_structure(inData)   

	var myChart = create_Chart_ex( data_struct, "chart-canvas-rass", {

		title :  `${ metadata.label } par ${ metageo.names.value }`,
		"label_field" : metadata.data_parser.name_field ,
		"x-axis-style" : "RASS",
		"y-axis-1" : {
			display : true,
			position : "left",
			labelString : field.short_name
		},

		"y-axis-2" : {
			display : false,
			position : "right",
			labelString : "Nombre de cas"
		},

		charts : [
			{      
				label: field.long_name,
				type : "bar",
				field: field.fld_name, 
				backgroundColor: "ORANGE" ,
				borderColor: 'ORANGE',
				yAxisID : 'y-axis-1' 
		   }
		]
	});

	return {
		updateChart : function ( ){
			myChart.update();
		},
		explain : function(){
			return myChart
		},
		setParams : function( inMetadata ,inField, newdata, inMetageo){
			//1: after Key changed : 
			//         Update key : sort data and labels arrays - 
			//         reuse raw data ? : YES
			//         reuse geo data ? : YES
			//2: after Thematic-table changed : (NB: in this version we change the geodata)
			//		   reuse raw data ? : NO (RAW data is update by définition )
			//         reuse geo data ? : NO (RAW data is update , but this would be contexte-depndent in future )
			//         Updata Key : sort data and label arrays
			//		   
			//
			//3: after Level changed : 
			//		   Update RAW Data : Generate 
			//         Update GEODATA  : 
			//         Updata Key : Sort data and label arr
			//		   reuse raw data ? : NO (RAW data is update by définition )
			//         reuse geo data ? : NO (RAW data is update by definition )
			//
			//==============================================
			
			metadata = inMetadata ,
			field    = inField, 
			metageo  = inMetageo
			eventname = detect_changes();
			//alert("eventname :=> " + eventname)
			switch (eventname){

				case "key-changed" :
					//alert(" Case : 1 " + eventname)
					new_struct = update_data_structure(data_struct.raw)

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;
					myChart.options.scales.yAxes[0].scaleLabel.labelString = field.short_name
					myChart.options.title.text =  `${ metadata.label } par ${ metageo.names.value }`

					//objectPath( myChart.data.datasets[0], "data" , new_struct.data)
					//objectPath( myChart.data, "labels" , new_struct.labels)
					//objectPath( myChart.options.scales.xAxes[0].ticks, "min" , new_struct.min)
					//objectPath( myChart.options.scales.xAxes[0].ticks, "max" , new_struct.max)

					data_struct = new_struct
				break;

				case "data-theme-changed" :
					//alert(" Case : 2 " + eventname)

					new_struct = update_data_structure(newdata)	

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	
					myChart.options.scales.yAxes[0].scaleLabel.labelString = field.short_name
					myChart.options.title.text =  `${ metadata.label } par ${ metageo.names.value }`
					data_struct = new_struct;
				break;


				case "layer-changed" :
					//alert(" Case : 3 " + eventname)

					new_struct = update_data_structure(newdata)	

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	
					myChart.options.scales.yAxes[0].scaleLabel.labelString = field.short_name
					myChart.options.title.text = `${ metadata.label } par ${ metageo.names.value }`;
					data_struct = new_struct;

				break;


			}

			function detect_changes(){
				var r = null
				if ( stamps.geolyr != metageo.name) r= "layer-changed";
				if (  stamps.table != metadata.name) r= "data-theme-changed";
				if  (  r==null) r ="key-changed";

				stamps.geolyr = metageo.name
				stamps.table  = metadata.name
				stamps.field  = field.name

				return r
			}
		}	
	}
    //***********************************************************************
	function update_data_structure(inData){
		var data 
		var parser = metadata.data_parser, 
		    a,b,c,d

		if ( stamps.table != metadata.name ){
			 stamps.table = metadata.name

			 data = inData.map(function(d){return (d)})
			 data.sort( compare_numbers )

		} else if (stamps.field != field.fld_name){
			data = inData
			stamps.field = field.fld_name
			 data.sort( compare_numbers )
		}
		stamps.geolyr = metageo.name;

		//console.log("----------------------------->field ::" + JSON.stringify(field) + "\n\n\n")
		a = data.map(function (d){ return d[ parser.name_field ]  });
		b = data.map(function (d){ return d[  field.fld_name ]    });
		
		return ({
			labels : a,
			  data : b,
			   min : b[0],
			   max : b[b.length-1],
			   raw : data
		})
	}

	function compare_numbers(a,b){ return(b[field.fld_name] - a[field.fld_name] ) }
	function update_chart(){}
}	




function create_Chart_ex( data_struct , elt_id, Cfg ){
	
	var dateFormat = d3.time.format("%d-%m-%Y");
	var time_pattern = "DD/MM/YYYY";

	Cfg.label_min = data_struct.min;
	Cfg.label_max = data_struct.max;

	var CHART_CONFIG = JSON.stringify(Cfg)
	//console.log("HIGHLEVEL CONFIG ::---------------------------->>> " +CHART_CONFIG)
	//opera_console.log("HIGHLEVEL CONFIG ::---------------------------->>> " + CHART_CONFIG)

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

	var CHART_CONFIG = JSON.stringify(chart_configurator)
	//console.log("\n\n\nLOW CONFIG ::---------------------------->>> " + CHART_CONFIG + "\n\n")
	//opera_console.log(CHART_CONFIG)

	var ctx = document.getElementById(elt_id);
	var myChart = new Chart(ctx, chart_configurator)
	return myChart

}
