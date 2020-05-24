	


	function build_COVID_chart_component(  data ){
		var mvData = data.map(function(d){return d}) 


		create_Chart(data, "myChart_1", {

			title : "EVOLUTION CHRONOLOGIQUE DES INDICATEURS EPIDEMIOLODIQUE DU COVID-19",
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
					label: 'Nombre de cas actifs',
					type : "line",
					field: 'active_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE',
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nombre de cas guéris',
					type : "bar",
					field: 'sum_healed' ,
					backgroundColor: "GREEN" ,
					borderColor: 'GREEN',
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
			]
		})


		create_Chart(data, "myChart_2", {

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
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'nb_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY',
					yAxisID : 'y-axis-1'  
			   },
				{      
					label: 'Nouveaux cas',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "BLUE" ,
					borderColor: 'BLUE' ,
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nouveaux guéris',
					type : "bar",
					field: 'new_healed' ,
					backgroundColor: "GREEN" ,
					borderColor: 'GREEN' ,
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
			]
		});



		create_Chart(data, "myChart_3", {

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
			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'sum_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'y-axis-1' 
			   }
			 ]
		});



		create_Chart(data, "myChart_21", {

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
					borderWidth: 3,
					borderColor: 'VIOLET' ,
					yAxisID : 'y-axis-2' 
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
			 ]
		});

		create_Chart(data, "myChart_22", {

			title : "SUIVI DES CAS CONFIRMES",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
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
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'nb_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'y-axis-1' 
			   }
			 ]
		});
		create_Chart(data, "myChart_23", {

			title : "DÉPISTAGES REALISÉS",
			label_field : "date_raw",
			"x-axis-style" : "COVID",			
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "KAKI" ,
					borderColor: 'KAKI' 
			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'sum_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'y-axis-1' 
			   }
			 ]
		});
	}	




	function get_color( named_color , alpha){
		return color_helper( chartColors[named_color]).alpha(alpha).rgbString()
	}
