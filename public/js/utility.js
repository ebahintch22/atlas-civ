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
                    date : function(n){ return( formatter.format(n) )},
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
            format_number : function(nombre , standard = true){
                if (standard ) {
                    return( (nombre).toLocaleString())
                }
                 else {
                    return( _Number.format(nombre))
               }
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

	        callBack(data);
	        return data;          
	    })
	}



    function fileLoad_PGSQL( name, URL, callBack){

        Ajaxian.read( 
            URL, 
            function(data){

                data.sort(function(a, b) {
                    return a.ref_date - b.ref_date;
                });   

                data.forEach(function(d) {
                        var tmp_date =  Date.parse(d.ref_date);

                        d.date_raw = DATE_FORMATTER.short(d.ref_date);
                            d.date = d.ref_date;
                        d.new_case = +d.new_case;
                      d.new_healed = +d.new_healed;
                    d.new_deceased = +d.new_deceased;
                        d.sum_case = +d.sum_case;
                      d.sum_healed = +d.sum_healed;
                    d.sum_deceased = +d.sum_deceased;
                     d.active_case = + d.sum_case - d.sum_healed - d.sum_deceased;
                       d.nb_sample = +d.nb_sample;
                      d.sum_sample = +d.sum_sample;
                       d.incidence = +d.incidence_rate * 100;
                       d.remission = +d.remission_rate * 100;
                        d.letalite = +d.letality_rate * 100;
                    
                });

                callBack(data)
            },

            function( xhr, ajaxOptions, thrownError ){

            }
        )
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
}