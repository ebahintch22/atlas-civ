
IS_ADMIN_SESSION = IS_ADMIN_SESSION || false;
var before_app_initialization = true;	
    user_agent = new UAParser().getResult();
	user_agent.device_type = isMobileDevice() ? "mobile" : "desktop"
