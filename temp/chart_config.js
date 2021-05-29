 var chart_config = {
 	"data": {
 		"labels": ["ABIDJAN 2", "ABIDJAN 1-GRANDS PONTS", "GBEKE", "SUD-COMOE", "AGNEBY-TIASSA-ME", "BELIER", "INDENIE DUABLIN", "LÔH-DJIBOUA", "GÔH", "MARAHOUE", "TONKPI", "CAVALLY-GUEMON", "PORO-TCHOLOGO-BAGOUE", "N'ZI-IFFOU", "BOUNKANI-GONTOUGO", "HAUT SASSANDRA", "HAMBOL", "WORODOUGOU-BERE", "KABADOUGOU-BAFING-FOLON", "GBOKLE-NAWA-SAN-PEDRO"],
 		"datasets": [{
 			"label": "Population à moins de 5 km d'un centre de santé (%)",
 			"type": "bar",
 			"yAxisID": "Y1",
 			"backgroundColor": "rgba(30, 144, 255, 0.85)",
 			"borderColor": "rgba(30, 144, 255, 0.99)",
 			"borderWidth": 1,
 			"fill": true,
 			"data": ["88.5", "86.3", "79", "78.2", "77.9", "72.8", "69.2", "69.1", "66.7", "65", "64", "63.4", "62.7", "61", "57.7", "53.8", "53.7", "51.2", "49", "36.7"]
 		}]
 	},
 	"options": {
 		"responsive": true,
 		"scales": {
 			"x": {
 				"gridLines": {
 					"borderDash": [2, 2],
 					"color": "rgba(128, 128, 128, 0.7)"
 				},
 				"type": "category",
 				"ticks": {
 					"min": "88.5",
 					"max": "36.7",
 					"source": "auto",
 					"autoSkip": false,
 					"autoSkipPadding": 0,
 					"maxRotation": 65,
 					"minRotation": 60,
 					"fontColor": "#222",
 					"fontSize": 12,
 					"fontFamily": "'Univers Condensed',arial"
 				},
 				"offset": true
 			},
 			"y": {
 				"Y1": {
 					"id": "Y1",
 					"display": true,
 					"position": "left",
 					"gridLines": {
 						"borderDash": [3, 3],
 						"color": "rgba(128, 128, 128, 0.7)"
 					},
 					"ticks": {
 						"beginAtZero": false,
 						"fontColor": "#222"
 					},
 					"scaleLabel": {
 						"display": true,
 						"labelString": "Population à moins de 5 km d'un CS (%)",
 						"fontColor": "#222"
 					}
 				}
 			}
 		},
 		"tooltips": {
 			"intersect": true,
 			"titleFontColor": "#333",
 			"backgroundColor": "rgba(255, 255, 255, 0.8)",
 			"bodyFontColor": "#555",
 			"borderWidth": 1,
 			"cornerRadius": 2,
 			"borderColor": "rgba(255, 0, 0, 0.99)",
 			"callbacks": {}
 		},
 		"legend": {
 			"labels": {
 				"fontColor": "#222"
 			}
 		},
 		"hover": {
 			"intersect": true,
 			"mode": "index"
 		},
 		"plugins": {
 			"title": {
 				"display": true,
 				"text": "13-Accessibilité Géographique 2017 par Région sanitaire",
 				"fontColor": "#222"
 			},
 			"zoom": {
 				"pan": {
 					"enabled": true,
 					"mode": "x",
 					"overScaleMode": "x"
 				},
 				"zoom": {
 					"enabled": true,
 					"mode": "x",
 					"overScaleMode": "x"
 				}
 			}
 		}
 	}
 }