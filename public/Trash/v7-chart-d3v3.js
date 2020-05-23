

function BarChart(){
    var mvData , mvMetaData, mvInfos;
    var first_draw = true;

    var xdomain = [0, 400];
    var ydomain = ["Unit 1", "Unit 2", "Unit 3" ] ;

    var box = d3.select("#barchart-wrapper").node().getBoundingClientRect();
    var hmax = box.height;
    var wmax = box.width;

    var data_index = 0; 
    var x, y, margin, width, height; // x and y scale objects;
    var xAxis, yAxis , svg ;

    var tooltip_bar;

     return {
        draw : _draw,
        initChart: _initChart,
        setData: _set_data,
        resize: _resize,
        render_sysinfos : _render_sysinfos
     }

      function _set_data(in_data, in_metaData){
         // sysecho("in_data", in_data);
          mvData = in_data;
          mvMetaData = in_metaData;
      }

      function _draw( infos = {x:"FLD1", y: "ADM_NAME"}){
        if (first_draw){
          _draw_enter( infos );
          first_draw = false;
        } else {
          _draw_update( infos );
        }
      }

  
    function _initChart(){

      //margin = { left: 120, top: 30, right: 30, bottom:120};
      margin = { left: 10, top: 10, right: 10, bottom:10};

      width = wmax - margin.left - margin.right;
      height = hmax - margin.top - margin.bottom;
  
      x = d3.scale.linear().range([0, width]);
      y = d3.scale.ordinal().rangeRoundBands([0, height]);

      xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
      yAxis = d3.svg.axis().scale(y).orient("left");


      tooltip_bar = d3.select("#barchart-wrapper")
                  .append("div")
                  .attr("class", "tooltip hidden");

      svg = d3.select("#barchart-wrapper").append("svg")
          .attr("viewport", [ 0, 0, width, height])
        //  .attr("width", width + margin.left + margin.right)
        //  .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",  "translate(" + 0 + "," + 0 + ")");
         // .attr("transform",  "translate(" + margin.left + "," + margin.top + ")");

        append_text("deco_title" ,   "1.2rem arial narrow", "bold", "#000", "titre...");
        append_text("deco_subtitle", "0.9rem arial narrow", "bold", "#000", "sous-titre...");
        append_text("deco_y_unit" ,  "1rem arial narrow",   "bold", "#000", "Y unit...");
        append_text("deco_x_unit" ,  "1rem arial narrow",   "bold", "#000", "X unit...");
        append_text("deco_infos_1",  "0.8rem arial narrow", "bold", "#000", "Description...");
        append_text("deco_infos_2",  "0.8rem arial narrow", "bold", "#000", "Maximum...");
        append_text("deco_infos_3",  "0.8rem arial narrow", "bold", "#000", "Minimum...");
        append_text("deco_source" ,  "0.6rem arial narrow", "bold", "#000", "Source...");


        function append_text (_id, _font, _weight, _fill, _text ){
          svg.append("text").attr("id", _id)
            .attr("fill", _fill)
            .style("font", _font).style("fill", _fill).style("font-weight", _weight)
            .text(_text)
        }

        x.domain( xdomain );
        y.domain( ydomain );

        create_xAxis(xAxis);
        create_yAxis(yAxis);
    }



    function create_xAxis(xAxis){

      svg.append("g")
          .attr("id", "x_axis")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text");

    }

    function create_yAxis(yAxis){

      svg.append("g")
          .attr("id", "y_axis")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end");
    }

    function _draw_enter( infos ){   
        mvInfos = infos
        mvData.sort(function(a,b){ return (+b[infos.x]- a[infos.x])});
    
        ydomain = mvData.map(function(d) {return d[infos.y] });

        var x_min = d3.min(mvData, function(d) { return (+d[infos.x])});
        var x_max = d3.max(mvData, function(d) { return (+d[infos.x])});

        console.log("draw enter::field " + infos.x + "[x_min, x_max]=", x_min + ", " + x_max );
 

        x.domain([0, x_max]);
        y.domain( ydomain);

     

        //SECTION ENTER
        svg.select("#x_axis").call(xAxis)
        svg.select("#y_axis").call(yAxis).selectAll("text").style("font", "8px avenir");

        svg.selectAll(".bar")
            .data(mvData)
          .enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("y", function(d) { return y(d[infos.y]); })
            .attr("width", function(d) { return x(d[infos.x]);} )
            .attr("height", 6)
            .on("mouseover", function(d){
                tooltip_bar.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip_bar.html("Variable Name")
                    .style("left",  (d3.event.pageX + 10) + "px")
                    .style("top" ,  (d3.event.pageY + 2) + "px")
            })
            .on("mouseout", function(d){
                tooltip_bar.transition()
                    .duration(200)
                    .style("opacity", 0)
            });
        

        update_decoration(infos);
        ui_render_sysinfos({
          svg_width : wmax,
          svg_height : hmax,
          range : "[" + 0 + ";" + height + "]",
          domain : "[" + 0 + ";" + x_max + "]"
        });
        console.log("_draw_enter => width = " + width + " ||  height = " + height );
        _resize(infos, width, height);
     }
      
    function _draw_update(infos ){   
      //alert("_draw_update triggered")
      box = d3.select("#barchart-wrapper").node().getBoundingClientRect();
      hmax = box.height;  wmax = box.width;
      width = wmax - margin.left - margin.right;
      height = hmax - margin.top - margin.bottom;

  
      svg.attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

      mvInfos = infos;
      mvData.sort(function(a,b){ return (+b[infos.x] - a[infos.x])});

      ydomain = mvData.map(function(d) {return d[infos.y] });

      var x_min = d3.min(mvData, function(d) { return (+d[infos.x])});
      var x_max = d3.max(mvData, function(d) { return (+d[infos.x])});

      
     
      x.domain([0, x_max]) //.range(0, width);
      y.domain( ydomain )  //.rangeRoundBands([0, height]);

      
      svg.select("#x_axis").call(xAxis);//.selectAll("text");
      svg.select("#y_axis").call(yAxis).selectAll("text").style("font", "8px avenir");

      svg.selectAll(".bar")
          .data(mvData)
          .attr("y", function(d) { return y(d[infos.y]); })
          .attr("height", 6)
          .transition()
          .duration(500)
          .attr("width", function(d) { return x(d[infos.x]);} );
      
       svg.select(".horizon_unit")
          .attr("x", 220).attr("y", 410).attr("dy", "0.71em")
          .attr("fill", "#000")
          .text("NB de cas  update")
          .style("font", "11px avenir").style("fill", "#000000").style("font-weight", "bold");
      
        update_decoration(infos , width, height);
        ui_render_sysinfos({
          svg_width : wmax,
          svg_height : hmax,
          range : "[" + 0 + ";" + height + "]",
          domain : "[" + 0 + ";" + x_max + "]"
        })
        console.log("_DrawUpdate => width = " + width + " ||  height = " + height );
        _resize(infos, width, height);
    }

    function update_decoration(infos){

        infos.deco_infos_2 = "Le district sanitaire de " + getPlaceOfMax() + " enregistre le maximum " + infos.deco_infos_2
        infos.deco_infos_3 = "Le district sanitaire de " + getPlaceOfMin() + " enregistre le minimum " + infos.deco_infos_3

        svg.select("#deco_title").text(infos.title);
        svg.select("#deco_subtitle").text(infos.subtitle);
        svg.select("#deco_y_unit").text(infos.y_unit);
        svg.select("#deco_x_unit").text(infos.x_unit);
        svg.select("#deco_infos_1").text(infos.deco_infos_1);
        svg.select("#deco_infos_2").text(infos.deco_infos_2);
        svg.select("#deco_infos_3").text(infos.deco_infos_3);
        svg.select("#deco_source").text(infos.deco_source);
    }
    function getPlaceOfMax(){
      //Attention le tri du tableau est décroissant !
      return (ydomain[0]);
    }

    function getPlaceOfMin(){
      //Attention le tri du tableau est décroissant !
      return (ydomain[ydomain.length -1]);
    }

    function _render_sysinfos(){
        ui_render_sysinfos({
          svg_width : wmax,
          svg_height : hmax,
          range : "[" + 0 + ";" + height + "]",
          domain : "[" + 0 + ";" + x_max + "]"
        });
    }

    function _resize(infos ){
        console.log("[width, height] = [" + width + " ; " + height + "]");
        svg.select("#deco_title").attr("text-anchor", "middle").attr("x", width*0.5 ).attr("y", -20).attr("dy", "0.71em");
        svg.select("#deco_subtitle").attr("text-anchor", "middle").attr("x", width*0.5 ).attr("y", -0).attr("dy", "0.71em");
        svg.select("#deco_y_unit").attr("x", -69).attr("y", -8).attr("dy", "0.71em");
        svg.select("#deco_x_unit").attr("text-anchor", "middle").attr("x", width-200).attr("y", height).attr("dy", "2.2em");
        svg.select("#deco_infos_1").attr("x", 0).attr("y", height).attr("dy", "4em");
        svg.select("#deco_infos_2").attr("x", 0).attr("y", height).attr("dy", "5em");
        svg.select("#deco_infos_3").attr("x", 0).attr("y", height).attr("dy", "6em");
        svg.select("#deco_source").attr("x", 0).attr("y", height).attr("dy", "9.5em");
    }
}
