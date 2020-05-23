//Load the array of script define at the beginning of index.html
if (http_server_exe_mode == false) {

	for( i=0 ; i< script_array.length; i++){
		var script = document.createElement("script");
		script.type = "text/jacascript";
		script.src = script_array[i].src;
		document.body.appendChild(script);
	}
}