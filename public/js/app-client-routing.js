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
	switch (commandkey) {

		case "edit_data" : 			
			show_modal_box (  
				" Gestionnaire de contenu - (fonctionnalités à venir)",
				"./html_template/common/upcoming_feature_edit.html" 
			); break;


		case "print_report" : 
			show_modal_box ( 
				" Gestionnaire d'impression - (fonctionnalités à venir)",
				"./html_template/common/upcoming_feature_print.html"
			); break;


		case "select_theme" : 
			 break;


		case "about_app" :  		
			show_modal_box ( 
				"A propos de l'Atlas Côte d'Ivoire", 
				"./html_template/common/about_atlas_civ.html"
			); break;

		case "show_drawer_panel" :  
			//alert("You toggle drawer menu");
			drawerMenuController.toggle_menu(); 
			break;

		case "show_full_screen" :  
			//alert("You toggle drawer menu");
			UTIL.go_fullScreen(false); 
			break;		

		case "load_config_panel" :
			//Chargement de la fenêtre d'administration
		    show_password_box( "./auth/atlas-admin", 
			  	function SUCCESS(data){
			  		if (data.success){
			  			//alertify.message( "Athentification réussie !")
			            PUB_SUB.publish("opera.admin.access", null

			            )
			  		} else {
			  			alertify.message( "Echec de d'authentification. Opération abandonnée !")
			  		}
			    }, 
			   function FAIL(xhr){
			  	 	alertify.message( JSON.stringify(xhr));
			   }
			); break;	
	}

	navigate("home");
}

function navigate(path){
	var current = window.location.href;
	windows.location.href = current.replace(/#(.*)$/, '') + '#' + path, true ;
}