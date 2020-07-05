//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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
}