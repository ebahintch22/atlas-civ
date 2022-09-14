    

        opera_console = (function(){
        var _Number = new Intl.NumberFormat();
        var _date = new _create_dateFormatter();
        var _logToken , _logRenderToken, _connUserToken, _getEnvToken ;
        var _dataTableController, _userscolArray;
        var _LOG_CACHE_ARRAY = []

        return {
           _log : function(message){
                $("#opera-sys-message").html(message);
            },

            addLog : _addLog,

            updateStats : function(){
            },

            clearlog : function(){
                $("#opera-sys-message").html("");
            },

            explain : function(){
                return 'I am a simple on line console for development mode';
            },
            renderLogs : function(node_id){
                _render_logs( _LOG_CACHE_ARRAY , node_id )

            },
            startLogging : function (){

                _logToken = PUB_SUB.subscribe( "opera.logs" , 
                    function(mssgArray){
                        _LOG_CACHE_ARRAY.push(mssgArray);
                    }
                );
                _connUserToken = PUB_SUB.subscribe( "opera.users.connected" , 
                    function(data){
                        _dtable_loadUSERList(data);
                    }
                );

                _logRenderToken = PUB_SUB.subscribe( "opera.debug.load" , 
                    function(node_id){
                         _render_logs(_LOG_CACHE_ARRAY , node_id);
                    }
                );

                _getEnvToken = PUB_SUB.subscribe( "opera.debug.getenv" , 
                    function(data){
                         _render_environment_var( data );
                    }
                );

            },
            control_access : function(){

                    _accessToken = PUB_SUB.subscribe( "opera.admin.access" , 
                    function(mssgArray){
                        adminConsole_OpenView()
                    }
                )               
            },

            stopLogging : function (){

                _logToken.unsubscribe();
                _connUserToken.unsubscribe();
                _logRenderToken.unsubscribe();
            },
            
            connectedUsers : {
                openList : function(data){
                    //connectedUsers.openList
                    _dtable_loadUSERList(data);
                }
            },

            date_format : _date
        }


        function _addLog (message , result = "" ){
 
            var style = (result == "success")?
                `style = "margin-top: 15px; font-weight: bold; color: '#0ce00c';"`:
                (result == "fail")?
                `style = "margin-top: 15px; font-weight: bold; color: red;"`:
                (result == "warning")?
                `style = "margin-top: 15px; font-weight: bold; color: orange;"`:
                (result == "request")?
                `style = "margin-top: 15px; font-weight: regular; color: cyan;"` :
                `style = "margin-top: 15px; font-weight: regular; color: white;"`;

            var tmpl = `<div ${style}><span> ${ _date.date(Date.now())}  : </span><span> ${message}</span> </div>`
            $("#opera-sys-message").append(tmpl);
        }


        function _create_dateFormatter() {
            //Used for date display
            var opts = {};

            opts.weekday = "short";
               opts.year = "2-digit";
              opts.month = "2-digit";
                opts.day = "2-digit";
               opts.hour = "2-digit";
             opts.minute = "2-digit";
             opts.second = "2-digit";
         
            if(window.Intl) {
                var lang = "fr-FR";
                var formatter = new window.Intl.DateTimeFormat( lang, opts);

                return {
                    date : function (n){ return( formatter.format(n) )},
                    date_str : function(n){ return( formatter.format(new Date(n)))}
                }
  
            } else {
                return (function(n){return n});   
            }
        }


        function dateFormat(n) {
            //Used for date display
            var opts = {};

            opts.weekday = "short",
               opts.year = "2-digit",
              opts.month = "2-digit",
                opts.day = "2-digit",
               opts.hour = "2-digit",
             opts.minute = "2-digit",
             opts.second = "2-digit"
         
            if(window.Intl) {
                var lang = "fr-FR";
                var formatter = new window.Intl.DateTimeFormat( lang, opts);
                n = new Date(n);
                return formatter.format(n);
            } else {
                return n;   
            }
        }

        function date_now(){
             return( new Date()
                 .toISOString()
                 .replace(/T/, ' ')
                 .replace(/\..+/, '') )
        }

        function renderUserLoggingPage(){

            
        }

        function _dtable_loadUSERList( data ){

    
            _userscolArray = _userscolArray || generate_colArray()  

            _dataTableController = _dataTableController || 
            new ui_render_dataTable( "#dttable_usertable_container", 
                {
                    id : "dttable_usertable_object",
                    colMapArray : _userscolArray,
                    height : "50vh"
                }, 
                data,
                after_row_selected,
                after_row_unselected,
                true
            )


            if (  _dataTableController.reloadNeeded()  ){
                _dataTableController.reloadData( _userscolArray , data )
            }
            
           //--------------------------------------------------------------
            function after_row_selected(row){
                //var feature_code = row["CODE"];
                //MAP_zoom_on_feature( feature_code, 0  )
                _button_setActive( "#user-audit-delete-line" )
            };


            function after_row_unselected(row){
                //var feature_code = row["CODE"];
                //MAP_zoom_on_feature(  feature_code , -1  )
            }
            function generate_colArray(){

                var col_arr =  [

                    {"data": "last_conn_ended_at" , "title": "Dernière visite (Fin)", "render" : set_as_date },
                    {"data": "user_url", "title": "Url d'accès" },
                    {"data": "firstname", "title": "Prénoms" },
                    {"data": "lastname" , "title": "Nom" },
                    {"data": "conn_count" , "title": "Nb Visite" },
                    {"data": "ua_browser_name" , "title": "Browser (nom)" },
                    {"data": "ua_browser_version" , "title": "Browser (Ver)" },
                    {"data": "user_type", "title": "Type Utilisateur" },
                    {"data": "ua_engine_name" , "title": "Moteur rendu" },
                    {"data": "ua_engine_version" , "title": "Moteur rendu (ver)" },
                    {"data": "ua_os_name" , "title": "OS" },
                    {"data": "ua_os_version" , "title": "OS version" },
                    {"data": "ua_device_type" , "title": "Type Client" },
                    {"data": "online" , "title": "Connecté" },
                    {"data": "email" , "title": "email" },
                    {"data": "job" , "title": "Profession" },
                    {"data": "new_visitor" , "title": "Nouveau visiteur" },
                    {"data": "registered" , "title": "Enregistré" },
                    {"data": "ua_cpu_architecture" , "title": "Architect CPU" },
                    {"data": "boot_exit" , "title": "Résultat init." },
                    {"data": "boot_exit_how" , "title": "Fin (comment)" },
                    {"data": "login", "title": "Pseudo" },
                    {"data": "last_conn_started_at" , "title": "Dernière visite (début)", "render" : set_as_date },
                    {"data": "created_on" , "title": "Créé le" , "render" : set_as_date },
                    {"data": "boot_exit_why" , "title": "Fin (raison)"  }
                ]

                return(col_arr)

                function set_as_date( data, type, row ){

                    opera_console.addLog(data, "warning")
                    return ( _date.date_str(data))

                }
            }
        }
    })();

opera_console.startLogging();
opera_console.control_access();


function adminConsole_OpenView(){
    show_modal_box ( 
        "Panneau d'administration", 
        null,
        `<div id="ADMIN-TAB-WRAPPER2" style = "" style="width='100%'"> <br> Veuillez patienter... </div>`,
        function after_show(){
            create_navTabController_ADMIN();
        }
    );   
}
/*
IS_ADMIN_SESSION = IS_ADMIN_SESSION || false;
var before_app_initialization = true;   
    user_agent = new UAParser().getResult();
    user_agent.device_type = isMobileDevice() ? "mobile" : "desktop"
*/

function _render_logs(DATA_LOGS_ARR , node_id){

    var HTML_code = DATA_LOGS_ARR.reduce( render_paragraph, "")
    $(node_id).html(HTML_code)

    /********************************************************/
    function render_paragraph (accu, log_arr, index){

        const new_paraph = log_arr.reduce( render_line , "");
        return ( accu + `
            <div class="list-group">
                <li href="#" class="list-group-item">
                    <h5 class="list-group-item-heading"> Message # ${ index } </h5>
                    ${ new_paraph }
                </li>
            </div>`
         );

        function render_line( accu, mssg ){
            return ( accu + `
                <p class="list-group-item-text"> 
                    <span style="font-size: 12px;'"> <b> ${ mssg.type } : </b> </span>
                    <span style="font-size: 10px;'"> ${mssg.message} </span>  
                </p>`
            );
        }
    }
}


function _render_environment_var(data){
    $(data.node_id).html( JSON.stringify(data.data) );
}
