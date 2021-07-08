//app-covid-view.js

function create_navTabControllers_COVID(data){

	navtabController_COVID_UP =  new ui_render_navtabs ("#COVID-NAV-TAB-UP", {
			
				 id : "rstuw-1",
			default : "covid-tab-up-01",
	   nav_position : "top",
	   color_theme  : "dark",
	  spinner_class : "covid-spinner",

			   tabs : [
				{
					id : "covid-tab-up-01",
					name : "indicators",
					label : "indicateurs de suivi",
					html_content :  `${ get_chart_container( "covid-canvas-up-1" , 700, 200 ,'95%', '35vh')}`,
					enabled : true,
					visible : true
				}, 
				{
					id : "covid-tab-up-02",
					name : "indicators_daily",
					label : "Indicateurs journaliers",
					html_content : `${ get_chart_container( "covid-canvas-up-2" , 700, 200 ,'95%', '35vh')}`,
					enabled : true,
					visible : true
				},
				{ 
					id: "covid-tab-up-03", 
					name: "confirmed_cases_sum" , 
					label : "Cumul des cas confirmés", 
					html_content : `${ get_chart_container( "covid-canvas-up-3" , 700, 200 ,'95%', '35vh')}`,
					enabled : true,
					visible : true
				}
			]
		},

			function (info){ },

			function on_navtabs_load(){
				// Init data load
				//var covid_spinner = ui_spinner_create('.covid-chart-spinner')
				//load_COVID_DATA_IF_NEEDED(covid_spinner)
			}
		)

	navtabController_COVID_BOTTOM =  new ui_render_navtabs (

		"#COVID-NAV-TAB-BOTTOM", {
		
		          id : "rstuow-2",
	         default : "covid-tab-bottom-01",
	    nav_position : "top",
	    color_theme  : "dark",
	   spinner_class : "covid-spinner",
	   	      tabs : [
				{
					id : "covid-tab-bottom-01",
					name : "indicators",
					label : "Taux d'incidence quotidien",
					html_content :  `${get_chart_container( "covid-canvas-bottom-1" , 700, 200 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				}, 
				{
					id : "covid-tab-bottom-02",
					name : "indicators_healing",
					label : "Taux de guérison",
					html_content : `${get_chart_container( "covid-canvas-bottom-2" , 700, 200 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				},
				{ 
					id: "covid-tab-bottom-03", 
					name: "indicators_cfr" , 
					label : "Taux de létalité (CFR)", 
					html_content : `${get_chart_container( "covid-canvas-bottom-3" , 700, 200 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				},
				{
					id : "covid-tab-bottom-04",
					name : "depistage",
					label : "Dépistages",
					html_content : `${get_chart_container( "covid-canvas-bottom-4" , 700, 200 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				}
			]
		},
		function(info){}, 

		function on_navtabs_load(){
			// Init data load
			var covid_spinner = ui_spinner_create('.covid-chart-spinner')
			load_COVID_DATA_IF_NEEDED(covid_spinner)
		}
	)
}

