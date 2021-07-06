//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ui_render_dropdown_inputgroup( _eltID , Cfg , callBack ){

	var template_drop_downn = `
			 <div class="input-group-prepend">
			    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" 
			     data-tool="tooltips" data-placement="top"
			      aria-haspopup="true" aria-expanded="false" title="${Cfg.tooltipText}" >
			      <i class="${Cfg.fa_icon}" aria-hidden="true"></i>
			       ${Cfg.prompt} </button>
			    <div class="dropdown-menu" style=" max-height: 300px; overflow-y: auto;" >
				    {{#option_list}}
				    	{{{section}}}
					{{/option_list}}
			    </div>
			</div>
		  <input type="text" class="form-control" aria-label="Text input with dropdown button" value="">
		 `;

	var sub_template_category = `			    
			<h6 class="dropdown-header" style="color: #11b5dd; padding: 4px 8px 2px 8px; "  > {{header}}  </h6>
			{{#option_list}}			
				<a class="dropdown-item"  data-key="{{key}}" data-label="{{label}}" 
				  style="line-height:1.2em; padding: 1px 4px; font-size:0.8rem;"   href="#"> {{label}} </a>
			{{/option_list}}
		`;



	var data = Cfg ;
    var transform_func = Cfg.transform;
    var filter_func = Cfg.filter;
   // console.log(JSON.stringify(data))

    //Construire la liste des options
    __refresh_options(Cfg.options)

    return {
    	update_view: function(key){
    		
   			var _info = $(`${_eltID}  a[data-key="${key}"]`)[0].dataset;
   			$(`${_eltID}  a[data-key="${key}"]`).addClass("active");
    		$(`${ _eltID} > input.form-control`).val( _info.label );
    	},
    	refresh_options : function(options) {
    		__refresh_options(options)
    	}
    }

    function __refresh_options( options ){
		//filtrer la liste d'options

		var menu_data = {};
		var nested_data ;

		if (!is_missing_value( Cfg.class_field)) {
		//Un champ de classification est fourni : on procèd à une classification explicite
			nested_data = d3.nest()
								.key( function(d){ return d[Cfg.class_field] })
								.entries( options )
		
			menu_data.option_list = nested_data
			.map( 
				function (d){
				  var options = d.values
				  return ( { "section" : __render_section( options, d.key )  })
				}
			)

		} else {
			//Aucun champ de classification : alors on considère une classe virtuelle sous laquelle les toutes options seront regroupées
			menu_data.option_list = [  { "section": __render_section( options, Cfg.prompt ) } ];
		}

		//console.log(JSON.stringify(menu_data))

		var componentHtml = Mustache.render( template_drop_downn ,  menu_data );

		d3.select(`${_eltID}`).html(componentHtml );
		$('[data-tool="tooltips"]').tooltip();
		bind_Selector();

	}

	function __render_section( options, group_label ) {
		var data = {};
		
		data.header = group_label
		data.option_list  =  is_function( filter_func ) ? options.filter( filter_func ) : options
		//Transformer (reformattage) de la liste d'options
		data.option_list = is_function( transform_func ) ?
			data.option_list.map( transform_func ) :
			data.option_list.map( 
				function(d){
					d.key = d[Cfg.transform.key]
					d.label = d[Cfg.transform.label]
					return (d)
				}
			) 
		return ( Mustache.render( sub_template_category ,  data ));
	}


	function bind_Selector(){

		$( `${ _eltID} .dropdown-item` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "key": _data.key, "label": _data.label};
					$(`${ _eltID} > input.form-control`).val(_info.label);

					$( `${ _eltID} .dropdown-item.active`).removeClass("active")
					_elt.addClass("active");
					callBack( _info );
			}
		})			
	}

	function is_function(f){
	    return (Object.prototype.toString.call(f) == '[object Function]') 
	}
	function is_missing_value(in_value){
		return ( in_value == undefined || in_value == null || in_value == "")
	}
}






function ui_render_drawer_listgroup( _eltID , Cfg , callBack){


	var template_drop_downn = `
		<ul class="list-group">
		    {{#option_list}}
		    	{{{section}}}
			{{/option_list}}
		</ul>
		 `;

	var sub_template_category = `			    
		<h6 class="dropdown-header" style="font-size: 2.2vh; color: blue;background-color: #fff; padding: 4px 8px 2px 8px;"> {{header}}  </h6>
		{{#option_list}}	       
			<li class="list-group-item" style="cursor:pointer; font-size: 2.0vh" data-key="{{key}}" data-label="{{label}}"> {{label}}  </li>
		{{/option_list}}`;



	var data = Cfg ;
    var transform_func = Cfg.transform;
    var filter_func = Cfg.filter;

    //Construire la liste des options
    __refresh_options(Cfg.options)

    return {
    	update_view: function(key){
    		
   			var _info = $(`${_eltID}  a[data-key="${key}"]`)[0].dataset;
   			$(`${_eltID}  a[data-key="${key}"]`).addClass("active");
    		$(`${ _eltID} > input.form-control`).val( _info.label );
    	},
    	refresh_options : function(options) {
    		__refresh_options(options)
    	}
    }

    function __refresh_options( options ){
		//filtrer la liste d'options

		var menu_data = {};
		var nested_data ;

		if (!is_missing_value( Cfg.class_field)) {
		//Un champ de classification est fourni : on procèd à une classification explicite
			nested_data = d3.nest()
								.key( function(d){ return d[Cfg.class_field] })
								.entries( options )
		
			menu_data.option_list = nested_data
			.map( 
				function (d){
				  var options = d.values
				  return ( { "section" : __render_section( options, d.key )  })
				}
			)

		} else {
			//Aucun champ de classification : alors on considère une classe virtuelle sous laquelle les toutes options seront regroupées
			menu_data.option_list = [  { "section": __render_section( options, Cfg.prompt ) } ];
		}


		var componentHtml = Mustache.render( template_drop_downn ,  menu_data );

		//console.log(componentHtml);
		//console.log(_eltID);
		d3.select(`${_eltID}`).html(componentHtml );
		bind_Selector();

	}

	function __render_section( options, group_label ) {
		var data = {};
		
		data.header = group_label
		data.option_list  =  is_function( filter_func ) ? options.filter( filter_func ) : options
		//Transformer (reformattage) de la liste d'options
		data.option_list = is_function( transform_func ) ?
			data.option_list.map( transform_func ) :
			data.option_list.map( 
				function(d){
					d.key = d[Cfg.transform.key]
					d.label = d[Cfg.transform.label]
					return (d)
				}
			) 
		return ( Mustache.render( sub_template_category ,  data ));
	}


	function bind_Selector(){

		$( `${ _eltID} li.list-group-item` ).on({

			"click": function(evt){
				var _elt = $(this),  
					_data = evt.currentTarget.dataset,
					_info = { "key": _data.key, "label": _data.label};
					//$(`${ _eltID} > input.form-control`).val(_info.label);

					$( `${ _eltID} .list-group-item.active`).removeClass("active")
					_elt.addClass("active");
					callBack( _info );
			}
		})			
	}

	function is_function(f){
	    return (Object.prototype.toString.call(f) == '[object Function]') 
	}
	function is_missing_value(in_value){
		return ( in_value == undefined || in_value == null || in_value == "")
	}
}



