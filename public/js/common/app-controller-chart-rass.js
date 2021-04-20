	
	

function build_RASS_chart_component(  inMetadata ,inField, inData, inMetageo, onClickcallBack , inLimit= null){


	var metadata = inMetadata ,
		field    = inField, 
		metageo  = inMetageo,
		tranform = null

	var stamps = {
		table : "empty", 
	    field : "empty",
	   geolyr : "empty"
	}

	var data_struct =  update_data_structure(inData, inLimit)   


	var transform = update_tick_transform (field);


	create_Chart_ex( data_struct, "@chart-canvas-rass-test", {

			"title" :  `${ metadata.label } par ${ metageo.names.value }`,
			"label_field" : metadata.data_parser.name_field ,
			"x-axis-style" : "RASS",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : field.YLabelCustom,
				transform : transform

			},

			"y-axis-2" : {
				display : false,
				position : "right",
				labelString : "Nombre de cas",
				transform : transform
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
			fontColors : CHART_FONT_COLORS["rass"],

			onClick : function(indexes){

				onClickcallBack( data_struct, indexes);
			} 
		});



	var myChart = create_Chart_ex( data_struct, "chart-canvas-rass", {

		title :  `${ metadata.label } par ${ metageo.names.value }`,
		"label_field" : metadata.data_parser.name_field ,
		"x-axis-style" : "RASS",
		"y-axis-1" : {
			display : true,
			position : "left",
			labelString : field.YLabelCustom,
			transform : transform

		},

		"y-axis-2" : {
			display : false,
			position : "right",
			labelString : "Nombre de cas",
			transform : transform
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
		fontColors : CHART_FONT_COLORS["rass"],

		onClick : function(indexes){

			onClickcallBack( data_struct, indexes);
		} 
	});

	return {
		updateChart : function ( ){
			myChart.update();
		},
		explain : function(){
			return myChart
		},
		setParams : function( inMetadata ,inField, newdata, inMetageo, inLimit = null){
			//1: after Key changed : 
			//         Update tick function needed : YES (because the field may use transform function) 
			//         Update key : sort data and labels arrays - 
			//         reuse raw data ? : YES
			//         reuse geo data ? : YES
			//2: after Thematic-table changed : (NB: in this version we change the geodata)
			//         Update tick function needed : YES (because the field may use transform function) 
			//		   reuse raw data ? : NO (RAW data is update by définition )
			//         reuse geo data ? : NO (RAW data is update , but this would be contexte-depndent in future )
			//         Updata Key : sort data and label arrays
			//		   
			//
			//3: after Level changed : 
			//         Update tick function needed : YES (because the field may use transform function) 
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
					new_struct = update_data_structure(data_struct.raw, inLimit)

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;

					 
					transform = update_tick_transform(field)
					myChart.options.scales.yAxes[0].scaleLabel.labelString = transform.title 
        			myChart.options.scales.yAxes[0].ticks.callback =transform.callback

					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;
					//myChart.options.scales.yAxes[0].scaleLabel.labelString = field.YLabelCustom || field.short_name
					myChart.options.title.text =  `${ metadata.label } par ${ metageo.names.value }`

					//objectPath( myChart.data.datasets[0], "data" , new_struct.data)
					//objectPath( myChart.data, "labels" , new_struct.labels)
					//objectPath( myChart.options.scales.xAxes[0].ticks, "min" , new_struct.min)
					//objectPath( myChart.options.scales.xAxes[0].ticks, "max" , new_struct.max)

					data_struct = new_struct
				break;

				case "data-theme-changed" :
					//alert(" Case : 2 " + eventname)

					new_struct = update_data_structure(newdata, inLimit)	

					transform = update_tick_transform(field)
					myChart.options.scales.yAxes[0].scaleLabel.labelString = transform.title 
        			myChart.options.scales.yAxes[0].ticks.callback = transform.callback

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	
					//myChart.options.scales.yAxes[0].scaleLabel.labelString = field.YLabelCustom || field.short_name
					myChart.options.title.text =  `${ metadata.label } par ${ metageo.names.value }`
					data_struct = new_struct;
				break;


				case "layer-changed" :
					//alert(" Case : 3 " + eventname)

					new_struct = update_data_structure(newdata, inLimit)	

					transform = update_tick_transform(field)
					myChart.options.scales.yAxes[0].scaleLabel.labelString = transform.title 
        			myChart.options.scales.yAxes[0].ticks.callback = transform.callback

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	
					//myChart.options.scales.yAxes[0].scaleLabel.labelString = field.YLabelCustom || field.short_name
					myChart.options.title.text = `${ metadata.label } par ${ metageo.names.value }`;
					data_struct = new_struct;

				break;


			}

			/*alertify.message(JSON.stringify({
				"Scale title" : transform.title,
				"Field key" : field.long_name
			}), 0);*/


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
	function update_data_structure(inData, inLimit = null){
		var data 
		var parser = metadata.data_parser, 
		    a,b,c,d

		data = inData.map(function(d){return (d)})

		//apply data limit if relevant
		if (inLimit != null) {

			data = data.sort(compare_numbers).slice(0, inLimit)

		}

		if ( stamps.table != metadata.name ){
			 stamps.table = metadata.name

			// data = inData.map(function(d){return (d)})
			 data.sort( compare_numbers )

		} else if (stamps.field != field.fld_name){
			//data = inData
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

	function update_tick_transform(field){
		var title 
		var cbFunc

		if (!field.transform) {
			title = field.short_name
			scaleFactor = 1
		} else {
			title = field.transform.YLabelCustom
			scaleFactor = field.transform.scaleFactor
		}

		cbFunc = function(value, index, values){
    				return UTIL.format_number(value/scaleFactor, false)
    			}

        return {
        	callback : cbFunc ,
        	title : title
        }
	}
}



























	function Build_Atlas_Chart_Component_3_0(  inMetadata ,inField, inData, inMetageo, onClickcallBack , inLimit= null ){


			var metadata = inMetadata ,
				field    = inField, 
				metageo  = inMetageo,
				tranform = null


			var stamps = {
				table : "empty", 
			    field : "empty",
			   geolyr : "empty"
			}

			var data_struct =  update_data_structure(inData, inLimit);   
			var transform_func = update_tick_transform (field);

			var myChart = create_Chart_for_atlas( data_struct, "chart-canvas-rass", {

				       "title" :  `${ metadata.label } par ${ metageo.names.value }`,
				 "label_field" :  metadata.data_parser.name_field ,
				"x-axis-style" : "RASS",
				        "axis" : {

								"x":{
									"style" : "RASS" 
								},

								"y":{

								   "Y1" : {
										  "display" : true,
										 "position" : "left",
									  "labelString" : field.YLabelCustom,
										"transform" : transform_func							
									}
								}
				        	},
				
					"charts" : [
						{      
							"label": field.long_name,
							"type" : "bar",
							"field": field.fld_name, 
							"backgroundColor": "DODGERBLUE" ,
							"borderColor": 'DODGERBLUE',
							"yAxisID" : 'Y1' 
					   }
					],

				"fontColors" : CHART_FONT_COLORS["rass"],

				"onClick" : function(indexes){

					onClickcallBack( data_struct, indexes);
				} 
			});



			return {
				updateChart : function ( ){
					myChart.update();
				},
				explain : function(){
					return myChart
				},
				setParams : function( inMetadata ,inField, newdata, inMetageo, inLimit = null){
					//1: after Key changed : 
					//         Update tick function needed : YES (because the field may use transform function) 
					//         Update key : sort data and labels arrays - 
					//         reuse raw data ? : YES
					//         reuse geo data ? : YES
					//2: after Thematic-table changed : (NB: in this version we change the geodata)
					//         Update tick function needed : YES (because the field may use transform function) 
					//		   reuse raw data ? : NO (RAW data is update by définition )
					//         reuse geo data ? : NO (RAW data is update , but this would be contexte-depndent in future )
					//         Updata Key : sort data and label arrays
					//		   
					//
					//3: after Level changed : 
					//         Update tick function needed : YES (because the field may use transform function) 
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

					switch (eventname){

						case "key-changed" :
							//alert(" Case : 1 " + eventname)
							new_struct = update_data_structure(data_struct.raw, inLimit)

							myChart.data.datasets[0].data = new_struct.data;
							myChart.data.datasets[0].label = field.long_name;
							myChart.data.labels = new_struct.labels;

							 
							transform = update_tick_transform(field)
							myChart.options.scales.y["Y1"].scaleLabel.labelString = transform.title 
		        			myChart.options.scales.y["Y1"].ticks.callback = transform.callback

							myChart.options.scales.x.ticks.min = new_struct.min;
							myChart.options.scales.x.ticks.max = new_struct.max;
					
							myChart.options.plugins.title.text =  `${ metadata.label } par ${ metageo.names.value }`

							data_struct = new_struct
						break;

						case "data-theme-changed" :
							//alert(" Case : 2 " + eventname)

							new_struct = update_data_structure(newdata, inLimit)	

							transform = update_tick_transform(field)
							myChart.options.scales.y["Y1"].scaleLabel.labelString = transform.title 
		        			myChart.options.scales.y["Y1"].ticks.callback = transform.callback

							myChart.data.datasets[0].data = new_struct.data;
							myChart.data.datasets[0].label = field.long_name;
							myChart.data.labels = new_struct.labels;
							myChart.options.scales.x.ticks.min = new_struct.min;
							myChart.options.scales.x.ticks.max = new_struct.max;	
							//myChart.options.scales.yAxes[0].scaleLabel.labelString = field.YLabelCustom || field.short_name
							myChart.options.plugins.title.text =  `${ metadata.label } par ${ metageo.names.value }`;
							data_struct = new_struct;
						break;


						case "layer-changed" :
							//alert(" Case : 3 " + eventname)

							new_struct = update_data_structure(newdata, inLimit)	

							transform = update_tick_transform(field)
							myChart.options.scales.y["Y1"].scaleLabel.labelString = transform.title 
		        			myChart.options.scales.y["Y1"].ticks.callback = transform.callback

							myChart.data.datasets[0].data = new_struct.data;
							myChart.data.datasets[0].label = field.long_name;
							myChart.data.labels = new_struct.labels;
							myChart.options.scales.x.ticks.min = new_struct.min;
							myChart.options.scales.x.ticks.max = new_struct.max;	
							//myChart.options.scales.yAxes[0].scaleLabel.labelString = field.YLabelCustom || field.short_name
							myChart.options.plugins.title.text =  `${ metadata.label } par ${ metageo.names.value }`;
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
			function update_data_structure(inData, inLimit = null){
				var data 
				var parser = metadata.data_parser, 
				    a,b,c,d

				data = inData.map(function(d){return (d)})

				//apply data limit if relevant
				if (inLimit != null) {

					data = data.sort(compare_numbers).slice(0, inLimit)

				}

				if ( stamps.table != metadata.name ){
					 stamps.table = metadata.name

					// data = inData.map(function(d){return (d)})
					 data.sort( compare_numbers )

				} else if (stamps.field != field.fld_name){
					//data = inData
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




			    //***********************************************************************


			function compare_numbers(a,b){ return(b[field.fld_name] - a[field.fld_name] )}
				

			function update_tick_transform(field){
				/* return a transform function if relevant to 
				scale ticks value and change scale title */
				var title 
				var cbFunc

				if (!field.transform) {
					title = field.short_name
					scaleFactor = 1
				} else {
					title = field.transform.YLabelCustom
					scaleFactor = field.transform.scaleFactor
				}

				cbFunc = function(value, index, values){
		    				return UTIL.format_number(value/scaleFactor, false)
		    			}

		        return {
		        	callback : cbFunc ,
		        	title : title
		        }
			}
		}	

