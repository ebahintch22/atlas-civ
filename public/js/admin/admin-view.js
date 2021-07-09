//admin-view.js


function create_navTabController_ADMIN(){

	navAdminController = new ui_render_navtabs(

	"#ADMIN-TAB-WRAPPER2", {
	id : "admin-tabs",
	default : "admin-tab-00",
	nav_position : "top" ,  
	color_theme  : "light",
		tabs : [
			{
				id : "admin-tab-00",
				name : "welcome_pane",
				label : "Accueil",
				html_content : ` 
				     <div id="welcome_pane"  style="margin:10px; padding: 10px;"> Bienvenue à l'outil de gestion du contenu de l'Atlas Santé <br>
				             <div id="environment-var-box"></div>
				     </div>` ,
				enabled : true,
				visible : true
			}, 
			{
				id : "admin-tab-01",
				name : "connected_users",
				label : "Utilisateurs connectés",
				html_content : ` <div id="dttable_usertable_container"  style="margin:10px; padding: 10px;">  </div>` ,
				enabled : true,
				visible : true
			}, 
			{
				id : "admin-tab-02",
				name : "attendance_chart",
				label : "Historique des connexions",
				html_content : `${include_button("btn-traffic-monitoring" , "Démarrer", "func_start_traffic_monitoring" )}
								${get_chart_container( "chart-canvas-traffic" , 600, 250 ,'90%', '25vh')}` ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			},

			{ 
				id: "admin-tab-04", 
				name: "debugger" , 
				label : "Debug tracing", 
				html_content : add_scrolling_wrapper( `<div id="debugger"  style="margin:10px; padding: 10px;"> Chargement du traceur de commande... </div>`) ,
				enabled : true,
				visible : IS_ADMIN_SESSION
			}
		]
	},

		function(info){	

			/* ACTION TO TRIGGER WHEN TABS CHANGED*/
			switch (info.tabname) {
				case "connected_users" :

					Ajaxian.post( "./visitors/connected", 
					    {
					    	key: "ABSCFDBYHDGGEGGG8587-855455-SGWX"
					    },
						function(data){

								//opera_console.connectedUsers.openList(data);
								PUB_SUB.publish( "opera.users.connected" , data	)							
						},
						function(xhr, ajaxOptions, thrownError){
							PUB_SUB.publish("opera.logs", 
								[
										{  message : `Erreur lors du chargement de la table` , type: "fail" }
								]
							)
						}
					);
					break;
					 
				case "debugger":
					PUB_SUB.publish( "opera.debug.load" , "#debugger"	); break;



				case "welcome_pane":
					
					Ajaxian.post( "./auth/getenv", 
					    {
					    	key: "ABSCFDBYHDGGEGGG8587-855455-SGWX"
					    },
						function(data){
							PUB_SUB.publish( "opera.debug.getenv" , 
								{ 
									"node_id" : "#environment-var-box",
									   "data" : data
								}	
							);						
						},

						function(xhr, ajaxOptions, thrownError){
							PUB_SUB.publish( "opera.debug.getenv" , 
								{ 
									"node_id" : "#environment-var-box",
									   "data" : xhr
								}	
							);	
						}
					);	break;				
			}
		},

		function on_navtabs_load(){
			// Init data load
		}
  )
}
