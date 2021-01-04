var initialTable = "change_payment_per_bank"  
var economy_datasets =  [

		{
			index : 1001,
			name : "change_payment_per_bank", 			
			group: "FLUX SELON L'OPERATEUR BANCAIRE",
			valid: true,
			table_num : "Tableau-1001",			
			layerList : [ "world_countries", "world_continents" ],
			label: "Flux de change - par opérateurs bancaires",
			unit: "XOF",
			article: "de ",
			path : `${PATH_PREFIX}data/statistic-economic/tab_1001_banking_operators.csv`,
			source: "TRESOR/MEF",
			data_parser : ECO_CHANGE_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'red']),
			layout : "STANDARD",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [	

				{ fld_name: "FLD1", short_name: "AFRILAND FIRST BANK", long_name: "AFRILAND FIRST BANK", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD2", short_name: "BACI", long_name: "BACI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD3", short_name: "BBG-CI", long_name: "BBG-CI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD4", short_name: "BDA", long_name: "BDA", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD5", short_name: "BGFIBank", long_name: "BGFIBank", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD6", short_name: "BHCI", long_name: "BHCI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD7", short_name: "BICICI", long_name: "BICICI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD8", short_name: "BMS", long_name: "BMS", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD9", short_name: "BNI", long_name: "BNI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD10", short_name: "BOA-CI", long_name: "BOA-CI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD11", short_name: "BRM-CI", long_name: "BRM-CI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD12", short_name: "BSIC-CI", long_name: "BSIC-CI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD13", short_name: "CBI-CI", long_name: "CBI-CI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD14", short_name: "CITIBANK", long_name: "CITIBANK", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD15", short_name: "CNCE", long_name: "CNCE", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD16", short_name: "DBCI", long_name: "DBCI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD17", short_name: "ECOBANK-CI", long_name: "ECOBANK-CI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD18", short_name: "GTBANK-CI", long_name: "GTBANK-CI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD19", short_name: "NSIA BANQUE", long_name: "NSIA BANQUE", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD20", short_name: "ORABANK", long_name: "ORABANK", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD21", short_name: "SCBCI", long_name: "SCBCI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD22", short_name: "SGCI", long_name: "SGCI", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD23", short_name: "SIB", long_name: "SIB", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD24", short_name: "STABIC BANK", long_name: "STABIC BANK", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD25", short_name: "UBA", long_name: "UBA", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD26", short_name: "VERSUSBANK", long_name: "VERSUSBANK", data_type: "INT", unit: "XOF"}
			]
		},
		{
			index : 1011,
			name : "change_payment_commercial_ops", 			
			group: "FLUX DE CHANGE SELON LE MOTIF",
			valid: true,
			table_num : "Tableau-1011",			
			layerList : [ "world_countries", "world_continents" ],
			label: "Flux de change - Opérations commerciales",
			unit: "XOF",
			article: "de ",
			path : `${PATH_PREFIX}data/statistic-economic/tab_1011_motif_ope_commercial.csv`,
			source: "TRESOR/MEF",
			data_parser : ECO_CHANGE_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'purple']),
			layout : "STANDARD",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [					
				{ fld_name: "FLD1", short_name: "Flux Total en Fcfa", long_name: "FLUX DE CHANGE TOTAL (FCFA)", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD2", short_name: "B", long_name: "OPERATIONS COMMERCIALES", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD3", short_name: "B01", long_name: "Règlement de facture (s) d’importation effective de marchandises", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD4", short_name: "B02", long_name: "Règlement de facture (s) d’importation non effective de marchandises ", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD5", short_name: "B04", long_name: "Remboursements des avances ou des trop perçus d'exportations", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD6", short_name: "B05", long_name: "Transferts effectués par des sociétés ivoiriennes sur leurs comptes à l’étranger (hors UEMOA) pour des règlements d’importation effective de marchandises.", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD7", short_name: "B06", long_name: "Transferts effectués par des sociétés ivoiriennes sur leurs comptes à l’étranger pour des règlements d’importation non effective de marchandises.", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD8", short_name: "B09", long_name: "Apurement de dettes fournisseurs, exclusivement en cas d’importation effective de marchandises.", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD9", short_name: "B11", long_name: "Dénouement d’une remise documentaire (REMDOC) pour le règlement d’importation de marchandises.", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD10", short_name: "B12", long_name: "Transferts des revenus issus des parts de production (minière, pétrolière, etc.)", data_type: "INT", unit: "XOF"},

			]
		},
		{
			index : 1012,
			name : "change_payment_services_ops", 			
			group: "FLUX DE CHANGE SELON LE MOTIF",
			valid: true,
			table_num : "Tableau-1012",			
			layerList : [ "world_countries", "world_continents" ],
			label: "Flux de change - Opérations services",
			unit: "XOF",
			article: "de ",
			path : `${PATH_PREFIX}data/statistic-economic/tab_1012_motif_service.csv`,
			source: "TRESOR/MEF",
			data_parser : ECO_CHANGE_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'orange']),
			layout : "STANDARD",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name: "FLD1", short_name: "S",    long_name: "SERVICES", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD2", short_name: "S01",  long_name: "Règlement de facture (s) de prestation effective de services", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD3", short_name: "S02",  long_name: "Règlement de facture (s) de prestation de services non effective et/ou Acompte surrèglement de facture (s) de prestation de", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD4", short_name: "S03",  long_name: "CONSTITUTION DE DEPOT DE GARANTIE, NOTE DE DEBIT, SCOLARITE ET AUTRES", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD5", short_name: "S04",  long_name: "Transport / Fret maritime, aérien, ferroviaire ou terrestre", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD6", short_name: "S05",  long_name: "Services des Administrations publiques ivoiriennes", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD7", short_name: "S06",  long_name: "Frais de scolarité", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD8", short_name: "S07",  long_name: "Allocation de voyage", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD9", short_name: "S09",  long_name: "Transferts de soldes créditeurs des comptes d’escale et de soldes créditeurs des comptes courants d’escale, au profit des armateurs étrangers.", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD10", short_name: "S10", long_name: "Services des Ambassades étrangères et des représentations diplomatiques", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD11", short_name: "S11", long_name: "Paiement de prime d’assurance", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD12", short_name: "S12", long_name: "Paiement des indemnités, Dédommagements, Autres règlements de sinistres en cas d’assurance", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD13", short_name: "S13", long_name: "Paiement de prime de réassurance", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD14", short_name: "S14", long_name: "Paiement des indemnités, Dédommagements, Autres règlements de sinistres en cas de réassurance", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD15", short_name: "S15", long_name: "Rapatriement de fret international encaissé par les représentations nationales de compagnies de transit ou de consignation étrangères", data_type: "INT", unit: "XOF"}
			]
		},
		{
			index : 1013,
			name : "change_payment_transfert_courants", 			
			group: "FLUX DE CHANGE SELON LE MOTIF",
			valid: true,
			table_num : "Tableau-1013",			
			layerList : [ "world_countries", "world_continents" ],
			label: "Flux de change - Transfert courants",
			unit: "XOF",
			article: "de ",
			path : `${PATH_PREFIX}data/statistic-economic/tab_1013_motif_transf_courant.csv`,
			source: "TRESOR/MEF",
			data_parser : ECO_CHANGE_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			layout : "STANDARD",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [	

				{ fld_name: "FLD1", short_name: "TC", long_name: "TRANSFERTS COURANTS (SANS CONTREPARTIE)", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD2", short_name: "TC01", long_name: "Aides familiales ou Secours familial", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD3", short_name: "TC02", long_name: "Economie sur salaire d’expatriés ou de non-résidents", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD4", short_name: "TC03", long_name: "Couverture des soldes débiteurs de transferts rapides d'argent", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD5", short_name: "TC04", long_name: "Approvisionnement de comptes d'expatriés", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD6", short_name: "TC05", long_name: "Approvisionnement de comptes à l'étranger par les résidents ayant acquis le statut de non-résidents", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD7", short_name: "TC06", long_name: "Cotisation au fonctionnement d'association ou d'organisation", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD8", short_name: "TC07", long_name: "Rapatriement des parts d'héritage ou de succession", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD9", short_name: "TC08", long_name: "Cotisations de l'Etat de Côte d’Ivoire (ou de ses démembrements) au budget d'organisations internationales", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD10", short_name: "TC09", long_name: "Appel de fonds sur compte d'ivoiriens de la diaspora", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD11", short_name: "TC10", long_name: "Retour à l’ordonnateur basé hors de l’UEMOA de fonds perçus par erreur en Côte d’Ivoire ou consécutif à l’annulation de transaction commerciale ou financière non réalisée", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD12", short_name: "TC11", long_name: "Transfert du reliquat definancements extérieurs.", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD13", short_name: "TC12", long_name: "Appel de fonds sur compte étranger détenu en Côte d'Ivoire", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD14", short_name: "TC13", long_name: "Paiement de condamnation pécuniaire (amendes, dommages et intérêts, indemnités diverses, …) issue d’une Décision de Justice", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD15", short_name: "TC14", long_name: "Transfert de fonds encaissés en Côte d’Ivoire pour le compte de partenaires extérieurs", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD16", short_name: "TC15", long_name: "Paiement d’impôts", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD17", short_name: "TC16", long_name: "Dons financiers ", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD18", short_name: "TC20", long_name: "Règlements de dépenses ou frais au bénéfice d'un expatrié ou non résident", data_type: "INT", unit: "XOF"}
			]
		},
		{
			index : 1014,
			name : "change_payment_revenus", 			
			group: "FLUX DE CHANGE SELON LE MOTIF",
			valid: true,
			table_num : "Tableau-1014",			
			layerList : [ "world_countries", "world_continents" ],
			label: "(R)-Flux de change - Revenus",
			unit: "XOF",
			article: "de ",
			path : `${PATH_PREFIX}data/statistic-economic/tab_1014_motif_revenus.csv`,
			source: "TRESOR/MEF",
			data_parser : ECO_CHANGE_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'green']),
			layout : "STANDARD",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name: "FLD1",  short_name: "R",    long_name: "(R)-REVENUS", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD2",  short_name: "R01",  long_name: "(R1)-Paiement de salaires ou d'honoraires", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD3",  short_name: "R02",  long_name: "(R2)-Paiement d'indemnités de dédit,de rupture de contrat ou de fin de carrière", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD4",  short_name: "R03",  long_name: "(R3)-Cotisations sociales payées par l’employeur", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD5",  short_name: "R04",  long_name: "(R4)-Cotisations sociales payées par l’employé", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD6",  short_name: "R05",  long_name: "(R5)-Rapatriement de dividendes", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD7",  short_name: "R06",  long_name: "(R6)-Paiement des intérêts sur emprunt reçu de l'étranger", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD8",  short_name: "R07",  long_name: "(R7)-Reversements de loyers ou autres revenus d'investissements immobiliers étrangers", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD9",  short_name: "R08",  long_name: "(R8)-Reversement de pension par un organisme de sécurité sociale ", data_type: "INT", unit: "XOF"},
				{ fld_name: "FLD10", short_name: "R09",  long_name: "(R9)-Paiement de coupons d’obligations ou d’autres titres d’emprunts", data_type: "INT", unit: "XOF"}
			]
		},{
			index : 1,
			name : "covid-19-june16", 
			group: "SPECIAL",
			valid: false,
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

		}	
	]
//tab_1012_motif_service.csv
Array.prototype.push.apply(metaDataBase.table_details, economy_datasets );
