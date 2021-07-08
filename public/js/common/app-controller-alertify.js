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
	 		'maximizable' : true,
	 		'padding': false,
	 		'transition': 'zoom',
	 		'onshow' : function(){ setTimeout( callBack , 2000)}
	 	})
	 	.setHeader( `<em> ${ title } </em>` )
	 	.resizeTo( 650, 400)
	 	.setContent( data).show();
	}
}