

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
            },
            notify : function notify(obj, delay_time = 5 ){
                    alertify.message(JSON.stringify(obj), delay_time );
            },
            random_string: function(prefix = "") { 
                const result = Math.random().toString(36).substring(2,7);
                return (prefix + result)
            },
            go_fullScreen : function(elt_id = "body"){

                // DOM element which needs to enter fullscreen mode
                var element = document.querySelector(elt_id);
                element.requestFullscreen()
                .then(function() {
                    // element has entered fullscreen mode successfully
                })
                .catch(function(error) {
                    // element could not enter fullscreen mode
                });

            }

        }
    })()


    function toJSON(inObj){
        return (JSON.stringify(inObj))
    }

	var parseTime, timeParse;
	set_time_config();




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
            "processing":     "Traitement en cours...",
            "search":         "Rechercher :",
            "lengthMenu":     "Afficher _MENU_ lignes",
            "decimal":        ",",
            "info":           "Page _START_ à _END_ sur _TOTAL_ ligne(s)",
            "infoEmpty":      "Aucune ligne à afficher",
            "infoFiltered":   "(filtrage actif: _TOTAL_ ligne(s) trouvée(s) sur _MAX_ )",
            "infoPostFix":    "",
            "thousands":      " ",
            "loadingRecords": "Chargement des données en cours...",
            "zeroRecords":    "Aucune ligne trouvée",
            "emptyTable":     "Pas de données disponible dans le tableau",
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

        var dataTable_i18n_full = {
            "emptyTable": "Aucune donnée disponible dans le tableau",
            "lengthMenu": "Afficher _MENU_ éléments",
            "loadingRecords": "Chargement...",
            "processing": "Traitement...",
            "zeroRecords": "Aucun élément correspondant trouvé",
            "paginate": {
                "first": "Premier",
                "last": "Dernier",
                "previous": "Précédent",
                "next": "Suiv"
            },
            "aria": {
                "sortAscending": ": activer pour trier la colonne par ordre croissant",
                "sortDescending": ": activer pour trier la colonne par ordre décroissant"
            },
            "select": {
                "rows": {
                    "_": "%d lignes sélectionnées",
                    "0": "Aucune ligne sélectionnée",
                    "1": "1 ligne sélectionnée"
                },
                "1": "1 ligne selectionnée",
                "_": "%d lignes selectionnées",
                "cells": {
                    "1": "1 cellule sélectionnée",
                    "_": "%d cellules sélectionnées"
                },
                "columns": {
                    "1": "1 colonne sélectionnée",
                    "_": "%d colonnes sélectionnées"
                }
            },
            "autoFill": {
                "cancel": "Annuler",
                "fill": "Remplir toutes les cellules avec <i>%d<\/i>",
                "fillHorizontal": "Remplir les cellules horizontalement",
                "fillVertical": "Remplir les cellules verticalement",
                "info": "Exemple de remplissage automatique"
            },
            "searchBuilder": {
                "conditions": {
                    "date": {
                        "after": "Après le",
                        "before": "Avant le",
                        "between": "Entre",
                        "empty": "Vide",
                        "equals": "Egal à",
                        "not": "Différent de",
                        "notBetween": "Pas entre",
                        "notEmpty": "Non vide"
                    },
                    "number": {
                        "between": "Entre",
                        "empty": "Vide",
                        "equals": "Egal à",
                        "gt": "Supérieur à",
                        "gte": "Supérieur ou égal à",
                        "lt": "Inférieur à",
                        "lte": "Inférieur ou égal à",
                        "not": "Différent de",
                        "notBetween": "Pas entre",
                        "notEmpty": "Non vide"
                    },
                    "string": {
                        "contains": "Contient",
                        "empty": "Vide",
                        "endsWith": "Se termine par",
                        "equals": "Egal à",
                        "not": "Différent de",
                        "notEmpty": "Non vide",
                        "startsWith": "Commence par"
                    },
                    "array": {
                        "equals": "Egal à",
                        "empty": "Vide",
                        "contains": "Contient",
                        "not": "Différent de",
                        "notEmpty": "Non vide",
                        "without": "Sans"
                    }
                },
                "add": "Ajouter une condition",
                "button": {
                    "0": "Recherche avancée",
                    "_": "Recherche avancée (%d)"
                },
                "clearAll": "Effacer tout",
                "condition": "Condition",
                "data": "Donnée",
                "deleteTitle": "Supprimer la règle de filtrage",
                "logicAnd": "Et",
                "logicOr": "Ou",
                "title": {
                    "0": "Recherche avancée",
                    "_": "Recherche avancée (%d)"
                },
                "value": "Valeur"
            },
            "searchPanes": {
                "clearMessage": "Effacer tout",
                "count": "{total}",
                "title": "Filtres actifs - %d",
                "collapse": {
                    "0": "Volet de recherche",
                    "_": "Volet de recherche (%d)"
                },
                "countFiltered": "{shown} ({total})",
                "emptyPanes": "Pas de volet de recherche",
                "loadMessage": "Chargement du volet de recherche..."
            },
            "buttons": {
                "copyKeys": "Appuyer sur ctrl ou u2318 + C pour copier les données du tableau dans votre presse-papier.",
                "collection": "Collection",
                "colvis": "Visibilité colonnes",
                "colvisRestore": "Rétablir visibilité",
                "copy": "Copier",
                "copySuccess": {
                    "1": "1 ligne copiée dans le presse-papier",
                    "_": "%ds lignes copiées dans le presse-papier"
                },
                "copyTitle": "Copier dans le presse-papier",
                "csv": "CSV",
                "excel": "Excel",
                "pageLength": {
                    "-1": "Afficher toutes les lignes",
                    "1": "Afficher 1 ligne",
                    "_": "Afficher %d lignes"
                },
                "pdf": "PDF",
                "print": "Imprimer"
            },
            "decimal": ",",
            "info": "Affichage de _START_ à _END_ sur _TOTAL_ éléments",
            "infoEmpty": "Affichage de 0 à 0 sur 0 éléments",
            "infoFiltered": "(filtrés de _MAX_ éléments au total)",
            "infoThousands": ".",
            "search": "Rechercher:",
            "searchPlaceholder": "...",
            "thousands": ".",
            "datetime": {
                "previous": "précédent",
                "next": "suivant",
                "hours": "heures",
                "minutes": "minutes",
                "seconds": "secondes"
            }
        } 


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