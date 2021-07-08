//app-controller-alertify.js

function show_modal_box ( title , path , htmlCode, callBack){
	/*
		The box content is built from file content (path) or Html fragment (htmlCode)
		If the callBack is provided then it will be executed on dialog load
	*/
  if ( path){
	d3.text( path, function(data) {
		display_data( data );
	});

  } else {
  	 var data = htmlCode 
  	 display_data( data );
  }


	function display_data(data){
	 	alertify.alert()
	 	.setting({
	 		'startMaximized':false, 
	 		'modal': true,
	 		'resizable' : true,
	 		'padding': false,
	 		'transition': 'zoom',
	 		'onshow' : function(){ setTimeout( callBack , 2000)}
	 	})
	 	.setHeader( `<em> ${ title } </em>` )
	 	.resizeTo( 650, 400)
	 	.setContent( data).show();
	}
 }






// Gestionnaire d'Authentification 
function show_password_box( Url, callBackSuccess, callBackFailure){

	var form_elt = $(`<form id="loginForm">
		    <fieldset>
		        <label> Username </label>
		        <input type="text" name="username" value="atlas-admin"/> 

		        <label> Password </label>
		        <input type="password" name="password" value="xyz"/> 

		        <input type="submit" name="submit" value="Login"/>
		    </fieldset>
		</form>`)[0];


	alertify.genericDialog || alertify.dialog('genericDialog', function(){
		const that = this
	    return {

	        main: function(content){
	            this.setContent(content);
	        },

	        setup:function(){
	            return {
	                focus:{
	                    element:function(){
	                        return this.elements.body.querySelector(this.get('selector'));
	                    },
	                    select:true
	                },
	                options:{
	                    basic:true,
	                    maximizable:false,
	                    resizable:false,
	                    padding:false,
	                    onshow : function(){
		                    let form  = document.getElementById('loginForm');
		                    let submitElt = form.elements['submit'] ;
							form.addEventListener('submit', (event) => {
							
							    event.preventDefault();
							    const info = form.elements['password'].value;
							    submitElt.value = "Vérification en cours....";
							    Ajaxian.post( 
							    	Url, 
							    	{info}, 
							    	AFTER_SUCCESS_func, 
							    	AFTER_FAILURE_func   
							    );
							    
							});

							function AFTER_SUCCESS_func(data){
								submitElt.value = "Connecté" ; 
								setTimeout( function(){
									alertify.genericDialog().close(); 
									callBackSuccess(data)
								}, 2000 )
							}

							function AFTER_FAILURE_func(xhr){
								submitElt.value = "Demandé rejetée" ; 
								setTimeout( function(){
									alertify.genericDialog().close(); 
									callBackFailure(data)
								}, 2000 )								
							}
	                    }
	                }
	            };
	        },
	        settings:{
	            selector:undefined
	        }
		};
	});
	//force focusing password box
	alertify.genericDialog ( form_elt )
		.set('selector', 'input[type="password"]')
		.set("maximizable" , true);
}