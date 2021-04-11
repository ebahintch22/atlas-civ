//app-client-routing.js

function set_routes(){
	var routes = {
		"/action/address-to-mobile/:close" : after_user_accept_UX_degradation,
		"/action/select-palette/:color_palette" : after_colorPalette_selected,
		"/action/test-debug/:reload_chart" : histogram_draw,
		"/action/:start-server" : start_server,
		"/action/:stop-server"  : start_server,
		"/action/:connect-client" : start_server,
		"/fab-menu-action/:commandkey" : redirect_to_FABmenu_manager,
		"/action/app-settings": function(){}, 
		"/home" : function(){}
	}
	var router = Router(routes);
     	router.init();
}


function redirect_to_FABmenu_manager(commandkey){
	//send_to_twitter |select_theme|edit_data|about_app

	

	 
	switch(commandkey){

		case "edit_data": 			UTIL.notify({ text : "vous avez lancé la commande " + commandkey }); break;
		case "send_to_twitter": 	show_modal(); break;
		case "select_theme": 		show_modal(); break;
		case "about_app":  			show_modal(); break;

	}

	navigate("home");
}

function navigate(path){
	var current = window.location.href;
	windows.location.href = current.replace(/#(.*)$/, '') + '#' + path, true ;
}