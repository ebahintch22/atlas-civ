//app-controller-alertify.js

function show_modal(){

 	alertify.alert()
 	.setting({
 		'startMaximized':false, 
 		'modal': true,
 		'resizable' : true,
 		'padding': false,
 		'transition': 'zoom'

 	})
 	.setHeader( "<em> A propos d'Atlas Côte d'Ivoire </em>" )
 	.resizeTo( 650, 400)
 	.setContent( get_aboutPage(1)).show();

 }


 function get_aboutPage(index){
 	var html0 =  '<h1> Hello World! </h1>'
 	var html1 = `

		<div id="app-footer-banner" class="row"  style="height:100% ;width:100% ; background-color: #444; color:#aaa; font-size: 0.75vw; padding: 0.2vh 0.3vh;">

		    <div class="col-lg-2" > 
		    	<div class="d-none d-xl-block"> 
		    		<center>
			    		<span class="d-none d-lg-inline-block d-xl-none text-center"> Développé avec &nbsp </span>
			    		<span class="d-none d-xl-inline-block text-center"> Application développée avec &nbsp  </span>
			    		<img src="./images/D3_js_logo_44x40.png" class="mr-3" alt="heroku LOGO"> 
			    	    <img src="./images/node-express-js-60x40a.png" class="mr-3" alt="Node Express JS LOGO"> 
		    		</center>
		    	</div>
		    </div> 

		    <div class="col-lg-8" > 
		    	<div class="text-center" > 
					<span class="inline-block">
		    			<span style="font-weight:700; font-size: 1.0vw; color: #fff;"> <br><br><br></span>

		    	    </span>
		    	    </span>		    	
		    		<span class="d-lg-inline-block d-xl-none"> 
		    		  <span style="font-weight:700; font-size: 1.0vw; color: #fff;"> Atlas Santé CI <br></span>
		    		  Données sanitaires : RASS-2017 - MSHP/Infocentre-COVID-19 | Données spatiales: HDX/OCHA-CNTIG &nbsp|&nbsp 
		    	      Nous contacter au : <span class="font-weight-bold" style="color: orange;"> opera4gis@gmail.com </span>
		    		</span>
		    		<span class="d-none d-xl-inline-block">
		    			<span style="font-weight:700; font-size: 1.0vw; color: #fff;"> Atlas Santé Côte d'Ivoire <br></span>
		    		   Source des données sanitaires : Rapport Annuel de la Situation Sanitaire en Côte d'Ivoire (2017) - MSHP / COVID-19-Centre d'information | Sources des données spatiales: HUMANITARIAN DATA EXCHANGE / OCHA-CNTIG   &nbsp|&nbsp 
		    	       Nous contacter au : <span class="font-weight-bold" style="color: orange;"> opera4gis@gmail.com | +225 01 01 05 49 54 </span>
		    	    </span>
		         </div>
		    </div> 

		    <div class="col-lg-2" > 
		    	<div class="d-none d-xl-block"> 
		    		<center>
			    		<span class="d-none d-lg-inline-block d-xl-none text-center"> Hébergé par &nbsp </span>
			    		<span class="d-none d-xl-inline-block text-center"> Application hébergée par &nbsp  </span>
			    		<img src="./images/heroku-gray-round.png" class="mr-3" alt="heroku LOGO"> <br>
		    		</center>
		    	</div>
		    </div> 

		</div>`

			var arr = [ html0 ,html1 ]
			return (arr[index])
 }