function create_FABMenu_controller(elt_id , options){


    var componentHtml = `
		<a href="#" class="float" id="${options.id}">
			<i class="fa ${options.main_fab.fa_icon} opera-float-main"></i>
		</a>`;


	componentHtml = componentHtml +  `
		<ul>
			${ render_fab_menuitems(options.menu_items) }
		</ul>
		`;

	d3.select(elt_id).html(componentHtml );
    //console.log( componentHtml );


	function render_fab_menuitems( item_arr){
		return( item_arr.reduce(
			function( accu, menu ){
				accu = accu + render_item(menu);
				return (accu)
			}, "")
		)
		function render_item( item ){

			var html = `
				<li>
					<a href="#/${options.url_prefix}/${item.url_params}" class="opera-menuitem">
						<i class="fa ${item.fa_icon} opera-float-minor"></i>
					</a>
					<div class="label-container">
						<span class="label-text"> ${item.menu_label} </span>
						<i class="fa fa-play label-arrow"></i>
					</div>			
				</li>` ;
			return ( html );
		}
	}
}

	/*	var options = {
			"id" : "menu-share"
			"main_fab" : {
					"fa_icon"    : "fa-plus",
					"radius"     : "40px",
				},

			"menu_items" : [
				{
					"fa_icon"    : "fa-info-circle",
					"radius"     : "40px",
					"menu_label" : "A propos d'Atlas Côte d'Ivoire.."
				},
				{
					"fa_icon"    : "fa-pencil",
					"radius"     : "40px",
					"menu_label" : "Editer les données.."
				},			
				{
					"fa_icon"    : "fa-database",
					"radius"     : "40px",
					"menu_label" : "A propos d'Atlas Côte d'Ivoire.."
				},
				{
					"fa_icon"    : "fa-twitter",
					"radius"     : "40px",
					"menu_label" : "A propos d'Atlas Côte d'Ivoire.."
				}
			]
		};*/