
function getdata_sample(){




		metageo  =  {

			"id": "layer-1",
			"name": "region_sante",
			"names": {
				"value": "Région sanitaire",
				"many": "Régions sanitaires",
				"abbr": "RS."
			},
			"label": "Découpage en régions sanitaires",
			"path": "./data/geojson/health/civ-region-sante.geojson",
			"idfield": "code_R",
			"labelField": "Region_S",
			"key": "region_sante"

		};

		metafield = {
			"fld_name": "FLD1",
			"short_name": "Population à moins de 5 km d'un CS (%)",
			"long_name": "Population à moins de 5 km d'un centre de santé (%)",
			"data_type": "INT",
			"unit": "%",
			"key": "FLD1",
			"label": "Population à moins de 5 km d'un centre de santé (%)"
		};


		mapData = [{
			"ORD": "1",
			"CODE": "R02",
			"ADM_NAME": "ABIDJAN 2",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "88.5",
			"FLD2": "5",
			"FLD3": "6.5",
			"FLD4": "11.5"
		}, {
			"ORD": "8",
			"CODE": "R01",
			"ADM_NAME": "ABIDJAN 1-GRANDS PONTS",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "86.3",
			"FLD2": "5",
			"FLD3": "8.7",
			"FLD4": "13.7"
		}, {
			"ORD": "15",
			"CODE": "R03",
			"ADM_NAME": "AGNEBY-TIASSA-ME",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "77.9",
			"FLD2": "15.1",
			"FLD3": "6.9",
			"FLD4": "22.1"
		}, {
			"ORD": "22",
			"CODE": "R04",
			"ADM_NAME": "BELIER",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "72.8",
			"FLD2": "24.3",
			"FLD3": "2.9",
			"FLD4": "27.2"
		}, {
			"ORD": "27",
			"CODE": "R05",
			"ADM_NAME": "BOUNKANI-GONTOUGO",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "57.7",
			"FLD2": "35.4",
			"FLD3": "6.9",
			"FLD4": "42.3"
		}, {
			"ORD": "32",
			"CODE": "R06",
			"ADM_NAME": "CAVALLY-GUEMON",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "63.4",
			"FLD2": "28.6",
			"FLD3": "8",
			"FLD4": "36.6"
		}, {
			"ORD": "39",
			"CODE": "R07",
			"ADM_NAME": "GBEKE",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "79",
			"FLD2": "13.7",
			"FLD3": "7.3",
			"FLD4": "21"
		}, {
			"ORD": "45",
			"CODE": "R08",
			"ADM_NAME": "GBOKLE-NAWA-SAN-PEDRO",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "36.7",
			"FLD2": "49.7",
			"FLD3": "13.6",
			"FLD4": "63.3"
		}, {
			"ORD": "51",
			"CODE": "R09",
			"ADM_NAME": "GÔH",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "66.7",
			"FLD2": "18.9",
			"FLD3": "14.3",
			"FLD4": "33.3"
		}, {
			"ORD": "54",
			"CODE": "R10",
			"ADM_NAME": "HAMBOL",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "53.7",
			"FLD2": "24.4",
			"FLD3": "21.9",
			"FLD4": "46.3"
		}, {
			"ORD": "58",
			"CODE": "R11",
			"ADM_NAME": "HAUT SASSANDRA",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "53.8",
			"FLD2": "39.6",
			"FLD3": "6.6",
			"FLD4": "46.2"
		}, {
			"ORD": "62",
			"CODE": "R12",
			"ADM_NAME": "INDENIE DUABLIN",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "69.2",
			"FLD2": "21.3",
			"FLD3": "9.5",
			"FLD4": "30.8"
		}, {
			"ORD": "66",
			"CODE": "R13",
			"ADM_NAME": "KABADOUGOU-BAFING-FOLON",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "49",
			"FLD2": "29",
			"FLD3": "22",
			"FLD4": "51"
		}, {
			"ORD": "70",
			"CODE": "R14",
			"ADM_NAME": "LÔH-DJIBOUA",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "69.1",
			"FLD2": "26.5",
			"FLD3": "4.3",
			"FLD4": "30.9"
		}, {
			"ORD": "75",
			"CODE": "R15",
			"ADM_NAME": "MARAHOUE",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "65",
			"FLD2": "28.1",
			"FLD3": "7",
			"FLD4": "35"
		}, {
			"ORD": "79",
			"CODE": "R16",
			"ADM_NAME": "N'ZI-IFFOU",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "61",
			"FLD2": "26.4",
			"FLD3": "12.6",
			"FLD4": "39"
		}, {
			"ORD": "86",
			"CODE": "R17",
			"ADM_NAME": "PORO-TCHOLOGO-BAGOUE",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "62.7",
			"FLD2": "24.1",
			"FLD3": "13.1",
			"FLD4": "37.3"
		}, {
			"ORD": "92",
			"CODE": "R18",
			"ADM_NAME": "SUD-COMOE",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "78.2",
			"FLD2": "16.4",
			"FLD3": "5.4",
			"FLD4": "21.8"
		}, {
			"ORD": "96",
			"CODE": "R19",
			"ADM_NAME": "TONKPI",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "64",
			"FLD2": "26.5",
			"FLD3": "9.5",
			"FLD4": "36"
		}, {
			"ORD": "101",
			"CODE": "R20",
			"ADM_NAME": "WORODOUGOU-BERE",
			"GEOLOC": "N/A",
			"LEVEL": "REGION",
			"FLD1": "51.2",
			"FLD2": "28.9",
			"FLD3": "19.9",
			"FLD4": "48.8"
		}];

		metadata = {
			"index": 13,
			"name": "geographic_accessibility",
			"group": "SOINS CURATIFS",
			"valid": true,
			"table_num": "Tableau-13",
			"layerList": ["region_sante", "district_sante"],
			"label": "13-Accessibilité Géographique 2017",
			"unit": "%",
			"article": "de ",
			"path": "./data/statistics/tab_13_geographic_accessibility.csv",
			"source": "DIIS/INS",
			"data_parser": {
				"id_field": "CODE",
				"name_field": "ADM_NAME",
				"class_field": "LEVEL",
				"classes": [{
					"ord": 1,
					"value": "REGION",
					"layer": "region_sante"
				}, {
					"ord": 2,
					"value": "DISTRICT",
					"layer": "district_sante"
				}]
			},
			"renderer": {
				"default": {
					"source": "manual",
					"threshold": [10, 20, 40, 60, 80],
					"colormap": ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"],
					"linecolor": "#fff",
					"labelmap": ["moins de 10%", "10-20%", "20-40%", "40-60%", "60-80%", "80% et plus"],
					"legendtitle": "Population à moins de 5 km d'un CS (%)"
				}
			},
			"color_palette": "YlGnBu",
			"data_fields": [{
				"fld_name": "FLD1",
				"short_name": "Population à moins de 5 km d'un CS (%)",
				"long_name": "Population à moins de 5 km d'un centre de santé (%)",
				"data_type": "INT",
				"unit": "%",
				"key": "FLD1",
				"label": "Population à moins de 5 km d'un centre de santé (%)"
			}, {
				"fld_name": "FLD2",
				"short_name": "Population entre 5 et 15 km d'un CS (%)",
				"long_name": "Population entre 5 et 15 km d'un centre de santé (%)",
				"data_type": "INT",
				"unit": "%",
				"key": "FLD2",
				"label": "Population entre 5 et 15 km d'un centre de santé (%)"
			}, {
				"fld_name": "FLD3",
				"short_name": "Population au délà de 15 km d'un CS (%)",
				"long_name": "Population au délà de 15 km d'un centre de santé (%)",
				"data_type": "INT",
				"unit": "%",
				"key": "FLD3",
				"label": "Population au délà de 15 km d'un centre de santé (%)"
			}, {
				"fld_name": "FLD4",
				"short_name": "Population au délà de 5 km d'un CS (%)",
				"long_name": "Population au délà de 5 km d'un centre de santé (%)",
				"data_type": "INT",
				"unit": "%",
				"renderer": "default",
				"key": "FLD4",
				"label": "Population au délà de 5 km d'un centre de santé (%)"
			}],
			"key": "geographic_accessibility",
			"dt": {
				"colArray": [{
					"data": "CODE",
					"title": "Code",
					"mData": "CODE",
					"sTitle": "Code"
				}, {
					"data": "ADM_NAME",
					"title": "Région sanitaire",
					"mData": "ADM_NAME",
					"sTitle": "Région sanitaire"
				}, {
					"data": "FLD1",
					"title": "Population à moins de 5 km d'un CS (%)",
					"mData": "FLD1",
					"sTitle": "Population à moins de 5 km d'un CS (%)"
				}, {
					"data": "FLD2",
					"title": "Population entre 5 et 15 km d'un CS (%)",
					"mData": "FLD2",
					"sTitle": "Population entre 5 et 15 km d'un CS (%)"
				}, {
					"data": "FLD3",
					"title": "Population au délà de 15 km d'un CS (%)",
					"mData": "FLD3",
					"sTitle": "Population au délà de 15 km d'un CS (%)"
				}, {
					"data": "FLD4",
					"title": "Population au délà de 5 km d'un CS (%)",
					"mData": "FLD4",
					"sTitle": "Population au délà de 5 km d'un CS (%)"
				}]
			},
			"renderer_interpolated": {
				"source": "manual",
				"threshold": [10, 20, 40, 60, 80],
				"colormap": ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"],
				"linecolor": "#fff",
				"labelmap": ["moins de 10%", "10-20%", "20-40%", "40-60%", "60-80%", "80% et plus"],
				"legendtitle": "Population à moins de 5 km d'un CS (%)"
			}
		};

	return { metageo, metafield, mapData, metadata}
}