
		      
BarChart = function(selector){
	var html_container = selector;

	var context = {	svg_created : false }
	var xAxis, yAxis;
	var svg, margin, marginOverview , selectorHeight,  
	    width, height, heightOverview, barWidth ,
	    numBars , isScrollDisplayed , delta_x ,delta_y;	

		svg_container_create();
		calc_dimension_settings();
		svg_setviewport();	    

		return {

			     setData : _setData,
			 useFieldset : _useFieldset


		}

		function _setData( data ){
			 
			 context.data = data;
			 empty_chart();

		}

		function _useFieldset( label_field, value_field ){
			 
			 context.value_field = value_field;
			 context.label_field = label_field;
			 on_data_key_selected(false);
		}


		function on_data_key_selected( ){
				  
		  	var value_field = context.value_field, 
		  	    label_field = context.label_field;
		  	    data = context.data 

		  	    data.sort(function(a,b){ return (+b[value_field] - a[value_field])});
		  	
			empty_chart();	 
			
			display_params()
			scales = update_scales()
			create_axis(scales)


			  

			context.axis = {	xAxis : xAxis,	yAxis : yAxis  };
			  
			var diagram = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					diagram.append("g").attr("class", "x axis").attr("transform", "translate(" + delta_x + ", " + (height - delta_y)   + ")").call(xAxis);
			        incliner_label(diagram.selectAll("text"));

					diagram.append("g").attr("class", "y axis").attr("transform", "translate( " + delta_x + ", " + 0 + ")").call(yAxis);
			  
			var bars = diagram.append("g");
		 
			  
				bars.selectAll("rect")
		            .data(data.slice(0, numBars), function (d) {return d[label_field]; })
		            .enter().append("rect")
		            .attr("class", "bar")
		            .attr("x", function (d) { return delta_x + scales.x(d[label_field]); })
		            .attr("y", function (d) { return scales.y(d[value_field]); })
		            .attr("width", scales.x.rangeBand())
		            .attr("height", function (d) { return (height - scales.y(d[value_field]) - delta_y); });


			isScrollDisplayed = barWidth * context.data.length > width;

			if ( isScrollDisplayed ){

				  var xOverview = d3.scale.ordinal()
		                  .domain(data.map(function (d) { return d[label_field]; }))
		                  .rangeBands([0, width], .2);

				  yOverview = d3.scale.linear().range([heightOverview, 0]);
				  yOverview.domain(scales.y.domain());

				  var subBars = diagram.selectAll('.subBar').data(data)

				  subBars.enter().append("rect").classed('subBar', true)
				      .attr({
				         height: function(d) { return heightOverview - yOverview(d[value_field]); },
				          width: function(d) { return xOverview.rangeBand()} ,
				              x: function(d) { return delta_x +  xOverview(d[label_field]); },
				              y: function(d) { return height + heightOverview + yOverview(d[value_field])}
				      })

				  var displayed = d3.scale.quantize()
				              .domain([0, width])
				              .range(d3.range(data.length));

				  diagram.append("rect")
		              .attr("transform", "translate(0, " + (height + margin.bottom) + ")")
		              .attr("class", "mover")
		              .attr("x", 0 + delta_x)
		              .attr("y", 0)
		              .attr("height", selectorHeight)
		              .attr("width", Math.round(parseFloat(numBars * width)/data.length))
		              .attr("pointer-events", "all")
		              .attr("cursor", "pointer")
		              .call(d3.behavior.drag().on("drag", display_windows ));
			}



			function display_windows () {
			    var x = parseInt(d3.select(this).attr("x")),
			        nx = x + d3.event.dx,
			        w = parseInt(d3.select(this).attr("width")),
			        f, nf, new_data, rects;

			    if ( nx < delta_x || nx + w - delta_x > width ) return;

			    d3.select(this).attr("x", nx );

			    f = displayed(x-delta_x);
			    nf = displayed(nx-delta_x);

			    if ( f === nf ) return;

			    new_data = data.slice(nf, nf + numBars +1);
			
			    scales.x.domain(new_data.map(function (d) { return d[label_field]; }));
			    diagram.select(".x.axis").call(xAxis);
			    incliner_label(diagram.select(".x.axis").selectAll("text"));



			    rects = bars.selectAll("rect")
			      .data(new_data, function (d) {return d[label_field]; });

				rects.attr("x", function (d) { return delta_x + scales.x(d[label_field]); });


			    rects.enter().append("rect")
			      .attr("class", "bar")
			      .attr("x", function (d) { return delta_x + scales.x(d[label_field]); })
			      .attr("y", function (d) { return scales.y(d[value_field]); })
			      .attr("width", scales.x.rangeBand())
			      .attr("height", function (d) { return (height - scales.y(d[value_field]) - delta_y); });

			    rects.exit().remove();
			};

			function incliner_label(d3_selection){
				d3_selection 
					.style("text-anchor", "end")
					.attr("dx", "-.8em")
					.attr("dy", ".15em")
				    .attr("transform", "rotate(-65)")
				    .style("font", "0.55rem arial narrow")
				    .style("font-weight", "normal");
			}
		}

		function calc_dimension_settings( data_length ){

			margin =  {top: 20, right: 30, bottom: 20, left: 40};
			marginOverview = {top: 30, right: 10, bottom: 20, left: 40};
			selectorHeight = 40;
			width  = 600 - margin.left - margin.right;
			height = 400 - margin.top - margin.bottom - selectorHeight;
			heightOverview = 80 - marginOverview.top - marginOverview.bottom;
			       
			barWidth = 15  ;
			numBars  = Math.round(width/barWidth);
			delta_x = 10
			delta_y = 40;			
		}  

		function empty_chart(){ d3.selectAll("#d3-barchart-01 > *").remove();}

		function svg_container_create (){

			if (context.svg_created) return

			svg = d3.select(html_container).append("svg").attr("id","d3-barchart-01")
			context.vg_created = true ;

		}

		function svg_setviewport(){

			var W0 = width + margin.left + margin.right ;
			var H0 = height + margin.top + margin.bottom + selectorHeight ;

			 d3.select("#d3-barchart-01")
				  	.attr("preserveAspectRatio", "xMinYMin meet")
					.attr("viewBox", `0 0 ${ W0 } ${ H0 }`);
		};

		function update_scales(){
			var xscale = d3.scale.ordinal()
			        .domain(data.slice(0, numBars).map(function (d) { return d[context.label_field]; }))
			        .rangeBands([0, width], .2);

			var yscale = d3.scale.linear()
					.domain([0, d3.max(data, function (d) { return d[context.value_field]; })])
			        .range([height - delta_y, 0]);	

			 return { x: xscale, y: yscale }       
		}


		function create_axis(scales){  

			xAxis  = d3.svg.axis().scale(scales.x).orient("bottom");
			yAxis  = d3.svg.axis().scale(scales.y).orient("left");

		}

		function display_params(){
			console.log(`
				 margin : ${ JSON.stringify(margin)  } ,
				 marginOverview : ${ JSON.stringify(marginOverview) } , 
				 selectorHeight : ${ selectorHeight },  
				 width : ${ width }, 
				 height : ${ height }, 
				 heightOverview : ${ heightOverview }, 
				 barWidth : ${ barWidth } ,	
				 numBars : ${ numBars } , 
				 isScrollDisplayed : ${ isScrollDisplayed } , 
				 delta_x : ${ delta_x } ,
				 delta_y : ${ delta_y },
				 context.label_field : ${ context.label_field },
				 context.value_field : ${ context.value_field }
			`);
		}

}

