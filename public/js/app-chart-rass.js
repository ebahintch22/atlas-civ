	
	

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
				backgroundColor: "DODGERBLUE" ,
				borderColor: 'DODGERBLUE',
				yAxisID : 'y-axis-1' 
		   }
		],
		fontColors : CHART_FONT_COLORS["rass"]
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
				if ( stamps.table != metadata.name) r= "data-theme-changed";
				if  (  r==null) r ="key-changed";

				stamps.geolyr = metageo.name
				stamps.table  = metadata.name
				stamps.field  = field.name

				return r
			}
		},
		show_spinner : function( isVisible ){
			var useless = (isVisible) ? 	
			     $("#chart-canvas-rass-spinner").removeClass("hidden") : 
			     $("#chart-canvas-rass-spinner").addClass("hidden") ;			
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


