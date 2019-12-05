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
	tables : [
		"demographic",
		"human_ressource",
		"ratio_prestataire_pop",
		"repartition_etabliss_sante",
		"ratio_hrsn_espc_pop",
		"other_material",
		"tech_platform",
		"ratio_ambulance_structure_sante",
		"std"
	],
	color_palettes : [ 
			{ name:"YlGnBu"}, 
			{ name:"YlOrRd"}, 
			{ name:"Purples"}, 
			{ name:"PuBu"}, 
			{ name:"BrBG"},
			{ name :"Greys"}
		],
	table_selected : default_table_selection,
	table_details : [
		 {
			name : "demographic",
			table_num :"Tableau-DD",
			label: "Données de population (2017)",
			unit: "population",
			article: "de ",
			path : "./data/statistics/tab_01_demography.csv",
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
				{ fld_name: "FLD7", short_name: "Grossesses attendues", long_name: "Grossesses attendues", data_type: "INT", unit: "nombre de grossesses"},
				{ fld_name: "FLD8", short_name: "Naissances attendues", long_name: "Naissances attendues", data_type: "INT", unit: "nombre de naissances"},
				{ fld_name: "FLD9", short_name: "Complications obstétricales attendues", long_name: "Complications obstétricales attendues", data_type: "INT", unit: "Nombre de complications"}
			]
		},
		{
			name: "human_ressource",
			table_num :"Tableau-5",
			label: "Ressources humaines en santé en 2017",
			unit: "effectif",
			article: "d'",
			path : "./data/statistics/tab_05_human_res.csv",
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
			
			]
		}, 
		{
			name : "ratio_prestataire_pop", 
			table_num :"Tableau 6",
			label: "Ratio prestataires de soins /Population (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_06_ratio_prestataire_pop.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Ratio Population par Médecin", long_name: " Ratio Population par Médecin", data_type : "INT", unit: "Ratio"},
				{ fld_name : "FLD2", short_name : "Ratio Médecin par Population", long_name: " Ratio Médecin par Population", data_type : "INT", unit: "Ratio"},
				{ fld_name : "FLD3", short_name : "Ratio population par Infirmier", long_name: " Ratio population par Infirmier", data_type : "INT", unit: "Ratio"},
				{ fld_name : "FLD4", short_name : "Ratio Infirmier par population", long_name: " Ratio Infirmier par population", data_type : "INT", unit: "Ratio"},
				{ fld_name : "FLD5", short_name : "Ratio Femme en âge de reproduction par Sage-femme", long_name: " Ratio Femme en âge de reproduction par Sage-femme", data_type : "INT", unit: "Ratio"},
				{ fld_name : "FLD6", short_name : "Ratio Sagefemme par Femme en âge de reproduction", long_name: " Ratio Sagefemme par Femme en âge de reproduction", data_type : "INT", unit: "Ratio"}
			]
		},
		{
			name : "repartition_etabliss_sante", 
			table_num :"Tableau-7",
			label: "Répartition des établissements de santé (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_07_repartition_etabliss_sante.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Ruraux", long_name: " Ruraux", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD2", short_name : "Urbain", long_name: " Urbain", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD3", short_name : "Total ESPC", long_name: " Total ESPC", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD4", short_name : "Public", long_name: " Public", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD5", short_name : "Privé Confessionnel", long_name: " Privé Confessionnel", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD6", short_name : "Total HG", long_name: " Total HG", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD7", short_name : "Centres hospitaliers régionaux (CHR)", long_name: " Centres hospitaliers régionaux (CHR)", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD8", short_name : "Total Hôpitaux de références (Publics+Privés+Confessionnels)", long_name: " Total Hôpitaux de références (Publics+Privés+Confessionnels)", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD9", short_name : "Centres hospitaliers universitaires (CHU)", long_name: " Centres hospitaliers universitaires (CHU)", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD10", short_name : "Service de Maternité", long_name: " Service de Maternité", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD11", short_name : "Pharmacie publique", long_name: " Pharmacie publique", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD12", short_name : "Pharmacie privée", long_name: " Pharmacie privée", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD13", short_name : "Total  Structures Sanitaires (ESPC, HG, CHR et CHU)", long_name: " Total  Structures Sanitaires (ESPC, HG, CHR et CHU)", data_type : "INT", unit: "Nombre d'établissements"},
				{ fld_name : "FLD14", short_name : "Total Structures Sanitaires (ESPC, HG, CHR)", long_name: " Total Structures Sanitaires (ESPC, HG, CHR)", data_type : "INT", unit: "Nombre d'établissements"}
			]
		},
		{				
			name : "ratio_hrsn_espc_pop", 
			table_num :"Tableau-8",
			label: "Ratio établissements de santé/Population (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_08_ratio_hrsn_espc_pop.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Population/ESPC", long_name: " Ratio Population pour 1 Etablissement Sanitaire de Premier Contact", data_type : "INT", unit: "Ratio"},
				{ fld_name : "FLD2", short_name : "ESPC/habitants", long_name: " Ratio Etablissement Sanitaire de Premier Contact pour 10 000 habitants", data_type : "INT", unit: "Ratio"},
				{ fld_name : "FLD3", short_name : "Population/Hôpital de référence", long_name: " Ratio Population pour 1 Hôpital de référence", data_type : "INT", unit: "Nombre"},
				{ fld_name : "FLD4", short_name : "Hôpital de référence/habitants", long_name: " Ratio Hôpital de référence pour 150 000 habitants", data_type : "INT", unit: "Ratio"}
			]
		},
		{				
			name : "other_material", 
			table_num :"Tableau-9",
			label: "Autres ressources materielles (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_09_other_material.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Nb de véhicules", long_name: " Véhicules 2017", data_type : "INT", unit: "Nombre de véhicules"},
				{ fld_name : "FLD2", short_name : "Nb d'ambulances", long_name: " Ambulances 2017", data_type : "INT", unit: "Nombre d'ambulances"},
				{ fld_name : "FLD3", short_name : "Nb de motos", long_name: " Motos 2017", data_type : "INT", unit: "Nombre de motos"},
				{ fld_name : "FLD4", short_name : "Nb d'ordinateurs", long_name: " Ordinateurs 2017", data_type : "INT", unit: "Nombre d'ordinateurs"},
				{ fld_name : "FLD5", short_name : "Nb Réfrigérateurs", long_name: " Refrigerateur 2017", data_type : "INT", unit: "Nombre de réfrigérateurs"},
				{ fld_name : "FLD6", short_name : "Nb Congélateurs", long_name: " Congélateurs 2017", data_type : "INT", unit: "Nombre de congélateurs"}
			]
		},
		{
			name : "tech_platform", 
			table_num :"Tableau-10",
			label: "Plateaux techniques et équipements (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_10_tech_platform.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name: "FLD1",  short_name: "Nb total labo. d'analyse", long_name: "Nombre de laboratoires d'analyse existants", data_type: "INT", unit: "Nombre de laboratoire"},
				{ fld_name: "FLD2",  short_name: "Nb labo. d'analyse fonctionnels", long_name: "Nombre de laboratoires d'analyse fonctionnels", data_type: "INT", unit: "Nombre de laboratoire"},
				{ fld_name: "FLD3",  short_name: "Nb labo. d'analyse non Fonctionnels", long_name: "Nombre de laboratoires d'analyse non fonctionnels", data_type: "INT", unit: "Nombre de laboratoire"},
				{ fld_name: "FLD4",  short_name: "Nb total blocs Opér.", long_name: "Nombre de blocs opératoires existant", data_type: "INT", unit: "Nombre de blocs"},
				{ fld_name: "FLD5",  short_name: "Nb blocs Opér. fonctionnels", long_name: "Nombre de blocs opératoires fonctionnels", data_type: "INT", unit: "Nombre de blocs"},
				{ fld_name: "FLD6",  short_name: "Nb blocs Opér. non fonctionnels", long_name: "Nombre de blocs opératoires non fonctionnels", data_type: "INT", unit: "Nombre de blocs"},
				{ fld_name: "FLD7",  short_name: "Nb total de services radio.", long_name: "Nombre de services de radiologie existants", data_type: "INT", unit: "Nombre de services"},
				{ fld_name: "FLD8",  short_name: "Nb services radio fonctionnels", long_name: "Nombre de services de radiologie fonctionnels", data_type: "INT", unit: "Nombre de services"},
				{ fld_name: "FLD9",  short_name: "Nb service radio non fonctionnels", long_name: "Nombre de services de radiologie non fonctionnels", data_type: "INT", unit: "Nombre de services"},
				{ fld_name: "FLD10", short_name: "Nb total Cab dentaires", long_name: "Nombre de cabinets dentaires existant", data_type: "INT", unit: "Nombre de cabinets"},
				{ fld_name: "FLD11", short_name: "Nb cab dentaires fonctionnels", long_name: "Nombre de cabinets dentaires onctionnels", data_type: "INT", unit: "Nombre de cabinets"},
				{ fld_name: "FLD12", short_name: "Nb cab dentaires non fonctionnels ", long_name: "Nombre de cabinets dentaires non fonctionnels ", data_type: "INT", unit: "Nombre de cabinets"}
			]
		},
		{				
			name : "ratio_ambulance_structure_sante", 
			table_num :"Tableau-11",
			label: "Ratio ambulance par nombre de structure de soin",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_11_ratio_ambulance_structure_sante.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [				
				{ fld_name : "FLD1", short_name : "Total Structures Sanitaires (ESPC,HG, CHR)", long_name: " Total Structures Sanitaires (ESPC,HG, CHR)", data_type : "INT", unit: "Nombre"},
				{ fld_name : "FLD2", short_name : "Nb Ambulances (2017)", long_name: " Nb total d'ambulances en 2017", data_type : "INT", unit: "Nombre"},
				{ fld_name : "FLD3", short_name : "Ratio Ambulances / Structures de soins", long_name: " Ratio Ambulances par Structures de soins (ESPC, HG et CHR)", data_type : "INT", unit: "ratio"},
				{ fld_name : "FLD4", short_name : "Ratio structures de soins pour une Ambulances", long_name: " Ratio nombre de structures de soins (ESPC, HG et CHR) pour une Ambulances", data_type : "INT", unit: "ratio"}
			]
		},
		{
			name: "std",
			table_num :"Tableau-45",
			label: "Maladies sexuellement transmissibles",
			unit: "cas déclaré(s)",
			article: "de ",
			path : "./data/statistics/tab_45_std.csv",
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
