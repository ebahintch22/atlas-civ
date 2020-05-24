//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ui_render_navtabs ( _eltID , Cfg , callBack ){

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
	var template_nav_tabs = `
	    <div id="${Cfg.id}"  class="card">

			<div class="tab-content" id="${Cfg.id}-tabContent">
				{{#tabs}}
					<div class="tab-pane fade show {{active}}" id="{{id}}" role="tabpanel" aria-labelledby="{{id}}-tab">
						{{{html_content}}}
					</div>				
				{{/tabs}}
			</div>
			<nav>
			  <div class="nav nav-tabs" id="_nav-tab" role="tablist">
				{{#tabs}}
					<a class="nav-item nav-link {{active}} {{disable}}" id="{{id}}-tab" data-toggle="tab" data-tabname="{{name}}" data-tablabel="{{label}}"  href="#{{id}}" role="tab" 
					aria-controls="{{id}}" aria-selected="{{selected}}"> {{{label}}} </a>			
				{{/tabs}}
			  </div>
			</nav>
	    </div>
	`
	//Add helper func for mustache render for Bootstrap-wise properties
		var data = Cfg

		data.tabs = Cfg.tabs.map( function(d){
			d["active"] = (d.id == data.default)? "active" : "";
			d["selected"] = (d.id == data.default)? "true" : "false";
			d["disable"] = (d.enabled == false)? "disabled" : "";
			return (d)
		});

	var componentHtml = Mustache.render( template_nav_tabs,  data );
	d3.select(`${_eltID}`).html(componentHtml );
	bind_Selector();

    return {
    	api_func : function(theme){}
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
}