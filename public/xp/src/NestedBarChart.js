/*
 Copyright (c) 2019, BrightPoint Consulting, Inc.
 
 All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the author nor the names of contributors may be used to
  endorse or promote products derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// @version 2.1.232

/**
 * @class
 */
vizuly2.viz.NestedBarChart = function (parent) {
	
	var d3 = vizuly2.d3;
	
	/** @lends vizuly2.viz.NestedBarChart.properties */
	var properties = {
		/**
		 * Hierarchical nested array of nodes to be rendered.dd
		 * @member {Array}
		 * @default Needs to be set at runtime
		 * @example
		 * [{
		 * "key": "Pensions",
		 * "values": [
		 *  {
		 *  "key": "Old age",
		 *  "values": [
		 *   {
		 *     "key": "Federal employee retirement and disability (602)",
		 *     "values": [
		 *      {
		 *        "Category": "Special Benefits",
		 *        "Level1": "Pensions",
		 *        "Level2": "Old age",
		 *        "Level3": "Federal employee retirement and disability (602)",
		 *        "Level4": "Special Benefits",
		 *        "Federal": "0.38",
		 *         ...
		 */
		'data': null,
		/**
		 * Width of component in either pixels (Number) or percentage of parent container (XX%)
		 * @member {Number/String}
		 * @default 600
		 * @example
		 * viz.width(600) or viz.width('100%');
		 */
		'width': 600,
		/**
		 * Height of component in either pixels (Number) or percentage of parent container (XX%)
		 * @member {Number/String}
		 * @default 600
		 * @example
		 * viz.height(600) or viz.height('100%');
		 *
		 */
		'height': 600,
		/**
		 * Margins between component render area and border of container.  This can either be a fixed pixels (Number) or a percentage (%) of height/width.
		 * @member {Object}
		 * @default  {top:'5%', bottom:'5%', left:'8%', right:'10%'}
		 */
		'margin': {
			'top': '10%',
			'bottom': '7%',
			'left': '12%',
			'right': '9%'
		},
		/**
		 * Duration (in milliseconds) of any component transitions.
		 * @member {Number}
		 * @default  500
		 */
		'duration': 500,
		/**
		 * Function that returns a unique identifier for a given node.
		 * @member {Function}
		 * @default function (d) { return d.key }
		 * @example myViz.key(function (d) { return d.keyProperty } );
		 *
		 */
		'key': function (d) { return d.key },
		/**
		 * D3 Tree layout that will be used.  You can pass in a different tree layout, or modify this one on the fly.
		 * @member {d3.layout.tree}
		 * @default d3.layout.tree
		 */
		'tree': d3.tree(),
		/**
		 * Function used to access the array of values representing child nodes for a given branch.
		 * @member {Function}
		 * @example myViz.children(function (d,i) { return d.values });
		 * @default function (d) { return d.values }
		 */
		'children': function (d) { return d.values },
		/**
		 * Function used to determine depth of current datum
		 * @member {Function}
		 * @default function (d) { return d.depth }
		 */
		'depth': function (d) { return d.depth },
		/**
		 * Property that sets max drill depth that user can drill into - Helpful for deeper data sets where
		 * you would like to prevent user from drilling the full depth of tree and don't want to modify your data.
		 * @member {Number}
		 * @default 100
		 */
		'maxDrillDepth': 100,
		/**
		 * Property that will set a minimum width of a bar regardless of its value.  This is helpful for small outliers where
		 * you still want a visible bar showing.
		 * @member {Number}
		 * @default 100
		 */
		'minBarWidth': 0,
		/**
		 * The height of each bar in pixels.  The default value of `auto` will auto size bars based on padding and chart height.
		 * @member {Number}
		 * @default  -1
		 */
		'barWidth': 'auto',
		/**
		 * <img src='BarChartPadding.png'><br><br>
		 * Determines space between bars within a series group.  Can be represented as a pixel (Number) or a percentage ('20%').
		 * Using a percentage will try and optimize the spacing based on the number of bars and the height of the chart.  Using a fixed number
		 * will ignore the chart "height" property and space bars a fixed distance apart, so the resulting chart height may differ.
		 * This allows for creating consistently padded charts regardless of the number of elements within the series.
		 * The default value of `auto` will auto pad bars based on number of bars and chart width.
		 * @member {String}
		 * @default 20%
		 *
		 */
		'barPadding': 'auto',
		/**
		 * <img src='BarChartPadding.png'><br><br>
		 * Determines space between series groups.  Can be represented as a pixel (Number) or a percentage ('20%').
		 * Using a percentage will try and optimize the spacing based on the number of bars and the height of the chart.  Using a fixed number
		 * will ignore the chart `height` property and space series groups a fixed distance apart, so the resulting chart height may differ.
		 * This allows for creating consistently padded charts regardless of the number of elements within the series.
		 * The default value of `auto` will group bars based on number of bars and chart width.
		 * @member {String}
		 * @default auto
		 *
		 */
		'groupPadding': 'auto',
		/**
		 * Function that returns the datum property used to calculate the width of the bar.  This accessor is called for each bar that is being rendered.
		 * @member {Function}
		 * @default  Must be set at runtime
		 * @example
		 * viz.x(function(d,i) { return Number(d.myProperty) });
		 */
		'x': null,
		/**
		 * Function that returns the datum property used to calculate the vertical grouping/position of the bar .  This accessor is called for each bar that is being rendered.
		 * @member {Function}
		 * @default  Must be set at runtime
		 * @example
		 * viz.y(function(d,i) { return Number(d.myProperty) });
		 */
		'y': null,
		/**
		 * Function that returns the series label of the datum
		 * @member {Function}
		 * @default  function (d) { return d.series }
		 * @example
		 * viz.seriesLabel(function(d,i) { return d.myProperty });
		 */
		'seriesLabel': function (d) {
			return d.series
		},
		/**
		 * Scale type used to measure and position bars along the x-axis.  The scale, or scale properties can be overridden by capturing the
		 * "measure" event and accessing/modifying the scale.
		 * @member {d3.scale}
		 * @default  d.scaleLinear()
		 * @example
		 * viz.on('measure', function () { viz.xScale().range([0, 600]) }) //Sets max width of scale to 600
		 */
		'xScale': d3.scaleLinear(),
		/**
		 * Scale type used to measure and position bars along the y-axis.  The bar chart will try and auto-determine the scale type based on
		 * the value type being returned by the viz.y accessor.  String values will use a d3.scaleBand, date values will use a d3.scaleTime,
		 * and numeric values will use a d3.scaleLinear. The scale, or scale properties can be overridden by capturing the
		 * "measure" event and accessing/modifying the scale.
		 * @member {d3.scale}
		 * @default  undefined - set at runtime automatically
		 * @example
		 * viz.on('measure', function () { viz.yScale().range([0, 600]) }) //Sets max height of scale to 600;
		 */
		'yScale': 'undefined',
		/**
		 * D3 Axis used to render x (bottom) axis.  This axis can be overriden with custom settings by capturing the 'measure' event.
		 * @member {d3.axis}
		 * @default d3.axisBottom
		 * @example
		 * viz.on('measure', function () { viz.xAxis().tickSize(10) }) //Sets each axis tick to 10 pixels
		 */
		'xAxis': d3.axisBottom(),
		/**
		 * D3 Axis used to render y (left) axis.  This axis can be overriden with custom settings by capturing the 'measure' event.
		 * @member {d3.axis}
		 * @default d3.axisLeft
		 * @example
		 * viz.on('measure', function () { viz.yAxis().tickSize(10) }) //Sets each axis tick to 10 pixels
		 */
		'yAxis': d3.axisLeft(),
		/**
		 * Label formatter for the y axis.  Can be customized to modify labels along axis.
		 * @member {function}
		 * @default function (d) { return d }
		 * @example
		 * //Sets each axis tick label to a currency format
		 * viz.yTickFormat(function (d, i) { return '$' + d3.format('.2f')(d) })
		 */
		'yTickFormat': function (d) {
			return d
		},
		/**
		 * Label formatter for the x axis.  Can be customized to modify labels along axis.
		 * @member {function}
		 * @default function (d) { return d }
		 * @example
		 * //Sets each axis tick label to a currency format
		 * viz.xTickFormat(function (d, i) { return '$' + d3.format('.2f')(d) })
		 */
		'xTickFormat': function (d) {
			return d
		},
		/**
		 * Label formatter for value labels.  Can be customized to modify value labels that are displayed by each bar.
		 * @member {function}
		 * @default function (d) { return d }
		 * @example
		 * //Sets each value label to a percentage format
		 * viz.labelFormat(function (d, i) { return (d * 100) + '%' })
		 */
		'labelFormat': function (d) {
			return d
		},
		/**
		 * The dataTipRenderer is used to customize the data tip that is shown on mouse-over events.
		 *  You can append to or modify the 'tip' parameter to customize the data tip.
		 *  You can also return modified x, y coordinates to place the data tip in a different location.
		 * @member {function}
		 * @default internal.dataTipRenderer
		 * @example
		 * // tip - html DIV element
		 * // e - svg rect of the bar being moused over
		 * // d - datum
		 * // i - datum index
		 * // j - group index (optional)
		 * // x - suggested x position of data tip
		 * // y - suggested y position of data tip
		 * // return {Array} [x, y] - x and y coordinates placing data tip.
		 *
		 *function dataTipRenderer(tip, e, d, i, j, x, y) {
		 *		var html = '<div class="vz-tip-header1">HEADER1</div>' +
		 *		 '<div class="vz-tip-header-rule"></div>' +
		 *		 '<div class="vz-tip-header2"> HEADER2 </div>' +
		 *		 '<div class="vz-tip-header-rule"></div>' +
		 *		 '<div class="vz-tip-header3" style="font-size:12px;"> HEADER3 </div>';
		 *
		 *		var h1 = scope.y(d, i);
		 *		var h2 = scope.labelFormat(scope.x(d));
		 *		var h3 = scope.seriesLabel(d);
		 *
		 *		html = html.replace("HEADER1", h1);
		 *		html = html.replace("HEADER2", h2);
		 *		html = html.replace("HEADER3", h3);
		 *
		 *		tip.style('height', null).html(html);
		 *
		 *		return [(Number(x) + Number(d3.select(e).attr('width'))), y - 50]
		 *}
		 */
		'dataTipRenderer': dataTipRenderer,
		/**
		 * When set to 'true' will show vertical and horizontal tree grid lines for each child bar and
		 * keep text labels left aligned.  When set to 'false' no grid lines will be present and text labels
		 * will be nested.
		 * @member {Boolean}
		 * @default true
		 */
		showGridLines: true
	};
	
	
	var styles = {
		'background-opacity': 1,
		'background-color-top': '#FFF',
		'background-color-bottom': '#DDD',
		'value-label-color': '#444',
		'value-label-font-size': function () {
			return Math.max(10, Math.round(size.width / 42))
		},
		'value-label-font-weight': 400,
		'value-label-show': true,
		'bar-stroke': function (d, i, groupIndex) {
			var axisColors = ['#bd0026', '#fecc5c', '#fd8d3c', '#f03b20', '#B02D5D', '#9B2C67', '#982B9A', '#692DA7', '#5725AA', '#4823AF', '#d7b5d8', '#dd1c77', '#5A0C7A', '#5A0C7A'];
			return axisColors[groupIndex % axisColors.length]
		},
		'bar-stroke-opacity': function (d, i) {
			return (scope.layout == vizuly2.viz.layout.STACKED) ? '1' : '0'
		},
		'bar-stroke-over': '#FFF',
		'bar-stroke-width': function (d, i) {
			return (this.width() / 800) + 'px';
		},
		'bar-fill': function (d, i) {
			var axisColors = ['#bd0026', '#fecc5c', '#fd8d3c', '#f03b20', '#B02D5D', '#9B2C67', '#982B9A', '#692DA7', '#5725AA', '#4823AF', '#d7b5d8', '#dd1c77', '#5A0C7A', '#5A0C7A'];
			return axisColors[i % axisColors.length]
		},
		'bar-fill-opacity': function (d, i) {
			return .8
		},
		'bar-fill-over': function (d, i) {
			var color = viz.getStyle('bar-fill',[d.data,i]);
			return d3.rgb(color).brighter()
		},
		'grid-line-stroke': '#000',
		'grid-line-stroke-opacity': 0.25,
		'bar-fill-opacity-over': 1,
		'bar-radius': 0,
		'axis-font-weight': 400,
		'y-axis-font-size': function (d) {
			return d3.scaleLinear().range([Math.min(barWidth * .4, 18), 10]).domain([0, scope.maxDrillDepth])(d.depth);
		},
		'y-axis-label-show': true,
		'y-axis-font-style': 'normal',
		'y-axis-label-color': '#444'
	}
	
	
	/** @lends vizuly2.viz.NestedBarChart.events */
	var events = [
		/**
		 * Fires when user moves the mouse over a bar.
		 * @event vizuly2.viz.NestedBarChart.mouseover
		 * @type {VizulyEvent}
		 * @param e - DOM element that fired event
		 * @param d - Datum associated with DOM element
		 * @param i - Index of datum in display series
		 * @param j -  The series index of the datum
		 * @param this -  Vizuly Component that emitted event
		 * @example  viz.on('mouseover', function (e, d, i) { ... });
		 */
		'mouseover',
		/**
		 * Fires when user moves the mouse off a bar.
		 * @event vizuly2.viz.NestedBarChart.mouseout
		 * @type {VizulyEvent}
		 * @param e - DOM element that fired event
		 * @param d - Datum associated with DOM element
		 * @param i - Index of datum in display series
		 * @param j -  The series index of the datum
		 * @param this -  Vizuly Component that emitted event
		 * @example  viz.on('mouseout', function (e, d, i) { ... });
		 */
		'mouseout',
		/**
		 * Fires when user clicks a bar.
		 * @event vizuly2.viz.NestedBarChart.click
		 * @type {VizulyEvent}
		 * @param e - DOM element that fired event
		 * @param d - Datum associated with DOM element
		 * @param i - Index of datum in display series
		 * @param j -  The series index of the datum
		 * @param this -  Vizuly Component that emitted event
		 * @example  viz.on('click', function (e, d, i) { ... });
		 */
		'click',
		/**
		 * Fires when user touches a bar on a gesture enabled device.
		 * @event vizuly2.viz.NestedBarChart.touch
		 * @type {VizulyEvent}
		 * @param e - DOM element that fired event
		 * @param d - Datum associated with DOM element
		 * @param i - Index of datum in display series
		 * @param j -  The series index of the datum
		 * @param this -  Vizuly Component that emitted event
		 * @example  viz.on('touch', function (e, d, i) { ... });
		 */
		'touch'
	]
	
	// This is the object that provides pseudo "protected" properties that the vizuly.viz function helps create
	var scope = {};
	scope.initialize = initialize;
	scope.properties = properties;
	scope.styles = styles;
	scope.events = events;
	
	// Create our Vizuly component
	var viz = vizuly2.core.component(parent, scope);
	
	var size;           // Holds the 'size' variable as defined in viz.util.size()
	var barWidth;       // measured bar width
	var groupWidth;     // measured bar group width
	var barPadding;
	var groupPadding;
	var seriesOffset = 0; //Used for scaleoffset
	var stack;          // used for the stacked bar layout
	var stackSeries;
	var axisFontSize;
	var barPlots = [];
	var layoutY;
	var barIndent, barHeightReduceFactor;
	var maxDrillDepth = 0;
	var showChildren = [];
	var keys;
	
	// These are all d3.selection objects we use to insert and update svg elements into
	var svg, g, bottomAxis, leftAxis, plot, barGroup, background, plotBackground, defs;
	
	
	// Here we set up all of our svg layout elements using a 'vz-XX' class namespace.  This routine is only called once
	// These are all place holder groups for the invidual data driven display elements.   We use these to do general
	// sizing and margin layout.  The all are referenced as d3.selections.
	function initialize() {
		
		scope.selection.style('overflow','scroll');
		svg = scope.selection.append('svg').attr('id', scope.id).style('overflow', 'visible').attr('class', 'vizuly');
		defs = vizuly2.util.getDefs(viz);
		background = svg.append('rect').attr('class', 'vz-background')
		g = svg.append('g').attr('class', 'vz-bar-viz');
		bottomAxis = g.append('g').attr('class', 'vz-bottom-axis');
		leftAxis = g.append('g').attr('class', 'vz-left-axis')
		plot = g.append('g').attr('class', 'vz-plot');
		plotBackground = plot.append('rect').attr('class', 'vz-plot-background').style('fill', '#FFF').style('fill-opacity', .01);
		
		scope.dispatch.apply('initialized', viz);
	}
	
	
	// The measure function performs any measurement or layout calcuations prior to making any updates to the SVG elements
	function measure() {
		
		// Call our validate routine and make sure all component properties have been set
		viz.validate();
		
		//Clear out all keys;
		keys = [];
		
		//Force clustered layout
		scope.layout = vizuly2.viz.layout.CLUSTERED;
		
		// Get our size based on height, width, and margin
		size = vizuly2.util.size(scope.margin, scope.width, scope.height, scope.parent);
		
		//If we have fixed bar width then we will override the width of the component
		if (scope.barWidth != 'auto') {
			barWidth = scope.barWidth;
			barPadding = calculateBarPadding(scope.barPadding, barWidth);
			groupWidth = (barWidth + barPadding);
			groupPadding = calculateGroupPadding(scope.groupPadding, groupWidth);
			size.height = (groupWidth + groupPadding) * scope.data.length;
			//size.top = (size.measuredHeight - size.height)/2;
			//size.bottom = size.top;
		}
		else {
			// The width of each group of bars for a given data point and all of series
			groupWidth = (size.height / scope.data.length) * .9;
			groupPadding = calculateGroupPadding(scope.groupPadding, groupWidth);
			groupWidth = groupWidth - groupPadding;
			// The width of an individual bar for a given data point a single series
			barWidth = groupWidth;
			barPadding = calculateBarPadding(scope.barPadding, barWidth);
			if (barPadding > barWidth) barPadding = barWidth-2;
			barWidth = barWidth - barPadding;
		}
		
		
		barIndent = barWidth;
		barHeightReduceFactor = 0.1;
		
		// If we don't have a defined y-scale then determine one
		if (scope.yScale == 'undefined') {
			scope.yScale = vizuly2.util.getTypedScale(viz.y()(scope.data));
		}
		
		// Set our domains for the yScale (categories)
		// Assumes ordinal scale if we have a string, otherwise min and max will do;
		if (typeof scope.y(scope.data) == 'string') {
			scope.yScale.domain(scope.data.map(function (d) {
				return scope.y(d);
			}));
		}
		else {
			scope.yScale.domain([
				d3.min(scope.data,
				 function (d) {
					 return scope.y(d);
				 }),
				d3.max(scope.data, function (d) {
					return scope.y(d);
				})
			]);
		}
		
		// We set our xScale domain based on whether we have a stacked or clustered layout
		scope.xScale.domain([
			Math.min(0, d3.min(scope.data, function (d) { return scope.x(d) })),
			d3.max(scope.data, function (d) { return scope.x(d) })
		]);
		
		
		// Set our ranges for each scale
		seriesOffset = 0;
		
		var yScaleOffset = 0;
		
		//Makes sure our range is correct for continous scales
		if (typeof scope.yScale.clamp != 'undefined') {
			seriesOffset = (groupWidth + groupPadding) / 2;
			yScaleOffset = groupWidth;
		}
		
		scope.yScale.range([0, size.height - yScaleOffset]);
		scope.xScale.range([scope.minBarWidth, size.width]);
		
		scope.xAxis.scale(scope.xScale);
		scope.yAxis.scale(scope.yScale);
		
		scope.yAxis.tickFormat(scope.yTickFormat).tickSize(-size.width);
		scope.xAxis.tickFormat(scope.xTickFormat).tickSize(-size.height).ticks(5);
		
		scope.size = size;
		
		barPlots = [];
		
		layoutY = barPadding;
		
		var maxX = scope.xScale.domain()[1];
		
		scope.data.forEach(function (d, i) {
			var plots = [];
			scope.xScale.domain([0,maxX])
			layoutBar(plots, d, i, d)
			layoutY = layoutY + groupPadding * 2;
			barPlots.push(plots);
		});
		
		
		// Tell everyone we are done making our measurements
		scope.dispatch.apply('measured', viz);
		
	}
	
	function layoutBar(plots, d, i, root, parentBar) {
		var children = scope.children(d)
		var bar = createBar(d, i, root, parentBar)
		if (children && showChildren.indexOf(d) > -1) {
			plots.push(bar)
			children.forEach(function (d) {
				if (scope.depth(d) <= scope.maxDrillDepth) {
					layoutBar(plots, d, i, root, bar)
				}
			})
		}
		else {
			plots.push(bar)
		}
	}
	
	function createBar(d, i, root, parentBar) {
		
		var o = {};
		o.data = d
		o.root = root;
		o.rootIndex = scope.data.indexOf(root);
		o.x = scope.xScale(Math.min(0, scope.x(d)));
		o.y = layoutY;
		o.height = barWidth;
		o.width = scope.xScale(scope.x(d));
		o.parent = parentBar;
		o.showChildren = (showChildren.indexOf(d) > -1);
		
		o.x = Math.round(o.x + (scope.depth(d)) * barIndent);
		o.tickX = Math.round(o.x - (barIndent * .8));
		o.y = Math.round(o.y);
		o.height = Math.round(o.height * (1 - ((scope.depth(d)-1) * barHeightReduceFactor)));
		o.width = Math.round(o.width);
		o.seriesIndex = i;
		o.depth = scope.depth(o.data);
		o.key =  (parentBar ? parentBar.key + '_' : '' ) + scope.key(d, i);
		
		//Make sure we have unique keys for all elements.
		if (keys.indexOf(o.key) > -1) {
			var k = 1;
			while (keys.indexOf(o.key + '_' + k) > -1) {
				k++;
			}
			o.key = o.key + '_' + k;
		}
		
		keys.push(o.key);
		
		if (o.parent) {
			o.parent.bottomY = o.y + o.height/2;
			// Make sure we don't have duplicate keys
		}
		layoutY = o.y + barPadding + o.height
		
		maxDrillDepth = Math.max(o.depth, maxDrillDepth);
		
		return o;
		
	}
	
	function calculateBarPadding(padding, w) {
		var val = 0;
		
		if (String(padding).toLowerCase() == 'auto') {
			val = Math.round(w * 0.2)
		}
		else if(typeof padding == 'string' && padding.substr(padding.length-1) == '%') {
			var r = Math.min(Number(padding.substr(0,padding.length-1)),100)/100;
			val = Math.round(w * r);
		}
		else if (!isNaN(Number(padding))) {
			val = Number(padding);
		}
		else {
			val = 10;
		}
		return val;
	}
	
	function calculateGroupPadding(padding, w) {
		var val = 0;
		val = Math.round((size.height-(w * scope.data.length))/scope.data.length);
		return val;
	}
	
	
	
	// The update function is the primary function that is called when we want to render the visualiation based on
	// all of its set properties.  A developer can change propertys of the components and it will not show on the screen
	// until the update function is called
	function update() {
		
		// Call measure each time before we update to make sure all our our layout properties are set correctly
		measure();
		
		// Layout all of our primary SVG d3.elements.
		
		var newHeight = Math.max(layoutY + size.bottom, size.height + size.top + size.bottom);
		
		svg.attr('width', size.measuredWidth).attr('height', newHeight);
		background.attr('width', size.measuredWidth).attr('height', newHeight);
		plot.style('width', size.width).style('height', size.height).attr('transform', 'translate(' + (size.left) + ',' + (size.top) + ')');
		bottomAxis.attr('transform', 'translate(' + (size.left) + ',' + (size.height + size.top) + ')');
		leftAxis.attr('transform', 'translate(' + (size.left * .9) + ',' + (size.top + seriesOffset) + ')');
		plotBackground.attr('width', size.width).attr('height', newHeight);
		
		// Select, create, and destroy our bar groups as needed
		barGroup = plot.selectAll('.vz-bar-group').data(barPlots);
		barGroup.exit().remove();
		barGroup = barGroup.enter().append('g').attr('class', 'vz-bar-group').merge(barGroup);
		
		// Create bars in each group - even if there is only one
		barGroup.each(function (datum, index) {
			
			var group = d3.select(this);
			
			var bars = d3.select(this).selectAll('.vz-bar').data(datum, function (d) { return d.key });
			
			bars.exit().transition()
			 .attr('width',0)
			 .attr('y',function (d) { return (d.parent) ? d.parent.y : d.y; })
			 .style('opacity',function (d) {
				 return 0;
			 })
			 .on('end',function () { d3.select(this).remove()})
			
			bars = bars.enter().append('rect').attr('class', 'vz-bar')
			 .attr('y', function (d, i) { return (d.parent) ? d.parent.y : d.y; })
			 .attr('x', function (d, i) { return (d.parent) ? d.parent.x : d.x; })
			 .attr('width', 0)
			 .attr('height', barWidth)
			 .style('cursor', function (d) { return ((d.depth < scope.maxDrillDepth) && scope.children(d.data) != null) ? 'pointer' : 'auto' })
			 .on('mouseover', function (d, i) {
				 scope.dispatch.apply('mouseover', viz, [this, d.data, i, index])
			 })
			 .on('mouseout', function (d, i) {
				 scope.dispatch.apply('mouseout', viz, [this, d.data, i, index]);
			 })
			 .on('click', function (d, i) {
				 scope.dispatch.apply('click', viz, [this, d.data, i, index])
			 })
			 .on('touch', function (d, i) {
				 scope.dispatch.apply('touch', viz, [this, d.data, i, index])
			 })
			 .merge(bars);
			
			
			bars.transition().duration(scope.duration)
			 .attr('y', function (d, i) { return d.y; })
			 .attr('height', function (d,i) { return d.height })
			 .attr('width', function (d, i) { return d.width })
			 .attr('x', function (d, i) { return d.x });
			
			var labels = d3.select(this).selectAll('.vz-bar-label').data(datum, function (d) { return d.key });
			
			labels.exit().remove();
			
			labels = labels.enter().append('text').attr('class', 'vz-bar-label')
			 .attr('x', function (d, i) {
				 return scope.xScale(0)
			 })
			 .attr('y', function (d, i) {
				 var fs = viz.getStyle('value-label-font-size', [d.data, i, scope.xScale.domain().indexOf(scope.x(d.data)), this]);
				 return d.y + fs * 1.5;
			 })
			 .text(function (d, i) {
				 // console.log("entering on " + d.data.key)
				 return scope.labelFormat(scope.x(d.data));
			 })
			 .style('text-anchor', function (d,i) {
				 return (d.x < 0) ? 'end' : 'start';
			 })
			 .style('opacity', 0)
			 .merge(labels);
			
			labels.transition().duration(scope.duration)
			 .attr('x', function (d, i) {
				 // var fs = viz.getStyle('value-label-font-size', [datum, i, scope.xScale.domain().indexOf(scope.x(d.data)), this]);
				 return d.x + d.width;
			 })
			 .attr('y', function (d, i) {
				 var fs = viz.getStyle('value-label-font-size', [d.data, i, scope.yScale.domain().indexOf(scope.y(d.data, i)), this]);
				 return d.y + d.height/2 + fs/3;
			 })
			 .style('opacity', 1)
			
			
			var axisLabels = d3.select(this).selectAll('.vz-left-axis').data(datum, function (d) { return d.key });
			
			axisLabels.exit().transition()
			 .attr('y', function (d, i) { return d.height + ((d.parent) ? d.parent.y : d.y); })
			 .style('opacity',0)
			 .on('end',function () { d3.select(this).remove() });
			
			axisLabels = axisLabels.enter().append('text').attr('class', 'vz-left-axis')
			 .attr('y', function (d, i) { return d.height + ((d.parent) ? d.parent.y : d.y); })
			 .text(function (d, i) {
				 return scope.yTickFormat(scope.y(d.data, i));
			 })
			 .style('text-anchor', 'end')
			 .style('opacity', 0)
			 .on('mouseover',function (d, i) { d3.select(this).transition().text( scope.y(d.data, i))})
			 .on('mouseout',function (d, i) { d3.select(this).transition().text( scope.yTickFormat(scope.y(d.data, i)))})
			 .merge(axisLabels)
			
			axisLabels.transition().duration(scope.duration)
			 .attr('x', function (d) { return (scope.showGridLines == true) ? -10 : d.x - 10 })
			 .attr('y', function (d, i) {
				 var fs = viz.getStyle('y-axis-font-size', [d,i]);
				 return d.y + d.height/2 + fs/3;
			 })
			 .style('opacity', 1)
			
			
			if (scope.showGridLines === true) {
				
				var treeTick = d3.select(this).selectAll('.vz-grid-tick')
				 .data(datum.filter(function (d) { return (d.depth > 0) }),function (d) { return d.key });
				
				treeTick.exit().remove();
				
				treeTick = treeTick.enter().append('line').attr('class', 'vz-grid-tick')
				 .attr('y1', function (d, i) {
					 return (d.parent) ? d.parent.y + d.parent.height/2 : d.y + d.height/2;
				 })
				 .attr('y2', function (d, i) {
					 return (d.parent) ? d.parent.y + d.parent.height/2 : d.y + d.height/2;
				 })
				 .attr('x1', function (d) { return d.tickX  })
				 .attr('x2', function (d) { return d.x - 3 })
				 .style('stroke', '#000')
				 .style('pointer-events', 'none')
				 .merge(treeTick)
				
				treeTick.transition().duration(scope.duration)
				 .attr('y1', function (d, i) {
					 return d.y + d.height/2;
				 })
				 .attr('y2', function (d, i) {
					 return d.y + d.height/2;
				 })
				
				
				var treeLine = d3.select(this).selectAll('.vz-grid-line')
				 .data(datum.filter(function (d) { return d.showChildren == true }), function (d) { return d.key });
				
				treeLine.exit().remove();
				
				treeLine = treeLine.enter().append('line').attr('class', function(d) { return 'vz-grid-line ' + d.key })
				 .attr('y1', function (d, i) {
					 return d.y + d.height + 3;
				 })
				 .attr('y2', function (d, i) {
					 return d.y + d.height + 3;
				 })
				 .attr('x1', function (d) { return d.x + (barIndent * .2)  })
				 .attr('x2', function (d) { return d.x + (barIndent * .2)  })
				 .style('stroke', '#000')
				 .style('pointer-events', 'none')
				 .merge(treeLine);
				
				treeLine.transition().duration(scope.duration)
				 .attr('y1', function (d, i) {
					 return d.y + d.height + 3;
				 })
				 .attr('y2', function (d, i) {
					 return d.bottomY;
				 });
				
			}
			else {
				d3.select(this).selectAll('.vz-grid-tick, .vz-grid-line').remove();
			}
			
		});
		
		// Update our axis labels
		//	bottomAxis.call(scope.xAxis);
		//	leftAxis.call(scope.yAxis);
		
		
		
		// Let everyone know we are doing doing our update
		// Typically themes will attach a callback to this event so they can apply styles to the elements
		scope.dispatch.apply('updated', viz);
		
	}
	
	/**
	 *  Triggers the render pipeline process to refresh the component on the screen.
	 *  @method vizuly2.viz.NestedBarChart.update
	 */
	viz.update = function () {
		update();
		return viz;
	};
	
	/***** TOGGLE ********/
	viz.applyCallbacks([{on: 'click.toggle', callback: toggleBar }]);
	
	function toggleBar(e, d, i) {
		viz.removeDataTip();
		if (showChildren.indexOf(d) < 0) {
			
			if (scope.children(d) === null) return;
			
			if (scope.depth(d) < scope.maxDrillDepth) {
				showChildren.push(d);
			}
		}
		else {
			showChildren.splice(showChildren.indexOf(d),1)
		}
		update();
	}
	
	/*****  STYLES *****/
	
	var stylesCallbacks = [
		{on: 'updated.styles', callback: applyStyles},
		{on: 'mouseover.styles', callback: styles_onMouseOver},
		{on: 'mouseout.styles', callback: styles_onMouseOut}
	];
	
	viz.applyCallbacks(stylesCallbacks);
	
	function applyStyles() {
		
		// If we don't have a styles we want to exit - as there is nothing we can do.
		if (!scope.styles || scope.styles == null) return;
		
		// The width and height of the viz
		var w = size.measuredWidth;
		var h = size.measuredHeight;
		axisFontSize = Math.max(8, Math.round(w / 65));
		
		// Grab the d3.selection from the viz so we can operate on it.
		var selection = scope.selection;
		
		// Hide the plot background
		selection.selectAll('.vz-plot-background').style('opacity', 0);
		
		var styles_backgroundGradient = vizuly2.svg.gradient.blend(viz, viz.getStyle('background-color-bottom'), viz.getStyle('background-color-top'));
		
		// Update the background
		selection.selectAll('.vz-background').style('fill', function () {
			 return 'url(#' + styles_backgroundGradient.attr('id') + ')';
		 })
		 .style('opacity',viz.getStyle('background-opacity'));
		
		
		//Here we select all the bars and apply filters and fills.  In the case of these styless
		//we are using **svg drop-shadow filters** and **linear gradients** for the fills.
		selection.selectAll('.vz-bar-group').each(
		 function (datum, index) {
			 d3.select(this).selectAll('rect.vz-bar')
				.style('fill', function (d, i) {
					return viz.getStyle('bar-fill', [d.data, d.rootIndex, this])
				})
				.style('fill-opacity', function (d, i) {
					return viz.getStyle('bar-fill-opacity', [d.data, d.rootIndex, this])
				})
				.style('stroke', function (d, i) {
					return viz.getStyle('bar-stroke', [d.data, d.rootIndex, this])
				})
				.style('stroke-width', function (d, i) {
					return viz.getStyle('bar-stroke-width', [d.data, d.rootIndex, this])
				})
				.style('stroke-opacity', function (d, i) {
					return viz.getStyle('bar-stroke-opacity', [d.data, d.rootIndex, this])
				})
				.style('rx', function (d, i) {
					return viz.getStyle('bar-radius', [d.data, d.rootIndex, this])
				});
			 
			 // Update value labels
			 d3.select(this).selectAll('.vz-bar-label')
				.style('display', function (d, i) {
					return viz.getStyle('value-label-show',[d.data, d.rootIndex, this]) ? 'block' : 'none'
				})
				.style('font-weight', function (d, i) {
					return viz.getStyle('value-label-font-weight', [d.data, d.rootIndex, this])
				})
				.style('fill', function (d, i) {
					return viz.getStyle('value-label-color', [d.data, d.rootIndex, this])
				})
				.style('font-size', function (d, i) {
					return viz.getStyle('value-label-font-size', [d.data, d.rootIndex, this]) + 'px'
				})
				.attr('dx', function (d, i) {
					return viz.getStyle('value-label-font-size', [d.data, d.rootIndex, scope.xScale.domain().indexOf(scope.x(d.data)), this]) / 2 * (scope.x(d.data) > 0 ? 1 : -1)
				})
		 });
		
		selection.selectAll('.vz-grid-tick, .vz-grid-line')
		 .style('stroke',function (d) { return viz.getStyle('grid-line-stroke', arguments) })
		 .style('stroke-opacity',function (d) { return viz.getStyle('grid-line-stroke-opacity', arguments) })
		
		// Update axis fonts
		selection.selectAll('.vz-left-axis')
		 .style('font-weight', function () {
			 return viz.getStyle('axis-font-weight', arguments)
		 })
		
		selection.selectAll('text.vz-left-axis')
		 .style('display', function () {
			 return viz.getStyle('y-axis-label-show', arguments) ? 'block' : 'none'
		 })
		 .style('font-style', function () {
			 return viz.getStyle('y-axis-font-style', arguments)
		 })
		 .style('font-size', function (d, i) {
			 return viz.getStyle('y-axis-font-size', [d, i]) + 'px'
		 })
		 .style('fill', function () {
			 return viz.getStyle('y-axis-label-color', arguments)
		 })
		
		
		scope.dispatch.apply('styled', viz);
		
	}
	
	function styles_onMouseOver(bar, d, i) {
		
		
		//Making style and color changes to our bar for the <code>mouseover</code>.
		d3.select(bar)
		 .style('fill', function (d, i) {
			 return viz.getStyle('bar-fill-over', [d, d.rootIndex, bar])
		 })
		 .style('fill-opacity', function (d, i) {
			 return viz.getStyle('bar-fill-opacity-over', [d, d.rootIndex, bar])
		 })
		 .style('stroke', function (d, i) {
			 return viz.getStyle('bar-stroke-over', [d, d.rootIndex, bar])
		 })
		
		//Highlight y axis label and value label.
		var group = d3.select(bar.parentNode);
		
		group.selectAll('.vz-bar-label').filter(function (e,j) { return j == i })
		 .style('font-weight','bold');
		
		group.selectAll('.vz-left-axis').filter(function (e,j) { return j == i })
		 .style('font-weight','bold');
		
		viz.showDataTip(bar, d, i);
		
	}
	
	//On <code>mouseout</code> we want to undo any changes we made on the <code>mouseover</code>.
	function styles_onMouseOut(bar, d, i) {
		
		var groupIndex = d.rootIndex
		
		d3.select(bar)
		 .style('fill', function (d) {
			 return viz.getStyle('bar-fill', [d.data, d.rootIndex, this])
		 })
		 .style('fill-opacity', function (d) {
			 return viz.getStyle('bar-fill-opacity', [d.data, d.rootIndex, this])
		 })
		 .style('stroke', function (d, i) {
			 return viz.getStyle('bar-stroke', [d.data, d.rootIndex, this])
		 })
		 .style('stroke-opacity', function (d, i) {
			 return viz.getStyle('bar-stroke-opacity', [d.data, d.rootIndex, this])
		 })
		
		
		//Finding the correct axis label and highlighting it.
		plot.selectAll('text.vz-left-axis, text.vz-bar-label')
		 .style('font-weight', null)
		
		viz.removeDataTip();
		
	}
	
	function dataTipRenderer(tip, e, d, i, j, x, y) {
		var html = '<div class="vz-tip-header1">HEADER1</div>' +
		 '<div class="vz-tip-header-rule"></div>' +
		 '<div class="vz-tip-header2"> HEADER2 </div>' +
		 '<div class="vz-tip-header-rule"></div>' +
		 '<div class="vz-tip-header3" style="font-size:12px;"> HEADER3 </div>';
		
		var h1 = scope.y(d, i);
		var h2 = scope.labelFormat(scope.x(d));
		var h3 = scope.seriesLabel(d);
		
		html = html.replace("HEADER1", h1);
		html = html.replace("HEADER2", h2);
		html = html.replace("HEADER3", h3);
		
		tip.style('height', null).html(html);
		
		return [(Number(x + barWidth/3) + Number(d3.select(e).attr('width'))), y - 50 - barWidth ]
	}
	
	// Returns our viz component
	return viz;
}