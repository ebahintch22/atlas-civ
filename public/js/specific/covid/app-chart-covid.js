	


	function build_COVID_chart_component_3_0(  data ){

		var mvData = data.map(function(d){return d}) 

		create_Chart_covid( data, "covid-canvas-up-1", {

			title : "EVOLUTION CHRONOLOGIQUE DES INDICATEURS EPIDEMIOLODIQUES DU COVID-19",
			label_field : "date_raw",

			"axis" :  {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					},

					"YB" : {
						"display" : false,
						"position" : "right",
						"labelString" : "Nombre de cas"
					}							
				},
			},



			charts : [

				{      
					label: 'Nombre de cas actifs',
					type : "line",
					field: 'active_case' ,
					backgroundColor: "YELLOW" ,
					borderColor: 'YELLOW',
					borderWidth : 2,
					yAxisID : 'YA' ,
					pointRadius : 0
			   },
				{      
					label: 'Nombre de cas guéris',
					type : "bar",
					field: 'sum_healed' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME',
					yAxisID : 'YA'  
			   },
				{      
					label: 'Nombre de décès',
					type : "bar",
					field: 'sum_deceased' ,
					backgroundColor: "RED" ,
					borderColor: 'RED',
					yAxisID : 'YA'  
			   }
			],
			fontColors : CHART_FONT_COLORS["covid"]
		}, true)


		create_Chart_covid(data, "covid-canvas-up-2", {

			title : "EVOLUTION CHRONOLOGIQUE DES INDICATEURS JOURNALIERS DU COVID-19",
			label_field : "date_raw",

			"axis" : {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					},

					"YB" : {
						"display" : false,
						"position" : "right",
						"labelString" : "Nombre de cas"
					}							
				},
			},

			charts : [
				{      
					label: 'Nouveaux cas',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'YA' 
			   },
				{      
					label: 'Nouveaux guéris',
					type : "bar",
					field: 'new_healed' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME' ,
					yAxisID : 'YA' 
			   },
				{      
					label: 'Nouveaux décès',
					type : "bar",
					field: 'new_deceased' ,
					backgroundColor: "RED" ,
					borderColor: 'RED' ,
					yAxisID : 'YA' 
			   }
			],
			 fontColors : CHART_FONT_COLORS["covid"]
		});



		create_Chart_covid(data, "covid-canvas-up-3", {

			title : "SUIVI DES CAS CONFIRMES",
			label_field : "date_raw",			

			"axis" : {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					}		
				},
			},
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'YA' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});



		create_Chart_covid(data, "covid-canvas-bottom-1", {

			title : "SUIVI DE L'INCIDENCE JOURNALIERE",
			label_field : "date_raw",
			"axis" : {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					},

					"YB" : {
						"display" : true,
						"position" : "right",
						"labelString" : "Nombre de cas"
					}							
				},
			},
			charts : [
				{      
					label: "Taux d'incidence journalier",
					type : "line",
					field: "incidence" ,
					backgroundColor: "VIOLET" ,
					borderWidth: 1,
					borderColor: 'VIOLET' ,
					yAxisID : 'YB' ,
					pointRadius : 0
			   },
				{      
					label: 'Nouveaux cas',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'YA'
			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'nb_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'YA' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});

		create_Chart_covid(data, "covid-canvas-bottom-2", {

			title : "SUIVI DES CAS DE GUERISON",
			label_field : "date_raw",
			"axis" : {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					},

					"YB" : {
						"display" : true,
						"position" : "right",
						"labelString" : "Nombre de cas"
					}							
				},
			},		
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE',
					yAxisID : 'YA'  
			   },
				{      
					label: 'Taux de guérison (%)',
					type : "line",
					field: 'remission' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME' ,
					yAxisID : 'YB',
					pointRadius : 0  
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});

		create_Chart_covid(data, "covid-canvas-bottom-3", {

			title : "TAUX DE LÉTALITÉ",
			label_field : "date_raw",
			"axis" : {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					},

					"YB" : {
						"display" : true,
						"position" : "right",
						"labelString" : "Nombre de cas"
					}							
				},
			},		
			charts : [
				{      
					label: 'Taux de létalité (CFR)',
					type : "line",
					field: 'letalite' ,
					backgroundColor: "CRIMSON" ,
					borderColor: 'RED' ,
					yAxisID : 'YB' ,
					pointRadius : 0 
			   },
				{      
					label: 'Nombre de cas confirmés',
					yAxisID : 'YA' ,					
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});


		create_Chart_covid(data, "covid-canvas-bottom-4", {

			title : "DÉPISTAGES REALISÉS",
			label_field : "date_raw",
			"axis" : {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					}						
				},
			},				
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,					
					yAxisID : 'YA' 

			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'sum_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'YA' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});
	}	





	function build_COVID_chart_component(  data ){

		var mvData = data.map(function(d){return d}) 

		create_Chart( data, "covid-canvas-up-1", {

			title : "EVOLUTION CHRONOLOGIQUE DES INDICATEURS EPIDEMIOLODIQUES DU COVID-19",
			label_field : "date_raw",
			"axis" : {
				"x": {
					"style": "COVID"
				},

				"y": {
					"YA" : {
						"display" : true,
						"position" : "left",
						"labelString" : "Nombre de cas"
					}						
				},
			},	

			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},

			"y-axis-2" : {
				display : false,
				position : "right",
				labelString : "Nombre de cas"
			},

			charts : [

				{      
					label: 'Nombre de cas actifs',
					type : "line",
					field: 'active_case' ,
					backgroundColor: "YELLOW" ,
					borderColor: 'YELLOW',
					borderWidth : 2,
					yAxisID : 'y-axis-1' ,
					pointRadius : 0
			   },
				{      
					label: 'Nombre de cas guéris',
					type : "bar",
					field: 'sum_healed' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME',
					yAxisID : 'y-axis-1'  
			   },
				{      
					label: 'Nombre de décès',
					type : "bar",
					field: 'sum_deceased' ,
					backgroundColor: "RED" ,
					borderColor: 'RED',
					yAxisID : 'y-axis-1'  
			   }
			],
			fontColors : CHART_FONT_COLORS["covid"]
		}, true)


		create_Chart(data, "covid-canvas-up-2", {

			title : "EVOLUTION CHRONOLOGIQUE DES INDICATEURS JOURNALIERS DU COVID-19",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},

			"y-axis-2" : {
				display : false,
				position : "right",
				labelString : "Nombre de cas"
			},		
			charts : [
				{      
					label: 'Nouveaux cas',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nouveaux guéris',
					type : "bar",
					field: 'new_healed' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME' ,
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nouveaux décès',
					type : "bar",
					field: 'new_deceased' ,
					backgroundColor: "RED" ,
					borderColor: 'RED' ,
					yAxisID : 'y-axis-1' 
			   }
			],
			 fontColors : CHART_FONT_COLORS["covid"]
		});



		create_Chart(data, "covid-canvas-up-3", {

			title : "SUIVI DES CAS CONFIRMES",
			label_field : "date_raw",			
			"x-axis-style" : "COVID",
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'y-axis-1' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});



		create_Chart(data, "covid-canvas-bottom-1", {

			title : "SUIVI DE L'INCIDENCE JOURNALIERE",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},

			"y-axis-2" : {
				display : true,
				position : "right",
				labelString : "% de cas d'infection"
			},
			charts : [
				{      
					label: "Taux d'incidence journalier",
					type : "line",
					field: "incidence" ,
					backgroundColor: "VIOLET" ,
					borderWidth: 1,
					borderColor: 'VIOLET' ,
					yAxisID : 'y-axis-2' ,
					pointRadius : 0
			   },
				{      
					label: 'Nouveaux cas',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'y-axis-1'
			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'nb_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'y-axis-1' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});

		create_Chart(data, "covid-canvas-bottom-2", {

			title : "SUIVI DES CAS DE GUERISON",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},
			"y-axis-2" : {
				display : true,
				position : "right",
				labelString : "% de cas guérison"
			},			
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE',
					yAxisID : 'y-axis-1'  
			   },
				{      
					label: 'Taux de guérison (%)',
					type : "line",
					field: 'remission' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME' ,
					yAxisID : 'y-axis-2',
					pointRadius : 0  
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});

		create_Chart(data, "covid-canvas-bottom-3", {

			title : "TAUX DE LÉTALITÉ",
			label_field : "date_raw",
			"x-axis-style" : "COVID",	
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},
			"y-axis-2" : {
				display : true,
				position : "right",
				labelString : "% de décès"
			},		
			charts : [
				{      
					label: 'Taux de létalité (CFR)',
					type : "line",
					field: 'letalite' ,
					backgroundColor: "CRIMSON" ,
					borderColor: 'RED' ,
					yAxisID : 'y-axis-2' ,
					pointRadius : 0 
			   },
				{      
					label: 'Nombre de cas confirmés',
					
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});


		create_Chart(data, "covid-canvas-bottom-4", {

			title : "DÉPISTAGES REALISÉS",
			label_field : "date_raw",
			"x-axis-style" : "COVID",			
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' 
			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'sum_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'y-axis-1' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});
	}	

/*
	function get_color( named_color , alpha){
		return color_helper( chartColors[named_color]).alpha(alpha).rgbString()
	}
*/