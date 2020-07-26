    IS_ADMIN_SESSION = true

    var opera_console = (function(){
        var _Number = new Intl.NumberFormat();
        var _date = new _create_dateFormatter();

        var _dataTableController, _userscolArray;

        return {
           _log : function(message){
                $("#opera-sys-message").html(message);
            },

            addLog : function(message , result= "" ){
 
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
            },

            updateStats : function(){
            },

            clearlog : function(){
                $("#opera-sys-message").html("");
            },

            explain : function(){
                return 'I am a simple on line console for development mode'
            },
            
            connectedUsers : {
                openList : function(data){
                    //connectedUsers.openList
                    __dtable_loadData(data);
                }
            },

            date_format : _date
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


        function __dtable_loadData( data ){

    
            _userscolArray = _userscolArray || generate_colArray()  

            _dataTableController = _dataTableController || 
            new ui_render_dataTable( "#dttable_usertable_container", 
                {
                    id : "dttable_usertable_object",
                    colMapArray : _userscolArray,
                    height : "50vh"
                }, 
                data,
                function(){ /*After ROW*/},
                function(){ /*After ROW UNSELECT*/},
                true
            )


            if (  _dataTableController.reloadNeeded()  ){
                _dataTableController.reloadData( _userscolArray , data )
            }
            
           //--------------------------------------------------------------
            function after_row_selected(row){
                //var feature_code = row["CODE"];
                //MAP_zoom_on_feature(  feature_code, 0  )
            };

            function after_row_unselected(row){
                //var feature_code = row["CODE"];
                //MAP_zoom_on_feature(  feature_code , -1  )
            }
            function generate_colArray(){

                var col_arr =  [

                    {"data": "login", "title": "Pseudo" },
                    {"data": "user_type", "title": "Type Utilisateur" },
                    {"data": "user_url", "title": "Url d'accès" },
                    {"data": "firstname", "title": "Prénoms" },
                    {"data": "lastname" , "title": "Nom" },
                    {"data": "conn_count" , "title": "Nb Visite" },
                    {"data": "created_on" , "title": "Créé le" , "render" : set_as_date },
                    {"data": "last_conn_started_at" , "title": "Dernière visite (début)", "render" : set_as_date },
                    {"data": "last_conn_ended_at" , "title": "Dernière visite (Fin)", "render" : set_as_date },
                    {"data": "ua_browser_name" , "title": "Browser (nom)" },
                    {"data": "ua_browser_version" , "title": "Browser (Ver)" },
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
                    {"data": "boot_exit_why" , "title": "Fin (raison)"  }

                ]

                return(col_arr)

                function set_as_date( data, type, row ){
                    //if (type === "display" || type === "filter" ){
                        return ( _date.date_str(data))
                    //}
                }
            }
        }

    })()


IS_ADMIN_SESSION = IS_ADMIN_SESSION || false;
var before_app_initialization = true;   
    user_agent = new UAParser().getResult();
    user_agent.device_type = isMobileDevice() ? "mobile" : "desktop"
