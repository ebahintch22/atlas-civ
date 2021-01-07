IS_ADMIN_SESSION = false
IS_ADMIN_SESSION = IS_ADMIN_SESSION || false;

var before_app_initialization = true;   
    user_agent = new UAParser().getResult();
    user_agent.device_type = isMobileDevice() ? "mobile" : "desktop"


var ATLAS_ECO_SETTINGS = {

	map : {
		backGroungColor : '#ddddd'
	},

	tooltips : {
		show_featureset_name : false
	}
}