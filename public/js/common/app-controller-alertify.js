//app-controller-alertify.js

function show_modal_box ( title , path ){

	d3.text( path, function(data) {
		display_data( data );
	});

	function display_data(data){
	 	alertify.alert()
	 	.setting({
	 		'startMaximized':false, 
	 		'modal': true,
	 		'resizable' : true,
	 		'padding': false,
	 		'transition': 'zoom'

	 	})
	 	.setHeader( `<em> ${ title } </em>` )
	 	.resizeTo( 650, 400)
	 	.setContent( data).show();
	}
 }

