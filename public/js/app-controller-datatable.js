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
