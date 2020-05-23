//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function generate_legend( dom_elt, Cfg ){


	var formatNumber = d3.format('d'); 
	var cell_pos_scale = d3.scale.threshold();
	var legendSvg = d3.select( dom_elt ).append('svg') ;  
		legendSvg.attr('width', '100%').attr('height', '50');
	var ldg_Axis = d3.svg.axis();

	var rect_group = legendSvg.append('g').attr("class", "cell-rect");
	var axis_group = legendSvg.append('g').attr("class", "axis")
	var text_group = legendSvg.append('g').attr("class", "custom_label");


	//var center_dx = Cfg.width-
	text_group.attr("transform", `translate( ${ 15 + Cfg.offset.x} , ${Cfg.offset.y})`)
	rect_group.attr("transform", `translate( ${ 15 + Cfg.offset.x} , ${Cfg.offset.y})`);
	axis_group.attr("transform", `translate( ${ 15 + Cfg.offset.x} , ${Cfg.offset.y})`);

	var title_text = text_group.append("text").attr("class" , "title-label")

    build_legend_elements();


    return {
    	set_prop : function( prop_name , value ){
    		show_config("BEFORE:")
    		Cfg[ prop_name ] = value;
    		show_config("AFTER:")
    	},
    	refresh : function(){
    		build_legend_elements();
    	}
    }

    function show_config(mssg){
    	//console.log(mssg + JSON.stringify(Cfg));
    }

    function build_legend_elements(){
    	var color_list
	    Cfg.count  = Cfg.domain.length 
	    Cfg.cell.width = Math.round( Cfg.width/(Cfg.count + 1) );
		
		opera_console.addLog(  "LegendController width : " + Cfg.width + ", with " + Cfg.count + " legend classes :: " + JSON.stringify(Cfg.domain))
		cell_pos_scale
			.domain( Cfg.domain )
			.range(d3.range(0 , Cfg.width +5, Cfg.cell.width))	

		ldg_Axis 
			 .scale( cell_pos_scale )           
			 .orient("bottom")
			 .tickSize(Cfg.tickSize)
			 .tickFormat(function(d) {
				return formatNumber(d);
			});
		//end section
		if (Cfg.colorscale.start && Cfg.colorscale.end){
			Cfg._color_list = get_color_scheme( Cfg.count  , Cfg.colorscale.start, Cfg.colorscale.end)
		} else {
			Cfg._color_list = Cfg.colorscale
		}

		update_title()
		build_color_ramp( rect_group, Cfg.cell.width, Cfg._color_list, "#000")
		place_custom_label( text_group )
		update_axis()
		
    }


 	function update_axis(){
		axis_group.call( ldg_Axis )
 	}

    function update_title(){
    	title_text
	        .style( "fill", "#222")
	        .style( "font-weight", 700)
	        .style( "font-size", "1em")
	        .style( "text-anchor", "start" )
			.attr ( "x" , 0 )
	        .attr ( "y" , -12)
	        .text ( Cfg.title );
    }

	function place_custom_label( group ){
		if (Cfg.custom_label == undefined) return

		labels = group.selectAll('text.custom-label')
			.data(Cfg.custom_label );


		gene_and_style(labels);
		gene_and_style(labels.enter().append("text"));	
		labels.exit().remove();

		function gene_and_style( in_labels ){

			in_labels
			    .attr ("class", "custom-label")
		        .style( "fill", "#555")
		        .style( "font-size", "1.0em")
		        .style( "text-anchor", "middle" )
				.attr ( "x" ,  function(d,i){ return( (i + 0.5) * Cfg.cell.width ) })
		        .attr ( "y" , -3 )
		        .attr ( "transform", "rotate(" + 0 + ")")
		        .text ( function(d){ return d } );
		}
	}

	function build_color_ramp( group , dw, color  , stroke = "none"){


		rects = group.selectAll('rect')
			.data(d3.range(0, color.length ));

		gene_and_style(rects);
		gene_and_style(rects.enter().append("rect"));	
		rects.exit().remove();

		function gene_and_style( in_rect ){

			in_rect
				.attr( "x"      ,  function(d,i){ return( i * dw ) })
				.attr( "height" ,  Cfg.cell.height).attr( "width"  , dw )
				.attr( "fill"   ,  function(d,i){ return(color[i]) })
				.attr( "stroke" ,  stroke )
				.attr( "stroke-width"   , "1px" )
		}
	}	

	function get_color_scheme( count, start = "#ffffff", end = "#000000"){
	    var color = d3.scale.linear()
	    			.domain([ 0, count ])
	                .interpolate(d3.interpolateRgb)
	                .range([d3.rgb(start), d3.rgb(end)]);
	    var A = new Array( count+1 ).fill("0");
	    var B = A.map(function( c,i ){
					 //console.log( " Color element : " + i  + " " + color(i))
					 return (color(i))
				})
	    return (B)
	}

	function is_function(f){
	    return (Object.prototype.toString.call(f) == '[object Function]') 
	} 
}

