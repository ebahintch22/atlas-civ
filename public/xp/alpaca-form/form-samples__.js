


{
	"index" : 1,
	"name" : "covid-19-june16", 
	"group" : "SPECIAL",
	"valid" : true,
	"table_num" : "Tableau-98",			
	"layerList" : [  "district_sante", "region_sante" ],
	"label" : "01- Incidence nationale de la COVID-19 (Carto actualisée au 16/06/2020)",
	"unit" : "nombre de cas",
	"article" : "de ",
	"path" : "data/statistics/tab_98_covid_june16.csv",
	"source" : "DIIS/INS",
	"data_parser" : "DEFAULT_PARSER",
	"renderer" : {
		"default" : {
			   "source" : "manual",
			"threshold" : [ 1, 5, 10, 100, 1000],
			 "colormap" : ["#ffffff" , "#fcf285", "#F6B20D" , "#CC5526", "#C22C1C" , "#660207"],  
			 "labelmap" : ["Aucun cas" , "", "Incidence faible", "Incidence Moyenne" , "Incidence élevée", "Epicentres"],
		  "legendtitle" : "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
		 "select_style" : "blueish"
		}
	},
	"layout" : "COVID",
	"color_palette" : "YlOrRd",
	"charts" : {
		"color" : "RED"
	},
	"field_selected" : "default_field_selection",
	"data_fields" : [
		{
	 		"fld_name" : "FLD1",
	 		"short_name" : " Nombre de cas confirmés de COVID-19",
	 		"long_name" : "COVID-19: Répartition des cas confirmés (au 16 juin 2020)",
	 		"data_type" : "INT",
	 		"unit" : "cas confirmés de COVID-19",
	 		"renderer" : {
	 			"default" : {
		 			"source" : "manual",
		 			"threshold" : [1, 5, 10, 100, 1000],
		 			"colormap" : ["#ffffff", "#fcf285", "#F6B20D", "#CC5526", "#C22C1C", "#660207"],
		 			"labelmap" : ["Aucun cas", "", "Incidence faible", "Incidence Moyenne", "Incidence élevée", "Epicentres"],
		 			"legendtitle" : "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
		 			"select_style" : "blueish"
		 		}
	 		}
	 	},
	 	{
	 		"fld_name" : "FLD2",
	 		"short_name" : "Nb de décès dus à la COVID-19",
	 		"long_name" : "Nombre de décès dus à la COVID-19 (au 16 juin 2020)",
	 		"data_type" : "INT",
	 		"unit" : "décès dus à la COVID-19",
	 		"renderer" : {
	 			"default" : {
		 			"source" : "manual",
		 			"threshold" : [1, 5, 10, 20],
		 			"colormap" : ["#ffffff", "#fcf285", "#F6B20D", "#CC5526", "#660207"],
		 			"labelmap" : ["Aucun décès", "1 à 4 décès", "5 à 9 décès", "10 à 19 décès", "plus de 20 décès"],
		 			"legendtitle" : "Incidence  de la maladie à Covid-19 (nb. de décès)",
		 			"select_style" : "blueish"
		 		}
	 		}
	 	}
	 ]

}