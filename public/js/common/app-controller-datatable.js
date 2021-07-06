//app-controller-datatable.js
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
			reloadNeeded : function(forceReload){
				
				if ( forceReload ) return true
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
			},
			adjustColumns : function(){
				//dt_coreObject.columns.adjust().draw();
				dt_coreObject.columns(0).order('desc').draw()
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
	            "fixedColumns": true,
	            "pageLength": 100,
	            "language": get_i18n_params(),
	            "columns":  Config.colMapArray,
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

	    	return({
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
	    	})
	    }

}
