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
	            "scrollY":  Config.Height_in?  Config.Height_in : '45vh',
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
	            "emptyTable": "Aucune donn??e disponible dans le tableau",
	            "lengthMenu": "Afficher _MENU_ ??l??ments",
	            "loadingRecords": "Chargement...",
	            "processing": "Traitement...",
	            "zeroRecords": "Aucun ??l??ment correspondant trouv??",
	            "paginate": {
	                "first": "Premier",
	                "last": "Dernier",
	                "previous": "Pr??c??dent",
	                "next": "Suiv"
	            },
	            "aria": {
	                "sortAscending": ": activer pour trier la colonne par ordre croissant",
	                "sortDescending": ": activer pour trier la colonne par ordre d??croissant"
	            },
	            "select": {
	                "rows": {
	                    "_": "%d lignes s??lectionn??es",
	                    "0": "Aucune ligne s??lectionn??e",
	                    "1": "1 ligne s??lectionn??e"
	                },
	                "1": "1 ligne selectionn??e",
	                "_": "%d lignes selectionn??es",
	                "cells": {
	                    "1": "1 cellule s??lectionn??e",
	                    "_": "%d cellules s??lectionn??es"
	                },
	                "columns": {
	                    "1": "1 colonne s??lectionn??e",
	                    "_": "%d colonnes s??lectionn??es"
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
	                        "after": "Apr??s le",
	                        "before": "Avant le",
	                        "between": "Entre",
	                        "empty": "Vide",
	                        "equals": "Egal ??",
	                        "not": "Diff??rent de",
	                        "notBetween": "Pas entre",
	                        "notEmpty": "Non vide"
	                    },
	                    "number": {
	                        "between": "Entre",
	                        "empty": "Vide",
	                        "equals": "Egal ??",
	                        "gt": "Sup??rieur ??",
	                        "gte": "Sup??rieur ou ??gal ??",
	                        "lt": "Inf??rieur ??",
	                        "lte": "Inf??rieur ou ??gal ??",
	                        "not": "Diff??rent de",
	                        "notBetween": "Pas entre",
	                        "notEmpty": "Non vide"
	                    },
	                    "string": {
	                        "contains": "Contient",
	                        "empty": "Vide",
	                        "endsWith": "Se termine par",
	                        "equals": "Egal ??",
	                        "not": "Diff??rent de",
	                        "notEmpty": "Non vide",
	                        "startsWith": "Commence par"
	                    },
	                    "array": {
	                        "equals": "Egal ??",
	                        "empty": "Vide",
	                        "contains": "Contient",
	                        "not": "Diff??rent de",
	                        "notEmpty": "Non vide",
	                        "without": "Sans"
	                    }
	                },
	                "add": "Ajouter une condition",
	                "button": {
	                    "0": "Recherche avanc??e",
	                    "_": "Recherche avanc??e (%d)"
	                },
	                "clearAll": "Effacer tout",
	                "condition": "Condition",
	                "data": "Donn??e",
	                "deleteTitle": "Supprimer la r??gle de filtrage",
	                "logicAnd": "Et",
	                "logicOr": "Ou",
	                "title": {
	                    "0": "Recherche avanc??e",
	                    "_": "Recherche avanc??e (%d)"
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
	                "copyKeys": "Appuyer sur ctrl ou u2318 + C pour copier les donn??es du tableau dans votre presse-papier.",
	                "collection": "Collection",
	                "colvis": "Visibilit?? colonnes",
	                "colvisRestore": "R??tablir visibilit??",
	                "copy": "Copier",
	                "copySuccess": {
	                    "1": "1 ligne copi??e dans le presse-papier",
	                    "_": "%ds lignes copi??es dans le presse-papier"
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
	            "info": "Affichage de _START_ ?? _END_ sur _TOTAL_ ??l??ments",
	            "infoEmpty": "Affichage de 0 ?? 0 sur 0 ??l??ments",
	            "infoFiltered": "(filtr??s de _MAX_ ??l??ments au total)",
	            "infoThousands": ".",
	            "search": "Rechercher:",
	            "searchPlaceholder": "...",
	            "thousands": ".",
	            "datetime": {
	                "previous": "pr??c??dent",
	                "next": "suivant",
	                "hours": "heures",
	                "minutes": "minutes",
	                "seconds": "secondes"
	            }
	    	})
	    }

}
