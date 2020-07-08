 Ajaxian = new function (){

    return {

        read : function(URL, callBackSuccess, callBackFailure){

            $.ajax({
                url: URL,
                type: "get",
                success: function (data) {
                    callBackSuccess(data)
                   
                
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    callBackFailure(xhr, ajaxOptions, thrownError)
                }
            });

        },
        post : function(URL, data, callBackSuccess, callBackFailure){

            $.ajax({
                     url : URL ,
                    type : "post",
                dataType : "json",
             contentType : "application/json",
                    data : JSON.stringify(data),
                  success: function (data, textSTatus , JQxhr) {
                            callBackSuccess(data)
                  },

                    error: function (xhr, ajaxOptions, thrownError) {
                            callBackFailure(xhr, ajaxOptions, thrownError);
                        }
                })

        }
    }
 
  }


function detect_client(){

    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;// Opera 8.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isIE = /*@cc_on!@*/false || !!document.documentMode;// Internet Explorer 6-11
    var isEdge = !isIE && !!window.StyleMedia;// Edge 20+
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);// Chrome 1 - 79
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);// Edge (based on chromium) detection
    var isBlink = (isChrome || isOpera) && !!window.CSS; // Blink engine detection
    var isMobile = typeof (window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

    var output = {}
        output.browser = {
            isFirefox : isFirefox,
            isChrome : isChrome,
            isSafari : isSafari,
            isOpera : isOpera,
            isIE : isIE,
            isEdge : isEdge,
            isEdgeChromium : isEdgeChromium
        }

        output.isMobile = isMobile;
    return (output)
}


    function object_to_array(obj){
       var arr = Object.entries( obj).map( function(d){ return { key: d[0], value: d[1]}  })
       return arr;
    }

    // "./data/covid-data.json"
    var opera_console = (opera_console) || (function(){
        var _Number = new Intl.NumberFormat();
        var _date = new _create_dateFormatter()

        return {
           _log : function(message){},

            addLog : function(message , result= "" ){},
            updateStats : function(){},
            clearlog : function(){},
            explain : function(){
            },

            date_format : _date
        }


        function _create_dateFormatter() {
            //Used for date display
            var opts = {};

            opts.weekday = "short",
               opts.year = "2-digit",
              opts.month = "2-digit",
                opts.day = "2-digit",
               opts.hour = "2-digit",
             opts.minute = "2-digit",
             opts.second = "2-digit"
         
            if(window.Intl) {
                var lang = "fr-FR";
                var formatter = new window.Intl.DateTimeFormat( lang, opts);

                return {
                    date : function (n){ return( formatter.format(n) )},
                    date_str : function(n){ return( formatter.format(new Date(n)))}
                }
  
            } else {
                return (function(n){return n});   
            }
        }

        function dateFormat(n) {
            //Used for date display
            var opts = {};

            opts.weekday = "short",
               opts.year = "2-digit",
              opts.month = "2-digit",
                opts.day = "2-digit",
               opts.hour = "2-digit",
             opts.minute = "2-digit",
             opts.second = "2-digit"
         
            if(window.Intl) {
                var lang = "fr-FR";
                var formatter = new window.Intl.DateTimeFormat( lang, opts);
                n = new Date(n);
                return formatter.format(n);
            } else {
                return n;   
            }
        }

        function date_now(){
             return( new Date()
                 .toISOString()
                 .replace(/T/, ' ')
                 .replace(/\..+/, '') )
        }
    })()


	// "./data/covid-data.json"
    var UTIL = (function(){
        var _Number = new Intl.NumberFormat();
        return {
            format_number : function(nombre){
                return( _Number.format(nombre))
            },
            format_number_in_object : function(obj){
                var f_obj = {}
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        if( property.indexOf("FLD", 0)==0) {
                            f_obj[property] = _Number.format( obj[property])
                        } else {
                            f_obj[property] =  obj[property]
                        }
                    }
                }   
                return(f_obj)
            }
        }
    })()


    function toJSON(inObj){
        return (JSON.stringify(inObj))
    }

	var parseTime, timeParse;
	set_time_config();

	function fileLoad_JSON( name, path, callBack){
	    d3.json( path , function(error, data) {

	        data.sort(function(a, b) {
	            return parseTime(a.date) - parseTime(b.date);
	        });                 
	        data.forEach(function(d) {

                    d.date_raw = d.date;
                        d.date = parseTime(d.date);
	                d.new_case = +d.new_case;
	              d.new_healed = +d.new_healed;
	            d.new_deceased = +d.new_deceased;
	                d.sum_case = +d.sum_case;
	              d.sum_healed = +d.sum_healed;
	            d.sum_deceased = +d.sum_deceased;
	             d.active_case = + d.sum_case - d.sum_healed - d.sum_deceased;
                   d.nb_sample = +d.nb_sample;
                  d.sum_sample = +d.sum_sample;
                   d.incidence = +d.incidence * 100;
                   d.remission = +d.remission * 100;
                    d.letalite = +d.letalite * 100;
	            
	        });
            //console.log(data)
	        callBack(data);
	        return data;          
	    })
	}


    function fileLoad_CSV( name, path, onSuccessCallBack, onFailCallBack){

		d3.csv( path, function(d){
			return {
				  CODE : d.CODE,
			  ADM_NAME : d.ADM_NAME,
				GEOLOC : d.GEOLOC,
				 LEVEL : d.LEVEL,
				  FLD1 : +d.FLD1,
				  FLD2 : +d.FLD2,
				  FLD3 : +d.FLD3,
			   	  FLD4 : +d.FLD4,
				  FLD5 : +d.FLD5,
				  FLD6 : +d.FLD6,
				  FLD7 : +d.FLD7,
				  FLD8 : +d.FLD8,
				  FLD9 : +d.FLD9,
				 FLD10 : +d.FLD10,
				 FLD11 : +d.FLD11,
				 FLD12 : +d.FLD12
			}

		}, function( error , data){
			if (error){
				console.log("erreur rencontrées")
				onFailCallBack(error);
			} else {
				console.log("chargement réussie")
				onSuccessCallBack(data);
			}
		});
    }


	function format_statistic_tables(data){

		var tmp_data = d3.nest().key(function(d) { return d.LEVEL; }).rollup(function(d) { return d; }).map(data);
		var data_keyVal_region = tmp_data.REGION;
		var data_keyVal_district = tmp_data.DISTRICT;

		table_region = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map(tmp_data.REGION);
		table_district = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map(tmp_data.DISTRICT);
		//sysecho("table_region", table_region);
		//sysecho("table_didtrict", table_district);
		return { 
			"district": table_district, 
			"region": table_region,
			"region_raw" : tmp_data.REGION,
			"district_raw" : tmp_data.DISTRICT
		};
	}



	function set_time_config(){
	    dateFormat = d3.time.format("%d/%m/%Y");//   d3.timeFormat("%d/%m/%Y");
	     parseTime = dateFormat.parse ;//  timeParse("%d/%m/%Y");
	}



    function _StorageManager(){
        var last_item = null;
        return {
            existItem : function (key , byBass = false){
                if (byBass) return true  //Mode émulation d'une clé valide
                var monobjet_json = localStorage.getItem(key);
                last_item = monobjet_json
                if (monobjet_json) return true
                return false;
            },
            getItem: function (){
                return JSON.parse(last_item);
            },

            setItem: function (key, config_object){
                    var monobjet_json = JSON.stringify(config_object);
                        localStorage.setItem(key, monobjet_json);
            },
            removeItem : function (key){
                        localStorage.removeItem(key)
            }
        }
    }

    


    function set_datatable( Selector, colMapArray, Height_in){

        var dtable;

        var dataTable_i18n =  {
            "decimal":        ",",
            "emptyTable":     "Pas de données disponible dans le tableau",
            "info":           "Page _START_ à _END_ sur _TOTAL_ ligne(s)",
            "infoEmpty":      "Aucune ligne à afficher",
            "infoFiltered":   "(filtrage actif: _TOTAL_ ligne(s) trouvée(s) sur _MAX_ )",
            "infoPostFix":    "",
            "thousands":      " ",
            "lengthMenu":     "Afficher _MENU_ lignes",
            "loadingRecords": "Chargement des données en cours...",
            "processing":     "Traitement en cours...",
            "search":         "Rechercher :",
            "zeroRecords":    "Aucune ligne trouvée",
            "paginate": {
                "first":      "Début",
                "last":       "Fin",
                "next":       "Suivant",
                "previous":   "Précédent"
            },
            "aria": {
                "sortAscending":  ": activer le tri ascendant",
                "sortDescending": ": activer le tri descendant"
            }
        };


        dtable =  $(Selector).DataTable({
            data: [],
            "select": true,
            "deferRender": true,
            "scrollY": (Height_in? Height_in: 490),
            "scrollX": true,
            "scrollCollapse": true,
            "scroller" : false,
            "searching": true,
            "paging": true,
            "pageLength": 100,
            "language": dataTable_i18n,
            "columns": colMapArray,
            "fixedHeader": {
                header: true,
                footer: true
            }
        });
        return dtable;
}var default_table_selection = function(){return (this.name === "demographic")? 'selected = "selected"' : "";	};
var default_field_selection = function(){return (this.fld_name === "FLD1")? 'selected = "selected"' : "";	};


function get_renderer ( count, value_range, color_range, labelmap = []){
	var v = value_range
	return {
		      count : count,
 		  threshold : (v.length==0)? v : get_value_range(count, value_range[0], value_range[1] ),
 		   colormap : get_color_range(count, color_range[0], color_range[1]),
 		value_range : array_copy(value_range),
 		color_range : array_copy(color_range),
 		   labelmap : array_copy(labelmap),
 		     source : "auto"
	}

	function get_color_range ( count, start = "#ffffff", end = "#000000"){
	    var color = d3.scale.linear()
	    			.domain([ 0, count ])
	                .interpolate(d3.interpolateRgb)
	                .range([d3.rgb(start), d3.rgb(end)]);
	    var A = new Array( count+1 ).fill("0");
	    var B = A.map(function( c,i ){ return (color(i)) })
	    return (B)
	}
	function get_value_range( count, start, end ){

		var N = (count==0)? 10 : count
		var step = (end - start)/N
		return d3.range(start, end, step ).map( function(d){ return(Math.round(d))})
	}
	function array_copy(arr){
		return( arr.map(function(d){return(d) }) )
	}
}


function generate_colArray( metadata){
   //Build the for the current stats table the definition column to provide to dataTable
   var data_fields = metadata.data_fields;
   var  column_arr  = [
        { "data": "CODE", "title" : "Code" },
        { "data": "ADM_NAME", "title": "Circonscription" }
    ]

    column_arr = data_fields.reduce( function( accu , d){
            accu.push({"data": d.fld_name , "title" : d.short_name })
            return accu
    },  column_arr );
    return(column_arr)
}

function build_colormap ( count, start = "#ffffff", end = "#000000"){
    var color = d3.scale.linear()
    			.domain([ 0, count-1 ])
                .interpolate(d3.interpolateRgb)
                .range([d3.rgb(start), d3.rgb(end)]);
    var A = new Array( count ).fill("0");
    var B = A.map(function( c,i ){ return (color(i)) })
    return (B)
}



var DEFAULT_PARSER = {
		id_field : "CODE",
		name_field : "ADM_NAME",
		class_field : "LEVEL",
		classes : [
			{ ord: 1, value : "REGION", layer : "region_sante"	},
			{ ord: 2, value : "DISTRICT", layer : "district_sante" }
		 ]
	};

var COVID_PARSER = {
		id_field :  "CODE",
		name_field :  "ADM_NAME",
		class_field : "LEVEL",
		classes : [
			{ ord: 1, value : "DISTRICT", layer : "district_admin" },
			{ ord: 2, value : "REGION", layer : "region_admin"	}
		 ]
	};


var metaDataBase = {

	data_base_name : "Atlas Sanitaire - Côte d'Ivoire  - RASS 2017 version 1.0.5",
	version : "2.0",
	date : "21/05/2020",
	default_theme : "covid-19-june16",
	geo_dataset :{
		name : "district_sante",
		class: "Districts sanitaire",
		label: "Découpage en <b> districts sanitaires (83)</b>",
		path : "./data/geojson/health/civ-district-sante.geojson"
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
			path : "./data/geojson/health/civ-region-sante.geojson",
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
			path : "./data/geojson/health/civ-district-sante.geojson",
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
			path : "./data/geojson/tmp/civ-adm1-district-r2.geojson",
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
			path :  "./data/geojson/tmp/civ-adm2-region-r2.geojson",
			idfield : "admin2Pcod",
			labelField :"admin2Name"
		}	
	],	
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
		"std",
		"covid-19",
		"covid-19-june16",
		"paludisme_u5_ans",
		"paludisme_glo",
		"incidence_IRA_u5_ans",
		"incidence_IRA_glo",
		"incidence_anemie",
		"incidence_coqueluche"
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
			index : 18,
			name : "covid-19-june16", 
			valid: true,
			table_num : "Tableau-98",			
			layerList : [  "district_sante", "region_sante" ],
			label: "1- Incidence nationale de la COVID-19 (Carto actualisée au 16/06/2020)",
			unit: "nombre de cas",
			article: "de ",
			path : "./data/statistics/tab_98_covid_june16.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : {
				   source : "manual",
				threshold : [ 1, 5, 10, 100, 1000],
				 colormap : ['#ffffff' , '#fcf285', '#F6B20D' , '#CC5526', '#C22C1C' , '#660207'],  
				 labelmap : ['Aucun cas' , "", "Incidence faible", "Incidence Moyenne" , "Incidence élevée", "Epicentres"],
			  legendtitle : "Incidence  de la maladie à Covid-19 (nb. cas confirmés)"
			},
			layout : "COVID",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [					
				{ 
					fld_name : "FLD1",
					short_name : "COVID-19: Répartition des cas confirmés (au 16 juin 2020)", 
					long_name : " Nombre de cas confirmés de COVID-19", 
					data_type :  "INT", 
					unit : "cas confirmés de COVID-19" 
				},
				{ 
					fld_name : "FLD2",
					short_name : "Nb de décès dus à la COVID-19", 
					long_name : " Nombre de décès dus à la COVID-19 ", 
					data_type :  "INT", 
					unit : "décès dus à la COVID-19" 
				}
			]
		},
		{
			index : 17,
			name : "covid-19", 
			valid: false,
			table_num : "Tableau-99",			
			layerList : [ "region_admin", "district_admin" ],
			label: "1- Incidence nationale de la COVID-19 (deprecated)",
			unit: "nombre de cas",
			article: "de ",
			path : "./data/statistics/tab_99_covid.csv",
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
			index : 1,
			valid: true,
			name : "demographic",
			layerList : [  "district_sante", "region_sante" ],
			table_num :"Tableau-DD",
			label: "2- Données de population (2017)",
			unit: "population",
			article: "de ",
			path : "./data/statistics/tab_01_demography.csv",
			source: "INS-2017",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 9 , [] , ['white', 'red']),
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
			layerList : [  "district_sante", "region_sante" ],
			table_num :"Tableau-5",
			label: "3- Ressources des systèmes de santé - Personnel",
			unit: "effectif",
			article: "d'",
			path : "./data/statistics/tab_05_human_res.csv",
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
			index : 3,
			valid: true,
			name : "ratio_prestataire_pop", 
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau 6",
			label: "4- Ratio Prestataires de soins - Population",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_06_ratio_prestataire_pop.csv",
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
			index : 4,
			valid: true,
			name : "repartition_etabliss_sante", 
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-7",
			label: "5- Ressources des systèmes de santé - Etablissements",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_07_repartition_etabliss_sante.csv",
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
			index : 5,
			valid: true,
			name : "ratio_hrsn_espc_pop", 
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-8",
			label: "6- Ratio établissements de santé/Population",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_08_ratio_hrsn_espc_pop.csv",
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
			index : 6,
			valid: true,
			name : "other_material", 
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-9",
			label: "7- Autres ressources materielles (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_09_other_material.csv",
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
			index : 7,
			valid: true,
			name : "tech_platform", 
			layerList :  [ "district_sante", "region_sante"],
			table_num :"Tableau-10",
			label: "8- Plateaux techniques et équipements (2017)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_10_tech_platform.csv",
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
			index : 8,
			valid: true,
			name : "ratio_ambulance_structure_sante", 
			table_num :"Tableau-11",
			layerList : [ "region_sante" , "district_sante"],
			label: "9- Ratio ambulance par nombre de structure de soin (tab 11)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_11_ratio_ambulance_structure_sante.csv",
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
			index : 9,
			valid: false,
			name : "repartition_struct_transfusion", 
			layerList : [ "region_sante" , "district_sante"],
			table_num :"Tableau-12",
			adminlevels: [ "district","region" ],
			label: "9- Répartition géographique des dépôts/banques de sang (tab. 12)",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_12_repartition_structure_transfusion.csv",
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
			index : 10,
			valid: false,
			name : "xxxxxxxxxxxxxxxxx", 
			table_num :"Tableau-13",
			layerList : [ "region_sante" , "district_sante"],
			adminlevels: [ "region", "district"],
			label: "xxxxxx",
			unit: "Données du tableau 13",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
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
			index : 11,
			name: "std",
			valid: false,
			table_num :"Tableau-45",
			layerList : [ 
				"region_sante" , 
				"district_sante"
			],
			adminlevels: [ "region", "district"],
			label: "Maladies sexuellement transmissibles",
			unit: "cas déclaré(s)",
			article: "de ",
			path : "./data/statistics/tab_45_std.csv",
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
			index : 12,
			name: "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-14",
			layerList : [ "region_sante" , "district_sante"],
			adminlevels: [ "region", "district"],
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'yellow']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Population totale 2017", long_name : "Population totale 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre total de Consultants 2017", long_name : "Nombre total de Consultants 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Taux d'utilisation 2017(%)", long_name : "Taux d'utilisation 2017(%)", data_type :  "INT", unit : "nombre" }
			]
		},

		{
			index : 13,
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			layerList : [ "region_sante" , "district_sante"],
			table_num :"Tableau-15",
			adminlevels: [ "region", "district"],
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
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
			index : 14,
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-16",
			layerList : [ "region_sante" , "district_sante"],
			adminlevels: [ "region", "district"],
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'black']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name : "FLD1", short_name : "Population totale", long_name : " Population totale", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD2", short_name : "Nombre de Consultations 2017", long_name : "Nombre de Consultations 2017", data_type :  "INT", unit : "nombre" },
				{ fld_name : "FLD3", short_name : "Taux de fréquentation 2017 (%)", long_name : "Taux de fréquentation 2017 (%)", data_type :  "INT", unit : "nombre" }
			]
		},

		{
			index : 15,
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-17",
			layerList : [ "region_sante" , "district_sante"],
			adminlevels: [ "region", "district"],
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'cyan']),
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
			index : 16,
			name : "xxxxxxxxxxxxxxxxx", 
			valid: false,
			table_num :"Tableau-18",
			layerList : [ "region_sante" , "district_sante"],
			adminlevels: [ "region", "district"],
			label: "xxxxxx",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_xx_axxxxxxx.csv",
			source: "DIIS/INS",
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
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
			index : 38,
			name : "incidence_IRA_u5_ans", 
			valid: true,
			table_num :"Tableau-38",
			layerList : [ "region_sante" , "district_sante"],
			label: "38-Infections Respiratoires Aiguës (IRA) chez les moins de 5 ans",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_38_Incidence_IRA_under_5.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name: "FLD1", short_name: " Population de 0 à 4 ans", long_name: " Population de 0 à 4 ans", data_type: "INT", unit: "nombre"},
				{ fld_name: "FLD2", short_name: "Nombre de cas d’IRA chez les Enfants", long_name: "Nombre de cas d’IRA chez les Enfants", data_type: "INT", unit: "nombre"},
				{ fld_name: "FLD3", short_name: "Incidence IRA chez les Enfants (‰)", long_name: "Incidence IRA chez les Enfants (‰)", data_type: "INT", unit: "nombre"}
			]
		},
		{
			index : 43,
			name : "incidence_IRA_glo", 
			valid: true,
			table_num :"Tableau-43",
			layerList : [ "region_sante" , "district_sante"],
			label: "43-Infections Respiratoires Aiguës (IRA) dans la population générale",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_43_incidence_IRA_glo.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	

				{ fld_name: "FLD1", short_name: "Population totale", long_name: " Population totale", data_type: "INT", unit: "nombre"},
				{ fld_name: "FLD2", short_name: "Nombre de cas d'IRA dans la population générale", long_name: "Nombre de cas d'IRA dans la population générale", data_type: "INT", unit: "nombre"},
				{ fld_name: "FLD3", short_name: "Incidence d'IRA dans la population générale (‰)", long_name: "Incidence d'IRA dans la population générale (‰)", data_type: "INT", unit: "cas pour 1 000 hbts"}
			]
		},
		{
			index : 39,
			name : "paludisme_u5_ans", 
			valid: true,
			table_num :"Tableau-39",
			layerList : [ "region_sante" , "district_sante"],
			label: "39-Incidence du paludisme chez les moins de 5 ans",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_39_paludisme_incidence_under_5.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name: "FLD1", short_name: "Population de 0 à 4 ans", long_name: "Population 0 à 4 ans", data_type: "INT", unit: "Habitants"},
				{ fld_name: "FLD2", short_name: "Nombre total de cas de paludisme confirmés chez les moins de 5 ans", long_name: "Nombre total de cas de paludisme confirmés chez les moins de 5 ans", data_type: "INT", unit: "nombre"},
				{ fld_name: "FLD3", short_name: "Incidence du paludisme chez les moins de 5 ans (‰)", long_name: "Incidence du paludisme chez les moins de 5 ans (‰)", data_type: "INT", unit: "cas confirmés pour 1 000 hbts"}
			]
		},
		{
			index : 40,
			name : "incidence_anemie", 
			valid: true,
			table_num :"Tableau-40",
			layerList : [ "region_sante" , "district_sante"],
			label: "40- incidence de l'anémie",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_40_incidence_anemie.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [	
				{ fld_name: "FLD1", short_name: "Population de 0 à 4 ans", long_name: "Population de 0 à 4 ans", data_type: "INT", unit: "habitants"},
				{ fld_name: "FLD2", short_name: "Nombre de cas d'Anémie", long_name: "Nombre de cas d'Anémie", data_type: "INT", unit: "cas"},
				{ fld_name: "FLD3", short_name: "Incidence Anémie (‰)", long_name: "Incidence Anémie (‰)", data_type: "INT", unit: "cas pour 1 000 hbts"}

			]
		},
		{
			index : 41,
			name : "incidence_coqueluche", 
			valid: true,
			table_num :"Tableau-41",
			layerList : [ "region_sante" , "district_sante"],
			label: "41-Incidence de la Coqueluche chez les enfants de moins de 5 ans",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_41_coqueluche_incidence.csv",
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
			valid: true,
			table_num :"Tableau-42",
			layerList : [ "region_sante" , "district_sante"],
			label: "42-Incidence du paludisme dans la population générale",
			unit: "nombre",
			article: "de ",
			path : "./data/statistics/tab_42_paludisme_incidence_glo.csv",
			source: "DIIS/INS",
			data_parser : DEFAULT_PARSER,
			renderer : get_renderer( 5 , [] , ['white', 'blue']),
			color_palette: "YlGnBu",
			field_selected : default_field_selection,
			data_fields : [		
				{ fld_name: "FLD1", short_name: "Population totale", long_name: "Population totale", data_type: "INT", unit: "Habitants"},
				{ fld_name: "FLD2", short_name: "Nombre total de cas de paludisme confirmés dans la population", long_name: "Nombre total de cas de paludisme confirmés dans la population", data_type: "INT", unit: "nombre"},
				{ fld_name: "FLD3", short_name: "Incidence global du paludisme (‰)", long_name: "Incidence du paludisme dans la population générale (‰)", data_type: "INT", unit: "cas confirmés pour 1000 hbts"}
			]
		}
	]	
};



 var tmplt_details_hard =   `
	<div class="pane-header">
	 	<span>
	 		<strong> {{ ADM_NAME }} </strong> 
	 	</span>
	 	<a href="#" id="close-details"  onclick="hideDetails(); return false;">    
	 		<i class="fa fa-window-close fa-1x"></i>  
	 	</a>
	 </div>
	 <div class="enveloppe">
		 <table class="detail-table">
		 	{{{ HTML_TABLE_ROWS}}}
		 </table>
	</div>	`


var tmplt_key_select =  `
	<label for="var_selector"> Choisir l'indicateur à cartographier : </label><br/>
	<select id="select-key" name="var_selector" >
		{{#data_fields}}
		 	<option value = "{{fld_name}}"" {{field_selected}}> {{short_name}}  </option>
		{{/data_fields}}
	</select>
`

var tmplt_table_select = `
	<label for="table_selector"> Choisir une thématique : </label><br/>
	<select id="select-table" name="table_selector" >
		{{#table_details}}
		     {{#valid}}<option value = "{{name}}"" {{table_selected}}> {{label}} </option>{{/valid}}
		{{/table_details}}
	</select>
`


var tmplt_palette_select = `
	<nav id="main_nav">
	  <ul>
	    <li>
			<a> Modifier la palette </a>
		  <ul>
			{{#color_palettes}}
				<li class="x{{name}}"><a href="#/action/select-palette/{{name}}">{{name}}<br>
			 		<span class="color-cll  q0-9"> </span>
			 		<span class="color-cll  q1-9"> </span>
			 		<span class="color-cll  q2-9"> </span>
			 		<span class="color-cll  q3-9"> </span> 
			 		<span class="color-cll  q4-9"> </span> 
			 		<span class="color-cll  q5-9"> </span> 
			 		<span class="color-cll  q6-9"> </span> 
			 		<span class="color-cll  q7-9"> </span> 
			 		<span class="color-cll  q8-9"> </span> </a>
		  		</li> <br>
			{{/color_palettes}}
		  </ul>
	    </li>
	  </ul>
	</nav>
	`;


var tmplt_sysinfos = `
			 <div class="pane-header">
			 	<span>
			 		<strong> SYS INFOS </strong> 
			 	</span>
			 	<a href="#" class="close-bttn"  onclick="hideSysInfos(); return false;">    
			 		<i class="fa fa-window-close fa-1x"></i>  
			 	</a>
			 </div>
			 <div class="enveloppe">
				<table class="detail-table">

					<tr><th colspan="2"> View settings </th> </tr>
					<tr><th> svg size : </th> <td> W: {{ svg_width }}; H: {{svg_height}} </td>	</tr>
					<tr><th> Range : </th> <td>  {{range}} </td></tr>
					<tr><th> Domain values : </th> <td> {{domain}} </td></tr>	

					<tr><th colspan="2"> Current Table properties </th> </tr>	
					<tr><th> Table name :  </th> <td>{{table.name}}   </td></tr>	 		
					<tr><th> Table number :</th> <td>{{table.table_num }}   </td></tr>	 		
					<tr><th> Title :       </th> <td>{{table.label}}   </td></tr>	 		
					<tr><th> File path :   </th> <td>{{table.path}} </td></tr>	 		
					<tr><th> Data source : </th> <td>{{table.source}} </td></tr>	 		

					<tr><th colspan="2"> Current field properties </th> </tr>	 		
					<tr><th> key name : </th>    <td>    {{field.fld_name}}   </td></tr>	 		
					<tr><th> Short name : </th> <td>    {{field.short_name}} </td></tr>	 		
					<tr><th> Long name : </th> <td>    {{field.long_name}} </td></tr>	 		
					<tr><th> Unit : </th> <td>    {{field.unit}} </td></tr>	 		
				</table>
			</div>`;


    Mustache.parse(tmplt_details_hard);
    Mustache.parse(tmplt_key_select);
    Mustache.parse(tmplt_table_select);
    Mustache.parse(tmplt_table_select);
    Mustache.parse(tmplt_sysinfos);
var random_data = get_data()

var my_scale = d3.time.scale().domain([Date.now(), Date.now() + 1000*60*30 ]).range([ 0,random_data.length] )

function get_random_data(){

	return ( random_data.map(function( d,i){	
		d.id = i;
		d.when = my_scale.invert(i);
		d.alive = Math.round( d.alive *0.065);
		d.iddle = Math.round( d.iddle *0.3);
		d.total = d.alive + d.iddle ; 
		return (d);
		})	
	)
}


function get_data(){
	return (
	 [{
 	"alive": 52,
 	"iddle": 17
 }, {
 	"alive": 53,
 	"iddle": 17
 }, {
 	"alive": 71,
 	"iddle": 13
 }, {
 	"alive": 88,
 	"iddle": 12
 }, {
 	"alive": 138,
 	"iddle": 11
 }, {
 	"alive": 171,
 	"iddle": 11
 }, {
 	"alive": 208,
 	"iddle": 10
 }, {
 	"alive": 258,
 	"iddle": 10
 }, {
 	"alive": 305,
 	"iddle": 10
 }, {
 	"alive": 344,
 	"iddle": 9
 }, {
 	"alive": 370,
 	"iddle": 9
 }, {
 	"alive": 382,
 	"iddle": 9
 }, {
 	"alive": 385,
 	"iddle": 9
 }, {
 	"alive": 385,
 	"iddle": 9
 }, {
 	"alive": 381,
 	"iddle": 9
 }, {
 	"alive": 374,
 	"iddle": 9
 }, {
 	"alive": 363,
 	"iddle": 10
 }, {
 	"alive": 352,
 	"iddle": 10
 }, {
 	"alive": 343,
 	"iddle": 10
 }, {
 	"alive": 335,
 	"iddle": 10
 }, {
 	"alive": 329,
 	"iddle": 10
 }, {
 	"alive": 323,
 	"iddle": 10
 }, {
 	"alive": 320,
 	"iddle": 10
 }, {
 	"alive": 318,
 	"iddle": 10
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 316,
 	"iddle": 11
 }, {
 	"alive": 318,
 	"iddle": 11
 }, {
 	"alive": 322,
 	"iddle": 11
 }, {
 	"alive": 332,
 	"iddle": 11
 }, {
 	"alive": 338,
 	"iddle": 11
 }, {
 	"alive": 345,
 	"iddle": 11
 }, {
 	"alive": 347,
 	"iddle": 11
 }, {
 	"alive": 347,
 	"iddle": 11
 }, {
 	"alive": 345,
 	"iddle": 11
 }, {
 	"alive": 337,
 	"iddle": 11
 }, {
 	"alive": 326,
 	"iddle": 11
 }, {
 	"alive": 317,
 	"iddle": 11
 }, {
 	"alive": 308,
 	"iddle": 11
 }, {
 	"alive": 299,
 	"iddle": 12
 }, {
 	"alive": 297,
 	"iddle": 12
 }, {
 	"alive": 296,
 	"iddle": 12
 }, {
 	"alive": 296,
 	"iddle": 12
 }, {
 	"alive": 298,
 	"iddle": 12
 }, {
 	"alive": 300,
 	"iddle": 12
 }, {
 	"alive": 303,
 	"iddle": 12
 }, {
 	"alive": 305,
 	"iddle": 12
 }, {
 	"alive": 308,
 	"iddle": 12
 }, {
 	"alive": 308,
 	"iddle": 12
 }, {
 	"alive": 308,
 	"iddle": 12
 }, {
 	"alive": 306,
 	"iddle": 12
 }, {
 	"alive": 304,
 	"iddle": 12
 }, {
 	"alive": 300,
 	"iddle": 12
 }, {
 	"alive": 298,
 	"iddle": 12
 }, {
 	"alive": 297,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 295,
 	"iddle": 13
 }, {
 	"alive": 297,
 	"iddle": 13
 }, {
 	"alive": 300,
 	"iddle": 13
 }, {
 	"alive": 302,
 	"iddle": 13
 }, {
 	"alive": 303,
 	"iddle": 13
 }, {
 	"alive": 304,
 	"iddle": 13
 }, {
 	"alive": 304,
 	"iddle": 13
 }, {
 	"alive": 303,
 	"iddle": 13
 }, {
 	"alive": 299,
 	"iddle": 13
 }, {
 	"alive": 293,
 	"iddle": 14
 }, {
 	"alive": 284,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 272,
 	"iddle": 14
 }, {
 	"alive": 270,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 268,
 	"iddle": 14
 }, {
 	"alive": 271,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 280,
 	"iddle": 14
 }, {
 	"alive": 281,
 	"iddle": 14
 }, {
 	"alive": 281,
 	"iddle": 14
 }, {
 	"alive": 279,
 	"iddle": 14
 }, {
 	"alive": 278,
 	"iddle": 14
 }, {
 	"alive": 277,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 14
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 276,
 	"iddle": 15
 }, {
 	"alive": 273,
 	"iddle": 16
 }, {
 	"alive": 272,
 	"iddle": 16
 }, {
 	"alive": 271,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 16
 }, {
 	"alive": 270,
 	"iddle": 17
 }, {
 	"alive": 270,
 	"iddle": 17
 }, {
 	"alive": 271,
 	"iddle": 17
 }, {
 	"alive": 272,
 	"iddle": 17
 }, {
 	"alive": 274,
 	"iddle": 17
 }, {
 	"alive": 275,
 	"iddle": 17
 }, {
 	"alive": 276,
 	"iddle": 17
 }, {
 	"alive": 276,
 	"iddle": 17
 }, {
 	"alive": 276,
 	"iddle": 17
 }, {
 	"alive": 276,
 	"iddle": 17
 }, {
 	"alive": 275,
 	"iddle": 17
 }, {
 	"alive": 274,
 	"iddle": 18
 }, {
 	"alive": 273,
 	"iddle": 18
 }, {
 	"alive": 273,
 	"iddle": 18
 }, {
 	"alive": 273,
 	"iddle": 18
 }, {
 	"alive": 274,
 	"iddle": 18
 }, {
 	"alive": 275,
 	"iddle": 18
 }, {
 	"alive": 279,
 	"iddle": 18
 }, {
 	"alive": 283,
 	"iddle": 18
 }, {
 	"alive": 287,
 	"iddle": 19
 }, {
 	"alive": 290,
 	"iddle": 19
 }, {
 	"alive": 292,
 	"iddle": 19
 }, {
 	"alive": 293,
 	"iddle": 19
 }, {
 	"alive": 294,
 	"iddle": 19
 }, {
 	"alive": 294,
 	"iddle": 19
 }, {
 	"alive": 294,
 	"iddle": 19
 }, {
 	"alive": 299,
 	"iddle": 19
 }, {
 	"alive": 303,
 	"iddle": 19
 }, {
 	"alive": 310,
 	"iddle": 19
 }, {
 	"alive": 317,
 	"iddle": 19
 }, {
 	"alive": 324,
 	"iddle": 19
 }, {
 	"alive": 334,
 	"iddle": 20
 }, {
 	"alive": 343,
 	"iddle": 20
 }, {
 	"alive": 347,
 	"iddle": 20
 }, {
 	"alive": 348,
 	"iddle": 20
 }, {
 	"alive": 347,
 	"iddle": 20
 }, {
 	"alive": 343,
 	"iddle": 20
 }, {
 	"alive": 337,
 	"iddle": 20
 }, {
 	"alive": 334,
 	"iddle": 20
 }, {
 	"alive": 332,
 	"iddle": 20
 }, {
 	"alive": 331,
 	"iddle": 20
 }, {
 	"alive": 329,
 	"iddle": 20
 }, {
 	"alive": 329,
 	"iddle": 20
 }, {
 	"alive": 329,
 	"iddle": 20
 }, {
 	"alive": 333,
 	"iddle": 21
 }, {
 	"alive": 346,
 	"iddle": 21
 }, {
 	"alive": 367,
 	"iddle": 22
 }, {
 	"alive": 392,
 	"iddle": 22
 }, {
 	"alive": 410,
 	"iddle": 22
 }, {
 	"alive": 435,
 	"iddle": 23
 }, {
 	"alive": 453,
 	"iddle": 23
 }, {
 	"alive": 460,
 	"iddle": 23
 }, {
 	"alive": 462,
 	"iddle": 23
 }, {
 	"alive": 463,
 	"iddle": 23
 }, {
 	"alive": 464,
 	"iddle": 23
 }, {
 	"alive": 462,
 	"iddle": 23
 }, {
 	"alive": 459,
 	"iddle": 23
 }, {
 	"alive": 456,
 	"iddle": 23
 }, {
 	"alive": 453,
 	"iddle": 23
 }, {
 	"alive": 448,
 	"iddle": 23
 }, {
 	"alive": 444,
 	"iddle": 23
 }, {
 	"alive": 439,
 	"iddle": 24
 }, {
 	"alive": 435,
 	"iddle": 24
 }, {
 	"alive": 432,
 	"iddle": 24
 }, {
 	"alive": 432,
 	"iddle": 24
 }, {
 	"alive": 429,
 	"iddle": 24
 }, {
 	"alive": 428,
 	"iddle": 24
 }, {
 	"alive": 427,
 	"iddle": 24
 }, {
 	"alive": 425,
 	"iddle": 24
 }, {
 	"alive": 424,
 	"iddle": 24
 }, {
 	"alive": 424,
 	"iddle": 25
 }, {
 	"alive": 423,
 	"iddle": 25
 }, {
 	"alive": 422,
 	"iddle": 25
 }, {
 	"alive": 422,
 	"iddle": 25
 }, {
 	"alive": 422,
 	"iddle": 25
 }, {
 	"alive": 422,
 	"iddle": 25
 }, {
 	"alive": 424,
 	"iddle": 25
 }, {
 	"alive": 425,
 	"iddle": 25
 }, {
 	"alive": 426,
 	"iddle": 25
 }, {
 	"alive": 427,
 	"iddle": 25
 }, {
 	"alive": 428,
 	"iddle": 25
 }, {
 	"alive": 429,
 	"iddle": 25
 }, {
 	"alive": 432,
 	"iddle": 25
 }, {
 	"alive": 436,
 	"iddle": 25
 }, {
 	"alive": 443,
 	"iddle": 25
 }, {
 	"alive": 451,
 	"iddle": 25
 }, {
 	"alive": 461,
 	"iddle": 25
 }, {
 	"alive": 470,
 	"iddle": 25
 }, {
 	"alive": 474,
 	"iddle": 25
 }, {
 	"alive": 477,
 	"iddle": 25
 }, {
 	"alive": 478,
 	"iddle": 25
 }, {
 	"alive": 479,
 	"iddle": 25
 }, {
 	"alive": 479,
 	"iddle": 25
 }, {
 	"alive": 477,
 	"iddle": 25
 }, {
 	"alive": 475,
 	"iddle": 26
 }, {
 	"alive": 473,
 	"iddle": 26
 }, {
 	"alive": 472,
 	"iddle": 26
 }, {
 	"alive": 471,
 	"iddle": 26
 }, {
 	"alive": 471,
 	"iddle": 26
 }, {
 	"alive": 470,
 	"iddle": 26
 }, {
 	"alive": 469,
 	"iddle": 26
 }, {
 	"alive": 467,
 	"iddle": 26
 }, {
 	"alive": 463,
 	"iddle": 25
 }, {
 	"alive": 460,
 	"iddle": 25
 }, {
 	"alive": 454,
 	"iddle": 25
 }, {
 	"alive": 442,
 	"iddle": 25
 }, {
 	"alive": 432,
 	"iddle": 24
 }, {
 	"alive": 421,
 	"iddle": 24
 }, {
 	"alive": 412,
 	"iddle": 24
 }, {
 	"alive": 408,
 	"iddle": 24
 }, {
 	"alive": 406,
 	"iddle": 24
 }, {
 	"alive": 407,
 	"iddle": 24
 }, {
 	"alive": 411,
 	"iddle": 24
 }, {
 	"alive": 415,
 	"iddle": 24
 }, {
 	"alive": 420,
 	"iddle": 24
 }, {
 	"alive": 426,
 	"iddle": 24
 }, {
 	"alive": 428,
 	"iddle": 24
 }, {
 	"alive": 429,
 	"iddle": 24
 }, {
 	"alive": 430,
 	"iddle": 23
 }, {
 	"alive": 431,
 	"iddle": 23
 }, {
 	"alive": 431,
 	"iddle": 23
 }, {
 	"alive": 431,
 	"iddle": 23
 }, {
 	"alive": 431,
 	"iddle": 23
 }, {
 	"alive": 431,
 	"iddle": 23
 }, {
 	"alive": 426,
 	"iddle": 23
 }, {
 	"alive": 420,
 	"iddle": 23
 }, {
 	"alive": 415,
 	"iddle": 23
 }, {
 	"alive": 407,
 	"iddle": 23
 }, {
 	"alive": 404,
 	"iddle": 23
 }, {
 	"alive": 402,
 	"iddle": 23
 }, {
 	"alive": 399,
 	"iddle": 22
 }, {
 	"alive": 397,
 	"iddle": 22
 }, {
 	"alive": 394,
 	"iddle": 22
 }, {
 	"alive": 393,
 	"iddle": 22
 }, {
 	"alive": 392,
 	"iddle": 22
 }, {
 	"alive": 392,
 	"iddle": 22
 }, {
 	"alive": 390,
 	"iddle": 22
 }, {
 	"alive": 389,
 	"iddle": 22
 }, {
 	"alive": 388,
 	"iddle": 22
 }, {
 	"alive": 387,
 	"iddle": 22
 }, {
 	"alive": 385,
 	"iddle": 22
 }, {
 	"alive": 382,
 	"iddle": 22
 }, {
 	"alive": 379,
 	"iddle": 22
 }, {
 	"alive": 378,
 	"iddle": 22
 }, {
 	"alive": 377,
 	"iddle": 22
 }, {
 	"alive": 376,
 	"iddle": 22
 }, {
 	"alive": 374,
 	"iddle": 22
 }, {
 	"alive": 373,
 	"iddle": 23
 }, {
 	"alive": 373,
 	"iddle": 23
 }, {
 	"alive": 373,
 	"iddle": 23
 }, {
 	"alive": 373,
 	"iddle": 23
 }, {
 	"alive": 373,
 	"iddle": 23
 }, {
 	"alive": 373,
 	"iddle": 24
 }, {
 	"alive": 375,
 	"iddle": 24
 }, {
 	"alive": 381,
 	"iddle": 24
 }, {
 	"alive": 394,
 	"iddle": 25
 }, {
 	"alive": 410,
 	"iddle": 25
 }, {
 	"alive": 424,
 	"iddle": 25
 }, {
 	"alive": 434,
 	"iddle": 25
 }, {
 	"alive": 442,
 	"iddle": 25
 }, {
 	"alive": 443,
 	"iddle": 25
 }, {
 	"alive": 444,
 	"iddle": 25
 }, {
 	"alive": 444,
 	"iddle": 25
 }, {
 	"alive": 443,
 	"iddle": 25
 }, {
 	"alive": 438,
 	"iddle": 25
 }, {
 	"alive": 434,
 	"iddle": 25
 }, {
 	"alive": 430,
 	"iddle": 25
 }, {
 	"alive": 427,
 	"iddle": 25
 }, {
 	"alive": 424,
 	"iddle": 25
 }, {
 	"alive": 422,
 	"iddle": 25
 }, {
 	"alive": 420,
 	"iddle": 25
 }, {
 	"alive": 418,
 	"iddle": 25
 }, {
 	"alive": 417,
 	"iddle": 25
 }, {
 	"alive": 416,
 	"iddle": 25
 }, {
 	"alive": 415,
 	"iddle": 25
 }, {
 	"alive": 413,
 	"iddle": 25
 }, {
 	"alive": 412,
 	"iddle": 25
 }, {
 	"alive": 409,
 	"iddle": 25
 }, {
 	"alive": 407,
 	"iddle": 25
 }, {
 	"alive": 404,
 	"iddle": 25
 }, {
 	"alive": 401,
 	"iddle": 25
 }, {
 	"alive": 397,
 	"iddle": 25
 }, {
 	"alive": 394,
 	"iddle": 25
 }, {
 	"alive": 391,
 	"iddle": 25
 }, {
 	"alive": 389,
 	"iddle": 25
 }, {
 	"alive": 388,
 	"iddle": 25
 }, {
 	"alive": 387,
 	"iddle": 25
 }, {
 	"alive": 385,
 	"iddle": 25
 }, {
 	"alive": 384,
 	"iddle": 25
 }, {
 	"alive": 382,
 	"iddle": 25
 }, {
 	"alive": 379,
 	"iddle": 24
 }, {
 	"alive": 378,
 	"iddle": 24
 }, {
 	"alive": 377,
 	"iddle": 24
 }, {
 	"alive": 375,
 	"iddle": 24
 }, {
 	"alive": 375,
 	"iddle": 24
 }, {
 	"alive": 374,
 	"iddle": 24
 }, {
 	"alive": 374,
 	"iddle": 23
 }, {
 	"alive": 373,
 	"iddle": 23
 }, {
 	"alive": 373,
 	"iddle": 23
 }, {
 	"alive": 371,
 	"iddle": 23
 }, {
 	"alive": 371,
 	"iddle": 23
 }, {
 	"alive": 369,
 	"iddle": 22
 }, {
 	"alive": 368,
 	"iddle": 22
 }, {
 	"alive": 367,
 	"iddle": 22
 }, {
 	"alive": 366,
 	"iddle": 22
 }, {
 	"alive": 364,
 	"iddle": 22
 }, {
 	"alive": 364,
 	"iddle": 21
 }, {
 	"alive": 363,
 	"iddle": 21
 }, {
 	"alive": 362,
 	"iddle": 21
 }, {
 	"alive": 360,
 	"iddle": 21
 }, {
 	"alive": 358,
 	"iddle": 21
 }, {
 	"alive": 355,
 	"iddle": 21
 }, {
 	"alive": 350,
 	"iddle": 21
 }, {
 	"alive": 346,
 	"iddle": 21
 }, {
 	"alive": 340,
 	"iddle": 21
 }, {
 	"alive": 335,
 	"iddle": 21
 }, {
 	"alive": 331,
 	"iddle": 21
 }, {
 	"alive": 329,
 	"iddle": 21
 }, {
 	"alive": 328,
 	"iddle": 21
 }, {
 	"alive": 325,
 	"iddle": 21
 }, {
 	"alive": 324,
 	"iddle": 21
 }, {
 	"alive": 321,
 	"iddle": 21
 }, {
 	"alive": 318,
 	"iddle": 21
 }, {
 	"alive": 316,
 	"iddle": 21
 }, {
 	"alive": 312,
 	"iddle": 21
 }, {
 	"alive": 310,
 	"iddle": 21
 }, {
 	"alive": 307,
 	"iddle": 21
 }, {
 	"alive": 305,
 	"iddle": 21
 }, {
 	"alive": 303,
 	"iddle": 21
 }, {
 	"alive": 300,
 	"iddle": 21
 }, {
 	"alive": 298,
 	"iddle": 21
 }, {
 	"alive": 297,
 	"iddle": 21
 }, {
 	"alive": 296,
 	"iddle": 21
 }, {
 	"alive": 295,
 	"iddle": 21
 }, {
 	"alive": 293,
 	"iddle": 21
 }, {
 	"alive": 292,
 	"iddle": 21
 }, {
 	"alive": 289,
 	"iddle": 21
 }, {
 	"alive": 285,
 	"iddle": 21
 }, {
 	"alive": 281,
 	"iddle": 21
 }, {
 	"alive": 275,
 	"iddle": 21
 }, {
 	"alive": 271,
 	"iddle": 21
 }, {
 	"alive": 268,
 	"iddle": 21
 }, {
 	"alive": 267,
 	"iddle": 21
 }, {
 	"alive": 266,
 	"iddle": 21
 }, {
 	"alive": 266,
 	"iddle": 21
 }, {
 	"alive": 264,
 	"iddle": 21
 }, {
 	"alive": 264,
 	"iddle": 21
 }, {
 	"alive": 264,
 	"iddle": 21
 }, {
 	"alive": 263,
 	"iddle": 20
 }, {
 	"alive": 260,
 	"iddle": 20
 }, {
 	"alive": 260,
 	"iddle": 20
 }, {
 	"alive": 259,
 	"iddle": 20
 }, {
 	"alive": 256,
 	"iddle": 20
 }, {
 	"alive": 254,
 	"iddle": 19
 }, {
 	"alive": 253,
 	"iddle": 19
 }, {
 	"alive": 253,
 	"iddle": 19
 }, {
 	"alive": 252,
 	"iddle": 19
 }, {
 	"alive": 251,
 	"iddle": 19
 }, {
 	"alive": 250,
 	"iddle": 19
 }, {
 	"alive": 250,
 	"iddle": 19
 }, {
 	"alive": 250,
 	"iddle": 19
 }, {
 	"alive": 250,
 	"iddle": 19
 }, {
 	"alive": 251,
 	"iddle": 19
 }, {
 	"alive": 253,
 	"iddle": 19
 }, {
 	"alive": 258,
 	"iddle": 19
 }, {
 	"alive": 263,
 	"iddle": 19
 }, {
 	"alive": 271,
 	"iddle": 19
 }, {
 	"alive": 281,
 	"iddle": 19
 }, {
 	"alive": 290,
 	"iddle": 19
 }, {
 	"alive": 299,
 	"iddle": 19
 }, {
 	"alive": 309,
 	"iddle": 19
 }, {
 	"alive": 315,
 	"iddle": 19
 }, {
 	"alive": 323,
 	"iddle": 19
 }, {
 	"alive": 330,
 	"iddle": 19
 }, {
 	"alive": 333,
 	"iddle": 19
 }, {
 	"alive": 336,
 	"iddle": 19
 }, {
 	"alive": 339,
 	"iddle": 19
 }, {
 	"alive": 340,
 	"iddle": 19
 }, {
 	"alive": 343,
 	"iddle": 19
 }, {
 	"alive": 344,
 	"iddle": 19
 }, {
 	"alive": 346,
 	"iddle": 19
 }, {
 	"alive": 348,
 	"iddle": 19
 }, {
 	"alive": 350,
 	"iddle": 18
 }, {
 	"alive": 350,
 	"iddle": 18
 }, {
 	"alive": 350,
 	"iddle": 18
 }, {
 	"alive": 350,
 	"iddle": 18
 }, {
 	"alive": 348,
 	"iddle": 18
 }, {
 	"alive": 346,
 	"iddle": 18
 }, {
 	"alive": 342,
 	"iddle": 18
 }, {
 	"alive": 338,
 	"iddle": 18
 }, {
 	"alive": 333,
 	"iddle": 18
 }, {
 	"alive": 327,
 	"iddle": 18
 }, {
 	"alive": 317,
 	"iddle": 17
 }, {
 	"alive": 313,
 	"iddle": 17
 }, {
 	"alive": 304,
 	"iddle": 17
 }, {
 	"alive": 296,
 	"iddle": 17
 }, {
 	"alive": 289,
 	"iddle": 17
 }, {
 	"alive": 281,
 	"iddle": 16
 }, {
 	"alive": 277,
 	"iddle": 16
 }, {
 	"alive": 271,
 	"iddle": 16
 }, {
 	"alive": 266,
 	"iddle": 16
 }, {
 	"alive": 263,
 	"iddle": 16
 }, {
 	"alive": 259,
 	"iddle": 16
 }, {
 	"alive": 254,
 	"iddle": 16
 }, {
 	"alive": 250,
 	"iddle": 16
 }, {
 	"alive": 244,
 	"iddle": 16
 }, {
 	"alive": 241,
 	"iddle": 16
 }, {
 	"alive": 237,
 	"iddle": 16
 }, {
 	"alive": 231,
 	"iddle": 16
 }, {
 	"alive": 227,
 	"iddle": 16
 }, {
 	"alive": 223,
 	"iddle": 16
 }, {
 	"alive": 219,
 	"iddle": 16
 }, {
 	"alive": 215,
 	"iddle": 15
 }, {
 	"alive": 213,
 	"iddle": 15
 }, {
 	"alive": 211,
 	"iddle": 15
 }, {
 	"alive": 210,
 	"iddle": 15
 }, {
 	"alive": 209,
 	"iddle": 15
 }, {
 	"alive": 209,
 	"iddle": 15
 }, {
 	"alive": 209,
 	"iddle": 15
 }, {
 	"alive": 208,
 	"iddle": 15
 }, {
 	"alive": 208,
 	"iddle": 15
 }, {
 	"alive": 207,
 	"iddle": 15
 }, {
 	"alive": 205,
 	"iddle": 15
 }, {
 	"alive": 204,
 	"iddle": 15
 }, {
 	"alive": 202,
 	"iddle": 15
 }, {
 	"alive": 201,
 	"iddle": 15
 }, {
 	"alive": 200,
 	"iddle": 15
 }, {
 	"alive": 197,
 	"iddle": 15
 }, {
 	"alive": 195,
 	"iddle": 14
 }, {
 	"alive": 193,
 	"iddle": 14
 }, {
 	"alive": 190,
 	"iddle": 14
 }, {
 	"alive": 189,
 	"iddle": 14
 }, {
 	"alive": 187,
 	"iddle": 14
 }, {
 	"alive": 187,
 	"iddle": 14
 }, {
 	"alive": 187,
 	"iddle": 14
 }, {
 	"alive": 187,
 	"iddle": 14
 }, {
 	"alive": 187,
 	"iddle": 14
 }, {
 	"alive": 187,
 	"iddle": 14
 }, {
 	"alive": 187,
 	"iddle": 13
 }, {
 	"alive": 187,
 	"iddle": 13
 }, {
 	"alive": 187,
 	"iddle": 13
 }, {
 	"alive": 187,
 	"iddle": 13
 }, {
 	"alive": 187,
 	"iddle": 13
 }, {
 	"alive": 188,
 	"iddle": 13
 }, {
 	"alive": 189,
 	"iddle": 13
 }, {
 	"alive": 191,
 	"iddle": 13
 }, {
 	"alive": 193,
 	"iddle": 13
 }, {
 	"alive": 194,
 	"iddle": 13
 }, {
 	"alive": 196,
 	"iddle": 13
 }, {
 	"alive": 198,
 	"iddle": 13
 }, {
 	"alive": 199,
 	"iddle": 13
 }, {
 	"alive": 201,
 	"iddle": 13
 }, {
 	"alive": 202,
 	"iddle": 13
 }, {
 	"alive": 205,
 	"iddle": 13
 }, {
 	"alive": 209,
 	"iddle": 13
 }, {
 	"alive": 214,
 	"iddle": 13
 }, {
 	"alive": 218,
 	"iddle": 13
 }, {
 	"alive": 223,
 	"iddle": 13
 }, {
 	"alive": 224,
 	"iddle": 13
 }, {
 	"alive": 226,
 	"iddle": 13
 }, {
 	"alive": 227,
 	"iddle": 13
 }, {
 	"alive": 227,
 	"iddle": 13
 }, {
 	"alive": 227,
 	"iddle": 13
 }, {
 	"alive": 227,
 	"iddle": 13
 }, {
 	"alive": 225,
 	"iddle": 13
 }, {
 	"alive": 222,
 	"iddle": 13
 }, {
 	"alive": 219,
 	"iddle": 13
 }, {
 	"alive": 217,
 	"iddle": 13
 }, {
 	"alive": 213,
 	"iddle": 13
 }, {
 	"alive": 210,
 	"iddle": 13
 }, {
 	"alive": 205,
 	"iddle": 13
 }, {
 	"alive": 199,
 	"iddle": 13
 }, {
 	"alive": 192,
 	"iddle": 13
 }, {
 	"alive": 188,
 	"iddle": 13
 }, {
 	"alive": 182,
 	"iddle": 13
 }, {
 	"alive": 179,
 	"iddle": 13
 }, {
 	"alive": 177,
 	"iddle": 13
 }, {
 	"alive": 176,
 	"iddle": 13
 }, {
 	"alive": 175,
 	"iddle": 13
 }, {
 	"alive": 174,
 	"iddle": 13
 }, {
 	"alive": 173,
 	"iddle": 13
 }, {
 	"alive": 172,
 	"iddle": 13
 }, {
 	"alive": 171,
 	"iddle": 13
 }, {
 	"alive": 169,
 	"iddle": 13
 }, {
 	"alive": 169,
 	"iddle": 13
 }, {
 	"alive": 169,
 	"iddle": 13
 }, {
 	"alive": 169,
 	"iddle": 13
 }, {
 	"alive": 169,
 	"iddle": 13
 }, {
 	"alive": 169,
 	"iddle": 13
 }, {
 	"alive": 171,
 	"iddle": 13
 }, {
 	"alive": 173,
 	"iddle": 14
 }, {
 	"alive": 176,
 	"iddle": 14
 }]
		 )
}
init_helper_functions()
function get_chart_container( canvas_id, width, height, x_width, x_height ){
	var template = 	`
		<div class="chart-container" style="position: relative; width: ${x_width} ; height: ${x_height}; ">
			<canvas id="${canvas_id}" width="${width}" height="${height}"> 	</canvas>
		</div>`
	return template ;
}


function init_helper_functions(){

	include_button_input = function(eltID , btnCaption , placeHolder, callBackFuncname){
		return(
			`
			<nav class="navbar navbar-light bg-light">
			  <form id="${eltID}" class="form-inline" onSubmit="${callBackFuncname}(this , '${eltID}')">
			    	<input class="form-control mr-sm-2" type="search" placeholder="${placeHolder}" aria-label="Search">
			    	<button class="btn btn-outline-success my-2 my-sm-0" type="submit">${btnCaption}</button>
			  </form>
			</nav>
			`
		)
	};

	include_button = function(eltID , btnCaption, callBackFuncname ){
		return(
			`
			<nav class="navbar navbar-light bg-light">
			  <form id="${eltID}" class="form-inline" onSubmit="${callBackFuncname}(this , '${eltID}')">
			    	<button class="btn btn-outline-success my-2 my-sm-0" type="submit">${btnCaption}</button>
			  </form>
			</nav>
			`
		)
	};

	include_button_group = function( button_arr  ){
		
			var TMPLT = `
				<div id="{{group_id}}" class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"  
				    style="padding: 5px 20px;">
				 	<div class="btn-group btn-group-sm mr-2" role="group" aria-label="First group">
				 	{{#button_list}}
					    <button  id="{{id}}" type="button" class="btn btn-secondary"  onClick="{{callBack}}(this, '{{id}}')"> {{{caption}}} </button>
					 {{/button_list}}
				 	</div>
				</div>
			`
			  return ( Mustache.render(TMPLT , button_arr ))
		
	};

	upcoming_function = function (dataset){
		var html = Mustache.render( 
			`<center>
		       <span style="position:relative; top: 150px; font-size: 20px; color:#999">  
		          <i class="fa {{fa_icon}} fa-5x"  style= "color:#ccc" ></i>
		          <h3> {{messageTitle}}</h3>
		          <h4> {{{messageContent}}}</h4>
		      </span>         
	    	</center> `, 
	    	dataset)
		
	    return html	
	 };

	 include_supervision_table = function(){

	 	return( `
			<div  style="padding: 10px 20px 0px 20px; position: relative; height:80vh; width:90%;background-color: #ddd"> 
				<!--div style="position: absolute; top:0px;height:10vh; width:90%;background-color: #eee;">
				</div-->

				<div style="position:relative; height:35vh; width:90%;margin-top:2vh;overflow:scroll; ">
					<table class="table table-sm">
						<thead>
						    <tr>
						      <th scope="col"> UUID  </th> 
						      <th scope="col"> Démarré à </th> 
						      <th scope="col"> Dernière notif   </th> 
						      <th scope="col"> Requête </th>
						      <th scope="col"> Réponse </th>
						      <th scope="col"> observation </th>
						    </tr>
						</thead>
						<tbody>
							{{#users}}
							    <tr>
							      	<th>  {{uuid}}   </th> 
							      	<td>  {{start_at}} </td>  
							      	<td>  {{when}} </td>  
							      	<td>  {{req}} </td>  
							      	<td>  {{res}} </td>
							      	<td>  {{comments}} </td>
							    </tr>
							{{/users}}   
						  </tbody>
					</table>
				</div>
			</div>`)
	 }


	 // Template to generate the monography //VIEW

     get_table_container  = function(){

      	return  `
      	<div id="table-view-container" style= "position: relative; height:80vh;"> 
            <div id="tableview-wrapper" class="enveloppe">
                <table class="table table-bordered display compact" id="data_table_id" width="100%" cellspacing="0" 
                        style=" white-space: nowrap ;background-color: #ccc;color:#444; width:100%;font-size: 8pt; 
                        font-family:Verdana">
                    <thead> </thead>
                    <tfoot> </tfoot>
                </table>
                <br>
            </div>
		 </div>  ` 
    }

    get_color_ramp_html = function( color_arr ){
    	
    	var TMPLT =  `
    		<div  style= "margin: 20px 0px 0px 40px;position:relative; width:400px; height:300px; overflow-y: scroll;font-size: 10px;">
    			{{#colors}}
    				<div style="display: inline-block; position:relative; border: 1px solid #000 ;margin:5px; width:100px; height:40px; background-color:{{value}};" > {{key}} </div>
    			{{/colors}}
    		</div> 	`
		
		return ( Mustache.render( TMPLT , color_arr ))

    }

	 fa_icon = function(ico_name){
	 	return ( ` <i class="fa fa-${ico_name}" aria-hidden="true"></i> `)
	 }

}//app-controller-datatable.js
function ui_render_dataTable( containerID,  Cfg , data = [] , callBack, callBack_UnSelect, useColArray ){

		var callBackFuncREF = callBack;
		var callBack_UnSelect_FuncREF = callBack_UnSelect;
	    var configObj = Cfg;
		var _reload_needed = false
		var OptionsObj = update_Options(Cfg)  ;
	        
		    $(containerID).html( get_html_struct(Cfg.id , Cfg.colMapArray, useColArray ));
	        var dt_coreObject =  $(`#${Cfg.id}`).DataTable( OptionsObj );


	        if ( data.length > 0 ) {
	        	__load_data(data)
	        }
	        __bind_callbacks( callBackFuncREF, callBack_UnSelect_FuncREF );


		return {
			loadData : __load_data,
			reloadNeeded : function(){
				if ( _reload_needed ) return true
				_reload_needed = true
				return false
			},
			reloadData : function (colDef , data){
				__kill_dtView();

				configObj.colMapArray = colDef;
				OptionsObj = update_Options(configObj);

               $(containerID).html( get_html_struct( configObj.id , configObj.colMapArray ) );
				dt_coreObject =  $(`#${configObj.id}`).DataTable( OptionsObj )
				__load_data(data);
				__bind_callbacks( callBackFuncREF, callBack_UnSelect_FuncREF);
			}
		}


		function __load_data(data){
			//dt_coreObject.clear();
			dt_coreObject.rows.add( data ).draw();
			dt_coreObject.columns(0).order('desc').draw();
		}

		function __kill_dtView(){

			dt_coreObject.off("select");
			dt_coreObject.clear().destroy(true);;
		}

		function __bind_callbacks(callBack, callBack_Unselect){

			dt_coreObject.on( 'select', function ( e, dt, type, indexes ) {
			    	if ( type === 'row' ) {
				        var _row_data = dt_coreObject.rows( indexes ).data().toArray();
				        callBack( _row_data[0] );
				    }
				}
			);

			dt_coreObject.on( 'deselect', function ( e, dt, type, indexes ) {
			    	if ( type === 'row' ) {
				        var _row_data = dt_coreObject.rows( indexes ).data().toArray();
				        callBack_Unselect( _row_data[0] );
				    }
				}
			);
		}


        function update_Options(Config){
        	return {
	            data: [],
	            "select": true,
	            "deferRender": true,
	            "scrollY":  Config.Height_in?  Config.Height_in : '25vh',
	            "scrollX": true,
	            "scrollCollapse": true,
	            "scroller" : false,
	            "searching": true,
	            "paging": true,
	            "pageLength": 100,
	            "language": get_i18n_params(),
	            "columns": Config.colMapArray,
	            "fixedHeader": {
	                header: true,
	                footer: true
	            }
	        }
        }
        function get_html_struct( id , inColArray, useColArray = true ){

        	var  colArray = useColArray? inColArray :  [] ;
        	//colArray = []
        	//alert ( "Longueur de la colonne List = " + colArray.length)
        	var  TMPLT = `
                <table class="table table-bordered display compact" id="${id}" width="100%" cellspacing="0" 
                        style=" white-space: nowrap ;background-color: #ccc;color:#444; width:100%;font-size: 8pt; 
                        font-family:Verdana">
                    <!--thead> 
                    	<tr>
                    		{{#field_list}}
                    			<th> {{short_name}} </th>
                    		{{/field_list}}

                    	</tr>
                    </thead>
                    <tfoot> 
                    	<tr>
                    		{{#field_list}}
                    			<th> {{short_name}} </th>
                    		{{/field_list}}

                    	</tr>
                    </tfoot-->

                </table>
        	`

        	return( Mustache.render( TMPLT, { field_list : colArray }) )
        }

        function get_i18n_params(){
        	return ({
	            "decimal":        ",",
	            "emptyTable":     "Pas de données disponible dans le tableau",
	            "info":           "Page _START_ à _END_ sur _TOTAL_ ligne(s)",
	            "infoEmpty":      "Aucune ligne à afficher",
	            "infoFiltered":   "(filtrage actif: _TOTAL_ ligne(s) trouvée(s) sur _MAX_ )",
	            "infoPostFix":    "",
	            "thousands":      " ",
	            "lengthMenu":     "Afficher _MENU_ lignes",
	            "loadingRecords": "Chargement des données en cours...",
	            "processing":     "Traitement en cours...",
	            "search":         "Rechercher :",
	            "zeroRecords":    "Aucune ligne trouvée",
	            "paginate": {
	                "first":      "Début",
	                "last":       "Fin",
	                "next":       "Suivant",
	                "previous":   "Précédent"
	            },
	            "aria": {
	                "sortAscending":  ": activer le tri ascendant",
	                "sortDescending": ": activer le tri descendant"
	            }
        	})
        }

}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ui_render_navtabs ( _eltID , Cfg , callBack , delay = 1){

	/* Config structure
	   var Cfg = {
	   		id : "nav-tab-01",
	   		default : "tab-b",
	   		tabs : [
	   			{ id: "tab-a", name: "graphics" , label : "Graphiques"    , Html_content : ""},
	   			{ id: "tab-b", name: "table" ,    label : "Vue tabulaire" , Html_content : "" },
	   			{ id: "tab-c", name: "comments" , label : "Comentaire"    , Html_content : "" }
	   		]
	   }
	*/
	var tmplt_01 = `
			<div class="tab-content orient-${Cfg.nav_position}" id="${Cfg.id}-tabContent">
				{{#tabs}}
					<div class="tab-pane fade show {{active}}" id="{{id}}" role="tabpanel" aria-labelledby="{{id}}-tab">
						{{{html_content}}}
					</div>				
				{{/tabs}}
			</div>
	`

		var tmplt_02 = `
			<nav>
			  <div class="nav nav-tabs orient-${Cfg.nav_position}" id="_nav-tab" role="tablist">
				{{#tabs}}
					<a class="nav-item nav-link {{active}} {{disable}}" id="{{id}}-tab" data-toggle="tab" data-tabname="{{name}}" data-tablabel="{{label}}"  href="#{{id}}" role="tab" 
					aria-controls="{{id}}" aria-selected="{{selected}}"> {{{label}}} </a>			
				{{/tabs}}
			  </div>
			</nav>
	`

	var template_nav_tabs = Cfg.nav_position == "top"? tmplt_02 + tmplt_01 : tmplt_01 + tmplt_02
		template_nav_tabs = `   <div id="#${Cfg.id}"  class="card ${Cfg.color_theme}"> 	 ${template_nav_tabs}   </div>	`

	//Add helper func for mustache render for Bootstrap-wise properties

		var data = Cfg
		data.tabs = data.tabs.filter(function(d){return(d.visible)});
		data.tabs = Cfg.tabs.map( function(d){
			d["active"] = (d.id == data.default)? "active" : "";
			d["selected"] = (d.id == data.default)? "true" : "false";
			d["disable"] = (d.enabled == false)? "disabled" : "";
			return (d)
		});

	var componentHtml = Mustache.render( template_nav_tabs,  data );

	setTimeout(  function(){ d3.select(`${_eltID}`).html(componentHtml ); bind_Selector();}, delay)


    return {
    	api_func : function(theme){},
    	show_tab : function(tab_id){
    		//opera_console.addLog("Acticating tab num " + tab_index + `: ID => #${Cfg.id} a:eq(${tab_index})`, "request")
    		$(`#${tab_id}-tab`).tab('show');

    	}
    }

	function bind_Selector(){

		$( `${ _eltID} .nav-item.nav-link` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "tabname": _data.tabname, "label": _data.tablabel };
					callBack( _info );
			}
		})			
	}
	function is_function(f){
	    return (Object.prototype.toString.call(f) == '[object Function]') 
	} 
}//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ui_render_dropdown_inputgroup( _eltID , Cfg , callBack ){

	var template_drop_downn = `
			 <div class="input-group-prepend">
			    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
			      aria-haspopup="true" aria-expanded="false"> ${Cfg.prompt} :</button>
			    <div class="dropdown-menu">
				    {{#option_list}}
						<a class="dropdown-item"  data-key="{{key}}" data-label="{{label}}"
						style="line-height:1.2em; padding: 1px 4px; font-size:0.8rem;" href="#"> {{ label }} </a>
					{{/option_list}}
			    </div>
			</div>
		  <input type="text" class="form-control" aria-label="Text input with dropdown button" value="">
		 `;


	var data = Cfg ;
    var transform_func = Cfg.transform;
    var filter_func = Cfg.filter;

    //Construire la liste des options
    __refresh_options(Cfg.options)

    return {
    	update_view: function(key){
    		console.log(" _eltID " + _eltID )
   			var _info = $(`${_eltID}  a[data-key="${key}"]`)[0].dataset;
    		$(`${ _eltID} > input.form-control`).val( _info.label );
    	},
    	refresh_options : function(options) {
    		__refresh_options(options)
    	}
    }

    function __refresh_options( options ){
		//filtrer la liste d'options
		console.log("Control name :" + Cfg.prompt)
		console.log(options)
		data.option_list  =  is_function( filter_func ) ? 
				data.option_list = options.filter( filter_func ) : 
				                                          options

		//Transformer (reformattage) de la liste d'options
		data.option_list = is_function( transform_func ) ?
			data.option_list = data.option_list.map( transform_func ) :
			data.option_list.map( function(d){
			d.key = d[Cfg.transform.key]
			d.label = d[Cfg.transform.label]
			return (d)
			}) 

		var componentHtml = Mustache.render( template_drop_downn ,  data );
		d3.select(`${_eltID}`).html(componentHtml );
		bind_Selector();

	}

	function bind_Selector(){

		$( `${ _eltID} .dropdown-item` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "key": _data.key, "label": _data.label};
					$(`${ _eltID} > input.form-control`).val(_info.label);
					callBack( _info );
			}
		})			
	}

	function is_function(f){
	    return (Object.prototype.toString.call(f) == '[object Function]') 
	}
}//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function generate_legend( dom_elt, Cfg ){


	var formatNumber = d3.format('d'); 
	var cell_pos_scale = d3.scale.threshold();
	var legendSvg = d3.select( dom_elt ).append('svg') ;  
		legendSvg.attr('width', '100%').attr('height', '50');
	var ldg_Axis = d3.svg.axis();

	var rect_group = legendSvg.append('g').attr("class", "cell-rect");
	var axis_group = legendSvg.append('g').attr("class", "axis")
	var text_group = legendSvg.append('g').attr("class", "custom_label");


	//var center_dx = Cfg.width-
	text_group.attr("transform", `translate( ${ 15 + Cfg.offset.x} , ${Cfg.offset.y})`)
	rect_group.attr("transform", `translate( ${ 15 + Cfg.offset.x} , ${Cfg.offset.y})`);
	axis_group.attr("transform", `translate( ${ 15 + Cfg.offset.x} , ${Cfg.offset.y})`);

	var title_text = text_group.append("text").attr("class" , "title-label")

    build_legend_elements();


    return {
    	set_prop : function( prop_name , value ){
    		show_config("BEFORE:")
    		Cfg[ prop_name ] = value;
    		show_config("AFTER:")
    	},
    	refresh : function(){
    		build_legend_elements();
    	}
    }

    function show_config(mssg){
    	//console.log(mssg + JSON.stringify(Cfg));
    }

    function build_legend_elements(){
    	var color_list
	    Cfg.count  = Cfg.domain.length 
	    Cfg.cell.width = Math.round( Cfg.width/(Cfg.count + 1) );
		
		opera_console.addLog(  "LegendController width : " + Cfg.width + ", with " + Cfg.count + " legend classes :: " + JSON.stringify(Cfg.domain))
		cell_pos_scale
			.domain( Cfg.domain )
			.range(d3.range(0 , Cfg.width +5, Cfg.cell.width))	

		ldg_Axis 
			 .scale( cell_pos_scale )           
			 .orient("bottom")
			 .tickSize(Cfg.tickSize)
			 .tickFormat(function(d) {
				return formatNumber(d);
			});
		//end section
		if (Cfg.colorscale.start && Cfg.colorscale.end){
			Cfg._color_list = get_color_scheme( Cfg.count  , Cfg.colorscale.start, Cfg.colorscale.end)
		} else {
			Cfg._color_list = Cfg.colorscale
		}

		update_title()
		build_color_ramp( rect_group, Cfg.cell.width, Cfg._color_list, "#000")
		place_custom_label( text_group )
		update_axis()
		
    }


 	function update_axis(){
		axis_group.call( ldg_Axis )
 	}

    function update_title(){
    	title_text
	        .style( "fill", "#222")
	        .style( "font-weight", 700)
	        .style( "font-size", "1em")
	        .style( "text-anchor", "start" )
			.attr ( "x" , 0 )
	        .attr ( "y" , -12)
	        .text ( Cfg.title );
    }

	function place_custom_label( group ){
		if (Cfg.custom_label == undefined) return

		labels = group.selectAll('text.custom-label')
			.data(Cfg.custom_label );


		gene_and_style(labels);
		gene_and_style(labels.enter().append("text"));	
		labels.exit().remove();

		function gene_and_style( in_labels ){

			in_labels
			    .attr ("class", "custom-label")
		        .style( "fill", "#555")
		        .style( "font-size", "1.0em")
		        .style( "text-anchor", "middle" )
				.attr ( "x" ,  function(d,i){ return( (i + 0.5) * Cfg.cell.width ) })
		        .attr ( "y" , -3 )
		        .attr ( "transform", "rotate(" + 0 + ")")
		        .text ( function(d){ return d } );
		}
	}

	function build_color_ramp( group , dw, color  , stroke = "none"){


		rects = group.selectAll('rect')
			.data(d3.range(0, color.length ));

		gene_and_style(rects);
		gene_and_style(rects.enter().append("rect"));	
		rects.exit().remove();

		function gene_and_style( in_rect ){

			in_rect
				.attr( "x"      ,  function(d,i){ return( i * dw ) })
				.attr( "height" ,  Cfg.cell.height).attr( "width"  , dw )
				.attr( "fill"   ,  function(d,i){ return(color[i]) })
				.attr( "stroke" ,  stroke )
				.attr( "stroke-width"   , "1px" )
		}
	}	

	function get_color_scheme( count, start = "#ffffff", end = "#000000"){
	    var color = d3.scale.linear()
	    			.domain([ 0, count ])
	                .interpolate(d3.interpolateRgb)
	                .range([d3.rgb(start), d3.rgb(end)]);
	    var A = new Array( count+1 ).fill("0");
	    var B = A.map(function( c,i ){
					 //console.log( " Color element : " + i  + " " + color(i))
					 return (color(i))
				})
	    return (B)
	}

	function is_function(f){
	    return (Object.prototype.toString.call(f) == '[object Function]') 
	} 
}


    var CHART_FONT_COLORS = {
    	"covid" : {
    		legend : "#ddd",
    		  axis : "#ddd",
    		 title : "#ddd",
    	scaleLabel : "#ddd"

    	},
      	"rass" : {
    		legend : "#222",
    		  axis : "#222",
    		 title : "#222",
        scaleLabel : "#222"
    	}	
    }
    

    function create_Chart( in_data , elt_id, Cfg ){
    	Chart.defaults.global.defaultFontColor = "#ddd";

		var dateFormat = d3.time.format("%d-%m-%Y");
		var time_pattern = "DD/MM/YYYY";
		var label_list = in_data.map(function (d){ return (d[ Cfg.label_field]) } ) ;

		Cfg.label_min = label_list[0]
		Cfg.label_max = label_list[label_list.length -1]

    	var chart_configurator = {

		    data: {
		        labels: in_data.map(function (d){ return (d[ Cfg.label_field]) } ) ,
		        datasets: Cfg.charts.map(function(chart){
					return {
						label: chart.label,
						type : chart.type ,
						yAxisID : chart.yAxisID,
						backgroundColor : get_color(chart.backgroundColor, 0.45),
						borderColor : get_color( chart.borderColor, 0.99),
						borderWidth : ( chart.type == "bar")? 1 : (chart.borderWidth? chart.borderWidth : 1),
						fill : (chart.type == "line") ? false : true ,
						data : in_data.map(function (d){ return d[chart.field]}) 

					}
				}),
		    },

		    options: {
		    	maintainAspectRatio : false,
		        title: {
		             display: true,
		                text: Cfg.title,
		           fontColor: Cfg.fontColors.title
		        },

				tooltips : {
					intersect : true,
					titleFontColor : '#333',
					backgroundColor  : get_color( "WHITE", 0.8),
					bodyFontColor : '#555',
					borderWidth : 1,
					cornerRadius : 2,
					borderColor : get_color( "RED", 0.99),		
				},
		        scales: {
		            xAxes: generate_xAxes_section(Cfg),		        	
		            yAxes: generate_yAxes_section(Cfg)
		        },
		        legend: {
	                labels: {
	                   fontColor: Cfg.fontColors.legend
	                }
       			}
		    }
		}
		//var CHART_CONFIG = JSON.stringify(chart_configurator)
		//console.log(CHART_CONFIG)

		var canvas = document.getElementById(elt_id);
		var ctx = canvas.getContext("2d");
			canvas.style.backgroundColor = "#333";

			ctx.fillRect(0, 0, canvas.width, canvas.height);


		var myChart = new Chart( canvas, chart_configurator)
		    

		return myChart

    }




function create_Chart_ex( data_struct , elt_id, Cfg ){
	
	var dateFormat = d3.time.format("%d-%m-%Y");
	var time_pattern = "DD/MM/YYYY";

	Cfg.label_min = data_struct.min;
	Cfg.label_max = data_struct.max;

	var CHART_CONFIG = JSON.stringify(Cfg)
	//console.log("HIGHLEVEL CONFIG ::---------------------------->>> " +CHART_CONFIG)
	//opera_console.log("HIGHLEVEL CONFIG ::---------------------------->>> " + CHART_CONFIG)

	var chart_configurator = {

	    data: {
	        labels:  data_struct.labels ,
	        datasets: Cfg.charts.map(function(chart){
				return {
					label: chart.label,
					type : chart.type ,
					yAxisID : chart.yAxisID,
					backgroundColor : get_color(chart.backgroundColor, 0.45),
					borderColor : get_color( chart.borderColor, 0.99),
					borderWidth : ( chart.type == "bar")? 1 : (chart.borderWidth? chart.borderWidth : 1),
					fill : (chart.type == "line") ? false : true ,
					data : data_struct.data

				}
			}),
	    },

	    options: {
	    	maintainAspectRatio : false,
	        title: {
	            display: true,
	            text: Cfg.title, 
	       fontColor: Cfg.fontColors.title
	        },

			tooltips : {
				intersect : true,
				titleFontColor : '#333',
				backgroundColor  : get_color( "WHITE", 0.8),
				bodyFontColor : '#555',
				borderWidth : 1,
				cornerRadius : 2,
				borderColor : get_color( "RED", 0.99),		
			},
	        scales: {
	            xAxes: generate_xAxes_section(Cfg),		        	
	            yAxes: generate_yAxes_section(Cfg)
	        },
	        legend: {
                labels: {
                   fontColor: Cfg.fontColors.legend
                }
   			}
	    }
	}

	//var CHART_CONFIG = JSON.stringify(chart_configurator)
	//console.log("\n\n\nLOW CONFIG ::---------------------------->>> " + CHART_CONFIG + "\n\n")
	//opera_console.log(CHART_CONFIG)

	var ctx = document.getElementById(elt_id);
	var myChart = new Chart(ctx, chart_configurator)
	return myChart

}


    function generate_yAxes_section(Cfg){
    	//Génère la section de l'objet options relatives aux axes Yaxis
    	var axes_def = [];
    	var no_yAxis = true;
  
 		[ "y-axis-1" , "y-axis-2" ].forEach(function(axis_name){
 			if (Cfg[axis_name])	{
 				axes_def.push( new_yAxis( Cfg[axis_name], axis_name ) )
 				no_yAxis = false
 			}
 		})

 		if (axes_def.length == 0 ){
 			axes_def.push({
	       		id: "y-axis-1",
        		display: "true",
        		position: "left",
            	gridLines : {
            		borderDash : [ 3, 3],
        			color : get_color( "GRAY", 0.7)
        		},
                ticks: {
                    beginAtZero: false
                },
                scaleLabel : {
                	display: true,
                	labelString : "Nombre de cas",
                	fontColor : Cfg.fontColors.scaleLabel
                }
 			})
 		}

 		return (axes_def)

    	function new_yAxis( axe, axe_id ){
    		return {
        		id: axe_id,
        		display: axe.display,
        		position: axe.position,
            	gridLines : {
            		borderDash : [ 3, 3],
        			color : get_color( "GRAY", 0.7)
        		},
                ticks: {
                    beginAtZero: false,
                      fontColor: Cfg.fontColors.axis,
                },
                scaleLabel : {
                	display: true,
                	labelString : axe.labelString ? axe.labelString : "Title axe y1",
                	  fontColor : Cfg.fontColors.scaleLabel
                }
			}
    	}
    }

    function generate_xAxes_section( Cfg ){
    	var time_pattern = "DD/MM/YYYY"
    	var xaxis_type = Cfg["x-axis-style"];

    	var scale_set = {
    		"RASS" : {
            	gridLines : {
            		borderDash : [ 2, 2],
        			color : get_color( "GRAY", 0.7)
        		},
            	type : 'category',
                ticks:{
                	min: Cfg.label_min,
                	max: Cfg.label_max,
                	source: "auto",
                	autoSkip: false,
                	autoSkipPadding: 0,
                	maxRotation: 90,
                	minRotation: 60, 
                	fontColor: Cfg.fontColors.axis,
                	fontSize: 9,
					fontFamily: "Univers Condensed,arial",
					callback: function(value, index, values){
						return(truncateString(value, 15))
					}
                }
            },
    		"COVID" :  {
            	gridLines : {
            		borderDash : [ 2, 2],
        			color : get_color( "GRAY", 0.7)
        		},
            	type : 'time',
            	display: true,
                time: {		 
                	format: time_pattern,        
                    displayFormats: {
                    	day : "DD MMM"
                    }
                },
                ticks:{
                	source: "auto",
                	autoSkip: true,
                	autoSkipPadding: 25,
                	fontColor: Cfg.fontColors.axis,
                	maxRotation: 0
                }
		    }
    	}
    	return [scale_set[ xaxis_type]];
    }


	function truncateString(str, num) {
	  if (str.length <= num) {
	    return str
	  }
	  return str.slice(0, num) + '...'
	}

	function get_color( named_color , alpha){
		return color_helper( chartColors[named_color]).alpha(alpha).rgbString()
	}


'use strict';


INIT_NAMED_COLOR_LIST();

(function(global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */

}(this));


function INIT_NAMED_COLOR_LIST(){
	window.chartColors = {
		INDIANRED: 'RGB(205, 92, 92)',
		LIGHTCORAL: 'RGB(240, 128, 128)',
		SALMON: 'RGB(250, 128, 114)',
		DARKSALMON: 'RGB(233, 150, 122)',
		LIGHTSALMON: 'RGB(255, 160, 122)',
		CRIMSON: 'RGB(220, 20, 60)',
		RED: 'RGB(255, 0, 0)',
		FIREBRICK: 'RGB(178, 34, 34)',
		DARKRED: 'RGB(139, 0, 0)',
		PINK: 'RGB(255, 192, 203)',
		LIGHTPINK: 'RGB(255, 182, 193)',
		HOTPINK: 'RGB(255, 105, 180)',
		DEEPPINK: 'RGB(255, 20, 147)',
		MEDIUMVIOLETRED: 'RGB(199, 21, 133)',
		PALEVIOLETRED: 'RGB(219, 112, 147)',
		LIGHTSALMON: 'RGB(255, 160, 122)',
		CORAL: 'RGB(255, 127, 80)',
		TOMATO: 'RGB(255, 99, 71)',
		ORANGERED: 'RGB(255, 69, 0)',
		DARKORANGE: 'RGB(255, 140, 0)',
		ORANGE: 'RGB(255, 165, 0)',
		GOLD: 'RGB(255, 215, 0)',
		YELLOW: 'RGB(255, 255, 0)',
		LIGHTYELLOW: 'RGB(255, 255, 224)',
		LEMONCHIFFON: 'RGB(255, 250, 205)',
		LIGHTGOLDENRODYELLOW: 'RGB(250, 250, 210)',
		PAPAYAWHIP: 'RGB(255, 239, 213)',
		MOCCASIN: 'RGB(255, 228, 181)',
		PEACHPUFF: 'RGB(255, 218, 185)',
		PALEGOLDENROD: 'RGB(238, 232, 170)',
		KHAKI: 'RGB(240, 230, 140)',
		DARKKHAKI: 'RGB(189, 183, 107)',
		LAVENDER: 'RGB(230, 230, 250)',
		THISTLE: 'RGB(216, 191, 216)',
		PLUM: 'RGB(221, 160, 221)',
		VIOLET: 'RGB(238, 130, 238)',
		ORCHID: 'RGB(218, 112, 214)',
		FUCHSIA: 'RGB(255, 0, 255)',
		MAGENTA: 'RGB(255, 0, 255)',
		MEDIUMORCHID: 'RGB(186, 85, 211)',
		MEDIUMPURPLE: 'RGB(147, 112, 219)',
		REBECCAPURPLE: 'RGB(102, 51, 153)',
		BLUEVIOLET: 'RGB(138, 43, 226)',
		DARKVIOLET: 'RGB(148, 0, 211)',
		DARKORCHID: 'RGB(153, 50, 204)',
		DARKMAGENTA: 'RGB(139, 0, 139)',
		PURPLE: 'RGB(128, 0, 128)',
		INDIGO: 'RGB(75, 0, 130)',
		SLATEBLUE: 'RGB(106, 90, 205)',
		DARKSLATEBLUE: 'RGB(72, 61, 139)',
		MEDIUMSLATEBLUE: 'RGB(123, 104, 238)',
		GREENYELLOW: 'RGB(173, 255, 47)',
		CHARTREUSE: 'RGB(127, 255, 0)',
		LAWNGREEN: 'RGB(124, 252, 0)',
		LIME: 'RGB(0, 255, 0)',
		LIMEGREEN: 'RGB(50, 205, 50)',
		PALEGREEN: 'RGB(152, 251, 152)',
		LIGHTGREEN: 'RGB(144, 238, 144)',
		MEDIUMSPRINGGREEN: 'RGB(0, 250, 154)',
		SPRINGGREEN: 'RGB(0, 255, 127)',
		MEDIUMSEAGREEN: 'RGB(60, 179, 113)',
		SEAGREEN: 'RGB(46, 139, 87)',
		FORESTGREEN: 'RGB(34, 139, 34)',
		GREEN: 'RGB(0, 128, 0)',
		DARKGREEN: 'RGB(0, 100, 0)',
		YELLOWGREEN: 'RGB(154, 205, 50)',
		OLIVEDRAB: 'RGB(107, 142, 35)',
		OLIVE: 'RGB(128, 128, 0)',
		DARKOLIVEGREEN: 'RGB(85, 107, 47)',
		MEDIUMAQUAMARINE: 'RGB(102, 205, 170)',
		DARKSEAGREEN: 'RGB(143, 188, 139)',
		LIGHTSEAGREEN: 'RGB(32, 178, 170)',
		DARKCYAN: 'RGB(0, 139, 139)',
		TEAL: 'RGB(0, 128, 128)',
		AQUA: 'RGB(0, 255, 255)',
		CYAN: 'RGB(0, 255, 255)',
		LIGHTCYAN: 'RGB(224, 255, 255)',
		PALETURQUOISE: 'RGB(175, 238, 238)',
		AQUAMARINE: 'RGB(127, 255, 212)',
		TURQUOISE: 'RGB(64, 224, 208)',
		MEDIUMTURQUOISE: 'RGB(72, 209, 204)',
		DARKTURQUOISE: 'RGB(0, 206, 209)',
		CADETBLUE: 'RGB(95, 158, 160)',
		STEELBLUE: 'RGB(70, 130, 180)',
		LIGHTSTEELBLUE: 'RGB(176, 196, 222)',
		POWDERBLUE: 'RGB(176, 224, 230)',
		LIGHTBLUE: 'RGB(173, 216, 230)',
		SKYBLUE: 'RGB(135, 206, 235)',
		LIGHTSKYBLUE: 'RGB(135, 206, 250)',
		DEEPSKYBLUE: 'RGB(0, 191, 255)',
		DODGERBLUE: 'RGB(30, 144, 255)',
		CORNFLOWERBLUE: 'RGB(100, 149, 237)',
		MEDIUMSLATEBLUE: 'RGB(123, 104, 238)',
		ROYALBLUE: 'RGB(65, 105, 225)',
		BLUE: 'RGB(0, 0, 255)',
		MEDIUMBLUE: 'RGB(0, 0, 205)',
		DARKBLUE: 'RGB(0, 0, 139)',
		NAVY: 'RGB(0, 0, 128)',
		MIDNIGHTBLUE: 'RGB(25, 25, 112)',
		CORNSILK: 'RGB(255, 248, 220)',
		BLANCHEDALMOND: 'RGB(255, 235, 205)',
		BISQUE: 'RGB(255, 228, 196)',
		NAVAJOWHITE: 'RGB(255, 222, 173)',
		WHEAT: 'RGB(245, 222, 179)',
		BURLYWOOD: 'RGB(222, 184, 135)',
		TAN: 'RGB(210, 180, 140)',
		ROSYBROWN: 'RGB(188, 143, 143)',
		SANDYBROWN: 'RGB(244, 164, 96)',
		GOLDENROD: 'RGB(218, 165, 32)',
		DARKGOLDENROD: 'RGB(184, 134, 11)',
		PERU: 'RGB(205, 133, 63)',
		CHOCOLATE: 'RGB(210, 105, 30)',
		SADDLEBROWN: 'RGB(139, 69, 19)',
		SIENNA: 'RGB(160, 82, 45)',
		BROWN: 'RGB(165, 42, 42)',
		MAROON: 'RGB(128, 0, 0)',
		WHITE: 'RGB(255, 255, 255)',
		SNOW: 'RGB(255, 250, 250)',
		HONEYDEW: 'RGB(240, 255, 240)',
		MINTCREAM: 'RGB(245, 255, 250)',
		AZURE: 'RGB(240, 255, 255)',
		ALICEBLUE: 'RGB(240, 248, 255)',
		GHOSTWHITE: 'RGB(248, 248, 255)',
		WHITESMOKE: 'RGB(245, 245, 245)',
		SEASHELL: 'RGB(255, 245, 238)',
		BEIGE: 'RGB(245, 245, 220)',
		OLDLACE: 'RGB(253, 245, 230)',
		FLORALWHITE: 'RGB(255, 250, 240)',
		IVORY: 'RGB(255, 255, 240)',
		ANTIQUEWHITE: 'RGB(250, 235, 215)',
		LINEN: 'RGB(250, 240, 230)',
		LAVENDERBLUSH: 'RGB(255, 240, 245)',
		MISTYROSE: 'RGB(255, 228, 225)',
		GAINSBORO: 'RGB(220, 220, 220)',
		LIGHTGRAY: 'RGB(211, 211, 211)',
		SILVER: 'RGB(192, 192, 192)',
		DARKGRAY: 'RGB(169, 169, 169)',
		GRAY: 'RGB(128, 128, 128)',
		DIMGRAY: 'RGB(105, 105, 105)',
		LIGHTSLATEGRAY: 'RGB(119, 136, 153)',
		SLATEGRAY: 'RGB(112, 128, 144)',
		DARKSLATEGRAY: 'RGB(47, 79, 79)',
		BLACK:'RGB(0, 0, 0)'
	}
}

/*
var ctx = document.getElementById('myChart').getContext("2d")
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
        datasets: [{
            label: "Data",
            borderColor: "#80b6f4",
            pointBorderColor: "#80b6f4",
            pointBackgroundColor: "#80b6f4",
            pointHoverBackgroundColor: "#80b6f4",
            pointHoverBorderColor: "#80b6f4",
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
            data: [100, 120, 150, 170, 180, 170, 160]
        }]
    },
    options: {
        legend: {
            position: "bottom"
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }
}],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
},
                ticks: {
                    padding: 20,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold"
                }
            }]
        }
    }
});*///@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ui_render_caroussel ( _eltID , Cfg , callBack , delay = 1){

	/* Config structure
	   var Cfg = {
	   		id : "slide-covid-figures",
	   		default : "slide-a",
	   		slides : [
	   			{ id: "slide-1", name: "Cas confirmés" , label : "Graphiques"    ,  Html_content : "" , visible: true},
	   			{ id: "slide-2", name: "Cas actifs"    , label : "Vue tabulaire" ,  Html_content : "" , visible: true},
	   			{ id: "slide-3", name: "Décès" , 		 label : "Comentaire"    ,  Html_content : "" , visible: true},
	   			{ id: "slide-4", name: "Guéris" , 		 label : "Comentaire"    ,  Html_content : "" , visible: true}
	   		]
	   }
	*/

	var transition = (Cfg.transition == "fade")? "carousel-fade" : "";
    var template_carousel = `
		<div id="${Cfg.id}" class="carousel slide ${transition}" data-ride="carousel" >



			${ !Cfg.addLink? "" : `
				<ol class="carousel-indicators">
					{{#slides_arr}} 
						<li data-target="#${Cfg.id}" data-slide-to="{{index}}" class="{{active}}"> </li>
					{{/slides_arr}}
				</ol>` 
			}


			<div class="carousel-inner">
				{{#slides_arr}}
					<div class="carousel-item {{active}}" id="{{id}}">
					  	{{{Html_content}}}
					</div>
				{{/slides_arr}}		
			</div>


			${ !Cfg.addCursor? "" : `<a class="carousel-control-prev" href="#${Cfg.id}" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			
			<a class="carousel-control-next" href="#${Cfg.id}" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>` }
		</div>
	`

	//Add helper func for mustache render for Bootstrap-wise properties

		var data = Cfg
		data.slides_arr = data.slides.filter(function(d){return(d.visible)});
		data.slides_arr = data.slides_arr.map( function(d,i){
			d["active"] = (d.id == data.default)? "active" : "";
			d["selected"] = (d.id == data.default)? "true" : "false";
			d["disable"] = (d.enabled == false)? "disabled" : "";
			d["index"] = i;
			return (d)
		});

	var componentHtml = Mustache.render( template_carousel,  data );


	setTimeout(  
		function(){ d3.select(`${_eltID}`).html(componentHtml ); 
	    }, 
		delay
	)


    return {

    	api_func : function(theme){},
    	show_slide : function(tab_id){
    		
    		$(`#${tab_id}-tab`).tab('show');
    	}
    }

}var include_button_input , upcoming_function // helper function variables


function ui_render_spatialLayerSelectList_component( layer_data_arr, _eltID ){
	var template_theme_selector = `
			 <div class="input-group-prepend">
			    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
			      aria-haspopup="true" aria-expanded="false"> Niveau géographique :</button>
			    <div class="dropdown-menu">
				    {{#layer_arr}}
						<a class="dropdown-item"  data-key="{{name}}" data-label="{{label}}"
						style="line-height:1.2em; padding: 1px 4px; font-size:0.8rem;" href="#"> {{ label }} </a>
					{{/layer_arr}}
			    </div>
			</div>
		  <input type="text" class="form-control" aria-label="Text input with dropdown button" value="">
		 `;

	var data = layer_data_arr ;
	var componentHtml = Mustache.render( template_theme_selector , { "layer_arr": data});
	d3.select(`${_eltID}`).html(componentHtml );
	bind_Selector();

    return {
    	update_view: function(theme){
   			var _info = $(`${_eltID}  a[data-key="${theme}"]`)[0].dataset;
    		$(`${ _eltID} > input.form-control`).val( _info.label );
    	}
    }

	function bind_Selector(){

		$( `${ _eltID} .dropdown-item` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "key": _data.key, "label": _data.label};
					$(`${ _eltID} > input.form-control`).val(_info.label);
					after_selectLayer_Changed( _info.key );
			}
		})			
	}
}





var fake_table = `<div id="opera-rass-table" style= "position: relative; height:80vh;"> 
  	 ${ upcoming_function({
  	 	  fa_icon :        "fa-table",
  	 	  messageTitle :   "Section des vues tabulaires",
  	 	  messageContent : "Cette section présentera sous forme de tableau interactif, <br> le jeu de données associé à la thématique active"
  	 }) }
  </div>  `  

var fake_monography = `<div id="opera-rass-monography" style= "position: relative; height:80vh;"> 
  	 ${ upcoming_function({
  	 	  fa_icon :        "fa-bar-chart",
  	 	  messageTitle :   "Monographies",
  	 	  messageContent : "Bientot disponible, cette section contiendra les monographies générées <br> à la volée sur les circonscriptions sanitaires sélectionnées"
  	 }) }
  </div> `

var fake_about_us = `<div id="opera-about-us" style= "position: relative; height:80vh;"> 
   	 ${ upcoming_function({
  	 	  fa_icon :        "fa-cogs",
  	 	  messageTitle :   "A propos du cabinet Improve",
  	 	  messageContent : "Cette section décrira l'offre de service du cabinet Improve"
  	 }) }
  
  </div>  ` ;


var opera_console_tmpl = `
	<div  style= "position: relative; height:80vh;"> 
		${ include_button_group({
			group_id : "console_button",
			button_list : [
				{ id: "cmd_reset_console", caption : "Reset console"  ,       callBack : "func_reset_console" },
				{ id: "cmd_reset_storage", caption : "Reset Local Storage"  , callBack : "func_reset_local_storage" },
				{ id: "cmd_supervisor",    caption : `${fa_icon("play")} Démarrer superviseur`  , callBack : "func_start_supervision"  , caption_alt: `${fa_icon("stop")} Arrêter Superviseur` }
			]
		  })
		}
  		 <div id="opera-sys-message" style= "padding: 10px; margin : 0px 20px ;position: relative; height:50vh; background-color:#151414;color:#ddd; font-size:0.8em; overflow: scroll;">  
  		  	<p> Informations systèmes: </p> 
  		</div>

  </div>  ` ;

	var user = { 
		uuid: "8888-8898-8521-9652-9689-3265", 
		start_at: "25/05/2020", 
		when: "26/05/2020", 
		req:  "notification", 
		res:  "fail", 
		comments: "hehehe"
	};

	var connList = Array(50).fill(0).map(function(d){
		return user;
	});



var submit_function = function( that, eltID ){

	var input_elt = `#${eltID} input`

	opera_console.addLog(`Vous avez cliqué sur le bouton: ${eltID} et envoyer le message ${ $(input_elt).val()}`)

	Ajaxian.read( "./buyers", 
		function(data){
			opera_console.addLog(`Suppression <b> ${JSON.stringify(data)} </b>`, "success" )
		},

		function(xhr, ajaxOptions, thrownError){
			opera_console.addLog(`Erreur lors du chargement de la table`, "fail");
		}
	)
}
var func_reset_console = function(){
	 opera_console.clearlog()
}
var func_reset_local_storage = function( that, eltID ){
	user_session_manager.reset_token();
}

var func_start_supervision = function(that, eltID){
	    var state = user_session_manager.supervisor("toggle")
	    $(`#${eltID}`).html( !state ?  `${fa_icon("play")} Démarrer superviseur` :`${fa_icon("stop")} Arrêter Superviseur`) 
}  

var fake_historic = get_random_data()
var func_start_traffic_monitoring = function( that, eltID ){
	user_session_manager.supervisor("traffic" , 
		{
			 eventtype:"new-data" , 
			 data: fake_historic, 
			 from: null, 
			 to: null 
		}
	)
}

//alert ( "IS_ADMIN_SESSION = " + IS_ADMIN_SESSION)

var navtabController_RASS = new ui_render_navtabs( 
	   "#RASS-NAV-TAB-CONTAINER", {
		id : "nav-tab-01",
		default : "tab-aa",	
		nav_position : "top" ,  
		color_theme  : "light",
		tabs : [
			{ 
				id: "tab-aa", 
				name: "table-graphics" , 
				label : "Tableau/Graphique", 
				html_content : `
					<div id="wrapper-pane" class="col-sm-12 no-padding"  >
					  	<div  id="RASS-ROW-TOP" class="row" style= "padding: 0px 15px;">
					  		<div class="col-sm-12 no-padding"  >
								 ${get_chart_container( "chart-canvas-rass" , 600, 250 ,'96%', '35vh')}	
					  		</div>
					  	</div>
					  	<div  id="RASS-ROW-BOTTOM" class="row"  style= "padding: 0px 15px;">
						  	<div  class="col-sm-12 no-padding"  >
								 <div id="dttable_container"  style="margin:10px; padding: 10px;">  </div>		
					  		</div>		  		
					  	</div>
					</div>` ,
				enabled : true,
				visible : true
			},
			{ 
				id: "tab-a", 
				name: "graphics" , 
				label : "Graphiques", 
				html_content : get_chart_container( "@chart-canvas-rass" , 600, 250 ,'96%', '35vh') ,
				enabled : true,
				visible : false
			},
			{ 
				id: "tab-b", 
				name: "table" ,    
				label : "Vue tabulaire" , 
				html_content : ` <div id="@dttable_container"  style="margin:10px; padding: 10px;">  </div>`,
				enabled : true,
				visible : false
			},
			{ 
				id: "tab-c", 
				name: "monography" , 
				label : "Monographies", 
				html_content : get_Monography_template_TODO()  ,
				enabled : true,
				visible : true
			},
			{ 
				id: "tab-d", 
				name: "about_us" , 
				label : "Qui-sommes nous?", 
				html_content :  `<div id="caroussel_container"  style="position:relative; height:300px; margin:10px; padding: 10px;">  </div> `, //   get_ourReferences_template_TODO() ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			},
			{ 
				id: "tab-e", 
				name: "sys_console" , 
				label : "Administration", 
				html_content : ` <div id="ADMIN-TAB-WRAPPER" style="background-color: #fff; 
				                  position:relative; height: 70vh;"> </div>`,
				enabled : true,
				visible : IS_ADMIN_SESSION
			}
		]
    },
    function(info){
    	/* ACTION TO TRIGGER WHEN TABS CHANGED*/
    	
    	switch(info.tabname){
    		case "graphics" :
    			rass_active_panel = "tab-a" ;
    			break;

    		case "table" :
    			rass_active_panel = "tab-b" ;
    			break;

    		default: 
    	} 
    },

    1
)


var color_data = {
	colors : object_to_array(chartColors)
}

var navAdminController = new ui_render_navtabs(
	"#ADMIN-TAB-WRAPPER", {
	id : "admin-tabs",
	default : "admin-tab-02",
	nav_position : "top" ,  
	color_theme  : "light",
		tabs : [
			{
				id : "admin-tab-01",
				name : "connected_users",
				label : "Utilisateurs connectés",
				html_content : ` <div id="dttable_usertable_container"  style="margin:10px; padding: 10px;">  </div>` ,
				enabled : true,
				visible : true
			}, 
			{
				id : "admin-tab-02",
				name : "attendance_chart",
				label : "Historique des connexions",
				html_content : `${include_button("btn-traffic-monitoring" , "Démarrer", "func_start_traffic_monitoring" )}
								${get_chart_container( "chart-canvas-traffic" , 600, 250 ,'90%', '25vh')}` ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			},
			{ 
				id: "admin-tab-03", 
				name: "sys_audit" , 
				label : "Audit", 
				html_content : get_opera_console_template_TODO() ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			},
			{ 
				id: "admin-tab-04", 
				name: "sys_config" , 
				label : "Configuration", 
				html_content : get_color_ramp_html( color_data ) ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			}
		]
	},

	function(info){	

		/* ACTION TO TRIGGER WHEN TABS CHANGED*/
		switch (info.tabname) {
			case "connected_users" :

				Ajaxian.post( "./visitors/connected", 
				    {
				    	key: "ABSCFDBYHDGGEGGG8587-855455-SGWX"
				    },
					function(data){
						opera_console.connectedUsers.openList(data);
					},
					function(xhr, ajaxOptions, thrownError){
						opera_console.addLog(`Erreur lors du chargement de la table`, "fail");
					}
				)
				 
			case "sys_config":
				opera_console.addLog("COLOR OBJECT " + toJSON(color_data));
			break;
		}
	},
	1
)



var navtabController_COVID_UP =  new ui_render_navtabs (

		"#COVID-NAV-TAB-UP", {
		
			 id : "rstuw-1",
		default : "covid-tab-up-01",
   nav_position : "top",
   color_theme  : "dark",
		   tabs : [
			{
				id : "covid-tab-up-01",
				name : "indicators",
				label : "indicateurs de suivi",
				html_content :  `${ get_chart_container( "covid-canvas-up-1" , 650, 300 ,'95%', '35vh')}`,
				enabled : true,
				visible : true
			}, 
			{
				id : "covid-tab-up-02",
				name : "indicators_daily",
				label : "Indicateurs journaliers",
				html_content : `${ get_chart_container( "covid-canvas-up-2" , 650, 300 ,'95%', '35vh')}`,
				enabled : true,
				visible : true
			},
			{ 
				id: "covid-tab-up-03", 
				name: "confirmed_cases_sum" , 
				label : "Cumul des cas confirmés", 
				html_content : `${ get_chart_container( "covid-canvas-up-3" , 650, 300 ,'95%', '35vh')}`,
				enabled : true,
				visible : true
			}
		]
	},
		function (info){ }, 
		1
	)

var navtabController_COVID_BOTTOM =  new ui_render_navtabs (

		"#COVID-NAV-TAB-BOTTOM", {
		
		        id : "rstuow-2",
	       default : "covid-tab-bottom-01",
	  nav_position : "top",
	    color_theme  : "dark",
       	      tabs : [
				{
					id : "covid-tab-bottom-01",
					name : "indicators",
					label : "Taux d'incidence quotidien",
					html_content :  `${get_chart_container( "covid-canvas-bottom-1" , 650, 300 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				}, 
				{
					id : "covid-tab-bottom-02",
					name : "indicators_healing",
					label : "Taux de guérison",
					html_content : `${get_chart_container( "covid-canvas-bottom-2" , 650, 300 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				},
				{ 
					id: "covid-tab-bottom-03", 
					name: "indicators_cfr" , 
					label : "Taux de létalité (CFR)", 
					html_content : `${get_chart_container( "covid-canvas-bottom-3" , 650, 300 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				},
				{
					id : "covid-tab-bottom-04",
					name : "depistage",
					label : "Dépistages",
					html_content : `${get_chart_container( "covid-canvas-bottom-4" , 650, 300 ,'95%', '35vh')}`,
					enabled : true,
				    visible : true
				}
			]
		},
		function(info){}, 
		1
	)


function get_Monography_template_TODO(){ return fake_monography}
function get_table_container_template_TODO(){ return fake_table }
function get_ourReferences_template_TODO(){return fake_about_us }
function get_opera_console_template_TODO(){ return opera_console_tmpl }  //  Template to generate the Identifier VIEW
//function get_opera_table_template_TODO(){ return opera_table_template }


	


	function build_COVID_chart_component(  data ){

		var mvData = data.map(function(d){return d}) 


		create_Chart( data, "covid-canvas-up-1", {

			title : "EVOLUTION CHRONOLOGIQUE DES INDICATEURS EPIDEMIOLODIQUES DU COVID-19",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},

			"y-axis-2" : {
				display : false,
				position : "right",
				labelString : "Nombre de cas"
			},

			charts : [

				{      
					label: 'Nombre de cas actifs',
					type : "line",
					field: 'active_case' ,
					backgroundColor: "YELLOW" ,
					borderColor: 'YELLOW',
					borderWidth : 1,
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nombre de cas guéris',
					type : "bar",
					field: 'sum_healed' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME',
					yAxisID : 'y-axis-1'  
			   },
				{      
					label: 'Nombre de décès',
					type : "bar",
					field: 'sum_deceased' ,
					backgroundColor: "RED" ,
					borderColor: 'RED',
					yAxisID : 'y-axis-1'  
			   }
			],
			fontColors : CHART_FONT_COLORS["covid"]
		})


		create_Chart(data, "covid-canvas-up-2", {

			title : "EVOLUTION CHRONOLOGIQUE DES INDICATEURS JOURNALIERS DU COVID-19",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},

			"y-axis-2" : {
				display : false,
				position : "right",
				labelString : "Nombre de cas"
			},		
			charts : [/*
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'nb_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY',
					yAxisID : 'y-axis-1'  
			   },*/
				{      
					label: 'Nouveaux cas',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nouveaux guéris',
					type : "bar",
					field: 'new_healed' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME' ,
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nouveaux décès',
					type : "bar",
					field: 'new_deceased' ,
					backgroundColor: "RED" ,
					borderColor: 'RED' ,
					yAxisID : 'y-axis-1' 
			   }
			],
			 fontColors : CHART_FONT_COLORS["covid"]
		});



		create_Chart(data, "covid-canvas-up-3", {

			title : "SUIVI DES CAS CONFIRMES",
			label_field : "date_raw",			
			"x-axis-style" : "COVID",
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'y-axis-1' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});



		create_Chart(data, "covid-canvas-bottom-1", {

			title : "SUIVI DE L'INCIDENCE JOURNALIERE",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},

			"y-axis-2" : {
				display : true,
				position : "right",
				labelString : "% de cas d'infection"
			},
			charts : [
				{      
					label: "Taux d'incidence journalier",
					type : "line",
					field: "incidence" ,
					backgroundColor: "VIOLET" ,
					borderWidth: 1,
					borderColor: 'VIOLET' ,
					yAxisID : 'y-axis-2' 
			   },
				{      
					label: 'Nouveaux cas',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' ,
					yAxisID : 'y-axis-1' 
			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'nb_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'y-axis-1' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});

		create_Chart(data, "covid-canvas-bottom-2", {

			title : "SUIVI DES CAS DE GUERISON",
			label_field : "date_raw",
			"x-axis-style" : "COVID",
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},
			"y-axis-2" : {
				display : true,
				position : "right",
				labelString : "% de cas guérison"
			},			
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'new_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE',
					yAxisID : 'y-axis-1'  
			   },
				{      
					label: 'Taux de guérison (%)',
					type : "line",
					field: 'remission' ,
					backgroundColor: "LIME" ,
					borderColor: 'LIME' ,
					yAxisID : 'y-axis-2' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});

		create_Chart(data, "covid-canvas-bottom-3", {

			title : "TAUX DE LÉTALITÉ",
			label_field : "date_raw",
			"x-axis-style" : "COVID",	
			"y-axis-1" : {
				display : true,
				position : "left",
				labelString : "Nombre de cas"
			},
			"y-axis-2" : {
				display : true,
				position : "right",
				labelString : "% de décès"
			},		
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' 
			   },
				{      
					label: 'Taux de létalité (CFR)',
					type : "line",
					field: 'letalite' ,
					backgroundColor: "CRIMSON" ,
					borderColor: 'RED' ,
					yAxisID : 'y-axis-2' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});


		create_Chart(data, "covid-canvas-bottom-4", {

			title : "DÉPISTAGES REALISÉS",
			label_field : "date_raw",
			"x-axis-style" : "COVID",			
			charts : [

				{      
					label: 'Nombre de cas confirmés',
					type : "bar",
					field: 'sum_case' ,
					backgroundColor: "ORANGE" ,
					borderColor: 'ORANGE' 
			   },
				{      
					label: 'Nombre de prélèvements',
					type : "bar",
					field: 'sum_sample' ,
					backgroundColor: "GRAY" ,
					borderColor: 'GRAY' ,
					yAxisID : 'y-axis-1' 
			   }
			 ],
			 fontColors : CHART_FONT_COLORS["covid"]
		});
	}	


/*
	function get_color( named_color , alpha){
		return color_helper( chartColors[named_color]).alpha(alpha).rgbString()
	}
*/	
	

function build_RASS_chart_component(  inMetadata ,inField, inData, inMetageo ){
	// A structure to detect any change on datatable or key in 
	// order to trigger accordingy updates to inner data 
	//struct to refresh chart


	var metadata = inMetadata ,
		field    = inField, 
		metageo  = inMetageo

	var stamps = {
		table : "empty", 
	    field : "empty",
	   geolyr : "empty"
	}

	var data_struct =  update_data_structure(inData)   

	var myChart = create_Chart_ex( data_struct, "chart-canvas-rass", {

		title :  `${ metadata.label } par ${ metageo.names.value }`,
		"label_field" : metadata.data_parser.name_field ,
		"x-axis-style" : "RASS",
		"y-axis-1" : {
			display : true,
			position : "left",
			labelString : field.short_name
		},

		"y-axis-2" : {
			display : false,
			position : "right",
			labelString : "Nombre de cas"
		},

		charts : [
			{      
				label: field.long_name,
				type : "bar",
				field: field.fld_name, 
				backgroundColor: "ORANGE" ,
				borderColor: 'ORANGE',
				yAxisID : 'y-axis-1' 
		   }
		],
		fontColors : CHART_FONT_COLORS["rass"]
	});

	return {
		updateChart : function ( ){
			myChart.update();
		},
		explain : function(){
			return myChart
		},
		setParams : function( inMetadata ,inField, newdata, inMetageo){
			//1: after Key changed : 
			//         Update key : sort data and labels arrays - 
			//         reuse raw data ? : YES
			//         reuse geo data ? : YES
			//2: after Thematic-table changed : (NB: in this version we change the geodata)
			//		   reuse raw data ? : NO (RAW data is update by définition )
			//         reuse geo data ? : NO (RAW data is update , but this would be contexte-depndent in future )
			//         Updata Key : sort data and label arrays
			//		   
			//
			//3: after Level changed : 
			//		   Update RAW Data : Generate 
			//         Update GEODATA  : 
			//         Updata Key : Sort data and label arr
			//		   reuse raw data ? : NO (RAW data is update by définition )
			//         reuse geo data ? : NO (RAW data is update by definition )
			//
			//==============================================
			
			metadata = inMetadata ,
			field    = inField, 
			metageo  = inMetageo
			eventname = detect_changes();
			//alert("eventname :=> " + eventname)
			switch (eventname){

				case "key-changed" :
					//alert(" Case : 1 " + eventname)
					new_struct = update_data_structure(data_struct.raw)

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;
					myChart.options.scales.yAxes[0].scaleLabel.labelString = field.short_name
					myChart.options.title.text =  `${ metadata.label } par ${ metageo.names.value }`

					//objectPath( myChart.data.datasets[0], "data" , new_struct.data)
					//objectPath( myChart.data, "labels" , new_struct.labels)
					//objectPath( myChart.options.scales.xAxes[0].ticks, "min" , new_struct.min)
					//objectPath( myChart.options.scales.xAxes[0].ticks, "max" , new_struct.max)

					data_struct = new_struct
				break;

				case "data-theme-changed" :
					//alert(" Case : 2 " + eventname)

					new_struct = update_data_structure(newdata)	

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	
					myChart.options.scales.yAxes[0].scaleLabel.labelString = field.short_name
					myChart.options.title.text =  `${ metadata.label } par ${ metageo.names.value }`
					data_struct = new_struct;
				break;


				case "layer-changed" :
					//alert(" Case : 3 " + eventname)

					new_struct = update_data_structure(newdata)	

					myChart.data.datasets[0].data = new_struct.data;
					myChart.data.datasets[0].label = field.long_name;
					myChart.data.labels = new_struct.labels;
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	
					myChart.options.scales.yAxes[0].scaleLabel.labelString = field.short_name
					myChart.options.title.text = `${ metadata.label } par ${ metageo.names.value }`;
					data_struct = new_struct;

				break;


			}

			function detect_changes(){
				var r = null
				if ( stamps.geolyr != metageo.name) r= "layer-changed";
				if ( stamps.table != metadata.name) r= "data-theme-changed";
				if  (  r==null) r ="key-changed";

				stamps.geolyr = metageo.name
				stamps.table  = metadata.name
				stamps.field  = field.name

				return r
			}
		}	
	}
    //***********************************************************************
	function update_data_structure(inData){
		var data 
		var parser = metadata.data_parser, 
		    a,b,c,d

		if ( stamps.table != metadata.name ){
			 stamps.table = metadata.name

			 data = inData.map(function(d){return (d)})
			 data.sort( compare_numbers )

		} else if (stamps.field != field.fld_name){
			data = inData
			stamps.field = field.fld_name
			 data.sort( compare_numbers )
		}
		stamps.geolyr = metageo.name;

		//console.log("----------------------------->field ::" + JSON.stringify(field) + "\n\n\n")
		a = data.map(function (d){ return d[ parser.name_field ]  });
		b = data.map(function (d){ return d[  field.fld_name ]    });
		
		return ({
			labels : a,
			  data : b,
			   min : b[0],
			   max : b[b.length-1],
			   raw : data
		})
	}

	function compare_numbers(a,b){ return(b[field.fld_name] - a[field.fld_name] ) }
	function update_chart(){}
}	


	
	

function build_traffic_chart_component(  inData ){
	// A structure to detect any change on datatable or key in 
	// order to trigger accordingy updates to inner data 
	//struct to refresh chart
    var Cfg, myChart ;
	var Result = create_Chart_v2(  "chart-canvas-traffic", inData, {

		      title :  `Atlas Santé Cote d'Ivoire - Historique d'affluence`,
		label_field : "total" ,
	 "x-axis-style" : "COVID",
		 "y-axis-1" : {
			    display : true,
			   position : "left",
			labelString : "Nb connectés"
		           },

		"y-axis-2" : {
			    display : false,
			   position : "right",
			labelString : "n/a"
		},

		charts : [
			{      
				label: "Total connectés",
				type : "line",
				field: "total", 
				backgroundColor: "BLUE",
				borderColor: 'BLUE',
				yAxisID : 'y-axis-1' 
		   },
			{      
				label: "actives",
				type : "line",
				field: "alive", 
				backgroundColor: "GREEN",
				borderColor: 'GREEN',
				yAxisID : 'y-axis-1' 
		   },
			{      
				label: "en veille",
				type : "line",
				field: "iddle", 
				backgroundColor: "RED",
				borderColor: 'RED',
				yAxisID : 'y-axis-1' 
		   }
		],
		data_format_function : function(data){
		   var b =[];
			b[0] =	data.map(function(d){ return d.total})
			b[1] =	data.map(function(d){ return d.alive})
			b[2] =	data.map(function(d){ return d.iddle})
			   a =  data.map(function(d){ return d.when })
	


			return ({
				labels : a,
				   min : a[0],
				   max : a[a.length-1],
				  data : b,
				   raw : data
			})
		}
	});

	myChart = Result.chart ;
	    Cfg = Result.config;

	return {
		updateChart : function ( ){
			myChart.update();
		},
		explain : function(){
			return myChart
		},
		setParams : function( params ){
			
			switch (params.eventtype){

				case "window-changed" :

					//new_struct = update_data_structure(data_struct.raw)
					myChart.data.labels = new_struct.labels;
					//for( i=0; i<=2 ; i++){
						//myChart.data.datasets[i].data = new_struct.data;
						//myChart.data.datasets[i].label = `inchangé normalement ${i}`;

					//}
					myChart.options.scales.xAxes[0].ticks.min = params.from;
					myChart.options.scales.xAxes[0].ticks.max = params.to;	

					//data_struct = new_struct

				break;

				case "new-data" :
					new_struct = Cfg.data_format_function(params.data)	
					opera_console.addLog(" DATA FOR CHART_UPDATE : => " + JSON.stringify(new_struct), "warning")

					myChart.data.labels = new_struct.labels;

					for( i=0; i<=2 ; i++){
						myChart.data.datasets[i].data = new_struct.data[i];
						//myChart.data.datasets[i].label = `inchangé normalement ${i}`;
					}
					myChart.options.scales.xAxes[0].ticks.min = new_struct.min;
					myChart.options.scales.xAxes[0].ticks.max = new_struct.max;	

					myChart.options.title.text =  `Historique des connexions du ${ dateFormat(new_struct.min )} à ${ dateFormat(new_struct.max) }`
					//data_struct = new_struct;
				break;

			}
		}	
	}
    //***********************************************************************

}	




function create_Chart_v2(  elt_id, inData , Cfg ){
	
	var dateFormat = d3.time.format("%d-%m-%Y");
	var time_pattern = "DD/MM/YYYY";


	var data_struct =  Cfg.data_format_function(inData)
	opera_console.addLog(" DATA FOR CHART_CREATE : => " + JSON.stringify(data_struct), "warning")

	Cfg.label_min = data_struct.min;
	Cfg.label_max = data_struct.max;


	var chart_configurator = {

	    data: {
	        labels:  data_struct.labels ,
	        datasets: Cfg.charts.map(function(chart){
				return {
					label: chart.label,
					type : chart.type ,
					yAxisID : chart.yAxisID,
					backgroundColor : get_color(chart.backgroundColor, 0.45),
					borderColor : get_color( chart.borderColor, 0.99),
					borderWidth : ( chart.type == "bar")? 1 : (chart.borderWidth? chart.borderWidth : 1),
					fill : (chart.type == "line") ? false : true ,
					pointRadius : 0,
					lineTension : 0,
					data : data_struct.data

				}
			}),
	    },

	    options: {
	    	maintainAspectRatio : false,
	        title: {
	            display: true,
	            text: Cfg.title
	        },

			tooltips : {
				intersect : true,
				titleFontColor : '#333',
				backgroundColor  : get_color( "WHITE", 0.8),
				bodyFontColor : '#555',
				borderWidth : 1,
				cornerRadius : 2,
				borderColor : get_color( "RED", 0.99),		
			},
	        scales: {
	            xAxes: generate_xAxes_section(Cfg),		        	
	            yAxes: generate_yAxes_section(Cfg)
	        }
	    }
	}

	var ctx = document.getElementById(elt_id);
	var myChart = new Chart(ctx, chart_configurator)
	//We want to return main objects (chart & Cfg) to the wrapper Agent in ordr to handle update events
	return  {
		 chart : myChart,
		config : Cfg
	}
}
//globals var déclaration
//const http_server_exe_mode = false;
var navigate = function (path) {
	  	var current = window.location.href;
	    window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
	}

var test_capture_serie = []
var winResizeTimerID = 0;
var before_app_initialization = true
var geo_dataset_is_load = false;

// We add a listener to the browser window, calling updateLegend when the window is resized.
window.onresize //= after_window_resized ;

var initialTable = "covid-19-june16" // "covid-19" ;//   "covid-19" //" "covid-19"; //demographic" ;//;"demographic"
var initialKey = "FLD1";
    
var currentTable;
var currentMetaTable;
var currentKey;
var currentMetaField ;
var currentGeodataset;
var currentMetaGeo;

	 
var currentDetailTemplate;

var stats_table_set
var dataById = d3.map();
var dataKeyVal ;
var mapData;

var DARKROUGE = "#550000" , 
	VERT = "#63d617", 
	JAUNE = "#ffff00",   
	ORANGE = "#ffae00" , 
	ROUGE = "#ef2710",
	DARKGREEN = "#005500"

//this is a meta template (ie: a template of template) that is processed in two steps :
//  step 1: At dataframe load to generate the details template reflecting the strcture of the thematic table
//  step 2: At User click on mapFeature to generate details informations
var tmplt_details_virtual = ` 
		{{#data_fields}}  
		    <tr>
		 	    <th style='text-align: left; color: #000; font-weight: normal;'>
		 	        <i class='fa fa-info-circle fa-2x css-tooltip'  aria-hidden='true'> 
		 	           <span class='css-tooltiptext'> {{ long_name }} </span>  
		 	        </i> {{ short_name }} 
		 	        {{#show_unit}} 	<em>({{unit}})</em>: {{/show_unit}}
				</th>
				<td  style='text-align: right; color: #1b66a7;font-weight: bold;'> 
		 	    	{{ tag_open }} {{ fld_name }} {{ tag_close }}
		 	    </td> 
		 	</tr> 	
		{{/data_fields}}
	`;

Mustache.parse(tmplt_details_virtual);

var tmplt_rowDescription;

var width = 400, height = 400;
var dyn_width = width ,  dyn_height = height;

var svg = d3.select('#map').append('svg')
	.attr("preserveAspectRatio", "xMidYMid")
	.attr("viewBox", "0 0 " + width + " " + height)
	.attr("width", "100%")
	.attr("height", "100%")



var mapBackground = svg.append('g').append('rect')
						.attr('class', 'rect-background')	
						.attr("width", "200%")
						.attr("height", "200%")	
						.attr("transform", "translate(-200 -200)");


var mapFeatures   = svg.append('g').attr('class', 'features YlGnBu');



var mapFeaturesOverlay = svg.append('g').attr('class', 'selectedfeatures overlay')
var centered 
var projection = d3.geo.mercator().scale(1);
var zoom 

var tooltip = d3.select("#map").append("div").attr("class", "tooltip hidden");

var quantize = d3.scale.quantize().range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));			
var path = d3.geo.path().projection(projection);


var formatNumber = d3.format('.2f'); // We prepare a number format which will always return 2 decimal places.
var legendX = d3.scale.linear();     // For the legend, we prepare a very simple linear scale. 
 // Domain and range will be set later as they depend on the data currently shown.

var keyController ; // Controller de sélection de la variable de base pour la cartographie et le diagrammes
var spatialLayerController ; // Controller pour la sélection du nveau de représentation spatiale (echelle cartographique)
var managerController;
var slideController;
var chartController_admin;
var chartController_rass;
var legendControllervar ;

var dataTableController
var ZOOM_IS_DISABLE = true
var rass_active_panel = "tab-b" // or "tab-b"

function app_start_up(){

	opera_console.addLog( toJSON(user_agent ) );

	var zoom = d3.behavior.zoom().scaleExtent([1, 15])

				.on('zoom', doZoom);
				svg.call(zoom);


	mapBackground.on("click", function(){ MAP_overlay_draw([]) })

	opera_console.addLog("Démarrage d'Atlas Santé Côte d'Ivoire.." , "success")

	legendController = new generate_legend( "#legend", {
			"title"  : "Legend Controller....",
			"width"  : 400,
			"domain"  : [ 1,  4,  15, 100, 800] ,
			"tickSize": 15,
			"offset"  : {	"x": 15,  "y": 23 } ,
			"cell" : { 	"height": 12, "width" : 45} ,
			"colorscale" : [ DARKROUGE, ROUGE, ORANGE, JAUNE, VERT, DARKGREEN ] ,
			"custom_label" : [ "Poor" , "labour", "Middle class", "High class" , "Rich", "billionnaire" ] 
		}
	)


	theme_controller = ui_render_dropdown_inputgroup("#opera-theme-selector-1", {
		      "prompt": "Choisir un thème",
		"options" : metaDataBase.table_details,
		        "key" : "name",
		      "label" : "label",
	      "transform" : { key: "name", label : "label"	},
	         "filter" : function(d){return (d.valid)}
	}, function(_info){
		Activate_thematic_section( _info.key , false)
	})


	//theme_controller = ui_render_ThematicSelectList_Component_ex( metaDataBase.table_details , "#opera-theme-selector-1");


	theme_controller.update_view(initialTable)
	Activate_thematic_section(initialTable);	//activate the default dataframe 

	set_routes();
	bind_Scale_Selector()
	bind_layout_reset_to_windowResize();
    
}


function bind_layout_reset_to_windowResize(){

	window.onresize = function(){

	 	if (before_app_initialization)  return;
	 	if (winResizeTimerID) { clearTimeout(winResizeTimerID);}
	 	
	 	winResizeTimerID = setTimeout( 
	 		function(){

	 			ENV_VIEW_SIZE = getEnvSize()
				updateLegend(null, true);
				//updateSizeCard()
				winResizeTimerID = 0;
	 	} ,	450)
	}
}

function after_user_accept_UX_degradation(){
	navigate("home");
	$("#id-address-to-mobile-users").addClass("hidden");
}



function notify_application_readiness(){

		before_app_initialization = false; 
		setTimeout( function(){

			if ( ACCEPT_MOBILE || ( isMobileDevice() == false && force_mobile() == false )){
				// alert("notify_application_readiness")
				 remove_start_up_curtain();
			} else {
			
				remove_start_up_curtain();
				show_address_to_mobile_users();
			}
		}, 1000 )
	
}

function create_or_update_key_selectList( data ){
	if (keyController == undefined ){

		keyController  = ui_render_dropdown_inputgroup("#opera-variablekey-selector-3", {
			     "prompt" : "Variable à cartographier",
		   	    "options" : data,
			        "key" : "fld_name",
			      "label" : "short_name",
		      "transform" : { key: "fld_name", label : "short_name"	},
		         "filter" : null
		}, 
		function after_key_selected(_info){
			after_selectKey_Changed(_info.key )
		})

	} else {
		keyController.refresh_options( data)
	}
}

function create_or_update_spatialLayer_selectList( data ){
	if (spatialLayerController == undefined ){

		spatialLayerController  = ui_render_dropdown_inputgroup( "#opera-spatiallayer-selector-2", {
			     "prompt" : "Niveau spatial",
		   	    "options" : data,
			        "key" : "name",
			      "label" : "label",
		      "transform" : null,
		         "filter" : null
		}, 
		function after_key_selected(_info){
			after_selectLayer_Changed( _info.key )
		})

	} else {
		spatialLayerController.refresh_options( data)
	}
}





function Activate_thematic_section(frame_name){
	load_dataframe(frame_name, 

		function(metaData){	
		    // Here note that the @metaData param  is the active metaDataframe section in metaDataBase
			// look_at("metaData", metaData)
			
			toogle_layout(metaData)
         
			layer_arr = extractLayerObjects( metaDataBase.geo_datasets, metaData.layerList, "name");
			layer_controller = ui_render_spatialLayerSelectList_component( layer_arr , "#opera-spatiallayer-selector-2" );
			

			key_controller = create_or_update_key_selectList( metaData.data_fields )	
			keyController.update_view("FLD1");

			currentKey = "FLD1";	// get (refactoring: allow to be read from metabase section and ...
			currentMetaTable = metaData ;	
		
			update_color_palette(metaData.color_palette); //set the current color palette to that of the metaTable
			update_dataTableView(metaData)

			//update the property window html template to the new table columnset					
			tmplt_rowDescription = ui_updateTemplate_details({
				data_fields :  metaData.data_fields,
				tag_open : function(){return "{{"},
				tag_close: function(){return "}}"}
			});

			//create_histogram_object();
			layer_controller.update_view( metaData.layerList[0] );
			after_selectLayer_Changed( metaData.layerList[0] ); 

			if ( before_app_initialization ) 	notify_application_readiness()

		}, 

		function(errorDesc){
			alert(errorDesc);
		}
	)
}

function toogle_layout(metadata){
	if (metadata.layout == "COVID"){
		d3.select("#COVID-pane").classed( "hidden" , false)
		d3.select("#RASS-pane").classed( "hidden" , true)

	} else {
		d3.select("#COVID-pane").classed( "hidden" , true )
		d3.select("#RASS-pane").classed( "hidden" , false)

	}
}

 function after_selectKey_Changed(inKEY){

 	 currentKey = inKEY;
 	 currentMetaField = currentMetaTable.data_fields.find( function(f){ return (f.fld_name === inKEY) });
 	 updateMapColors();
 	 updateGraphic();
 	 if (currentMetaTable.layout != "COVID"){
 	    navtabController_RASS.show_tab(rass_active_panel)
 	 }
 }

function after_selectLayer_Changed(inLayerKeY){
	
	var geo_dataset = get_spatialLayer(inLayerKeY)

	get_geoData( geo_dataset.name  , geo_dataset.path, function( error, features){

		dataById = stats_table_set[inLayerKeY];
		dataKeyVal = stats_table_set[inLayerKeY + "_raw"];
		mapData = dataKeyVal ;

		geo_dataset_is_load = true;

		currentKey = currentKey? currentKey : "FLD1"
		currentMetaGeo = geo_dataset;
		
		update_dataTableView(currentMetaTable);
		preload_geoDataSet(features);

		after_selectKey_Changed(currentKey);
	});
}

function get_statsData( name, path, callBack){
	http_server_exe_mode = true;
	if (http_server_exe_mode) { // server http (local ou distant) actif
		d3.csv( path, function(data) {
			callBack(data);
		});
	} else { // Pas de server actif
		var data = find_statsdata_from_memory(name);
		//sysecho("DATA #" + name + " from get_statsData", data);
			callBack(data);
	}
}

function get_geoData(name, path, callBack){
	if (http_server_exe_mode) { // server http (local ou distant) actif
		d3.json(path, function( error, features){
			callBack(error, features);
		});
	} else {
		var features = find_geodata_from_memory(name);
			callBack(null, features);
	}
}


function after_thematic_section_Changed(frame_name){
 	//alert("user asked dataFrame " + frame_name)
 	Activate_thematic_section(frame_name)
}

function after_colorPalette_selected(palette_name){
	//this fonction must exit if app not initialized yet
	if (before_app_initialization) return;

	currentMetaTable.color_palette = palette_name;
	update_color_palette(palette_name);
	navigate("home");

}
function create_histogram_object(){
	histogram = new BarChart();
	histogram.initChart();

}

/*Vérifie l'existence dans l'objet "data" des propriétés figurant dans
"propertyList". Retourne un array des propriétés manquantes (ie propriété de 
"chl_fld_arr" manquante dans "data")
*/
function  get_missing_fields (in_data, searchFields){
	var base_fields = Object.keys(in_data)
	var missing_fields = searchFields.reduce(function( accum, fld_name ){
		if ( base_fields.indexOf(fld_name)==-1) {
			accum.push(fld_name)
		} 
		return accum;
	}, []);

	return missing_fields;
		
}

function load_dataframe(frame_name, callBack,  errCallBack){

	var newframe = metaDataBase.table_details.find(function(frame){ return frame.name === frame_name});
    //currentMetaTable = (!newframe)? currentMetaTable : newframe;
    //look_at("newframe", newframe)
    if (!newframe) { 
    	errCallBack( "invalid dataframe " + frame_name + " encoutered. Check metaDataBase"); 
    	return null;
    }

    //Two case may exist :
    // 1- load from file and 
    // 2- read from memory
    //sysecho("(load_dataframe)newframe", newframe);

    get_statsData( newframe.name, newframe.path, function(data) {
    	//sysecho("DATA from get_statsData", data);
    	var meta = newframe;
    	var parser = meta.data_parser,
    	    defaultlayer  = meta.layerList[0];

    	//console.log("-------------------------------------newframe")
    	//console.log(newframe)

		stats_table_set = generate_statistic_tables_ex (data , parser);
		dataById = stats_table_set[defaultlayer];
		dataKeyVal = stats_table_set[defaultlayer + "_raw"];
		var geo_dataset = get_spatialLayer(newframe.layerList[0])
		mapData = dataKeyVal ;

        callBack( newframe )
    });


    function get_statsData( name, path, callBack){
    	http_server_exe_mode = true;
    	if (http_server_exe_mode) { // server http (local ou distant) actif
    		d3.csv( path, function(data) {
    			callBack(data);
    		});
    	} else { // Pas de server actif
    		var data = find_statsdata_from_memory(name);
    		//sysecho("DATA #" + name + " from get_statsData", data);
    			callBack(data);
    	}
    }

    function get_geoData(name, path, callBack){
    	if (http_server_exe_mode) { // server http (local ou distant) actif
			d3.json(path, function( error, features){
				callBack(error, features);
    		});
    	} else {
    		var features = find_geodata_from_memory(name);
    			callBack(null, features);
    	}
    }
}

function geo_data_load_needed( cur_layer, new_layer ){
	if (cur_layer == null) return true;
	return (cur_layer.id != new_layer.id)
}

function extractLayerObjects( Layers , layer_names, field ){
	return( Layers.reduce( function(accu, layer){
		if (layer_names.indexOf( layer.name ) != -1 ){
			accu.push(layer)
		}
		return accu;
	}, []))
}
function get_spatialLayer( lyr_name ){
	return ( metaDataBase.geo_datasets.find(function(lyr){
		return(lyr.name == lyr_name)
	}) )
}

function preload_geoDataSet(features){
	projection = d3.geo.mercator().scale(1);			
	path = d3.geo.path()
	    .projection(projection);

	currentGeodataset = features

	var scaleCenter = calculateScaleCenter(features);
	projection.scale(scaleCenter.scale)
		.center(scaleCenter.center)
		.translate([width/2, height/2]);


	mapFeatures.selectAll('path')
	   .remove()	
		
	mapFeatures.selectAll('path')
			.data(features.features)
		.enter().append('path')
			.attr('class', "ogis-nocolor")
			.attr('d', path)
            .on( 'mousemove'   , showTooltip )// When the mouse moves over a feature, show the tooltip.
			.on( 'mouseout'    , hideTooltip ) // When the mouse moves out of a feature, hide the tooltip.
			.on( 'click'       , after_feature_clicked );	// When a feature is clicked, show the details of it.
}

function after_feature_clicked(d){
	MAP_overlay_draw([d])
	clicked(d)
}

function MAP_zoom_on_feature(feat_code , action_code){
	
     opera_console.addLog(` The metaGeo objet is : ${toJSON(currentMetaGeo) }  <br>
     	Searching Feature found on criteria =====>> " +
        d.properties[ ${currentMetaGeo.idfield} ] == ${feat_code} "`
     )
	var f = currentGeodataset.features.find( function(d){
		return( d.properties[currentMetaGeo.idfield] == feat_code )
	})
	if (f){
		after_feature_clicked(f)
		//MAP_overlay_draw([f])
		//clicked(f)
	} 
}

function MAP_overlay_draw( feature_arr ){


	mapFeaturesOverlay.selectAll('path')
	   .remove();

    mapFeaturesOverlay.selectAll('path')
        .data( feature_arr )
        .enter().append('path')
        	//.attr('class', 'selected-feature-centered')
        	.attr('pointer-events', 'none')
        	.attr('d' , function(d) {return path(d)})
}

function updateMapColors(){
 	
 	var vmin , vmax , metaData = currentMetaTable, class_count, r, renderer

 	vmin = d3.min(mapData, function(d) { return (getValueOfData(d)); });
	vmax =	d3.max(mapData, function(d) { return (getValueOfData(d)); });

	r = metaData.renderer

	// le moteur de rendu "auto" doit actualiser son domaine de valeur en fonction du champ actif
	if (r.source == "auto") {

		renderer = get_renderer( r.count, [ (1 + vmin ) , vmax ] , r.color_range )
		metaData.renderer_interpolated = renderer;

	} else {
	// Par principe, le moteur de rendu "manual" doit pas être modifié;
		renderer = r
		metaData.renderer_interpolated = r;

	}


	 var color_mapper = d3.scale.threshold()
		.domain( renderer.threshold )
		.range(  renderer.colormap );

	mapFeatures.selectAll('path')
		.style('fill', function(d){
		  var attr_line = dataById[getIdOfFeature(d)]; 
		  var attr_value = !attr_line ? 0: getValueOfData(attr_line) ;

		  return color_mapper( attr_value );
	})


	// We call the function to update the legend.
    updateLegend( renderer , true);
 }

//Si le Layout est approprié, la mise à jour du tableau de données est enclenchée
function update_dataTableView( metadata ){
	var _generateCol_HTML_TAG = false
	if ( metadata.layout !=  "COVID" ) {
		//Generate IF NOT EXISTS the datatable column definition for the metadata
		metadata.dt = metadata.dt || {}
		metadata.dt.colArray = metadata.dt.colArray || generate_colArray(metadata)	

		dataTableController = dataTableController || 
		new ui_render_dataTable( "#dttable_container", 
			{
				id : "dttable_object",
				colMapArray : metadata.dt.colArray,
				height : "30vh"
			}, 
			mapData,
			after_row_selected,
			after_row_unselected,
			_generateCol_HTML_TAG
		)

		if (  dataTableController.reloadNeeded()  ){
			dataTableController.reloadData( metadata.dt.colArray , mapData )
		}
	}
   //--------------------------------------------------------------
	function after_row_selected(row){
		var feature_code = row["CODE"];
		MAP_zoom_on_feature(  feature_code, 0  )
	};

	function after_row_unselected(row){
		var feature_code = row["CODE"];
		MAP_zoom_on_feature(  feature_code , -1  )
	}
	
}



function clicked(d) {

	  opera_console.addLog( " Objet paramètre d'exécution de la function dans clicked : " + JSON.stringify(d))
	  var x, y, k;
	  var g = mapFeatures;
	  var g0 = mapFeaturesOverlay;

	  if (d && centered !== d) {
		    var centroid = path.centroid(d),  x = centroid[0]; y = centroid[1];  k = 4;
		    centered = d;
		    g0.selectAll("path").attr("class", "selected-feature-centered")

	  } else {
		    x = width / 2;
		    y = height / 2;
		    k = 1;
		    centered = null;
		    g0.selectAll("path").attr("class", "selected-feature")
	  }

	  g.selectAll("path")
	      .classed("active", centered && function(d) { return d === centered; });


	  g.transition()
	      .duration(750)
	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
	      .style("stroke-width", 0.5 / k + "px");
  
  	  g0.transition()
	      .duration(750)
	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
	      .style("stroke-width", 0.25 / k + "px");
}




// Function to update the legend inspired somewhat by example from on http://bl.ocks.org/mbostock/4573883
 function updateLegend( _renderer , forceUpdate = false) {
 	var renderer = (_renderer ) ? 
 				   _renderer : 
 				   currentMetaTable.renderer_interpolated

 	opera_console.addLog("_renderer is equal to" + JSON.stringify(renderer))
 	opera_console.addLog("currentMetaTable.renderer is " + JSON.stringify(currentMetaTable.renderer))
 	opera_console.addLog("render for legend update is " + JSON.stringify(renderer))

    var field = currentMetaField
 	//Exit if initialization is on course
 	if (before_app_initialization && !forceUpdate)  return;

 	//Capture legend container size (WIDTH)
 	if ( renderer == undefined ) {
 		alert( "INVALID Renderer Encountered!! Mesure must be taken" )
 	}

	var legendWidth = d3.select('#map').node().getBoundingClientRect().width - 30;
	var title = renderer.legendtitle ? renderer.legendtitle : field.short_name

	//opera_console.log("Legend Width : " + legendWidth )
	legendController.set_prop(        "title" ,  title );
	legendController.set_prop(        "width" ,  legendWidth );
	legendController.set_prop(       "domain" ,  renderer.threshold );
	legendController.set_prop(   "colorscale" ,  renderer.colormap );
	legendController.set_prop( "custom_label" ,  renderer.labelmap );

	legendController.refresh();
 }




 function update_color_palette(palette_name){
 	//mapFeatures.attr('class', 'features ' + palette_name);
    //g.attr("class", "legend-key " + palette_name);
 }

function calculateScaleCenter(features) {
 // Get the bounding box of the paths (in pixels!) and calculate a
 // scale factor based on the size of the bounding box and the map size.
	 var bbox_path = path.bounds(features),
	 scale = 0.95 / Math.max(
		(bbox_path[1][0] - bbox_path[0][0]) / width,
		(bbox_path[1][1] - bbox_path[0][1]) / height
	 );

// Get the bounding box of the features (in map units!) and use it
// to calculate the center of the features.
	 var bbox_feature = d3.geo.bounds(features),
	 center = [
		 (bbox_feature[1][0] + bbox_feature[0][0]) / 2,
		 (bbox_feature[1][1] + bbox_feature[0][1]) / 2];
	 return {
		 'scale': scale,
		 'center': center
	 };
 }

function getValueOfData(d) {
	//console.log(d);
	return +d[currentKey];
}  	 			


function doZoom() {
	if (ZOOM_IS_DISABLE) return
 	mapFeatures.attr("transform",
 	  "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
		// Keep the stroke width proportional. The initial stroke width
		// (0.5) must match the one set in the CSS.
	.style("stroke-width", 0.5 / d3.event.scale + "px");
	//opera_console.addLog(  "ZOOM PARAMS : translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")"  )
}

function getIdOfFeature(f) {
	//console.log(f.properties.code);
	var  idfield = currentMetaGeo.idfield
	return f.properties[idfield];
}


/**
 * Show a tooltip with the name of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showTooltip(f) {
	var id = getIdOfFeature(f);// Get the ID of the feature.
	var d = dataById[id];// Use the ID to get the data entry.
	//console.log(dataById)
	var value = d[currentKey];
	//delay_console(d);

	var tooltips_text = `
		<span>${currentMetaGeo.names.value}</span><br>
		<span style="font-size:11px; color: #111;">
			 ${d.ADM_NAME} 
		</span><hr style="height: 1px; margin: 1px">
		<span style="font-size:14px; color: red;">
			 ${ UTIL.format_number(value)} 
		</span>
		<span>${currentMetaField.unit}
		</span>`

	var place_name = d? tooltips_text : "Région sanitaire Inconnue";
	// Get the current mouse position (as integer)
	var mouse = d3.mouse(d3.select('#map').node()).map(
	 		function(d) { return parseInt(d); }
	);

	 // Calculate  the absolute  left  and  top  offsets  of the tooltip. If the
	 // mouse is close to the right border of the map, show the tooltip on the left.
	 
	 var left =mouse[0] + 5 // Math.min(width - 4 * place_name.length, mouse[0] + 5);
	 var top = mouse[1] + 15;

      //capture_random( left, top)


	 // Show the tooltip (unhide it) and set the name of the data entry.
	 // Set the position as calculated before.
	 tooltip.classed('hidden', false)
	 .attr("style", "left:" + left + "px; top:" + top + "px")
	 .html('<center>' + place_name + '</center>');


	 function delay_console(obj){
	 	if (App.tooltip_delay_on) return;
	 	    	handle_mapMouseover_actions(d)
	 	   App.tooltip_delay_on = true ;

	 	   setTimeout(function(){ App.tooltip_delay_on = false }, App.tooltip_delay)
	 }



 }

 function capture_random(n,m){
 	if (test_capture_serie.length > 500) return
 	test_capture_serie.push({ alive: n, iddle: Math.round(0.05*m)})
 	if (test_capture_serie.length == 500) opera_console.addLog( "SERIE PSEUDO ALEATOIRE =>> " + JSON.stringify(test_capture_serie))
 }
 
function hideTooltip() {
 	tooltip.classed('hidden', true);
 	//console.log("hidding tooltips");
}

function showDetails(f) {
	 // Get the ID of the feature...
	 var id = getIdOfFeature(f);
	 // ...and use the ID to get the data entry.
	 var d = dataById[id];

	var tmplt_data = ui_pre_render_format(tmplt_data)
	ui_render_details(tmplt_data)//  HTML output in the details container.
}


function generate_statistic_tables_ex(data , parser){
	// TODO:: To be generalized for an arbitrairement number of geographique level
	// So far we do support  only 2 levels; code maybe broken if the number of level grow
	// as expected with Atlas REEA.

	var LEVEL   = parser.class_field, 
	    CODE    = parser.id_field,

	    CLASS_1 = parser.classes[0].value,
	    CLASS_2 = parser.classes[1].value,

	    LYR_1   = parser.classes[0].layer,
	    LYR_2   = parser.classes[1].layer

	//console.log("-----------------------------> parser")
	//console.log(parser)
	var tmp_data = d3.nest().key(function(d) { return d[LEVEL]; }).rollup(function(d) { return d; }).map(data);

	table_1 = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map( tmp_data[CLASS_1] );
	table_2 = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map( tmp_data[CLASS_2] );

	var  _RSP = {}
	     _RSP[ LYR_1 ] = table_1
	     _RSP[ LYR_1 + "_raw" ] = tmp_data[CLASS_1]

	     _RSP[ LYR_2 ] = table_2
	     _RSP[ LYR_2 + "_raw"] = tmp_data[CLASS_2]

	return _RSP 
}  	



function updateGraphic(){
	var metadata = currentMetaTable
	var metafield = currentMetaField
	var metageo = currentMetaGeo

	if (metadata.layout !=  "COVID" ) { //RASS Chart Layout contain dynamic charts

		if (!chartController_rass){
			
			chartController_rass = build_RASS_chart_component( metadata , metafield, mapData, metageo)
		
		} else  {

			chartController_rass.setParams(metadata , metafield, mapData, metageo);
			chartController_rass.updateChart({
				duration: 1500,
				easing : 'linear'
			});
		}
	}
}

function handle_mapMouseover_actions(d){

	if (  metadata.layout ==  "COVID" || !chartController_rass ) return
	chartController_rass

}

function get_graphic_infos() {
    return {
        x: currentKey,
        y: "ADM_NAME",
        title: currentMetaTable.label,
        subtitle:  currentMetaField.short_name,
        y_unit: "District",
        x_unit: currentMetaField.short_name,
        deco_infos_1: "Ce graphique dépeint la " + currentMetaField.long_name + " par district en 2017",
        deco_infos_2: currentMetaTable.article + currentMetaTable.unit,
        deco_infos_3: currentMetaTable.article + currentMetaTable.unit,
        deco_source: " Généré par Atlas Santé - Source de données " + currentMetaTable.source
    }
}


function ui_updateTemplate_details(data){
	var tmpltHtml = Mustache.render(tmplt_details_virtual, data);

    Mustache.parse(tmpltHtml);
    return tmpltHtml;
}

function ui_render_details(tmplt_data){
	// note the two-steps rendering here:
	// the first rendering gives the html code to be injected as data property in the second render data
	// the property is then used to resolve the {{html_table_rows}} tag in the hard_detail_templeate

	//step 1 :
	var html_rows_content = Mustache.render(tmplt_rowDescription, tmplt_data);
	// step 2:
	
	var data_details = {};
	data_details.ADM_NAME = tmplt_data.ADM_NAME ;
	data_details.HTML_TABLE_ROWS = html_rows_content;
    //sysecho("data_detail", data_details);

	var detailsHtml = Mustache.render(tmplt_details_hard, data_details);

    sysecho("detailsHtml", detailsHtml);


	d3.select('#details').html(detailsHtml);
	 // Hide the initial container.

	d3.select('#initial').classed("hidden", true);	
	d3.select('#sysinfos').classed("hidden", true);	
	d3.select('#details').classed("hidden", false);
	dyn_width  = svg.style("width");
	dyn_height = svg.style("height");
}

function ui_render_ThematicSelectList_Component(data){
	//sysecho("data for Table select template", data);

	var componentHtml = Mustache.render(tmplt_table_select, data);
	d3.select("#table_selector-wrapper").html(componentHtml);
	d3.select('#select-table').on('change', function(a) {
		// Change to the current option triggers call to the function load metaTable.
		 var tmpTable = d3.select(this).property('value');
		 after_thematic_section_Changed(tmpTable);
	});		
}

function ui_render_colorPaletteSelect(data){
	var componentHtml = Mustache.render( tmplt_palette_select  , data);
	d3.select('#palette_selector-wrapper').html(componentHtml);
}

function ui_render_keySelectList_component(data){
	//console.log("data for select template", data);
	var componentHtml = Mustache.render(tmplt_key_select, data);
	d3.select('#var_selector-wrapper').html(componentHtml);

	d3.select('#select-key').on('change', function(a) { 	// Change to the current key triggers call
		var tmpKey = d3.select(this).property('value');    // to the function to update the colors.
		after_selectKey_Changed(tmpKey)
	 });
	//console.log("Html rendererd for select key :", componentHtml);
}

function ui_render_sysinfos(){
	var data = {
 		table : currentMetaTable,
 		field:  currentMetaField
 	 }
	var componentHtml = Mustache.render(tmplt_sysinfos, data);
	// d3.select('#sysinfos').html(componentHtml);
	 d3.select('#message-box').html(componentHtml);
}




function ui_pre_render_format(obj){
	return ( UTIL.format_number_in_object(obj) )
	//console.log(obj)
}

/********************************
 * Hide the details <div> container and show the initial content instead.
 */
 function showSysInfos(){
  	d3.select('#details').classed("hidden", true);
	d3.select('#initial').classed("hidden", true);	

	d3.select('#sysinfos').classed("hidden", false);	
	
 }
 function hideSysInfos(){
 	d3.select('#details').classed("hidden", true);
	d3.select('#initial').classed("hidden", false);	
	d3.select('#sysinfos').classed("hidden", true);	
 }
 function hideDetails() {
	d3.select('#details').classed("hidden", true);
	d3.select('#initial').classed("hidden", false);
	d3.select('#sysinfos').classed("hidden", true);	
 }


 function showSettings(){
	d3.select('#bttn-setting').classed("hidden", true);
	d3.select('#setting-wrapper').classed("hidden", false);
	d3.select('#barchart-wrapper').classed("hidden", true);		
 }
 function hideSettings(){
	d3.select('#bttn-setting').classed("hidden", false);
	d3.select('#setting-wrapper').classed("hidden", true);
	d3.select('#barchart-wrapper').classed("hidden", false);	
 }

 function in_geojsonfile(d){	
 	return (d.GEOLOC == 'YES');
 }



function set_routes(){
	var routes = {
		"/action/address-to-mobile/:close" : after_user_accept_UX_degradation,
		"/action/select-palette/:color_palette" : after_colorPalette_selected,
		"/action/test-debug/:reload_chart" : histogram_draw,
		"/action/:start-server" : start_server,
		"/action/:stop-server"  : start_server,
		"/action/:connect-client" : start_server,
		"/action/app-settings": function(){}, 
		"/home" : function(){}
	}
	var router = Router(routes);
     	router.init();
}

function start_server(command){

	$.ajax({
        url: `/socket/${command}`,
        method: 'GET',
        data : {
            time: 1,
            user: 5
        },
        success: function(data){
            //console.log(data) // Correctly logs data to console
        		d3.json(data, function(dataSet){
            		//console.log(dataSet) // Null with error 404
        		})   
        },
        error: function(error_data){

        //console.log(error_data.responseText)
        $("#socket-report").html(error_data.responseText)
 }
})}

function histogram_draw(){
	//console.log("Histogram reload asked");
	histogram.draw();
	navigate("home");
}


function look_at(varName, varValue ){
	alert (varName + ":" + varValue)
}

function sysecho(the_title, the_value){
	return
	if (typeof  the_value === "object" ){
			the_value = JSON.stringify(the_value);
	} 
	//console.log (the_title + ":" + the_value);
}


function bind_Scale_Selector(){

	$("#scale-selector .dropdown-item").on({

		"click": function(evt){
			var _elt = $(this),  
				_data = evt.currentTarget.dataset,
				_info = { "key": _data.key, "label": _data.label};
				$("#current_admin_level").val(_info.label);
				do_action(_info.key);
		}

	})	
	function do_action(){

	}
}	
var winResizeTimerID = 0;
var ACCEPT_MOBILE = false;
var behave_as_mobile_device_on_start_up = false;

var before_app_initialization = true;
var COVIDATA;
var user_session_manager = new user_connexion_manager_constructor()
var ENV_VIEW_SIZE = getEnvSize()

// We add a listener to the browser window, calling updateLegend when the window is resized.
//window.onresize = after_window_resized ;



function getEnvSize(){
	return {

		browser : {
			height : $(window).height(),
			 width : $(window).width()
		},
		page :{
			height : $(document).height(),
		     width : $(document).width()
		},
		screen :{
			height : window.screen.height,
		     width : window.screen.width
		}

	}

}

user_session_manager.boot_app()
//user_session_manager.start_session();


function user_connexion_manager_constructor(){
	var Infinite_loop_watchdog_max = 10 ;
	var loop_counter = 0 ;
	var session_notification_timer;
	var admin_supervision_timer;
    var storeAgent = new _StorageManager();
    var userBadge;
    var tempUserBadge;
    var user_key;
    var supervisor_active = false

    var clientType = detect_client()

    return {
    		     boot_app : _boot_app,
    		start_session : _start_session,
    		 stop_session : _stop_session,
    	 get_online_users : _get_online_users,
    	      reset_token : _reset_storage,
    	       supervisor : _supervisor
    }

    function _boot_app(){
    	
		exec_infinite_safe(function(){
			Ajaxian.post('./visitors/boot_app', user_agent, _start_session, unexpected_Error_handler)
			loop_counter++;
		})
    }


    function _start_session( tmp_badge){
    	var byPassKey = false //EMULER LE SUCCES DE L'EXTRACTION
		tempUserBadge = tmp_badge

		if (storeAgent.existItem("opera.kassaprekoh.2020" , byPassKey)){

			user_key = storeAgent.getItem()

			opera_console.addLog( `Utilisateur ${user_key}  identifié par le Browser :` , "");
			opera_console.addLog( "Demande de vérification :" + user_key , "request");

			exec_infinite_safe(function(){	
				Ajaxian.read( `./visitors/read_visitor/${user_key}`, UserBadge_restore_Or_recreate, unexpected_Error_handler)
				loop_counter++;

			})

		} else {
			opera_console.addLog( "Visiteur Inconnu :"  , "fail");
			opera_console.addLog( "Demande d'une nouvelle clé par le client :"  , "request");

			exec_infinite_safe(function(){
				Ajaxian.post( `./visitors/new_visitor`, tempUserBadge, createUserBadge, unexpected_Error_handler)
				loop_counter++;
			})

		}
    }

//note_that_for every boot_fail call :  you must set usrBadge.abort_message


    function _supervisor(action , params){
    	
    	switch(action){
    		case "toggle" :
    			if (supervisor_active == false) {

    				start_supervision_notifier()
    				supervisor_active = true;
    				

    			} else {
    				stop_supervision_notifier()
    				supervisor_active = false;
    			}

    		break;

    		case "traffic" :
    			if ( !chartController_admin ){

    				chartController_admin = new build_traffic_chart_component(params.data)
    			} else {
    				chartController_admin.setParams(params) 
    				chartController_admin.updateChart()
    			}
    			break;
    		default:

    	}
    	return (supervisor_active)
    }
    function _get_online_users(){

    		Ajaxian.read(  `./visitors/admin`, manage_admin_infos, unexpected_Error_handler)

    }

    function _stop_session(){}

    function _reset_storage(){ 
    	opera_console.addLog( "Token removed from Local storage" , "success");
    	storeAgent.removeItem("opera.kassaprekoh.2020") 
    }

	function createUserBadge(data){
	/*=================================================================
		create badge :  a badge is a global userobject containing identification 
		and contextual data on the current user
	===================================================================*/
		opera_console.addLog( "Server Response with new Badge => " + JSON.stringify(data) , "success");
		storeAgent.setItem("opera.kassaprekoh.2020", data.uuid);
		userBadge = data ;
		userBadge.new_visitor = true;

		//Confirm that user is started and App is ready to go
		exec_infinite_safe(function(){
			Ajaxian.post( `./visitors/boot_success`, userBadge, APP_START_NOW, unexpected_Error_handler)
			loop_counter++;
		})
		

		
	}

	function APP_START_NOW( data ){
		if ( data.appIsReady) {
			app_start_up();
			start_session_notifier(data);				
		}
	}

	function UserBadge_restore_Or_recreate(data){

		 if ( data.appIsReady ){
			//If all is OK then we start the application
			opera_console.addLog( "Serveur response on Visitor Check, : restoring du badge => " + JSON.stringify(data) , "success");
			userBadge = data;
			userBadge.new_visitor = false
			userBadge._uuid = tempUserBadge._uuid

			exec_infinite_safe(function(){
				Ajaxian.post( `./visitors/boot_success`, userBadge, APP_START_NOW, unexpected_Error_handler)
				loop_counter++;
			})		
		
				
		} else {
			//User invalid KEY encountered :: we then ask a new key
			opera_console.addLog( "Visitor with invalid KEY, Requesting a new KEY :" + JSON.stringify(tempUserBadge) , "warning");

			exec_infinite_safe( function(){
				Ajaxian.post( `./visitors/new_visitor`, tempUserBadge,  createUserBadge, unexpected_Error_handler);
				loop_counter++;
			})
		}
	}

	function unexpected_Error_handler(xhr, ajaxOptions, thrownError){
	/*=================================================================
		Common Handler for error on Client Request 
	===================================================================*/

	  opera_console.addLog("HTTP//ERROR 500 :" + xhr.responseText , "fail")
	}	


	function start_session_notifier( inBadge ){
	/*=================================================================
	  the timer trigger every 2 minutes ( 30 sec for administrator ) a session 
	  alive notification to server
	===================================================================*/
	  userBadge = inBadge
	  var delay = userBadge.timers.notifyClient
		opera_console.addLog( "Démarrage du notificateur de présence: tempo =" + delay  , "request");
		session_notification_timer = setInterval( function(){
				notify_session();
		}, delay )
	}

	function start_supervision_notifier(){
	/*=================================================================
	  the supervion timer trigger every  ( 30 sec for administrator) 
	  to read the session buffer
	===================================================================*/
	var delay = userBadge.timers.adminClient
		opera_console.addLog( "Démarrage du superviseur :tempo =" + delay, "request");
		supervisor_active = true;
		admin_supervision_timer = setInterval( function(){
				notify_supervision();
		}, delay )
	}

	function stop_supervision_notifier(){
	/*=================================================================
	                 STOP the supervion timer
	===================================================================*/
		opera_console.addLog( "Arret du superviseur :"  , "warning");
		supervisor_active = false;
		clearInterval( admin_supervision_timer );
	}


	function notify_session(){
	/*=================================================================
		The Client send this request to notify that it still présente
	===================================================================*/
		opera_console.addLog( "Notify session alive:" + userBadge.uuid , "request");
		Ajaxian.read(  `./visitors/notify_alive/${userBadge.uuid}`, manage_user_infos, unexpected_Error_handler)
	}



	function notify_supervision(){
	/*=================================================================
		The Client Admin console request BUFFER state
	===================================================================*/
		opera_console.addLog( "Notify session alive:" + userBadge.uuid , "request");
		Ajaxian.read(  `./visitors/admin_query`, manage_admin_infos, unexpected_Error_handler)
	}

	function exec_infinite_safe(callBack, mssg){
		if ( loop_counter > Infinite_loop_watchdog_max ){
			opera_console.addLog( "Application stopped due to Infinite loop !!!"  , "fail");
			notify_initialization_abort("To match cycles between browser and Server");
			return
		} 
		callBack();
	}

	function manage_user_infos(data){
	/*=================================================================
			Serveur response on a  alive_sesion_notification as a way of 
			accusé de réception
	===================================================================*/
		opera_console.addLog( "Server notification feedback:" + JSON.stringify(data) , "success");
	}

	function manage_admin_infos(data){
	/*=================================================================
			Serveur response on a  alive_sesion_notification :
			if user id administrator then data represente admin 
			stats
	===================================================================*/
		opera_console.addLog( data )
		//$("#tab-e").html( Mustache.render( opera_table_template , { users: data} ))
	}
}


function force_mobile(){
	return ( behave_as_mobile_device_on_start_up == true )
}



function update_covid_badges(){

	var slides = new COVID_BADGES();
	//alert("update_covid_badges")
	console.log(slides)



	var covid_slideController = new ui_render_caroussel( "#card-1", 
			{
				id : "slide-covid-figures",
				default : "slide-0",
				addCursor : true,
				addLink : false,
		   		slides : [
		   			{ id: "slide-0", name: "Cas confirmés" , label : "Graphiques"    ,  Html_content : slides.badge_01  , visible: true , color: "blue"},
		   			{ id: "slide-1", name: "Cas actifs"    , label : "Vue tabulaire" ,  Html_content : slides.badge_02  , visible: true , color: "orange"},
		   			{ id: "slide-2", name: "Décès" , 		 label : "Comentaire"    ,  Html_content : slides.badge_03  , visible: true , color: "yellow"},
		   			{ id: "slide-3", name: "Guéris" , 		 label : "Comentaire"    ,  Html_content : slides.badge_04  , visible: true , color: "green"}
		   		]			   
			},
			function(){}
	);

	$('#slide-covid-figures').carousel({
	  interval: 2000,
	  ride : "carousel"
	})
	$('#slide-covid-figures').carousel(1)	


	function COVID_BADGES( ){


		var d = extract_late_datarow();
		var d1 = extract_late_datarow(1);

		return {
			"badge_01" : update_one_badge( { 
						color_class : "badge-orange-dark", 
						label : "Cas confirmés (Covid-19)", 
						value : d.sum_case ,     
						delta : d.new_case , 	   
						date : d.date_raw   
					}),
			"badge_02" : update_one_badge( {
						color_class : "badge-yellow-dark", 
						label : "Cas actifs (Covid-19)",    
						value : d.active_case  , 
						delta : d.active_case - d1.active_case,  
						date : d.date_raw   
					}),
			"badge_03" : update_one_badge( { 
				       color_class : "badge-red-dark",	  
				       label : "Décès (Covid-19)", 		   
				       value : d.sum_deceased, 	
				       delta : d.new_deceased, 	
				       date : d.date_raw   
				   }),
			"badge_04" : update_one_badge( { 
				        color_class : "badge-green-dark",  
				        label : "Guéris (Covid-19)", 	   
				        value : d.sum_healed,    
				        delta : d.new_healed, 		
				        date : d.date_raw   
				   }),	
		 }

		function  update_one_badge( data ){
			var extended =  ( ENV_VIEW_SIZE.browser.width > 1200 )

			data["symbol"] = function(){return (((this.delta < 0) ? "" : "+" ))}
			return (Mustache.render(badge_template(extended), data));
		}	

		function badge_template( extended = true ){
			var deltas = extended ?  `
		       <span style="font-weight: 350; font-weight: 500; font-size: 0.6em; padding-bottom: 0.3em;
		     				line-height: 1;"> 
		         ( {{symbol}}{{delta}},  <span style="font-weight: 650;  font-size: 0.8em; ">au {{date}} </span> )  
		       </span>` : "";

			var badge_template = `
			<div class="card text-center  {{color_class}}"  style="position:relative; height:60px;">
			    <div class="card-body" style="padding: 0.5em;">
				     <span style="display: block; font-weight: 500 ;font-size: 0.9em; 
				     		padding-bottom: 0.3em; line-height: 1;"> 
				     		{{label}} 
				     </span>
				     <span style="display: block; font-weight: 750;  font-size: 1.5em; padding-bottom: 0.3em; line-height: 1;"> 
			               {{value}} ${deltas}
				 	</span>
			  </div>
			</div>`;
			return(badge_template)
		}
	}	
}


function display_atlas_infos_slide(){

	var slides = new ATLAS_BADGES();

	var covid_slideController = new ui_render_caroussel( "#card-2", 
			{
				id : "slide-atlas-infos",
				default : "slide-0",
				addCursor : true,
				addLink : false,
				transition : "fade",
		   		slides : [
		   			{ id: "slide-0", name: "Cas confirmés" , label : "Graphiques"    ,  Html_content : slides.badge_01  , visible: true , color: "blue"},
		   			{ id: "slide-1", name: "Cas actifs"    , label : "Vue tabulaire" ,  Html_content : slides.badge_02  , visible: true , color: "orange"},
		   			{ id: "slide-2", name: "Décès" , 		 label : "Comentaire"    ,  Html_content : slides.badge_03  , visible: true , color: "yellow"},
		   			{ id: "slide-3", name: "Guéris" , 		 label : "Comentaire"    ,  Html_content : slides.badge_04  , visible: true , color: "green"},
		   			{ id: "slide-5", name: "Guéris" , 		 label : "Comentaire"    ,  Html_content : slides.badge_05  , visible: true , color: "green"}
		   		]			   
			},
			function(){}
	);

	$('#slide-atlas-infos').carousel({
	  interval: 2000,
	  ride : "carousel"
	})	


	function ATLAS_BADGES( ){

		return {
			"badge_01" : _render_cool(`Atlas Santé CI ? ...`),
			"badge_02" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...les données du RASS passées au moule de la DATAVIZ... </span>`),
			"badge_03" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...une contribution à la valorisation des statistiques sanitaires...  </span>`),
			"badge_04" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...un contenu appelé à évoluer regulièrement...</span>`),
			"badge_05" : _render_cool(`<span> Atlas Santé CI, </span> <br> <span> ...vers une version mobile pour une ubiquité d'accès </div>` )	
		 }

		function _render_cool(html){
		 	var template =  `
				<div class="card text-center align-middle  badge-white-dark "  style="position:relative; height:60px;">
				    <div class="card-body"  style="padding: 0.1em;">
					     <span  style="display: inline-block; position: relative;height:100%;font-weight: 500 ;font-size: 1.2em; 
					     		padding-bottom: 0.3em; line-height: 1;"> 
					     		${html}
					     </span>
					     <span style="display: block; font-weight: 750;  font-size: 1.5em; padding-bottom: 0.3em; line-height: 1;"> 
				              
					 	</span>
				  </div>
				</div>
			`;
			return (template);

		}
	}	
}



function extract_late_datarow(index=0){
	var n = COVIDATA.length
	return COVIDATA[n-1-index];
}

function USER_INTERFACE_update_layout(){  
	opera_console.addLog("Windows resized");
}


var color_helper = Chart.helpers.color
fileLoad_JSON( 
	"Données épidémiologique sur le COVID-19", "./data/covid-data.json", 
	function(data) {
		COVIDATA = data;
		update_covid_badges();
		display_atlas_infos_slide();
		build_COVID_chart_component(  data );

    }, 
    function(error){
		alert("erreur " + error)
	}
);	



function remove_start_up_curtain(){

	$("#home-view").addClass("hidden");
	//$("#curtain").addClass("hidden")
	$("#start-up-failure-msgbox").html( "" );
	$("#spinner").html( ``);
	$("#spinner-message").html( ``)	;

}

function show_address_to_mobile_users(){
	var mssg = `<p class="align-middle text-center" > Nous avons détecté que vous utilisez un terminal mobile.<br>
    		<span style="font-weight:800; color: orange;">Atlas Santé</span> est conçu à la base pour des terminaux à large écran (Desktop/Laptop) exclusivement.
    	    <br> Cependant, vu le nombre élevé de requêtes de connexion les concernant, l'accès depuis les terminaux mobiles a été ouvert, et ce, malgré une expérience utilisateur sensiblement dégradée.
    	    En attendant la disponibilité d'une véritable version mobile, nous nous excusons auprès des utilisateurs "mobiles".
    	</p> 
    
    	<center>  <a href="#/action/address-to-mobile/close" class="btn btn-success btn-lg active" role="button" aria-pressed="true"> Cliquer pour continuer </a> </center>
    	`
	$("#id-address-to-mobile-users").removeClass("hidden")
	$("#id-address-to-mobile-users").html(mssg)

}

