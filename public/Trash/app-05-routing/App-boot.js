	
var winResizeTimerID = 0;
var ACCEPT_MOBILE = false;
var behave_as_mobile_device_on_start_up = false;

var before_app_initialization = true;

var user_session_manager ;


// We add a listener to the browser window, calling updateLegend when the window is resized.
//window.onresize = after_window_resized ;


$( document ).ready(function() {

	user_session_manager = new user_connexion_manager_constructor()
    user_session_manager.boot_app()	
    
});



//user_session_manager.start_session();


function user_connexion_manager_constructor(){
	var loop_counter = 0 ; // Flag de détection d'une boucle infinie au niveau du processus d'initialisation
	var Infinite_loop_watchdog_max = 10 ; // Seuil de détection d'une boucle infinie au niveau du processus d'initialisation

	var session_notification_timer; // Intervalle de temps entre deux émissions successives de notification délai entre l'émission
	var admin_supervision_timer;
    var storeAgent = new _StorageManager();
    var userBadge;
    var tempUserBadge;
    var user_key;
    var supervisor_active = false

    var clientType = detect_client()

    return {
    		     boot_app : _boot_app,
    		start_session : _start_session,
    		 stop_session : _stop_session,
    	 get_online_users : _get_online_users,
    	      reset_token : _reset_storage,
    	       supervisor : _supervisor
    }

    function _boot_app(){
    	
		exec_infinite_safe( function(){
			Ajaxian.post( './visitors/boot_app', user_agent, _start_session, unexpected_Error_handler)
			loop_counter++;
		})
    }


    function _start_session( tmp_badge){
    	var byPassKey = false //EMULER LE SUCCES DE L'EXTRACTION
		tempUserBadge = tmp_badge

		if (storeAgent.existItem("opera.kassaprekoh.2020" , byPassKey)){

			user_key = storeAgent.getItem()

			opera_console.addLog( `Utilisateur ${user_key}  identifié par le Browser :` , "");
			opera_console.addLog( "Demande de vérification :" + user_key , "request");

			exec_infinite_safe(function(){	
				Ajaxian.read( `./visitors/read_visitor/${user_key}`, UserBadge_restore_Or_recreate, unexpected_Error_handler)
				loop_counter++;

			})

		} else {
			opera_console.addLog( "Visiteur Inconnu :"  , "fail");
			opera_console.addLog( "Demande d'une nouvelle clé par le client :"  , "request");

			exec_infinite_safe(function(){
				Ajaxian.post( `./visitors/new_visitor`, tempUserBadge, createUserBadge, unexpected_Error_handler)
				loop_counter++;
			})

		}
    }

//note_that_for every boot_fail call :  you must set usrBadge.abort_message


    function _supervisor(action , params){
    	
    	switch(action){
    		case "toggle" :
    			if (supervisor_active == false) {

    				start_supervision_notifier()
    				supervisor_active = true;
    				

    			} else {
    				stop_supervision_notifier()
    				supervisor_active = false;
    			}

    		break;

    		case "traffic" :
    			if ( !chartController_admin ){

    				chartController_admin = new build_traffic_chart_component(params.data)
    			} else {
    				chartController_admin.setParams(params) 
    				chartController_admin.updateChart()
    			}
    			break;
    		default:

    	}
    	return (supervisor_active)
    }
    function _get_online_users(){

    		Ajaxian.read(  `./visitors/admin`, manage_admin_infos, unexpected_Error_handler)

    }

    function _stop_session(){}

    function _reset_storage(){ 
    	opera_console.addLog( "Token removed from Local storage" , "success");
    	storeAgent.removeItem("opera.kassaprekoh.2020") 
    }

	function createUserBadge(data){
	/*=================================================================
		create badge :  a badge is a global userobject containing identification 
		and contextual data on the current user
	===================================================================*/
		opera_console.addLog( "Server Response with new Badge => " + JSON.stringify(data) , "success");
		storeAgent.setItem("opera.kassaprekoh.2020", data.uuid);
		userBadge = data ;
		userBadge.new_visitor = true;

		//Confirm that user is started and App is ready to go
		exec_infinite_safe(function(){
			Ajaxian.post( `./visitors/boot_success`, userBadge, APP_START_NOW, unexpected_Error_handler)
			loop_counter++;
		})
		

		
	}

	function APP_START_NOW( data ){
		if ( data.appIsReady) {
			app_start_up();
			start_session_notifier(data);				
		}
	}

	function UserBadge_restore_Or_recreate(data){

		 if ( data.appIsReady ){
			//If all is OK then we start the application
			opera_console.addLog( "Serveur response on Visitor Check, : restoring du badge => " + JSON.stringify(data) , "success");
			userBadge = data;
			userBadge.new_visitor = false
			userBadge._uuid = tempUserBadge._uuid

			exec_infinite_safe(function(){
				Ajaxian.post( `./visitors/boot_success`, userBadge, APP_START_NOW, unexpected_Error_handler)
				loop_counter++;
			})		
		
				
		} else {
			//User invalid KEY encountered :: we then ask a new key
			opera_console.addLog( "Visitor with invalid KEY, Requesting a new KEY :" + JSON.stringify(tempUserBadge) , "warning");

			exec_infinite_safe( function(){
				Ajaxian.post( `./visitors/new_visitor`, tempUserBadge,  createUserBadge, unexpected_Error_handler);
				loop_counter++;
			})
		}
	}

	function unexpected_Error_handler(xhr, ajaxOptions, thrownError){
	/*=================================================================
		Common Handler for error on Client Request 
	===================================================================*/

	  opera_console.addLog("HTTP//ERROR 500 :" + xhr.responseText , "fail")
	}	


	function start_session_notifier( inBadge ){
	/*=================================================================
	  the timer trigger every 2 minutes ( 30 sec for administrator ) a session 
	  alive notification to server
	===================================================================*/
	  userBadge = inBadge
	  var delay = userBadge.timers.notifyClient
		opera_console.addLog( "Démarrage du notificateur de présence: tempo =" + delay  , "request");
		session_notification_timer = setInterval( function(){
				notify_session();
		}, delay )
	}

	function start_supervision_notifier(){
	/*=================================================================
	  the supervion timer trigger every  ( 30 sec for administrator) 
	  to read the session buffer
	===================================================================*/
	var delay = userBadge.timers.adminClient
		opera_console.addLog( "Démarrage du superviseur :tempo =" + delay, "request");
		supervisor_active = true;
		admin_supervision_timer = setInterval( function(){
				notify_supervision();
		}, delay )
	}

	function stop_supervision_notifier(){
	/*=================================================================
	                 STOP the supervion timer
	===================================================================*/
		opera_console.addLog( "Arret du superviseur :"  , "warning");
		supervisor_active = false;
		clearInterval( admin_supervision_timer );
	}


	function notify_session(){
	/*=================================================================
		The Client send this request to notify that it still présente
	===================================================================*/
		opera_console.addLog( "Notify session alive:" + userBadge.uuid , "request");
		Ajaxian.read(  `./visitors/notify_alive/${userBadge.uuid}`, manage_user_infos, unexpected_Error_handler)
	}



	function notify_supervision(){
	/*=================================================================
		The Client Admin console request BUFFER state
	===================================================================*/
		opera_console.addLog( "Notify session alive:" + userBadge.uuid , "request");
		Ajaxian.read(  `./visitors/admin_query`, manage_admin_infos, unexpected_Error_handler)
	}

	function exec_infinite_safe(callBack, mssg){
		if ( loop_counter > Infinite_loop_watchdog_max ){
			opera_console.addLog( "Application stopped due to Infinite loop !!!"  , "fail");
			notify_initialization_abort("To match cycles between browser and Server");
			return
		} 
		callBack();
	}

	function manage_user_infos(data){
	/*=================================================================
			Serveur response on a  alive_sesion_notification as a way of 
			accusé de réception
	===================================================================*/
		opera_console.addLog( "Server notification feedback:" + JSON.stringify(data) , "success");
	}

	function manage_admin_infos(data){
	/*=================================================================
			Serveur response on a  alive_sesion_notification :
			if user id administrator then data represente admin 
			stats
	===================================================================*/
		opera_console.addLog( data )
		//$("#tab-e").html( Mustache.render( opera_table_template , { users: data} ))
	}
}


function force_mobile(){
	return ( behave_as_mobile_device_on_start_up == true )
}



function USER_INTERFACE_update_layout(){  
	opera_console.addLog("Windows resized");
}


//var color_helper = Chart.helpers.color




function remove_start_up_curtain(){

	$("#home-view").addClass("hidden");

	$("#start-up-failure-msgbox").html( "" );
	$("#spinner").html( ``);
	$("#spinner-message").html( ``)	;
	$("#app-footer-banner").removeClass("hidden");

}

function show_address_to_mobile_users(){
	var mssg = `<p class="align-middle text-center" > Nous avons détecté que vous utilisez un terminal mobile.<br>
    		<span style="font-weight:800; color: orange;">Atlas Santé</span> est conçu à la base pour des terminaux à large écran (Desktop/Laptop) exclusivement.
    	    <br> Cependant, vu le nombre élevé de requêtes de connexion les concernant, l'accès depuis les terminaux mobiles a été ouvert, et ce, malgré une expérience utilisateur sensiblement dégradée.
    	    En attendant la disponibilité d'une véritable version mobile, nous nous excusons auprès des utilisateurs "mobiles".
    	</p> 
    
    	<center>  <a href="#/action/address-to-mobile/close" class="btn btn-success btn-lg active" role="button" aria-pressed="true"> Cliquer pour continuer </a> </center>
    	`
	$("#id-address-to-mobile-users").removeClass("hidden")
	$("#id-address-to-mobile-users").html(mssg)

}


