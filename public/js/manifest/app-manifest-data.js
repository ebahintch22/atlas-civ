

var metaDataBase = {

	data_base_name : "Atlas Thématique - Côte d'Ivoire  - RASS 2017 version 1.0.5",
	version : "2.0",
	date : "03/01/2021",
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
		},
		{
			id : "layer-5",
			name : "world_countries",
			names : {
				value : "Pays du monde",
				 many : "Pays du monde",
				 abbr : "Pays"
			},
			label : "Découpage mondial en pays (240)",
			path :  `${PATH_PREFIX}data/geojson/world/json/glo_countries_qgis_v1.geojson`,
			idfield : "ISO_A2",
			labelField :"NAME_FR"
		},
		{
			id : "layer-6",
			name : "world_continents",
			names : {
				value : "Continent du monde",
				 many : "Continents monde",
				 abbr : "Continents"
			},
			label : "Découpage mondial en continent (5)",
			path :  `${PATH_PREFIX}data/geojson/world/json/glo_continents_light.geojson`,
			idfield : "ISO_A2",
			labelField :"NAME_FR"
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
	table_details : []		
};


