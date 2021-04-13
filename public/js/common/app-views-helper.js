
init_helper_functions()

function get_chart_container( canvas_id, width, height, x_width, x_height, addSpinner=false ){
/*
	14/08/20 : added spinner curtain template
*/
	var spinner_subTemplate = `			
			<div id="${canvas_id}-spinner" class="opera-loading"   
					style="position: absolute; padding-top:10%; top:0px; left:0px ; width:100%; height: 100%; background-color: #fff;opacity:0.65;" >
				<div class="text-center">
				  <div class="spinner-border" role="status">
				    <span class="sr-only"> Loading... </span>
				  </div>
				</div>
			</div>`;

	var template = 	`

		<div class="chart-container" style="position: relative; width: ${x_width} ; height: ${x_height}; ">
			<canvas id="${canvas_id}" width="${width}" height="${height}"> 	</canvas>
			${ addSpinner ? spinner_subTemplate : ""}
		</div>`
	return template ;
}


function get_chart_container_augmented( canvas_id, width, height, x_width, x_height, addSpinner=false ){
/*
	::: 14/08/20 : added spinner curtain template
*/
	var spinner_subTemplate = `	

			<div id="${canvas_id}-spinner" class="opera-loading"   
					style="position: absolute; padding-top:10%; top:0px; left:0px ; 
					width:100%; height: 100%; background-color: #fff;opacity:0.65;" >
				<div class="text-center">
				  <div class="spinner-border" role="status">
				    <span class="sr-only">Loading...</span>
				  </div>
				</div>
			</div>
		`;

	var template = 	`

		<div class="chart-container-wrapper" >
			
 

			
			<div class="chart-container" style="position: relative; width: ${x_width} ; height: ${x_height}; top:1px; background-color: #aaa; ">
				
				<div class="graph-slider-container" ></div> 
				<div id="${canvas_id}-ruler" class="graph-slider" ></div>
				<canvas id="${canvas_id}" width="${width}" height="${height}"> 	</canvas>
				${ addSpinner ? spinner_subTemplate : ""}
			</div>
		</div>`
	return template ;
}

function include_badge_container(data_arr){
	/*Insert additionnal container in the header to hold carousel content. The format is as follow :
		<div class="col-lg-3 no-padding" id="card-1"></div>
		<div class="col-lg-5 no-padding" id="card-2"></div>
	*/
	var html_code = create_badge_containers(data_arr) ;
	$("#atlas-app-header-bar").append( html_code );

	function create_badge_containers( data_arr ){
		return (data_arr.reduce(function( accu , data ){
			return ( accu + ` <div class="col-lg-${data.width} no-padding" id="${data.elt_id}"></div> `)
				}, "")
		)
	}
}




function init_helper_functions(){

	include_button_input = function(eltID , btnCaption , placeHolder, callBackFuncname){
		return(
			`
			<nav class="navbar navbar-light bg-light">
			  <form id="${eltID}" class="form-inline" onSubmit="${callBackFuncname}(this , '${eltID}')">
			    	<input class="form-control mr-sm-2" type="search" placeholder="${placeHolder}" aria-label="Search">
			    	<button class="btn btn-outline-success my-2 my-sm-0" type="submit">${btnCaption}</button>
			  </form>
			</nav>
			`
		)
	};

	include_button = function(eltID , btnCaption, callBackFuncname ){
		return(
			`
			<nav class="navbar navbar-light bg-light">
			  <form id="${eltID}" class="form-inline" onSubmit="${callBackFuncname}(this , '${eltID}')">
			    	<button class="btn btn-outline-success my-2 my-sm-0" type="submit">${btnCaption}</button>
			  </form>
			</nav>
			`
		)
	};

	include_button_group = function( button_arr  ){
		
			var TMPLT = `
				<div id="{{group_id}}" class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"  
				    style="padding: 5px 20px;">
				 	<div class="btn-group btn-group-sm mr-2" role="group" aria-label="First group">
				 	{{#button_list}}
					    <button  id="{{id}}" type="button" class="btn btn-secondary"  onClick="{{callBack}}(this, '{{id}}')"> {{{caption}}} </button>
					 {{/button_list}}
				 	</div>
				</div>
			`
			  return ( Mustache.render(TMPLT , button_arr ))
		
	};



	upcoming_function = function (dataset){
		var html = Mustache.render( 
			`<center>
		       <span style="position:relative; top: 150px; font-size: 20px; color:#999">  
		          <i class="fa {{fa_icon}} fa-5x"  style= "color:#ccc" ></i>
		          <h3> {{messageTitle}}</h3>
		          <h4> {{{messageContent}}}</h4>
		      </span>         
	    	</center> `, 
	    	dataset)
		
	    return html	
	 };

	 include_supervision_table = function(){

	 	return( `
			<div  style="padding: 10px 20px 0px 20px; position: relative; height:80vh; width:90%;background-color: #ddd"> 
				<!--div style="position: absolute; top:0px;height:10vh; width:90%;background-color: #eee;">
				</div-->

				<div style="position:relative; height:35vh; width:90%;margin-top:2vh;overflow:scroll; ">
					<table class="table table-sm">
						<thead>
						    <tr>
						      <th scope="col"> UUID  </th> 
						      <th scope="col"> Démarré à </th> 
						      <th scope="col"> Dernière notif   </th> 
						      <th scope="col"> Requête </th>
						      <th scope="col"> Réponse </th>
						      <th scope="col"> observation </th>
						    </tr>
						</thead>
						<tbody>
							{{#users}}
							    <tr>
							      	<th>  {{uuid}}   </th> 
							      	<td>  {{start_at}} </td>  
							      	<td>  {{when}} </td>  
							      	<td>  {{req}} </td>  
							      	<td>  {{res}} </td>
							      	<td>  {{comments}} </td>
							    </tr>
							{{/users}}   
						  </tbody>
					</table>
				</div>
			</div>`)
	 }


	 // Template to generate the monography //VIEW

     get_table_container  = function(){

      	return  `
      	<div id="table-view-container" style= "position: relative; height:80vh;"> 
            <div id="tableview-wrapper" class="enveloppe">
                <table class="table table-bordered display compact" id="data_table_id" width="100%" cellspacing="0" 
                        style=" white-space: nowrap ;background-color: #ccc;color:#444; width:100%;font-size: 8pt; 
                        font-family:Verdana">
                    <thead> </thead>
                    <tfoot> </tfoot>
                </table>
                <br>
            </div>
		 </div>  ` 
    }

    get_color_ramp_html = function( color_arr ){
    	
    	var TMPLT =  `
    		<div  style= "margin: 20px 0px 0px 40px;position:relative; width:400px; height:300px; overflow-y: scroll;font-size: 10px;">
    			{{#colors}}
    				<div style="display: inline-block; position:relative; border: 1px solid #000 ;margin:5px; width:100px; height:40px; background-color:{{value}};" > {{key}} </div>
    			{{/colors}}
    		</div> 	`
		
		return ( Mustache.render( TMPLT , color_arr ))

    }

	 fa_icon = function(ico_name){
	 	return ( ` <i class="fa fa-${ico_name}" aria-hidden="true"></i> `)
	 }
	 
	 ui_spinner_create = function ( EltID) {
			var _spinner = Spinners.create('.covid-chart-spinner', {
				  radius: 22,
				  dashes: 30,
				  width: 2.5,
				  height: 10,
				  opacity: 1,
				  padding: 3,
				  rotation: 600,
				  color: '#aaaaaa'
			}).play();

			_spinner.center();
			return(_spinner)
	}




/*

	 canvas_spinner = function( canvasID ){

		var canvas = document.getElementById( canvasID ),
		    dw = canvas.width , dh = canvas.height ,
		    ctx = canvas.getContext('2d'),  opacity;

		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.translate(dh/2, dh/2);
		ctx.rotate(Math.PI * 360/360);
		ctx.lineWidth = Math.ceil(dh / 50);
		ctx.lineCap = 'square';

		for (var i=0; i<=360; i++) {
		    ctx.save();
		    
		    ctx.rotate((Math.PI * i/180));
		    
		    ctx.beginPath();
		    ctx.moveTo(0, 0);
		    opacity = (360 - (i * 0.95)) / 360;
		    ctx.strokeStyle = 'rgba(255,255,255,' + opacity.toFixed(2) +')'; 
		    ctx.lineTo(0, dh + 30);
		    ctx.stroke();
		    ctx.closePath();
		    
		    ctx.restore();
		}

		ctx.globalCompositeOperation ='source-out';
		ctx.beginPath();
		ctx.arc(0, 0, dh/2, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();

		ctx.globalCompositeOperation ='destination-out';
		ctx.beginPath();
		ctx.arc(0, 0, (dh/2) * .9, 2 * Math.PI, false); 
		ctx.fill();
	}*/
}