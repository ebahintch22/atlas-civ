IS_ADMIN_SESSION = false
IS_ADMIN_SESSION = IS_ADMIN_SESSION || false;

var before_app_initialization = true;   
    user_agent = new UAParser().getResult();
    user_agent.device_type = isMobileDevice() ? "mobile" : "desktop"

user_agent = new UAParser().getResult();
user_agent.device_type = isMobileDevice() ? "mobile" : "desktop"

var APP_REGISTRY = {}


APP_REGISTRY.ui_badge = [
		{ width: 4 , elt_id: "card-1"},
		{ width: 4 , elt_id: "card-2"}
	];

APP_REGISTRY.ui_interface = {
		"covid-tabs" : false,
		"standard-tabs" : true,
		"map-view" : true
};

APP_REGISTRY.modules = {

	list : [ "COVID", "SANTE" ],
	module_def : {

		"COVID" : {
			map : {
				backGroungColor : '#ddddd'
			},
			tooltips : {
				show_featureset_name : false
			}	
		},
		"SANTE" : {
			map : {
				backGroungColor : '#ddddd'
			},
			tooltips : {
				show_featureset_name : false
			}
		}
	},
	ui_badge : [
		{ width: 4 , elt_id: "card-1"},
		{ width: 4 , elt_id: "card-2"}
	],
	ui_interface : {
		"covid-tabs" : false,
		"standard-tabs" : true,
		"map-view" : true
	},

	ui_FabMenu :  {

		"id" : "menu-share",
		"url_prefix" : "fab-menu-action",
		"main_fab" : {
				"fa_icon"    : "fa-plus",
				"radius"     : "40px",
			},

		"menu_items" : [
			{
				"fa_icon"    : "fa-info-circle",
				"radius"     : "40px",
				"menu_label" : "A propos d'Atlas Côte d'Ivoire..",
				"url_params" : "about_app"
			},
			{
				"fa_icon"    : "fa-pencil",
				"radius"     : "40px",
				"menu_label" : "Editer les données..",
				"url_params" : "edit_data"
			},			
			{
				"fa_icon"    : "fa-database",
				"radius"     : "40px",
				"menu_label" : "Sélectionner un thème..",
				"url_params" : "select_theme"
			},
			{
				"fa_icon"    : "fa-twitter",
				"radius"     : "40px",
				"menu_label" : "Envoyer sur Twitter..",
				"url_params" : "send_to_twitter"
			},
			{
				"fa_icon"    : "fa-bars",
				"radius"     : "40px",
				"menu_label" : "Afficher le panneau latéral..",
				"url_params" : "send_to_twitter"
			}
		]
	},

	ui_drawerMenu : {

      "id" : "tag-menu",
      "toggler" : {
          "fa_icon"    : "fa-bars",
          "radius"     : "40px",
        },

      "menu_items" : [
        {
          "fa_icon"    : "fa-database",
          "radius"     : "40px",
          "menu_label" : "Catalogue",
          "is_developpable" : true,
          "container_ref" : "opera-theme-selector-drawer"
        },
      
        {
          "fa_icon"    : "fa-filter",
          "radius"     : "40px",
          "menu_label" : "Variable à cartographier",
          "is_developpable"	: true,
          "container_ref"	: "opera-variablekey-selector-in-drawer"

        },

        {
          "fa_icon"    : "fa fa-globe",
          "radius"     : "40px",
          "menu_label" : "Niveau spatial",
          "is_developpable"	: true,
          "container_ref"	: "opera-spatiallayer-drawer"
        },

        {
          "fa_icon"    : "fa-linkedin",
          "radius"     : "40px",
          "menu_label" : "LinkedIn"
        },
        {
          "fa_icon"    : "fa-pinterest",
          "radius"     : "40px",
          "menu_label" : "Pinterest"
        }
      ]
    }
} 

//send_to_twitter |select_theme|edit_data|about_app