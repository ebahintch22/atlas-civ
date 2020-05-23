var default_table_selection = function(){return (this.name === "demographic")? 'selected = "selected"' : "";	};
var default_field_selection = function(){return (this.fld_name === "FLD1")? 'selected = "selected"' : "";	};

var metaDataBase = {
	data_base_name : "Atlas Sanitaire - Côte d'Ivoire  - RASS 2017 version 1.0.5",
	version : "1.0",
	date : "21/04/2019",
	geo_dataset :{
		name : "district_sante",
		label: "Découpage national en districts sanitaire",
		//path : "./data/geojson/05_2020/civ_district_sante-light-2.geojson" },
		path : "./data/geojson/05_2020/shape-01.geojson" }, 
	tables : [
		"demographic",
		"human_ressource",
		"ratio_prestataire_pop",
		"repartition_etabliss_sante",
		"ratio_hrsn_espc_pop",
		"other_material",
		"tech_platform",
		"ratio_ambulance_structure_sante",
		"repartition_struct_transfusion",
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
			index : 1,
			valid: true,
			name : "demographic",
			table_num :"Tableau-DD",
			label: "1- Données de population (2017)",
			unit: "population",
			article: "de ",
			path : "./data/statistics/tab_01_demography.csv",
			source: "INS-2017",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name: "FLD1", short_name: "Population totale 2017", long_name: "Population totale 2017", data_type: "INT", unit: "habitants"},
				{ fld_name: "FLD2", short_name: "Population 0 à 11 mois", long_name: "Population 0 à 11 mois", data_type: "INT", unit: "habitants"},
				{ fld_name: "FLD3", short_name: "Population 0 à 4 ans", long_name: "Population 0 à 4 ans", data_type: "INT", unit: "habitants"},
				{ fld_name: "FLD4", short_name: "Population de moins de 15 ans", long_name: "Population de moins de 15 ans", data_type: "INT", unit: "habitants"},
				{ fld_name: "FLD5", short_name: "Population de 15 ans et plus", long_name: "Population de 15 ans et plus", data_type: "INT", unit: "habitants"},
				{ fld_name: "FLD6", short_name: "Nb. de femmes en âge de procréer", long_name: "Femme en âge de procréer", data_type: "INT", unit: "FAP"},
				{ fld_name: "FLD7", short_name: "Nb. de grossesses attendues", long_name: "Grossesses attendues", data_type: "INT", unit: "grossesses attendues"},
				{ fld_name: "FLD8", short_name: "Nb. de naissances attendues", long_name: "Naissances attendues", data_type: "INT", unit: "naissances attendues"},
				{ fld_name: "FLD9", short_name: "Nb. de Complications obstétricales attendues", long_name: "Complications obstétricales attendues", data_type: "INT", unit: "cas de complication attendus"}
			]
		},
		{
			index : 2,
			valid: true,
			name: "human_ressource",
			table_num :"Tableau-5",
			label: "2- Ressources des systèmes de santé - Personnel",
			unit: "effectif",
			article: "d'",
			path : "./data/statistics/tab_05_human_res.csv",
			source: "DRH/Ministère de la Santé et de l’Hygiène Publique",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [
				{fld_name: "FLD1" , short_name : "Eff. total des médécins (DRH)", long_name:"Effectif des médécins", data_type : "INT", unit: "médecin(s)"},
				{fld_name: 'FLD2' , short_name : "Eff. chirugien-Dentistes", long_name:"Effectif des churigiens dentistes", data_type : "INT", unit: "chirugien-dentiste(s)"},
				{fld_name: 'FLD3' , short_name : "Eff. de pharmaciens", long_name:"Effectif des pharmaciens", data_type : "INT", unit: "pharmacien(s)"},
				{fld_name: 'FLD4' , short_name : "Eff. en infirmiers diplômés d'état", long_name:"Effectif des infirmiers diplômés d'état", data_type : "INT", unit: "infirmier(s)"},
				{fld_name: 'FLD5' , short_name : "Eff. d'infirmiers spécialistes", long_name:"Effectif des infirmiers spécialistes", data_type : "INT", unit: "infirmier(s)"},
				{fld_name: 'FLD6' , short_name : "Nb total d'infirmier (DRH)", long_name:"Effectif total des infirmiers", data_type : "INT", unit: "infirmiers"},
				{fld_name: 'FLD7' , short_name : "Eff. des sage-femme diplômées d'état", long_name:"Effectif des sages-femmes diplômées d'état", data_type : "INT", unit: "sage(s)-femme(s)"},
				{fld_name: 'FLD8' , short_name : "Eff. des sage-femme spécialisées", long_name:"Effectif des sages-femmes spécialistes", data_type : "INT", unit: "sage(s) femme(s)"},
				{fld_name: 'FLD9' , short_name : "Eff. total sage-femme (DRH)", long_name:"Effectif total des sages-femmes", data_type : "INT", unit: "sage(s-femme(s)"},
				{fld_name: 'FLD10', short_name : "Eff. techniciens Sup. en santé", long_name:"Effectif des techniciens supérieurs en santé", data_type : "INT", unit: "Tehnicien(s) supérieur(s)"},
				{fld_name: 'FLD11', short_name : "Ingénieurs en santé", long_name:"Effectif des ingénieurs de santé", data_type : "INT", unit: "ingénieur(s) en santé"},
				{fld_name: 'FLD12', short_name : "Aides Soignants", long_name:"Effectif des aides soignants", data_type : "INT", unit: "aides soignants"}
			
			]
		}, 
		{
			index : 3,
			valid: true,
			name : "ratio_prestataire_pop", 
			table_num :"Tableau 6",
			label: "3- Ratio Prestataires de soins - Population",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_06_ratio_prestataire_pop.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Ratio Population/Médecin", long_name: " Ratio Population par Médecin", data_type : "INT", unit: "habitants par médecin", show_unit: true},
				{ fld_name : "FLD2", short_name : "Ratio Médecin/Population", long_name: " Ratio Médecin par Population", data_type : "INT", unit: "médecins pour 10 000 habitants", show_unit: true},
				{ fld_name : "FLD3", short_name : "Ratio population/Infirmier", long_name: " Ratio population par Infirmier", data_type : "INT", unit: "habitants par infirmier", show_unit: true},
				{ fld_name : "FLD4", short_name : "Ratio Infirmier/Population", long_name: " Ratio Infirmier par population", data_type : "INT", unit: "infirmiers pour 5 000 habitants", show_unit: true},
				{ fld_name : "FLD5", short_name : "Ratio FAP/Sage-femme", long_name: " Ratio Femme en âge de reproduction par Sage-femme", data_type : "INT", unit: "FAP par sage-femme", show_unit: true},
				{ fld_name : "FLD6", short_name : "Ratio Sage-femme/FAP", long_name: " Ratio Sagefemme par Femme en âge de reproduction", data_type : "INT", unit: "sage-femme pour 3 300 FAP", show_unit: true}
			]
		},
		{
			index : 4,
			valid: true,
			name : "repartition_etabliss_sante", 
			table_num :"Tableau-7",
			label: "4- Ressources des systèmes de santé - Etablissements",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_07_repartition_etabliss_sante.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1",  short_name : "ESPC Ruraux", long_name: "Etablissements sanitaires de premier contact (Ruraux)" , data_type : "INT",  unit: "ESPC Ruraux"},
				{ fld_name : "FLD2",  short_name : "ESPC Urbain", long_name: "Etablissements sanitaires de premier contact (Urbains)", data_type : "INT", unit: "ESPC urbains"},
				{ fld_name : "FLD3",  short_name : "ESPC (total)",  long_name: "Nombre total d'établissements sanitaires de premier contact", data_type : "INT", unit: "ESPC"},
				{ fld_name : "FLD4",  short_name : "Hopitaux Généraux Publics", long_name: "Hôpitaux généraux Public", data_type : "INT", unit: "hôpitaux publics"},
				{ fld_name : "FLD5",  short_name : "HG Privé Confessionnel", long_name: "Hôpitaux généraux privé confessionnel", data_type : "INT", unit: "hôpitaux"},
				{ fld_name : "FLD6",  short_name : "Hopitaux Généraux (total)", long_name: "Total HG", data_type : "INT", unit: "Hôpitaux généraux"},
				{ fld_name : "FLD7",  short_name : "Nombre de CHR", long_name: " Centres hospitaliers régionaux (CHR)", data_type : "INT", unit: "CHR"},
				{ fld_name : "FLD8",  short_name : "Total Hôpitaux de références", long_name: "Nombre total Hôpitaux de références (Publics + Privés + Confessionnels)", data_type : "INT", unit: "Hôpitaux de référence"},
				{ fld_name : "FLD9",  short_name : "Nb de centres CHU", long_name: " Centres hospitaliers universitaires (CHU)", data_type : "INT", unit: "CHU"},
				{ fld_name : "FLD10", short_name : "Nb de services de Maternité", long_name: " Service de Maternité", data_type : "INT", unit: "service(s) de maternité"},
				{ fld_name : "FLD11", short_name : "Nb de pharmacies publiques", long_name: " Pharmacie publique", data_type : "INT", unit: "pharmacie(s) publique(s)" },
				{ fld_name : "FLD12", short_name : "Nb de pharmacies privées", long_name: " Pharmacie privée", data_type : "INT", unit: "pharmacie(s) privée(s)"},
				{ fld_name : "FLD13", short_name : "Nb Total de structures Sanitaires (ESPC, HG, CHR et CHU)", long_name: " Total Structures Sanitaires (ESPC, HG, CHR et CHU)", data_type : "INT", unit: "établissements"},
				{ fld_name : "FLD14", short_name : "Total Structures Sanitaires (ESPC, HG, CHR)", long_name: " Total Structures Sanitaires (ESPC, HG, CHR)", data_type : "INT", unit: "établissements"}
			]
		},
		{				
			index : 5,
			valid: true,
			name : "ratio_hrsn_espc_pop", 
			table_num :"Tableau-8",
			label: "5- Ratio établissements de santé/Population",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_08_ratio_hrsn_espc_pop.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Ratio Population - ESPC", long_name: " Ratio Population par Etablissement Sanitaire de Premier Contact", data_type : "INT", unit: "habitants pour un ESPC", show_unit: true},
				{ fld_name : "FLD2", short_name : "Ratio ESPC - Population", long_name: " Ratio Etablissement Sanitaire de Premier Contact pour 10 000 habitants", data_type : "INT", unit: "ESPC pour 10 000 habitants", show_unit: true},
				{ fld_name : "FLD3", short_name : "Ratio Population - Hôpital de référence", long_name: " Ratio Population pour 1 Hôpital de référence", data_type : "INT", unit: "habitants par hôpital de réf.", show_unit: true},
				{ fld_name : "FLD4", short_name : "Ratio Hôpital de référence - Population", long_name: " Ratio Hôpital de référence pour 150 000 habitants", data_type : "INT", unit: "hôpitaux pour 150 000 habitants", show_unit: true}
			]
		},
		{				
			index : 6,
			valid: true,
			name : "other_material", 
			table_num :"Tableau-9",
			label: "6- Autres ressources materielles (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_09_other_material.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Nb de véhicules", long_name: "Nombre de véhicules", data_type : "INT", unit: "véhicule(s)"},
				{ fld_name : "FLD2", short_name : "Nb d'ambulances", long_name: "Nombre d'ambulances ", data_type : "INT", unit: "ambulance(s)"},
				{ fld_name : "FLD3", short_name : "Nb de motos", long_name: "Nombre de motos 2017", data_type : "INT", unit: "moto(s)"},
				{ fld_name : "FLD4", short_name : "Nb d'ordinateurs", long_name: " Ordinateurs ", data_type : "INT", unit: "ordinateur(s)"},
				{ fld_name : "FLD5", short_name : "Nb de réfrigérateurs", long_name: " Refrigerateur ", data_type : "INT", unit: "réfrigérateur(s)"},
				{ fld_name : "FLD6", short_name : "Nb de congélateurs", long_name: "Nombre de congélateurs", data_type : "INT", unit: "congélateur(s)"}
			]
		},
		{
			index : 7,
			valid: true,
			name : "tech_platform", 
			table_num :"Tableau-10",
			label: "7- Plateaux techniques et équipements (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_10_tech_platform.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name: "FLD1",  short_name: "Nb total labo. d'analyse", long_name: "Nombre de laboratoires d'analyse existants", data_type: "INT", unit: "laboratoire(s)"},
				{ fld_name: "FLD2",  short_name: "Nb labo. d'analyse fonctionnels", long_name: "Nombre de laboratoires d'analyse fonctionnels", data_type: "INT", unit: "laboratoire(s)"},
				{ fld_name: "FLD3",  short_name: "Nb labo. d'analyse non Fonctionnels", long_name: "Nombre de laboratoires d'analyse non fonctionnels", data_type: "INT", unit: "laboratoire(s)"},
				{ fld_name: "FLD4",  short_name: "Nb total blocs Opér.", long_name: "Nombre de blocs opératoires existant", data_type: "INT", unit: "bloc(s)"},
				{ fld_name: "FLD5",  short_name: "Nb blocs Opér. fonctionnels", long_name: "Nombre de blocs opératoires fonctionnels", data_type: "INT", unit: "bloc(s)"},
				{ fld_name: "FLD6",  short_name: "Nb blocs Opér. non fonctionnels", long_name: "Nombre de blocs opératoires non fonctionnels", data_type: "INT", unit: "blocs opératoire(s)"},
				{ fld_name: "FLD7",  short_name: "Nb total de services radio.", long_name: "Nombre de services de radiologie existants", data_type: "INT", unit: "service(s)"},
				{ fld_name: "FLD8",  short_name: "Nb services radio fonctionnels", long_name: "Nombre de services de radiologie fonctionnels", data_type: "INT", unit: "service(s)"},
				{ fld_name: "FLD9",  short_name: "Nb service radio non fonctionnels", long_name: "Nombre de services de radiologie non fonctionnels", data_type: "INT", unit: "service(s)"},
				{ fld_name: "FLD10", short_name: "Nb total Cab dentaires", long_name: "Nombre de cabinets dentaires existant", data_type: "INT", unit: "Nombre de cabinets"},
				{ fld_name: "FLD11", short_name: "Nb cab dentaires fonctionnels", long_name: "Nombre de cabinets dentaires onctionnels", data_type: "INT", unit: "Cabinet(s)"},
				{ fld_name: "FLD12", short_name: "Nb cab dentaires non fonctionnels ", long_name: "Nombre de cabinets dentaires non fonctionnels ", data_type: "INT", unit: "cabinet(s)"}
			]
		},
		{				
			index : 8,
			valid: true,
			name : "ratio_ambulance_structure_sante", 
			table_num :"Tableau-11",
			label: "8- Ratio ambulance par nombre de structure de soin (tab 11)",
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
			index : 9,
			valid: false,
			name : "repartition_struct_transfusion", 
			table_num :"Tableau-12",
			label: "9- Répartition géographique des dépôts/banques de sang (tab. 12)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_12_repartition_structure_transfusion.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Nombre de CTS", long_name : "Nombre de Centre de Transfusion Sanguine", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre de ATS", long_name : "Nombre d'Antenne de Transfusion Sanguine", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Nombre de dépôts/Banques de sang", long_name : "Nombre de dépôts/Banques de sang", data_type :  "INT", unit : "nombre" }
			]
		},

		{	
			index : 10,
			valid: false,
			name : "xxxxxxxxxxxxxxxxx", 
			table_num :"Tableau-13",
			label: "xxxxxx",
			unit: "Données du tableau 13",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Population à moins de 5 km d'un centre de santé (%)", long_name : "Population à moins de 5 km d'un centre de santé (%)", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Population entre 5 et 15 km d'un centre de santé (%)", long_name : "Population entre 5 et 15 km d'un centre de santé (%)", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Population au délà de 15 km d'un centre de santé (%)", long_name : "Population au délà de 15 km d'un centre de santé (%)", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD4", short_name : "Population au délà de 5 km d'un centre de santé (%)", long_name : "Population au délà de 5 km d'un centre de santé (%)", data_type :  "INT", unit : "nombre" }
			]
		},	
		{
			name: "std",
			valid: false,
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
        },

		

		{	
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-14",
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Population totale 2017", long_name : "Population totale 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre total de Consultants 2017", long_name : "Nombre total de Consultants 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Taux d'utilisation 2017(%)", long_name : "Taux d'utilisation 2017(%)", data_type :  "INT", unit : "nombre" }
			]
		},

		{	
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-15",
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Population totale 2017", long_name : "Population totale 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre total de Consultants ESPC 2017", long_name : "Nombre total de Consultants ESPC 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Taux d'utilisation ESPC 2017 (%)", long_name : "Taux d'utilisation ESPC 2017 (%)", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD4", short_name : "Nombre total de Consultants Hopitaux de reference (HG & CHR) 2017", long_name : "Nombre total de Consultants Hopitaux de reference (HG & CHR) 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD5", short_name : "Taux d'utilisation HR (HG&2017 (%)", long_name : "Taux d'utilisation HR (HG&2017 (%)", data_type :  "INT", unit : "nombre" }
			]
		},

		{	
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-16",
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Population totale", long_name : " Population totale", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre de Consultations 2017", long_name : "Nombre de Consultations 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Taux de fréquentation 2017 (%)", long_name : "Taux de fréquentation 2017 (%)", data_type :  "INT", unit : "nombre" }
			]
		},

		{	
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-17",
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [					
				{ fld_name : "FLD1", short_name : "Population totale 2017", long_name : "Population totale 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Total Consultations ESPC 2017", long_name : "Total Consultations ESPC 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Taux de frequentation ESPC", long_name : "Taux de frequentation ESPC", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD4", short_name : "Nombre total de consultation HR (CHR&HG) 2017", long_name : "Nombre total de consultation HR (CHR&HG) 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD5", short_name : "Taux de frequentation HR (HG&CHR) 2017 (%)", long_name : "Taux de frequentation HR (HG&CHR) 2017 (%)", data_type :  "INT", unit : "nombre" }
			]
		},
		{	
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-18",
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [					
				{ fld_name : "FLD1", short_name : "Nombre total de consultants ESPC 2017", long_name : "Nombre total de consultants ESPC 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre Total Consultants HG et CHR 2017", long_name : "Nombre Total Consultants HG et CHR 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Nombre Total Consultants EPN/CHU 2017", long_name : "Nombre Total Consultants EPN/CHU 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD4", short_name : "Total Consultants 2017", long_name : "Total Consultants 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD5", short_name : "Proportion Consultants ESPC 2017 (%)", long_name : "Proportion Consultants ESPC 2017 (%)", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD6", short_name : "Proportion Consultants HG & CHR 2017 (%)", long_name : "Proportion Consultants HG & CHR 2017 (%)", data_type :  "INT", unit : "nombre" }
			]
		},
		{	
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-19",
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [					
				{ fld_name : "FLD1", short_name : "Nombre total de Consultations ESPC 2017", long_name : " Nombre total de Consultations ESPC 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Total Consultations HG et CHR 2017", long_name : "Total Consultations HG et CHR 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Total Consultations EPN/CHU 2017", long_name : "Total Consultations EPN/CHU 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD4", short_name : "Total Consultations 2017 (%)", long_name : "Total Consultations 2017 (%)", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD5", short_name : "Consultations ESPC 2017(%)", long_name : "Consultations ESPC 2017(%)", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD6", short_name : "Consultation HG & CHR 2017", long_name : "Consultation HG & CHR 2017", data_type :  "INT", unit : "nombre" }
			]
		}

	]	
};