var default_table_selection = function(){return (this.name === "demographic")? 'selected = "selected"' : "";	};
var default_field_selection = function(){return (this.fld_name === "FLD1")? 'selected = "selected"' : "";	};

var metaDataBase = {
	data_base_name : "Atlas Sanitaire - Côte d'Ivoire  - RASS 2017 version 1.0.5",
	version : "3.0",
	date : "21/04/2019",
	geo_dataset :{
		name : "district_sante",
		label: "Découpage national en districts sanitaire",
		path : "./data/geojson/civ_district_sante.geojson"
	},
	tables : ["demographic", "human_ressource", "std"],
	color_palettes : [ 
			{name:"YlGnBu"}, 
			{name:"YlOrRd"}, 
			{name:"Purples"}, 
			{name:"PuBu"}, 
			{name:"BrBG"},
			{name :"Greys"}
		],
	table_selected : default_table_selection,
	table_details : [
		 {
			name : "demographic",
			label: "Données de population (2017)",
			unit: "population",
			article: "de ",
			path : "./data/statistics/rass_2017_demography.csv",
			source: "INS-2017",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name: "FLD1", short_name: "Population totale 2017", long_name: "Population totale 2017", data_type: "INT", unit: "population"},
				{ fld_name: "FLD2", short_name: "Population 0 à 11 mois", long_name: "Population 0 à 11 mois", data_type: "INT", unit: "population"},
				{ fld_name: "FLD3", short_name: "Population 0 à 4 ans", long_name: "Population 0 à 4 ans", data_type: "INT", unit: "population"},
				{ fld_name: "FLD4", short_name: "Population de moins de 15 ans", long_name: "Population de moins de 15 ans", data_type: "INT", unit: "population"},
				{ fld_name: "FLD5", short_name: "Population de 15 ans et plus", long_name: "Population de 15 ans et plus", data_type: "INT", unit: "population"},
				{ fld_name: "FLD6", short_name: "Femme en âge de procréer", long_name: "Femme en âge de procréer", data_type: "INT", unit: "population"},
				{ fld_name: "FLD7", short_name: "Grossesses attendues", long_name: "Grossesses attendues", data_type: "INT", unit: "population"},
				{ fld_name: "FLD8", short_name: "Naissances attendues", long_name: "Naissances attendues", data_type: "INT", unit: "population"},
				{ fld_name: "FLD9", short_name: "Complications obstétricales attendues", long_name: "Complications obstétricales attendues", data_type: "INT", unit: "effectif"}
		]},{
			name: "human_ressource",
			label: "Ressources humaines en santé en 2017",
			unit: "effectif",
			article: "d'",
			path : "./data/statistics/rass_2017_human_res.csv",
			source: "DRH/Ministère de la Santé et de l’Hygiène Publique",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [
				{fld_name: "FLD1" , short_name : "Total médécins (DRH)", long_name:"Effectif des médécins", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD2' , short_name : "Chirugien-Dentistes", long_name:"Effectif des churigiens dentistes", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD3' , short_name : "Pharmaciens", long_name:"Effectif des pharmaciens", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD4' , short_name : "Infirmiers diplômés d'état", long_name:"Effectif des infirmiers diplômés d'état", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD5' , short_name : "Infirmiers spécialistes", long_name:"Effectif des infirmiers spécialistes", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD6' , short_name : "Total Infirmier (DRH)", long_name:"Effectif total des infirmiers", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD7' , short_name : "sage-femme diplômées d'état", long_name:"Effectif des sages-femmes diplômées d'état", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD8' , short_name : "Sage-femme spécialisées", long_name:"Effectif des sages-femmes spécialistes", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD9' , short_name : "Total sage-femme (DRH)", long_name:"Effectif total des sages-femmes", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD10', short_name : "Techniciens Supérieurs en santé", long_name:"Effectif des techniciens supérieurs en santé", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD11', short_name : "Ingénieur en santé", long_name:"Effectif des ingénieurs de santé", data_type : "INT", unit: "effectif"},
				{fld_name: 'FLD12', short_name : "Aide Soignant", long_name:"Effectif des aides soignants", data_type : "INT", unit: "effectif"}
			
		]}, {
			name: "std",
			label: "Maladies sexuellement transmissibles",
			unit: "cas déclaré(s)",
			article: "de ",
			path : "./data/statistics/rass_2017_std.csv",
			source: "Ministère de la Santé et de l’Hygiène Publique",
			color_palette: "Purples",
			field_selected : default_field_selection,			
		    data_fields : [
				{ fld_name : "FLD1",  short_name : " 10-14 ans (F)" , long_name : " 10-14 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD2",  short_name : " 10-14 ans (M)" , long_name : " 10-14 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD3",  short_name : " 15-24 ans (F)" , long_name : " 15-24 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD4",  short_name : " 15-24 ans (M)" , long_name : " 15-24 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD5",  short_name : " 25-49 ans (F)" , long_name : " 25-49 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD6",  short_name : " 25-49 ans (M)" , long_name : " 25-49 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD7",  short_name : " 50 ans et plus (F)" , long_name : " 50 ans et plus (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD8",  short_name : " 50 ans et plus (M)" , long_name : " 50 ans et plus (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD9",  short_name : " Total cas d’écoulement génital " , long_name : " Total de cas d’écoulement génital (urétral /vaginal) diagnostiqués"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD10", short_name : " 10-14 ans (F)" , long_name : " 10-14 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD11", short_name : " 10-14 ans (M)" , long_name : " 10-14 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD12", short_name : " 15-24 ans (F)" , long_name : " 15-24 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD13", short_name : " 15-24 ans (M)" , long_name : " 15-24 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD14", short_name : " 25-49 ans (F)" , long_name : " 25-49 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD15", short_name : " 25-49 ans (M)" , long_name : " 25-49 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD16", short_name : " 50 ans et plus (F)" , long_name : " 50 ans et plus (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD17", short_name : " 50 ans et plus (M)" , long_name : " 50 ans et plus (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD18", short_name : " Total cas d’ulcération génitale" , long_name : " Total de cas d’ulcération génitale et/ou bubon diagnostiqués"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD19", short_name : " 10-14 ans (F)" , long_name : " 10-14 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD20", short_name : " 10-14 ans (M)" , long_name : " 10-14 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD21", short_name : " 15-24 ans (F)" , long_name : " 15-24 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD22", short_name : " 15-24 ans (M)" , long_name : " 15-24 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD23", short_name : " 25-49 ans (F)" , long_name : " 25-49 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD24", short_name : " 25-49 ans (M)" , long_name : " 25-49 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD25", short_name : " 50 ans et plus (F)" , long_name : " 50 ans et plus (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD26", short_name : " 50 ans et plus (M)" , long_name : " 50 ans et plus (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD27", short_name : " Total cas de douleurs testiculaires ou pelviennes" , long_name : " Total de cas de douleurs testiculaires/abdominales basses (pelviennes) diagnostiqués"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD28", short_name : " 10-14 ans (F)" , long_name : " 10-14 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD29", short_name : " 10-14 ans (M)" , long_name : " 10-14 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD30", short_name : " 15-24 ans (F)" , long_name : " 15-24 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD31", short_name : " 15-24 ans (M)" , long_name : " 15-24 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD32", short_name : " 25-49 ans (F)" , long_name : " 25-49 ans (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD33", short_name : " 25-49 ans (M)" , long_name : " 25-49 ans (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD34", short_name : " 50 ans et plus (F)" , long_name : " 50 ans et plus (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD35", short_name : " 50 ans et plus (M)" , long_name : " 50 ans et plus (M)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD36", short_name : " Total cas de condylome" , long_name : " Total de cas de condylome diagnostiqués"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD37", short_name : " Total cas d'IST Adultes (2017)" , long_name : " Nombre total des cas d'IST chez les Adultes 2017"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD38", short_name : " Nb total cas de conjonctivite du nouveau-né (F)" , long_name : " Nombre total de cas de  conjonctivite du nouveau-né diagnostiqués (Enfant 0-28 jours ) (F)"  , data_type : "INT", unit: "Nombre de cas"},
				{ fld_name : "FLD39", short_name : " Nb total de cas de conjonctivite (M)" , long_name : " Nombre total de cas de conjonctivite du nouveau-né diagnostiqués (Enfant 0-28 jours ) (M)"  , data_type : "INT", unit: "Nombre de cas"}
		  ]
        } 
	]	
};