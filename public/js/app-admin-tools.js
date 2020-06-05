    IS_ADMIN_SESSION = true

    var opera_console = (function(){
        var _Number = new Intl.NumberFormat();
        var _date = new _create_dateFormatter()
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

            date_format : _date
        }


        function _create_dateFormatter() {
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

    })()