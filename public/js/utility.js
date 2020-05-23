
    // "./data/covid-data.json"
    var opera_console = (function(){
        var _Number = new Intl.NumberFormat();
        return {
           _log : function(message){
                $("#opera-sys-message").html(message);
            },
            addLog : function(message){
                var tmpl = `<div><span> ${dateFormat(Date.now())} : </span><span> ${message}</span> </div>`
                $("#opera-sys-message").append(tmpl);
            },
            explain : function(){
                return 'I am a simple on line console for development mode'
            }
        }



    function dateFormat(n) {
        //Used for date display
        var opts = {};
        opts.day = "numeric";
        opts.weekday = "long";
        opts.year = "numeric";
        opts.month = "long";
     
        if(window.Intl) {
            var lang = "fr-FR";
            var formatter = new window.Intl.DateTimeFormat(lang);
            n = new Date(n);
            return formatter.format(n);
        } else {
            return n;   
        }
    }


    })()


	// "./data/covid-data.json"
    var UTIL = (function(){
        var _Number = new Intl.NumberFormat();
        return {
            format_number : function(nombre){
                return( _Number.format(nombre))
            },
            format_number_in_object : function(obj){
                var f_obj = {}
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        if( property.indexOf("FLD", 0)==0) {
                            f_obj[property] = _Number.format( obj[property])
                        } else {
                            f_obj[property] =  obj[property]
                        }
                    }
                }   
                return(f_obj)
            }

        }
    })()




	var parseTime, timeParse;
	set_time_config();

	function fileLoad_JSON( name, path, callBack){
	    d3.json( path , function(error, data) {

	        data.sort(function(a, b) {
	            return parseTime(a.date) - parseTime(b.date);
	        });                 
	        data.forEach(function(d) {

                    d.date_raw = d.date;
                        d.date = parseTime(d.date);
	                d.new_case = +d.new_case;
	              d.new_healed = +d.new_healed;
	            d.new_deceased = +d.new_deceased;
	                d.sum_case = +d.sum_case;
	              d.sum_healed = +d.sum_healed;
	            d.sum_deceased = +d.sum_deceased;
	             d.active_case = + d.sum_case - d.sum_healed - d.sum_deceased;
                   d.nb_sample = +d.nb_sample;
                  d.sum_sample = +d.sum_sample;
                   d.incidence = +d.incidence * 100;
	            
	        });
            //console.log(data)
	        callBack(data);
	        return data;          
	    })
	}


    function fileLoad_CSV( name, path, onSuccessCallBack, onFailCallBack){

		d3.csv( path, function(d){
			return {
				  CODE : d.CODE,
			  ADM_NAME : d.ADM_NAME,
				GEOLOC : d.GEOLOC,
				 LEVEL : d.LEVEL,
				  FLD1 : +d.FLD1,
				  FLD2 : +d.FLD2,
				  FLD3 : +d.FLD3,
			   	  FLD4 : +d.FLD4,
				  FLD5 : +d.FLD5,
				  FLD6 : +d.FLD6,
				  FLD7 : +d.FLD7,
				  FLD8 : +d.FLD8,
				  FLD9 : +d.FLD9,
				 FLD10 : +d.FLD10,
				 FLD11 : +d.FLD11,
				 FLD12 : +d.FLD12
			}

		}, function( error , data){
			if (error){
				console.log("erreur rencontrées")
				onFailCallBack(error);
			} else {
				console.log("chargement réussie")
				onSuccessCallBack(data);
			}
		});
    }

	function format_statistic_tables(data){

		var tmp_data = d3.nest().key(function(d) { return d.LEVEL; }).rollup(function(d) { return d; }).map(data);
		var data_keyVal_region = tmp_data.REGION;
		var data_keyVal_district = tmp_data.DISTRICT;

		table_region = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map(tmp_data.REGION);
		table_district = d3.nest().key(function(d) { return d.CODE; }).rollup(function(d) { return d[0]; }).map(tmp_data.DISTRICT);
		//sysecho("table_region", table_region);
		//sysecho("table_didtrict", table_district);
		return { 
			"district": table_district, 
			"region": table_region,
			"region_raw" : tmp_data.REGION,
			"district_raw" : tmp_data.DISTRICT
		};
	}

	function set_time_config(){
	    dateFormat = d3.time.format("%d/%m/%Y");//   d3.timeFormat("%d/%m/%Y");
	     parseTime = dateFormat.parse ;//  timeParse("%d/%m/%Y");


	}




//Javascript :: Module utilitaire

function tooltip_getPointSet( w=120,h=80, dw=5,dh=10){
	/* fonction dimensionne l'objet tooltips en fonction des paramètres
		retourne un objet litéral dont les proriétés sont des chaines de caractères
		indiquant le path des composants SVG du tooltips */
    w1 = Math.trunc(w/2)-dw; 
	return {
		ttip_pts :`0,0 0,${h} ${w1},${h} ${w1+dw},${h+dh} ${w1+2*dw},${h} ${w},${h} ${w},0 0,0`,
		ttip_translate : `translate(-${w1+dw},-${h+dh+5})`,
		txt_translate : `translate(-${w1+dw-10},-${h+dh-10})`,
		tleBox_pts : `0,0 0,17 ${w-6},17 ${w-6},0 0,0`,
		tleBox_translate : `translate(-${w1+dw-3},-${h+dh+3})`
	}
}
//${}

/* Gestion du Tooltips ************************************************
Dans le précédent tutoriel il est impossible que la souris passe sur le tooltip 
sinon l'évènement d'écoute mousemove est perdu puisqu'il est posé sur le SVG et que
le DIV de notre tooltip a pour parent le body de la page. Cette contrainte nous a obligé
a toujours décalé le tooltip par rapport à la souris. Ce n'est pas le cas dans ce
tutoriel ou la souris peut passer sur le tooltip sans que cela ne gêne le mécanisme 
d'écoute. Par contre nous avons dû créer ce tooltip entièrement en SVG pour l'ajouter 
à notre SVG. Notez que nous avons été particulièrement vigilants au style utilisé en 
choisissant police, couleur et transparence pour obtenir quelque chose de propre.
Création d'un groupe qui contiendra tout le tooltip plus le cercle de suivi*/
function addTooltip(root_svg, w=120,h=80, dw=5,dh=10){

    var tooltip = root_svg.append("g")
        .attr("id", "tooltip")
        .style("display", "none");
    
    /* Le cercle extérieur bleu clair*/
    tooltip.append("circle")
        .attr("fill", "#CCE5F6")
        .attr("r", 10);

    /*Le cercle intérieur bleu foncé*/
    tooltip.append("circle")
        .attr("fill", "#3498db")
        .attr("stroke", "#fff")
        .attr("stroke-width", "1.5px")
        .attr("r", 4);
    
    /* Le tooltip en lui-même avec sa pointe vers le bas. Il faut le dimensionner en fonction du contenu
    tooltip_getPointSet (width, height, arrow width, arrow height) calcul les coordonnées
    des points constitutifs et les paramètres de translation */
    var ttip_params = tooltip_getPointSet(w,h,dw,dh); 
    tooltip.append("polyline")
        .attr("points",ttip_params.ttip_pts)
        .style("fill", "#fafafa")
        .style("stroke","#3498db")
        .style("opacity","0.9")
        .style("stroke-width","1")
        .attr("transform",ttip_params.ttip_translate)

    tooltip.append("polyline")
        .attr("points",ttip_params.tleBox_pts)
        .style("fill", "#a8ddb5")
        .style("stroke","#3498db")
        .style("opacity","0.9")
        .style("stroke-width","0")
        .attr("transform",ttip_params.tleBox_translate)

    /* Cet élément contiendra tout notre texte*/
    var text = tooltip.append("text")
        .style("font-size", "11px")
        .style("font-family", "Segoe UI")
        .style("color", "#333333")
        .style("fill", "#333333")
        .attr("transform", ttip_params.txt_translate);
    
    /* Element pour la date avec positionnement spécifique*/
    text.append("tspan")
        .attr("dx", "-5")
        .attr("id", "tooltip-date")
        .style("font-weight", "bold");
    
    /* Positionnement spécifique pour le petit rond bleu*/
    text.append("tspan")
        .style("fill", "#3498db")
        .attr("x", "0")
        .attr("dy", "15")
        .text("●");
    /* Le texte "Poids : */
    text.append("tspan")
        .attr("dx", "5")
        .text("Nb total de cas: ");
    /* Le texte pour la valeur du poids à la date sélectionnée*/
    text.append("tspan")
        .attr("id", "tooltip-close")
        .style("font-weight", "bold");


    /* Le texte "dt cardio : "*/
    text.append("tspan")
        .style("fill", "#3498db")
        .attr("x", "0")
        .attr("dy", "15")
        .text("●");
    text.append("tspan")
        .attr("dx", "5")
        .text("Nvx décès: ");
    text.append("tspan")
        .attr("id", "tooltip-duration")
        .style("font-weight", "bold");

    /* Le texte "Distance : "*/
    text.append("tspan")
        .style("fill", "#3498db")
        .attr("x", "0")
        .attr("dy", "15")
        .text("●");
    text.append("tspan")
        .attr("dx", "5")
        .text("Nb total de décès: ");
    text.append("tspan")
        .attr("id", "tooltip-distance")
        .style("font-weight", "bold");

    /* Le texte "Energie dépensée : "*/
    text.append("tspan")
        .style("fill", "#3498db")
        .attr("x", "0")
        .attr("dy", "15")
        .text("●");
    text.append("tspan")
        .attr("dx", "5")
        .text("Total de guéris: ");
    text.append("tspan")
        .attr("id", "tooltip-energy")
        .style("font-weight", "bold"); /*Le texte pour la durée de la séance de cardio*/

    return tooltip;
}


function sysecho(the_title, the_value){
	if (typeof  the_value === "object" ){
			the_value = JSON.stringify(the_value);
	} 
	console.log (the_title + ":" + the_value);
}

/* L'avantage du polyline pour le rectangle c'est que la bordure associée est propre au 
niveau du triangle. Nous aurions pu dessiner un rectangle plus un triangle mais il y 
aurait eu un morceau de bordure au-dessus du triangle. Ce tooltip est placé dans un
 groupe ce qui rendra facile son positionnement par la suite. Deux IDs ont été défini, 
 tooltip-date et tooltip-close pour mettre à jour la date et le cours de l'or en 
 fonction de la position de la souris.*/

$('#mySelect').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
	let currentValue = $('#mySelect').selectpicker('val');

	VAR_DESC = APP_CONF.vars[clickedIndex-1];
	VAR_NAME = VAR_DESC.name;
   console.log(`
   	Index: ${clickedIndex} , 
   	State: ${isSelected}, 
   	Current value: ${currentValue}, 
    Varname: ${VAR_NAME},
  	Previous value: ${!(previousValue)? "(vide)" : previousValue}
   	`
   	);
   grahicChart.setVariable(VAR_DESC);
});

