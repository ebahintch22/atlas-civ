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



//	"./data/geojson/tmp/civ-adm2-region-r2.geojson",
//	"./data/geojson/tmp/civ-adm1-district-r2.geojson"


var metaDataBase = {

	data_base_name : "Atlas Sanitaire - Côte d'Ivoire  - RASS 2017 version 1.0.5",
	version : "2.0",
	date : "21/05/2020",
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
		"covid-19"
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
			index : 17,
			name : "covid-19", 
			valid: true,
			table_num : "Tableau-99",			
			layerList : [ "region_admin", "district_admin" ],
			label: "0- Incidence nationale de la COVID-19",
			unit: "nombre de cas",
			article: "de ",
			path : "./data/statistics/tab_99_covid.csv",
			source: "DIIS/INS",
			data_parser : COVID_PARSER,
			renderer : {
				   source : "manual",
				threshold : [ 1, 4, 10, 100],
				 colormap : ["#ffffff", "#ffbfbf", "#ff8080", "#dd4040", "#660000" ],  
				 labelmap : ['Aucun cas' , "Incidence faible", "Incidence Moyenne" , "Incidence forte", "Epicentre"],
			  legendtitle : "Incidence de la Covid-19 (nb. cas confirmés)"
			},
			layout : "COVID",
			color_palette: "YlOrRd",
			field_selected : default_field_selection,
			data_fields : [					
				{ 
					fld_name : "FLD1",
					short_name : "Nb de cas confirmés", 
					long_name : " Nombre de cas confirmés de COVID-19", 
					data_type :  "INT", 
					unit : "cas confirmés" 
				}
			]
		},
		{
			index : 1,
			valid: true,
			name : "demographic",
			layerList : [  "district_sante", "region_sante" ],
			table_num :"Tableau-DD",
			label: "1- Données de population (2017)",
			"unit": "population",
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
			label: "2- Ressources des systèmes de santé - Personnel",
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
			label: "3- Ratio Prestataires de soins - Population",
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
			label: "4- Ressources des systèmes de santé - Etablissements",
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
			label: "5- Ratio établissements de santé/Population",
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
			label: "6- Autres ressources materielles (2017)",
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
			label: "7- Plateaux techniques et équipements (2017)",
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
			label: "8- Ratio ambulance par nombre de structure de soin (tab 11)",
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
		}
	]	
};
