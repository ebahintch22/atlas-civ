

var metaDataBase = {

	data_base_name : "Atlas Sanitaire - Côte d'Ivoire  - RASS 2017 version 1.0.5",
	version : "2.0",
	date : "21/05/2020",
	default_theme : "covid-19-june16",
	geo_dataset :{
		name : "district_sante",
		class: "Districts sanitaire",
		label: "Découpage en <b> districts sanitaires (83)</b>",
		path : `${PATH_PREFIX}data/geojson/health/civ-district-sante.geojson`
	},
	orderby_num: function(fld){
		var themes_arr = this.table_details;
		themes_arr.sort(function( a,b ){ return ( a[fld] - b[fld]) })
		//console.log( themes_arr )
	},
	orderby_str: function(fld){
		var themes_arr = this.table_details;
		themes_arr.sort(function( a,b ){ return ('' + a[fld].attr).localeCompare(b[fld].attr); })
		//console.log( themes_arr )
	},
	geo_datasets :[
		{
			id : "layer-1",
			name : "region_sante",
			names : {
				value : "Région sanitaire",
				many: "Régions sanitaires",
				abbr : "RS."
			},			
			label: "Découpage en régions sanitaires (20)",
			path : `${PATH_PREFIX}data/geojson/health/civ-region-sante.geojson`,
			idfield : "code_R",
			labelField :"Region_S"
		},
		{
			id : "layer-2",
			name : "district_sante",
			names : {
				value : "District sanitaire",
				many: "Districts sanitaires",
				abbr : "DS."
			},
			label: "Découpage en districts sanitaires (83)",
			path : `${PATH_PREFIX}data/geojson/health/civ-district-sante.geojson`,
			idfield : "code",
			labelField :"District_S"
		},	
		{
			id : "layer-3",
			name : "district_admin",
			names : {
				value : "District administratif",
				many : "Districts administratifs",
				 abbr : "Dst."
			},
			label: "Découpage en districts administratifs (14)",
			path : `${PATH_PREFIX}data/geojson/tmp/civ-adm1-district-r2.geojson`,
			idfield : "code",
			labelField :"admin1Name"
		},
		{
			id : "layer-4",
			name : "region_admin",
			names : {
				value : "Région administrative",
				many :  "Régions administratives",
				 abbr : "Rgn."
			},
			label: "Découpage en régions administratives (33)",
			path :  `${PATH_PREFIX}data/geojson/tmp/civ-adm2-region-r2.geojson`,
			idfield : "admin2Pcod",
			labelField :"admin2Name"
		}	
	],	
	tables : [
		"02_demographic",
		"human_ressource",
		"ratio_prestataire_pop",
		"repartition_etabliss_sante",
		"ratio_hrsn_espc_pop",
		"other_material",
		"tech_platform",
		"ratio_ambulance_structure_sante",
		"repartition_struct_transfusion",
		"std",
		"covid-19",
		"covid-19-june16",
		"geographic_accessibility",
		"taux_utilisation_serv_sante",
		"taux_util_serv_sante_par_etablissmnt",
		"taux_frequentation_service_sante",
		"taux_frequentation",
		"nombre_consultations",
		"effectif_consultant",
		"paludisme_u5_ans",
		"paludisme_glo",
		"incidence_IRA_u5_ans",
		"incidence_IRA_glo",
		"incidence_anemie",
		"incidence_coqueluche",
		"deces_notifie_et_causes"
	],
	tables_promoted : [
		"covid-19-june16",
		"geographic_accessibility",
		"taux_util_serv_sante_par_etablissmnt",
		"taux_frequentation_service_sante",
		"taux_frequentation"
	],	
	classes : [
		{
			name : "class1 name",
			children : [
				"tech_platform",
				"ratio_ambulance_structure_sante",
				"repartition_struct_transfusion",
				"std",
				"covid-19",
				"covid-19-june16",
				"geographic_accessibility",
				"taux_utilisation_serv_sante"
			]
		},
		{
			name : "class2 name",
			children : [
				"taux_util_serv_sante_par_etablissmnt",
				"taux_frequentation_service_sante",
				"taux_frequentation",
				"effectif_consultant",
				"paludisme_u5_ans",
				"paludisme_glo",
				"incidence_IRA_u5_ans",
				"incidence_IRA_glo",
				"incidence_anemie",
				"incidence_coqueluche",
				"deces_notifie_et_causes"
			]
		},		
		{
			name : "class3 name",
			children : [
				"taux_util_serv_sante_par_etablissmnt",
				"taux_frequentation_service_sante",
				"taux_frequentation",
				"effectif_consultant",
				"paludisme_u5_ans",
				"paludisme_glo",
				"incidence_IRA_u5_ans",
				"incidence_IRA_glo",
				"incidence_anemie",
				"incidence_coqueluche",
				"deces_notifie_et_causes"
			]
		}
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
			name : "covid-19-june16", 
			group: "SPECIAL",
			valid: true,
			table_num : "Tableau-98",			
			layerList : [  "district_sante", "region_sante" ],
			label: "01- Incidence nationale de la COVID-19 (Carto actualisée au 16/06/2020)",
			unit: "nombre de cas",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_98_covid_june16.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : {
				default : {
					   source : "manual",
					threshold : [ 1, 5, 10, 100, 1000],
					 colormap : ['#ffffff' , '#fcf285', '#F6B20D' , '#CC5526', '#C22C1C' , '#660207'],  
					 labelmap : ['Aucun cas' , "", "Incidence faible", "Incidence Moyenne" , "Incidence élevée", "Epicentres"],
				  legendtitle : "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
				 select_style : "blueish"
				}
			},
			layout : "COVID",
			color_palette: "YlOrRd",
			charts : {
				color : "RED"
			},
			field_selected : default_field_selection,
			data_fields : [
				{
			 		fld_name: "FLD1",
			 		short_name: " Nombre de cas confirmés de COVID-19",
			 		long_name: "COVID-19: Répartition des cas confirmés (au 16 juin 2020)",
			 		data_type: "INT",
			 		unit: "cas confirmés de COVID-19",
			 		renderer: {
			 			default: {
				 			source: "manual",
				 			threshold: [1, 5, 10, 100, 1000],
				 			colormap: ['#ffffff', '#fcf285', '#F6B20D', '#CC5526', '#C22C1C', '#660207'],
				 			labelmap: ['Aucun cas', "", "Incidence faible", "Incidence Moyenne", "Incidence élevée", "Epicentres"],
				 			legendtitle: "Incidence  de la maladie à Covid-19 (nb. cas confirmés)",
				 			select_style : "blueish"
				 		}
			 		}
			 	},
			 	{
			 		fld_name: "FLD2",
			 		short_name: "Nb de décès dus à la COVID-19",
			 		long_name: "Nombre de décès dus à la COVID-19 (au 16 juin 2020)",
			 		data_type: "INT",
			 		unit: "décès dus à la COVID-19",
			 		renderer: {
			 			default: {
				 			source: "manual",
				 			threshold: [1, 5, 10, 20],
				 			colormap: ['#ffffff', '#fcf285', '#F6B20D', '#CC5526', '#660207'],
				 			labelmap: ['Aucun décès', "1 à 4 décès", "5 à 9 décès", "10 à 19 décès", "plus de 20 décès"],
				 			legendtitle: "Incidence  de la maladie à Covid-19 (nb. de décès)",
				 			select_style : "blueish"
				 		}
			 		}
			 	}
			 ]

		},
		{
			index : 2,
			name : "covid-19", 			
			group: "SPECIAL",
			valid: false,
			table_num : "Tableau-99",			
			layerList : [ "region_admin", "district_admin" ],
			label: "1- Incidence nationale de la COVID-19 (deprecated)",
			unit: "nombre de cas",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_99_covid.csv`,
			source: "DIIS/INS",
			data_parser : COVID_PARSER,
			renderer : {
				   source : "manual",
				threshold : [ 1, 4, 10, 100],
				 colormap :    [ "#ffffff", "#ea7f7f" , "#e03e3e",  "#a70606",  "#710505"],  
				 labelmap : ['Aucun cas' , "Incidence faible", "Incidence Moyenne" , "Incidence forte", "Epicentre"],
			  legendtitle : "Incidence  de la maladie à Covid-19 (nb. cas confirmés)"
			},
			layout : "COVID",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [					
				{ 
					fld_name : "FLD1",
					short_name : "Nb de cas confirmés à la maladie à COVID-19", 
					long_name : " Nombre de cas confirmés de COVID-19", 
					data_type :  "INT", 
					unit : "cas confirmés de COVID-19" 
				}
			]
		},
		{
			index : 3,
			valid: true,
			name : "02_demographic",
			group: "DEMOGRAPHIE",
			layerList : [  "district_sante", "region_sante" ],
			table_num :"Tableau-DD",
			label: "02- Données de population (2017)",
			unit: "population",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_01_demography.csv`,
			source: "INS-2017",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 9 , [] , ['white', 'red']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{
					fld_name: "FLD1",
					short_name: "Population totale 2017",
					long_name: "Population totale 2017",
					data_type: "INT",
					unit: "habitants",
					renderer : {
			 			"default": {
							source: "manual",
							threshold: [ 500000, 1000000, 1500000, 2000000, 3000000 ],
							colormap:   ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'],
							linecolor: "#fff",
							labelmap:  [ "moins de 500m", "500-400m", "1000-1500m" , "1500-2000m" , "2000-3000m", "3000m et plus" ],
							legendtitle: "Population totale 2017 par Région",
				 			select_style : "blueish"
						},
			 			"district_sante": {
							source: "manual",
							threshold: [ 50000, 100000, 200000, 500000, 1000000 ],
							colormap:  ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'],
							linecolor: "#fff",
							labelmap:  [ "moins de 50m", "50-100m", "100-200m" , "200-500m" , "500-1000m", "1000m et +" ],
							legendtitle: "Population totale 2017 par district",
				 			select_style : "blueish"
						}						
					}
				},
				{
					fld_name: "FLD2",
					short_name: "Population 0 à 11 mois",
					long_name: "Population 0 à 11 mois",
					data_type: "INT",
					unit: "habitants"
				},
				{
					fld_name: "FLD3",
					short_name: "Population 0 à 4 ans",
					long_name: "Population 0 à 4 ans",
					data_type: "INT",
					unit: "habitants"
				},
				{
					fld_name: "FLD4",
					short_name: "Population de moins de 15 ans",
					long_name: "Population de moins de 15 ans",
					data_type: "INT",
					unit: "habitants"
				},
				{
					fld_name: "FLD5",
					short_name: "Population de 15 ans et plus",
					long_name: "Population de 15 ans et plus",
					data_type: "INT",
					unit: "habitants"
				},
				{
					fld_name: "FLD6",
					short_name: "Nb. de femmes en âge de procréer",
					long_name: "Femme en âge de procréer",
					data_type: "INT",
					unit: "FAP"
				},
				{
					fld_name: "FLD7",
					short_name: "Nb. de grossesses attendues",
					long_name: "Grossesses attendues",
					data_type: "INT",
					unit: "grossesses attendues"
				},
				{
					fld_name: "FLD8",
					short_name: "Nb. de naissances attendues",
					long_name: "Naissances attendues",
					data_type: "INT",
					unit: "naissances attendues"
				},
				{
					fld_name: "FLD9",
					short_name: "Nb. de Complications obstétricales attendues",
					long_name: "Complications obstétricales attendues",
					data_type: "INT",
					unit: "cas de complication attendus"
				}
			]

		},
		{
			index : 4,
			valid: true,
			name: "03_human_ressource",
			group: "RESSOURCES EN SANTE",
			layerList : [  "district_sante", "region_sante" ],
			table_num :"Tableau-3",
			label: "03- Ressources des systèmes de santé - Personnel",
			unit: "effectif",
			article: "d'",
			path : `${PATH_PREFIX}data/statistics/tab_05_human_res.csv`,
			source: "DRH/Ministère de la Santé et de l’Hygiène Publique",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'red']),
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
			index : 5,
			valid: true,
			name : "04_ratio_prestataire_pop", 
			group: "RESSOURCES EN SANTE",
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau 6",
			label: "04- Ratio Prestataires de soins - Population",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_06_ratio_prestataire_pop.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,			
			renderer : get_renderer( 5 , [] , ['white', 'orange']),
			color_palette: "BrBG",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Ratio Population/Médecin", long_name: " Ratio Population par Médecin", data_type : "INT", unit: "habitants par médecin", "show_unit": true},
				{ fld_name : "FLD2", short_name : "Ratio Médecin/Population", long_name: " Ratio Médecin par Population", data_type : "INT", unit: "médecins pour 10 000 habitants", "show_unit": true},
				{ fld_name : "FLD3", short_name : "Ratio population/Infirmier", long_name: " Ratio population par Infirmier", data_type : "INT", unit: "habitants par infirmier", "show_unit": true},
				{ fld_name : "FLD4", short_name : "Ratio Infirmier/Population", long_name: " Ratio Infirmier par population", data_type : "INT", unit: "infirmiers pour 5 000 habitants", "show_unit": true},
				{ fld_name : "FLD5", short_name : "Ratio FAP/Sage-femme", long_name: " Ratio Femme en âge de reproduction par Sage-femme", data_type : "INT", unit: "FAP par sage-femme", "show_unit": true},
				{ fld_name : "FLD6", short_name : "Ratio Sage-femme/FAP", long_name: " Ratio Sagefemme par Femme en âge de reproduction", data_type : "INT", unit: "sage-femme pour 3 300 FAP", "show_unit": true}
			]
		},
		{
			index : 6,
			valid: true,
			name : "repartition_etabliss_sante", 
			group: "RESSOURCES EN SANTE",
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-7",
			label: "05- Ressources des systèmes de santé - Etablissements",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_07_repartition_etabliss_sante.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,			
			renderer : get_renderer( 5 , [] , ['white', 'orange']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1",  short_name : "Nombre d'ESPC Ruraux", long_name: "Etablissements sanitaires de premier contact (Ruraux)" , data_type : "INT",  unit: "ESPC Ruraux"},
				{ fld_name : "FLD2",  short_name : "Nombre d'ESPC Urbain", long_name: "Etablissements sanitaires de premier contact (Urbains)", data_type : "INT", unit: "ESPC urbains"},
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
			index : 7,
			valid: true,
			name : "ratio_hrsn_espc_pop", 
			group: "RESSOURCES EN SANTE",
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-8",
			label: "06- Ratio établissements de santé/Population",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_08_ratio_hrsn_espc_pop.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,			
			renderer : get_renderer( 5 , [] , ['white', 'green']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{ fld_name : "FLD1", short_name : "Ratio Population - ESPC", long_name: " Ratio Population par Etablissement Sanitaire de Premier Contact", data_type : "INT", unit: "habitants pour un ESPC", "show_unit": true},
				{ fld_name : "FLD2", short_name : "Ratio ESPC - Population", long_name: " Ratio Etablissement Sanitaire de Premier Contact pour 10 000 habitants", data_type : "INT", unit: "ESPC pour 10 000 habitants", "show_unit": true},
				{ fld_name : "FLD3", short_name : "Ratio Population - Hôpital de référence", long_name: " Ratio Population pour 1 Hôpital de référence", data_type : "INT", unit: "habitants par hôpital de réf.", "show_unit": true},
				{ fld_name : "FLD4", short_name : "Ratio Hôpital de référence - Population", long_name: " Ratio Hôpital de référence pour 150 000 habitants", data_type : "INT", unit: "hôpitaux pour 150 000 habitants", "show_unit": true}
			]
		},
		{
			index : 8,
			valid: true,
			name : "other_material", 
			group: "RESSOURCES EN SANTE",
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-9",
			label: "07- Autres ressources materielles (2017)",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_09_other_material.csv`,
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			source:  "DIIS/INS",
			color_palette:  "YlGnBu",
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
			index : 9,
			valid: true,
			name : "tech_platform", 
			group: "RESSOURCES EN SANTE",
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-10",
			label: "08- Plateaux techniques et équipements (2017)",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_10_tech_platform.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,			
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
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
			index : 10,
			valid: true,
			name : "ratio_ambulance_structure_sante", 
			group: "RESSOURCES EN SANTE",
			table_num :"Tableau-11",
			layerList : [ "region_sante" , "district_sante"],
			label: "09- Ratio ambulance par nombre de structure de soin (tab 11)",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_11_ratio_ambulance_structure_sante.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 10 , [] , ['white', 'violet']),
			color_palette: "Purples",
			field_selected : default_field_selection,
			data_fields : [				
				{ fld_name : "FLD1", short_name : "Total Structures Sanitaires (ESPC,HG, CHR)", long_name: " Total Structures Sanitaires (ESPC,HG, CHR)", data_type : "INT", unit: "Nombre"},
				{ fld_name : "FLD2", short_name : "Nb Ambulances (2017)", long_name: " Nb total d'ambulances en 2017", data_type : "INT", unit: "Nombre"},
				{ fld_name : "FLD3", short_name : "Ratio Ambulances / Structures de soins", long_name: " Ratio Ambulances par Structures de soins (ESPC, HG et CHR)", data_type : "INT", unit: "ratio"},
				{ fld_name : "FLD4", short_name : "Ratio structures de soins pour une Ambulances", long_name: " Ratio nombre de structures de soins (ESPC, HG et CHR) pour une Ambulances", data_type : "INT", unit: "ratio"}
			]
		},

		{
			index : 11,
			valid: false,
			name : "repartition_struct_transfusion", 
			group: "RESSOURCES EN SANTE",
			layerList : [ "region_sante" , "district_sante"],
			table_num :"Tableau-12",
			adminlevels: [ "district","region" ],
			label: "12- Répartition géographique des dépôts/banques de sang (tab. 12)",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_12_repartition_structure_transfusion.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Nombre de CTS", long_name : "Nombre de Centre de Transfusion Sanguine", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre de ATS", long_name : "Nombre d'Antenne de Transfusion Sanguine", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Nombre de dépôts/Banques de sang", long_name : "Nombre de dépôts/Banques de sang", data_type :  "INT", unit : "nombre" }
			]
		},
		{
			index : 12,
			valid: false,
			name : "xxxxxxxxxxxxxxxxx", 
			group: "Général",
			table_num :"Tableau-13",
			layerList : [ "region_sante" , "district_sante"],
			adminlevels: [ "region", "district"],
			label: "xxxxxx",
			unit: "Données du tableau 13",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_xx_axxxxxxx.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
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
			index : 13,
			name: "geographic_accessibility", 
			group: "SOINS CURATIFS",
			valid: true,
			table_num :"Tableau-13",
			layerList : [ "region_sante" , "district_sante"],
			label: "13-Accessibilité Géographique 2017",
			unit: "%",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_13_geographic_accessibility.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : {
	 			"default": {
					source: "manual",
					threshold: [ 10, 20, 40, 60, 80 ],
					colormap:  ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026'],
					linecolor: "#fff",
					labelmap:  [ "moins de 10%", "10-20%", "20-40%", "40-60%" , "60-80%" ,  "80% et plus" ],
					legendtitle: "Population au délà de 5 km d'un CS (%)"
				}
			},
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields :[
				{
					fld_name: "FLD1",
					short_name: "Population à moins de 5 km d'un CS (%)",
					long_name: "Population à moins de 5 km d'un centre de santé (%)",
					data_type: "INT",
					unit: "%"
				}, {
					fld_name: "FLD2",
					short_name: "Population entre 5 et 15 km d'un CS (%)",
					long_name: "Population entre 5 et 15 km d'un centre de santé (%)",
					data_type: "INT",
					unit: "%"
				}, {
					fld_name: "FLD3",
					short_name: "Population au délà de 15 km d'un CS (%)",
					long_name: "Population au délà de 15 km d'un centre de santé (%)",
					data_type: "INT",
					unit: "%"
				}, {
					fld_name: "FLD4",
					short_name: "Population au délà de 5 km d'un CS (%)",
					long_name: "Population au délà de 5 km d'un centre de santé (%)",
					data_type: "INT",
					unit: "%",
					renderer : "default"
				}	
			 ]
		},

		{
			index : 14,
			name: "taux_utilisation_serv_sante", 
			group: "SOINS CURATIFS",
			valid: true,
			table_num :"Tableau-14",
			layerList : [ "region_sante" , "district_sante"],
			label: "14-Taux d'utilisation des services de santé",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_14_taux_util_serv_sante.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'yellow']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields :[
				{
			 		fld_name: "FLD1",
			 		short_name: "Population totale 2017",
			 		long_name: "Population totale 2017",
			 		data_type: "INT",
			 		unit: "habitants",
			 		renderer: {
			 			"default": {
							source: "manual",
							threshold: [ 500000, 1000000, 1500000, 2000000, 3000000 ],
							colormap:   ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'],
							linecolor: "#fff",
							labelmap:  [ "moins de 500m", "500-400m", "1000-1500m" , "1500-2000m" , "2000-3000m", "3000m et plus" ],
							legendtitle: "Population totale 2017 par Région"
						},
			 			"district_sante": {
							source: "manual",
							threshold: [ 50000, 100000, 200000, 500000, 1000000 ],
							colormap:  ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'],
							linecolor: "#fff",
							labelmap:  [ "moins de 50m", "50-100m", "100-200m" , "200-500m" , "500-1000m", "1000m et +" ],
							legendtitle: "Population totale 2017 par district"
						}						
					}
			 	},
			 	{
			 		fld_name: "FLD2",
			 		short_name: "Nbre total de Consultants",
			 		long_name: "Nombre total de Consultants",
			 		data_type: "INT",
			 		unit: "consultants",
			 		renderer: {
			 			"default": {
							source: "manual",
							threshold: [ 200000, 500000, 750000, 1000000, 1500000 ],
							colormap:   ['#f6eff7','#d0d1e6','#a6bddb','#67a9cf','#1c9099','#016c59'],
							linecolor: "#fff",
							labelmap:  [ "moins de 200m", "200-500m", "500-750m" , "750-1000m" , "1000-1500m", "1500m et plus" ],
							legendtitle: "Nombre total de Consultants"
						},
			 			"district_sante": {
							source: "manual",
							threshold: [ 20000, 50000, 100000, 200000, 400000 ],
							colormap:  ['#f6eff7','#d0d1e6','#a6bddb','#67a9cf','#1c9099','#016c59'],
							linecolor: "#fff",
							labelmap:  [ "moins de 20m", "20-50m" ,"50-100m",  "100-200m" , "200-400m", "400m et +" ],
							legendtitle: "Nombre total de Consultants"
						}						
					}
			 	},
			 	{
			 		fld_name: "FLD3",
			 		short_name: "Taux d'utilisation(%)",
			 		long_name: "Taux d'utilisation(%)",
			 		data_type: "INT",
			 		unit: "%",
			 		renderer: {
			 			"default": {
							source: "manual",
							threshold:  [ 10, 20, 40, 60, 80],
							colormap:   ['#ffffd4','#fee391','#fec44f','#fe9929','#d95f0e','#993404'],
							linecolor: "#fff",
							labelmap:  [ "moins de 500m", "500-400m", "1000-1500m" , "1500-2000m" , "2000-3000m", "3000m et plus" ],
							legendtitle: "Taux d'utilisation des services de santé"
						}					
					}
			 	}
			 ]
		},


		{
			index : 15,
			name : "taux_util_serv_sante_par_etablissmnt", 
			group: "SOINS CURATIFS",
			valid: true,
			layerList : [ "region_sante" , "district_sante"],
			table_num :"Tableau-15",
			label: "15-Taux d’utilisation des services de santé par type d’établissement",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_15_taux_util_serv_sante_par_etablissmnt.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : 	[
				{
					fld_name: "FLD1",
					short_name: "Population totale 2017",
					long_name: "Population totale 2017",
					data_type: "INT",
					unit: "Habitants"
				},
				{
					fld_name: "FLD2",
					short_name: "Nbr total de Consultants ESPC",
					long_name: "Nombre total de Consultants dans les établissements Sanitaires de Premier Contact",
					data_type: "INT",
					unit: "consultants",	
			 		renderer: {
			 			"default": {
							source: "manual",
							threshold: [ 200000, 400000, 600000, 800000, 1000000 ],
							colormap:  ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177'],
							linecolor: "#fff",
							labelmap:  [ "moins de 200m", "200m-400m", "400m-600m" , "600m-800m" , "800m-1000m", "1000m et plus" ],
							legendtitle: "Nbr total de Consultants ESPC"
						},
			 			"district_sante": {
							source: "manual",
							threshold: [ 30000, 50000, 100000, 150000, 300000 ],
							colormap:  ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177'],
							linecolor: "#fff",
							labelmap:  [ "moins de 30m", "30m-50m", "50m-100m" , "100m-150m" , "150m-300m", "300m et plus" ],
							legendtitle: "Nbr total de Consultants ESPC"
						}						
					}
				},
				{
					fld_name: "FLD3",
					short_name: "Taux d'utilisation ESPC (%)",
					long_name: "Taux d'utilisation des Etablissements Sanitaires de Premier Contact (%)",
					data_type: "INT",
					unit: "%",	
			 		renderer: {
			 			default: {
							source: "manual",
							threshold: [ 30, 35, 40, 45, 50],
							colormap:  ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026'],
							linecolor: "#fff",
							labelmap:  [ "0-30%", "30-35%", "35-40%" , "40-45%" , "45-50%", "50% et plus" ],
							legendtitle: "Taux d'utilisation ESPC (%)"
				 		}
			 		}
				},
				{
					fld_name: "FLD4",
					short_name: "Nombre total de Consultants en HR (HG & CHR)",
					long_name: "Nombre total de Consultants Hopitaux de référence (HG & CHR)",
					data_type: "INT",
					unit: "Consultants",					
			 		renderer: {
		 				"district_sante": {
							source: "manual",
							threshold: [5000, 25000, 50000, 100000, 150000 ],
							colormap:  ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177'],
							linecolor: "#fff",
							labelmap:  [ "moins de 5m", "5m-25m", "25m-50m" , "50m-100m" , "100m-150m", "150m et plus" ],
							legendtitle: "Nbr total de Consultants ESPC"
				 		}, 
				 		"default": {
							source: "manual",
							threshold: [50000, 100000, 200000, 300000, 400000 ],
							colormap:  ['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#c51b8a','#7a0177'],
							linecolor: "#fff",
							labelmap:  [ "moins de 40m", "40m-100m", "100m-200m" , "200m-300m" , "300m-400m", "400m et plus" ],
							legendtitle: "Nbr total de Consultants ESPC"
				 		}
			 		}
				},
				{
					fld_name: "FLD5",
					short_name: "Taux d'utilisation HR (HG & CHR)(%)",
					long_name:  "Taux d'utilisation HR (HG & CHR)(%)",
					data_type: "INT",
					unit: "%",	
			 		renderer: {
			 			default: {
							source: "manual",
							threshold: [ 5, 7.5, 10, 12, 16 ],
							colormap:  ["#ccccff","#9999ff","#7777ff","#5555ff","#3333ff","#1111ee"],
							linecolor: "#fff",
							labelmap:  [ "0-5%", "5-10%", "10%-12%" , "12-14%" , "14-16%", "16% et plus" ],
							legendtitle: "Taux de frequentation HR (HG & CHR)(%)"
				 		}
			 		}
				}
			]
		},
		{
			index : 16,
			name : "taux_frequentation_service_sante", 
			group: "SOINS CURATIFS",
			valid: true,
			table_num :"Tableau-16",
			layerList : [ "region_sante" , "district_sante"],
			label: "16-Taux de fréquentation des services de santé",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_16_taux_frequentation_service_sante.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields :  [
				{
			 		fld_name: "FLD1",
			 		short_name: "Population totale",
			 		long_name: " Population totale",
			 		data_type: "INT",
			 		unit: "Habitant"
			 	},
			 	{
			 		fld_name: "FLD2",
			 		short_name: "Nombre de Consultations",
			 		long_name: "Nombre de Consultations",
			 		data_type: "INT",
			 		unit: "Consultations"
			 	},
			 	{
			 		fld_name: "FLD3",
			 		short_name: "Taux de fréquentation des service de santé (%)",
			 		long_name: "Taux de fréquentation (%)",
			 		data_type: "INT",
			 		unit: "%",				
			 		renderer: {
			 			default: {
							source: "manual",
							threshold: [  30, 40, 50, 60, 70, ],
							colormap:  ["#ffffff","#ccccff","#9999ff","#6666ff","#3333ff","#0000ff"],
							linecolor: "#fff",
							labelmap:  [ "0-30%", ">30 - 40%", ">40 - 50%" , ">50-60%", ">60 - 70%" ,"+70%" ],
							legendtitle: "Taux de frequentation HR (HG & CHR)(%)"
				 		}
			 		}
			 	}
			 ]
		},

		{
			index : 17,
			name : "taux_frequentation", 
			group: "SOINS CURATIFS",
			valid: true,
			table_num :"Tableau-17",
			layerList : [ "region_sante" , "district_sante"],
			label: "17-Taux de fréquentation par type d’établissement",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_17_taux_frequentation.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'cyan']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [		
				{
					fld_name: "FLD1",
					short_name: "Population totale",
					long_name: "Population totale",
					data_type: "INT",
					unit: "habitants"
				}, {
					fld_name: "FLD2",
					short_name: "Total Consultations ESPC",
					long_name: "Total Consultations ESPC",
					data_type: "INT",
					unit: "consultations"
				}, {
					fld_name: "FLD3",
					short_name: "Taux de frequentation ESPC(%)",
					long_name: "Taux de frequentation ESPC(%)",
					data_type: "INT",
					unit: "% des consultations",
			 		renderer: {
			 			default: {
							source: "manual",
							threshold: [  20, 35, 50, 65 ],
							colormap:  ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'],
							linecolor: "#fff",
							labelmap:  [ "0-20%", ">20 - 35%", ">35 - 50%" , ">50-65%", ">60 - 100%"  ],
							legendtitle: "Taux de frequentation ESPC(%)"
				 		}
			 		}
				}, {
					fld_name: "FLD4",
					short_name: "Nombre total de consultation HR (CHR & HG)",
					long_name: "Nombre total de consultation HR (CHR & HG)",
					data_type: "INT",
					unit: "consultations"
				}, {
					fld_name: "FLD5",
					short_name: "Taux de frequentation HR (HG & CHR)(%)",
					long_name: "Taux de frequentation HR (HG & CHR)(%)",
					data_type: "INT",
					unit: "% des consultations",
			 		renderer: {
			 			default: {
							source: "manual",
							threshold: [  5, 10, 15, 20 ],
							colormap:  ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'],
							linecolor: "#fff",
							labelmap:  [ "0-5%", ">5 - 10%", ">10 - 25%" , ">15-20%", ">20 - 100%"  ],
							legendtitle: "Taux de frequentation HR (HG & CHR)(%)"
				 		}
			 		}
				}
			]
		},
		{
			index : 18,
			name : "effectif_consultant", 
			group: "SOINS CURATIFS",
			valid: true,
			table_num :"Tableau-18",
			layerList : [ "region_sante" , "district_sante"],
			label: "18-Répartition des consultants",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_18_effectif_consultant.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
			 	{
			 		fld_name: "FLD1",
			 		short_name: "Nombre total de consultants ESPC",
			 		long_name: "Nombre total de consultants ESPC",
			 		data_type: "INT",
			 		unit: "consultants",
			 		renderer : {
			 			default: {
							source: "manual",
							threshold: [  250000, 500000, 750000, 1000000 ],			 			
				 			colormap : ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'],
				 			linecolor: "#fff",
							labelmap:  [ "0-250m", "250-500m", "500- 750m" , "750-1000m", "1M et +" ],
							legendtitle: "Population 2017"
						},
			 			"district_sante": {
							source: "manual",
							threshold: [  250000, 500000, 750000, 1000000 ],			 			
				 			colormap : ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'],
				 			linecolor: "#fff",
							labelmap:  [ "0-250m", "250-500m", "500- 750m" , "750-1000m", "1M et +" ],
							legendtitle: "Population 2017"
						}
			 		}
			 	},
			 	{
			 		fld_name: "FLD2",
			 		short_name: "Nombre Total Consultants HG et CHR",
			 		long_name: "Nombre Total Consultants HG et CHR",
			 		data_type: "INT",
			 		unit: "consultants"
			 	},
			 	{
			 		fld_name: "FLD3",
			 		short_name: "Total Consultants",
			 		long_name: "Total Consultants",
			 		data_type: "INT",
			 		unit: "consultants"
			 	},
			 	{
			 		fld_name: "FLD4",
			 		short_name: "Proportion Consultants ESPC (%)",
			 		long_name: "Proportion Consultants ESPC (%)",
			 		data_type: "INT",
			 		unit: "%",
			 		renderer: {
			 			default: {
							source: "manual",
							threshold: [  20, 30, 40, 50 ],
							colormap:  ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'] ,
							linecolor: "#fff",
							labelmap:  [ "0%-20%", "60% - 70%", "70% - 80%" , "80% - 90%", "90% - 100%" ],
							legendtitle: "Proportion Consultants ESPC (%)"
				 		}
			 		}
			 	},
			 	{
			 		fld_name: "FLD5",
			 		short_name: "Proportion Consultants HG & CHR (%)",
			 		long_name: "Proportion Consultants HG & CHR (%)",
			 		data_type: "INT",
			 		unit: "%",
			 		renderer: {
			 			default: {
							source: "manual",
							threshold: [  10, 15, 20, 30 ],
							colormap:  ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'],
							linecolor: "#fff",
							labelmap:  [ "0-10%", ">10 - 15%", ">15 - 20%" , ">20-30%", ">30 - 100%"  ],
							legendtitle: "Proportion Consultants HG & CHR (%)"
				 		}
			 		}
			 	}
			]
		},
		{
			index : 19,
			name : "nombre_consultations", 
			group: "SOINS CURATIFS",
			valid: true,
			table_num :"Tableau-19",
			layerList : [ "region_sante" , "district_sante"],
			label: "19-Nombre de consultations",
			unit: "consultations",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_19_nombre_consultations.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{
					fld_name: "FLD1",
					short_name: " Nombre total de Consultations ESPC",
					long_name: " Nombre total de Consultations ESPC",
					data_type: "INT",
					unit: "consultations"
				}, {
					fld_name: "FLD2",
					short_name: "Total Consultations HG et CHR",
					long_name: "Total Consultations HG et CHR",
					data_type: "INT",
					unit: "consultations"
				}, {
					fld_name: "FLD3",
					short_name: "Total Consultations (%)",
					long_name: "Total Consultations (%)",
					data_type: "INT",
					unit: "consultations"
				}, {
					fld_name: "FLD4",
					short_name: "Consultations ESPC(%)",
					long_name: "Consultations ESPC(%)",
					data_type: "INT",
					unit: "consultations"
				}, {
					fld_name: "FLD5",
					short_name: "Consultation HG & CHR",
					long_name: "Consultation HG & CHR",
					data_type: "INT",
					unit: "consultations"
				}
			]
		},

		{
			index : 33,
			name : "couverture_vaccinale", 
			group: "SOINS PREVENTIFS ET PROMOTIONNELS",
			valid: true,
			table_num :"Tableau-33",
			layerList : [ "region_sante" , "district_sante"],
			label: "33-Couverture vaccinale",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_33_couverture_vaccinale.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : {
				default : {
					   source : "manual",
					threshold : [ 80, 92],
					 colormap : ['#ff0000' , '#ffff00', '#4ce600' ],  
					 linecolor: "#eee",
					 labelmap : ["Insuffisante" , "Moyenne", "Satisfaisante" ],
				  legendtitle : "Couverture vaccinale ({{health}})"
				}
			},
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	

				{
					fld_name: "FLD1",
					short_name: "Couverture en BCG (%)",
					long_name: "Couverture en BCG (%)",
					data_type: "INT",
					unit: "%",
					renderer : "default"
				},
				{
					fld_name: "FLD2",
					short_name: "Couverture en VPO-1 (%)",
					long_name: "Couverture en VPO-1 (%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD3",
					short_name: "Couverture en VPO-2 (%)",
					long_name: "Couverture en VPO-2 (%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD4",
					short_name: "Couverture en VPO-3(%)",
					long_name: "Couverture vaccinale antipoliomyélitique orale-3e dose (VPO-3)",
					data_type: "INT",
					unit: "%",
					renderer : "default"
				},
				{
					fld_name: "FLD5",
					short_name: "Couverture en Penta-1 (%)",
					long_name: "Couverture en Penta-1 (%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD6",
					short_name: "Couverture en Penta-2(%)",
					long_name: "Couverture en Penta-2(%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD7",
					short_name: "Couverture en Penta-3(%)",
					long_name: "Couverture en Penta-3(%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD8",
					short_name: "Couverture en PCV13-1 (%)",
					long_name: "Couverture en PCV13-1 (%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD9",
					short_name: "Couverture en PCV13-2 (%)",
					long_name: "Couverture en PCV13-2 (%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD10",
					short_name: "Couverture en PCV13-3 (%)",
					long_name: "Couverture en PCV13-3 (%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD11",
					short_name: "Couverture en VPI (%)",
					long_name: "Couverture du vaccin antipoliomyélitique inactivé (%)",
					data_type: "INT",
					unit: "%"
				},
				{
					fld_name: "FLD12",
					short_name: "VAR-2 (%)",
					long_name: "Taux de couverture vaccinale antirougeoleuse (VAR)",
					data_type: "INT",
					unit: "%",
					renderer : "default"
				},
				{
					fld_name: "FLD13",
					short_name: "VAA",
					long_name: "Taux de couverture de vaccination antiamarile (VAA)",
					data_type: "INT",
					unit: "¨%",
					renderer : "default"
				},
				{
					fld_name: "FLD14",
					short_name: "Couverture en VAT 2+(%)",
					long_name: "Taux de couverture vaccin tétanos néonatal (VAT 2+)",
					data_type: "INT",
					unit: "nombre",
					renderer : "default"
				}
			]
		},
		{
			index : 39,
			name : "paludisme_u5_ans", 
			group: "MORBIDITE ET MORTALITE",
			valid: true,
			table_num :"Tableau-39",
			layerList : [ "region_sante" , "district_sante"],
			label: "39-Incidence du paludisme chez les moins de 5 ans",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_39_paludisme_incidence_under_5.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{
					fld_name: "FLD1",
					short_name: "Population de 0 à 4 ans",
					long_name: "Population 0 à 4 ans",
					data_type: "INT",
					unit: "Habitants"
				}, {
					fld_name: "FLD2",
					short_name: "Nombre total de cas de paludisme confirmés chez les moins de 5 ans",
					long_name: "Nombre total de cas de paludisme confirmés chez les moins de 5 ans",
					data_type: "INT",
					unit: "nombre"
				}, {
					fld_name: "FLD3",
					short_name: "Incidence du paludisme chez les moins de 5 ans (‰)",
					long_name: "Incidence du paludisme chez les moins de 5 ans (‰)",
					data_type: "INT",
					unit: "cas confirmés pour 1 000 hbts",
					renderer : {
						default : {
				   			   source : "manual",
							threshold : [ 200, 400],
							 colormap : ["#ffffbf",  "#ffff99",  "#ffff00"],  
							 linecolor: "#aaa",
							 labelmap : ["Moins de 100‰" , "100‰ à 200‰", "201‰ et plus" ],
						  legendtitle : "Incidence globale du Paludisme"
						}						
					}
				}			
			]
		},
		{
			index : 40,
			name : "incidence_anemie", 
			group: "MORBIDITE ET MORTALITE",
			valid: true,
			table_num :"Tableau-40",
			layerList : [ "region_sante" , "district_sante"],
			label: "40-Incidence de l'anémie",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_40_incidence_anemie.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields :[{
					fld_name: "FLD1",
					short_name: "Population de 0 à 4 ans",
					long_name: "Population de 0 à 4 ans",
					data_type: "INT",
					unit: "habitants"
				},
				{
					fld_name: "FLD2",
					short_name: "Nombre de cas d'Anémie",
					long_name: "Nombre de cas d'Anémie",
					data_type: "INT",
					unit: "cas"
				},
				{
					fld_name: "FLD3",
					short_name: "Incidence anémie (‰)",
					long_name: "Incidence anémie (‰)",
					data_type: "INT",
					unit: "cas pour 1 000 hbts",
					renderer : {
						default : {
				   			   source : "manual",
							threshold : [ 100, 200 ],
							 colormap : [  "#fcf9ab",  "#f7be38","#cc5526" ],  
							 labelmap : ["Moins de 100‰" , "100‰ à 200‰", "201‰ et plus" ],
						  legendtitle : "Incidence de l’anémie chez les moins de 5 ans"
						}
					}
				}
			]
		},
		{
			index : 41,
			name : "incidence_coqueluche", 
			group: "MORBIDITE ET MORTALITE",
			valid: true,
			table_num :"Tableau-41",
			layerList : [ "region_sante" , "district_sante"],
			label: "41-Incidence de la Coqueluche chez les enfants de moins de 5 ans",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_41_coqueluche_incidence.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name: "FLD1", short_name: "Population totale", long_name: "Population totale", data_type: "INT", unit: "nombre"},
				{ fld_name: "FLD2", short_name: "Nombre de cas de Coqueluche", long_name: "Nombre de cas de Coqueluche", data_type: "INT", unit: "cas"},
				{ fld_name: "FLD3", short_name: "Incidence Coqueluche (‰)", long_name: "Incidence Coqueluche (‰)", data_type: "INT", unit: "cas pour 1 000 hbts"}
			]
		},
		{
			index : 42,
			name : "paludisme_glo", 
			group: "MORBIDITE ET MORTALITE",
			valid: true,
			table_num :"Tableau-42",
			layerList : [ "region_sante" , "district_sante"],
			label: "42-Incidence du paludisme dans la population générale",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_42_paludisme_incidence_glo.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [		

				{
					fld_name: "FLD1",
					short_name: "Population totale",
					long_name: "Population totale",
					data_type: "INT",
					unit: "Habitants"
				}, {
					fld_name: "FLD2",
					short_name: "Nombre total de cas de paludisme confirmés dans la population",
					long_name: "Nombre total de cas de paludisme confirmés dans la population",
					data_type: "INT",
					unit: "nombre"
				}, {
					fld_name: "FLD3",
					short_name: "Incidence global du paludisme (‰)",
					long_name: "Incidence du paludisme dans la population générale (‰)",
					data_type: "INT",
					unit: "cas confirmés pour 1000 hbts",
					renderer : {
						default : {
			   			       source : "manual",
							threshold : [ 100, 200 ],
							 colormap :  ["#ffffbf",  "#ffff99",  "#ffff00"],  
							 labelmap : ["Moins de 100‰" , "100‰ à 200‰", "201‰ et plus" ],
						  legendtitle : "Incidence globale du Paludisme"
						}						
					}
				}
			]
		},
		{
			index : 38,
			name : "incidence_IRA_u5_ans", 
			group: "MORBIDITE ET MORTALITE",
			valid: true,
			table_num :"Tableau-38",
			layerList : [ "region_sante" , "district_sante"],
			label: "38-Infections Respiratoires Aiguës (IRA) chez les moins de 5 ans",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_38a_Incidence_IRA_under_5.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,

			data_fields: [
				{
					fld_name: "FLD1",
					short_name: " Population de 0 à 4 ans",
					long_name: " Population de 0 à 4 ans",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD2",
					short_name: "Nombre de cas d’IRA chez les Enfants",
					long_name:  "Nombre de cas d’infections respiratoires aiguës chez les Enfants",
					data_type:  "INT",
					unit: "nombre"
				},
				{
					fld_name:   "FLD3",
					short_name: "Taux d'incidence IRA chez les Enfants",
					long_name:  "Taux d'incidence d’infections respiratoires aiguës chez les Enfants",
					data_type:  "INT",
					unit: "‰",
					renderer: {
						default : {
							source: "manual",
							threshold: [ 100, 200 ],
							colormap:  [ "#e5b2e5", "#b266e5", "#9900ff" ],
							linecolor: "#fff",
							labelmap:  [ "Moins de 100‰", "100‰ à 200‰", "200‰ et plus" ],
							legendtitle: "Incidence de l'IRA chez les moins de 5 ans"

						}

					}
				}
			]
		},
		{
			index : 43,
			name : "incidence_IRA_glo", 
			group: "MORBIDITE ET MORTALITE",
			valid: true,
			table_num :"Tableau-43",
			layerList : [ "region_sante" , "district_sante"],
			label: "43-Infections Respiratoires Aiguës (IRA) dans la population générale",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_43_incidence_IRA_glo.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [
				{
					fld_name: "FLD1",
					short_name: "Population totale",
					long_name: " Population totale",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD2",
					short_name: "Nombre de cas d'IRA dans la population générale",
					long_name: "Nombre de cas d’infections respiratoires aiguës dans la population générale",
					data_type: "INT",
					unit: "nombre" 
				},
				{
					fld_name: "FLD3",
					short_name: "Incidence d'IRA dans la population générale (‰)",
					long_name: "Incidence d’infections respiratoires aiguës dans la population générale (‰)",
					data_type: "INT",
					unit: "cas pour 1 000 hbts",
					renderer: {
						default : {
							source: "manual",
							threshold: [ 50, 75 ],
							colormap:  [ "#ffcccc", "#ff9966", "#ff0000" ],
							labelmap:  [ "Moins de 50‰", "50‰ à 75‰", "75‰ et plus" ],
							legendtitle: "Incidence globale de l'IRA"							
						}
					}
				}
			]
		}, 
		{
			index : 45,
			name: "std",
			group: "MORBIDITE ET MORTALITE",
			valid: false,
			table_num :"Tableau-45",
			layerList : [ 
				"region_sante" , 
				"district_sante"
			],
			label: "45-Maladies sexuellement transmissibles",
			unit: "cas déclaré(s)",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_45_std.csv`,
			source: "Ministère de la Santé et de l’Hygiène Publique",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "Purples",
			field_selected : default_field_selection,			
		    data_fields : [
				{ "fld_name" : "FLD1",  "short_name" : " 10-14 ans (F)" , "long_name" : " 10-14 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD2",  "short_name" : " 10-14 ans (M)" , "long_name" : " 10-14 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD3",  "short_name" : " 15-24 ans (F)" , "long_name" : " 15-24 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD4",  "short_name" : " 15-24 ans (M)" , "long_name" : " 15-24 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD5",  "short_name" : " 25-49 ans (F)" , "long_name" : " 25-49 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD6",  "short_name" : " 25-49 ans (M)" , "long_name" : " 25-49 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD7",  "short_name" : " 50 ans et plus (F)" , "long_name" : " 50 ans et plus (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD8",  "short_name" : " 50 ans et plus (M)" , "long_name" : " 50 ans et plus (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD9",  "short_name" : " Total cas d’écoulement génital " , "long_name" : " Total de cas d’écoulement génital (urétral /vaginal) diagnostiqués"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD10", "short_name" : " 10-14 ans (F)" , "long_name" : " 10-14 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD11", "short_name" : " 10-14 ans (M)" , "long_name" : " 10-14 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD12", "short_name" : " 15-24 ans (F)" , "long_name" : " 15-24 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD13", "short_name" : " 15-24 ans (M)" , "long_name" : " 15-24 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD14", "short_name" : " 25-49 ans (F)" , "long_name" : " 25-49 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD15", "short_name" : " 25-49 ans (M)" , "long_name" : " 25-49 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD16", "short_name" : " 50 ans et plus (F)" , "long_name" : " 50 ans et plus (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD17", "short_name" : " 50 ans et plus (M)" , "long_name" : " 50 ans et plus (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD18", "short_name" : " Total cas d’ulcération génitale" , "long_name" : " Total de cas d’ulcération génitale et/ou bubon diagnostiqués"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD19", "short_name" : " 10-14 ans (F)" , "long_name" : " 10-14 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD20", "short_name" : " 10-14 ans (M)" , "long_name" : " 10-14 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD21", "short_name" : " 15-24 ans (F)" , "long_name" : " 15-24 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD22", "short_name" : " 15-24 ans (M)" , "long_name" : " 15-24 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD23", "short_name" : " 25-49 ans (F)" , "long_name" : " 25-49 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD24", "short_name" : " 25-49 ans (M)" , "long_name" : " 25-49 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD25", "short_name" : " 50 ans et plus (F)" , "long_name" : " 50 ans et plus (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD26", "short_name" : " 50 ans et plus (M)" , "long_name" : " 50 ans et plus (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD27", "short_name" : " Total cas de douleurs testiculaires ou pelviennes" , "long_name" : " Total de cas de douleurs testiculaires/abdominales basses (pelviennes) diagnostiqués"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD28", "short_name" : " 10-14 ans (F)" , "long_name" : " 10-14 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD29", "short_name" : " 10-14 ans (M)" , "long_name" : " 10-14 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD30", "short_name" : " 15-24 ans (F)" , "long_name" : " 15-24 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD31", "short_name" : " 15-24 ans (M)" , "long_name" : " 15-24 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD32", "short_name" : " 25-49 ans (F)" , "long_name" : " 25-49 ans (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD33", "short_name" : " 25-49 ans (M)" , "long_name" : " 25-49 ans (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD34", "short_name" : " 50 ans et plus (F)" , "long_name" : " 50 ans et plus (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD35", "short_name" : " 50 ans et plus (M)" , "long_name" : " 50 ans et plus (M)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD36", "short_name" : " Total cas de condylome" , "long_name" : " Total de cas de condylome diagnostiqués"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD37", "short_name" : " Total cas d'IST Adultes (2017)" , "long_name" : " Nombre total des cas d'IST chez les Adultes 2017"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD38", "short_name" : " Nb total cas de conjonctivite du nouveau-né (F)" , "long_name" : " Nombre total de cas de  conjonctivite du nouveau-né diagnostiqués (Enfant 0-28 jours ) (F)"  , "data_type" : "INT", unit: "Nombre de cas"},
				{ "fld_name" : "FLD39", "short_name" : " Nb total de cas de conjonctivite (M)" , "long_name" : " Nombre total de cas de conjonctivite du nouveau-né diagnostiqués (Enfant 0-28 jours ) (M)"  , "data_type" : "INT", unit: "Nombre de cas"}
			]	    
        },
		{

			index : 79,
			name : "deces_notifie_et_causes", 
			group: "MORBIDITE ET MORTALITE",
			valid: true,
			table_num :"Tableau-79",
			layerList : [ "region_sante" , "district_sante"],
			label: "79-Décès notifiés par les structures de santé et causes probables",
			unit: "nombre",
			article: "de ",
			path : `${PATH_PREFIX}data/statistics/tab_79_deces_notifie_et_causes.csv`,
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields :[{
					fld_name: "FLD1",
					short_name: "Décès liés au Paludisme",
					long_name: "Décès liés au Paludisme",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD2",
					short_name: "Décès liés à la Diarrhée",
					long_name: "Décès liés à la Diarrhée",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD3",
					short_name: "Décès liés à l'Anémie",
					long_name: "Décès liés à l'Anémie",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD4",
					short_name: "Décès liés au Choléra",
					long_name: "Décès liés au Choléra",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD5",
					short_name: "Décès liés à la Fièvre Typhoide",
					long_name: "Décès liés à la Fièvre Typhoide",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD6",
					short_name: "Décès liés à la Méningite",
					long_name: "Décès liés à la Méningite",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD7",
					short_name: "Décès liés aux IRA",
					long_name: "Décès liés aux IRA",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD8",
					short_name: "Décès liés au COMA",
					long_name: "Décès liés au COMA",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD9",
					short_name: "Décès liés au VIH/SIDA",
					long_name: "Décès liés au VIH/SIDA",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD10",
					short_name: "Décès liés aux AVC",
					long_name: "Décès liés aux AVC",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD11",
					short_name: "Morts-Nés",
					long_name: "Morts-Nés",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD12",
					short_name: "Décès au bloc opératoire",
					long_name: "Décès au bloc opératoire",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD13",
					short_name: "Décès Maternel",
					long_name: "Décès Maternel",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD14",
					short_name: "Décès néonatal (entre 0 et 28 jours après naissance)",
					long_name: "Décès néonatal (entre 0 et 28 jours après naissance)",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD15",
					short_name: "Autres types de décès",
					long_name: "Autres types de décès",
					data_type: "INT",
					unit: "nombre"
				},
				{
					fld_name: "FLD16",
					short_name: "Total décès",
					long_name: "Total décès",
					data_type: "INT",
					unit: "nombre"
				}
			]

		}
	]	
};


