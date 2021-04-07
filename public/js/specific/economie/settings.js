IS_ADMIN_SESSION = false
IS_ADMIN_SESSION = IS_ADMIN_SESSION || false;

var before_app_initialization = true;   

user_agent = new UAParser().getResult();
user_agent.device_type = isMobileDevice() ? "mobile" : "desktop"


var APP_REGISTRY = {}
APP_REGISTRY.modules = {

	list : [ "ECOFIN" ],
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
	ui_interface : {
		"covid-tabs" : false,
		"standard-tabs" : true,
		"map-view" : true
	}
} 

