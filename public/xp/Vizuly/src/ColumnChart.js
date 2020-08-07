/*
Copyright (c) 2019, BrightPoint Consulting, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// @version 2.1.232

/**
 * The ColumnChart renders multiple series of data in a nested array
 * @class
 * @constructor
 * @extends vizuly2.viz.Generic
 * @param {DOMElement} parent - Container element that will render the component.
 */
vizuly2.viz.ColumnChart = function (parent) {
	
	var d3 = vizuly2.d3;
	
	/** @lends vizuly2.viz.ColumnChart.properties */
	var properties = {
		/**
		 * Array of Arrays. Each array represents a series of data.  Assumes each series has the same length and same collection of xScale ordinal values.
		 * @member {Array}
		 * @default Needs to be set at runtime
		 *
		 * @example
		 * [
		 *  // Series 1 (Gold)
		 *  [
		 *   {"country": "USA", "category": "Gold", "value": "1072"},
		 *   {"country": "USSR", "category": "Gold", "value": "473"},
		 *   ...
		 *  ],
		 *  // Series 2 (Silver)
		 *  [
		 *   {"country": "USA", "category": "Silver", "value": "859"},
		 *   {"country": "USSR", "category": "Silver","value": "376"},
		 *   ...
		 *  ],
		 *  // Series 3 (Bronze)
		 *  [
		 *   {"country": "USA", "category": "Bronze", "value": "749"},
		 *   {"country": "USSR", "category": "Bronze","value": "355"},
		 *   ...
		 *  ],
		 *  ...
		 * ]
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
			'bottom': '10%',
			'left': '10%',
			'right': '10%'
		},
		/**
		 * Duration (in milliseconds) of any component transitions.
		 * @member {Number}
		 * @default  500
		 */
		'duration': 500,
		/**
		 * Determines layout of Bar Chart.  Can use either 'CLUSTERED' or 'STACKED'
		 * @member {String}
		 * @default 'CLUSTERED'
		 *
		 */
		'layout': vizuly2.viz.layout.CLUSTERED,
		/**
		 * The width of each bar in pixels.  The default value of `auto` will auto size bars based on padding and chart height.
		 * @member {Number}
		 * @default  'auto'
		 */
		'barWidth': 'auto',
		/**
		 * <img src='BarChartPadding.png'><br><br>
		 * Determines space between bars within a series group.  Can be represented as a pixel (Number) or a percentage ('20%').
		 * Using a percentage will try and optimize the spacing based on the number of bars and the height of the chart.  Using a fixed number
		 * will ignore the chart "height" property and space bars a fixed distance apart, so the resulting chart height may differ.
		 * This allows for creating consistently padded charts regardless of the number of elements within the series.
		 * The default value of `auto` will auto pad bars based on number of bars and chart height.
		 * @member {String}
		 * @default auto
		 *
		 */
		'barPadding': 'auto',
		/**
		 * <img src='BarChartPadding.png'><br><br>
		 * Determines space between series groups.  Can be represented as a pixel (Number) or a percentage ('20%').
		 * Using a percentage will try and optimize the spacing based on the number of bars and the height of the chart.  Using a fixed number
		 * will ignore the chart `width` property and space series groups a fixed distance apart, so the resulting chart width may differ.
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
		 * Scale type used to measure and position bars along the x-axis.  The bar chart will try and auto-determine the scale type based on
		 * the value type being returned by the viz.y accessor.  String values will use a d3.scaleBand, date values will use a d3.scaleTime,
		 * and numeric values will use a d3.scaleLinear. The scale, or scale properties can be overridden by capturing the
		 * "measure" event and accessing/modifying the scale.
		 * @member {d3.scale}
		 * @default  d.scaleLinear()
		 * @example
		 * viz.on('measure', function () { viz.xScale().range([0, 600]) }) //Sets max width of scale to 600
		 */
		'xScale': 'undefined',
		/**
		 * Scale type used to measure and position bars along the y-axis.  The scale, or scale properties can be overridden by capturing the
		 * "measure" event and accessing/modifying the scale.
		 * @member {d3.scale}
		 * @default  undefined - set at runtime automatically
		 * @example
		 * viz.on('measure', function () { viz.yScale().range([0, 600]) }) //Sets max height of scale to 600;
		 */
		'yScale': d3.scaleLinear(),
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
		 *	 var html = '<div class="vz-tip-header1">HEADER1</div>' +
		 *	 '<div class="vz-tip-header-rule"></div>' +
		 *	 '<div class="vz-tip-header2"> HEADER2 </div>' +
		 *	 '<div class="vz-tip-header-rule"></div>' +f
		 *	 '<div class="vz-tip-header3" style="font-size:12px;"> HEADER3 </div>';
		 *
		 *	 var h1 = scope.y(d);
		 *	 var h2 = scope.x(d);
		 *	 var h3 = scope.seriesLabel(d);
		 *
		 *	 html = html.replace("HEADER1", h1);
		 *	 html = html.replace("HEADER2", h2);
		 *	 html = html.replace("HEADER3", h3);
		 *
		 *	 tip.style('height','80px').html(html);
		 *
		 *	 return [(Number(x) + Number(d3.select(e).attr('width'))),y - 50]
		 *}
		 */
		'dataTipRenderer': dataTipRenderer
		
	};
	
	var styles = {
		'background-opacity': 1,
		'background-color-top': '#FFF',
		'background-color-bottom': '#DDD',
		'value-label-color': '#444',
		'value-label-font-size': function () {
			return Math.max(8, Math.round(size.width / 85))
		},
		'value-label-font-weight': 400,
		'value-label-show': false,
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
		'bar-fill': function (d, i, groupIndex) {
			var axisColors = ['#bd0026', '#fecc5c', '#fd8d3c', '#f03b20', '#B02D5D', '#9B2C67', '#982B9A', '#692DA7', '#5725AA', '#4823AF', '#d7b5d8', '#dd1c77', '#5A0C7A', '#5A0C7A'];
			return axisColors[groupIndex % axisColors.length]
		},
		'bar-fill-opacity': function (d, i) {
			return (1 - ((i) / (scope.data.length + 1)));
		},
		'bar-fill-over': function (d, i, groupIndex) {
			var color = viz.getStyle('bar-fill',arguments);
			return d3.rgb(color).brighter()
		},
		'bar-fill-opacity-over': 1,
		'bar-radius': 0,
		'axis-font-weight': 400,
		'axis-font-size': function () {
			return Math.max(10, Math.round(size.width / 65))
		},
		'y-axis-label-show': true,
		'x-axis-label-show': true,
		'y-axis-font-style': 'normal',
		'x-axis-font-style': 'normal',
		'y-axis-label-color': '#444',
		'x-axis-label-color': '#444',
		'axis-stroke': '#777',
		'axis-opacity': .5
	}
	
	/** @lends vizuly2.viz.ColumnChart.events */
	var events = [
		/**
		 * Fires when user moves the mouse over a bar.
		 * @event vizuly2.viz.ColumnChart.mouseover
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
		 * @event vizuly2.viz.ColumnChart.mouseout
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
		 * @event vizuly2.viz.ColumnChart.click
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
		 * @event vizuly2.viz.ColumnChart.touch
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
	viz.version = '2.1.232';
	
	// Measurements
	
	var size;           // Holds the 'size' variable as defined in viz.util.size()
	var barWidth;       // measured bar width
	var groupWidth;     // measured bar group width
	var barPadding;
	var groupPadding;
	var seriesOffset = 0; //Used for scaleoffset
	var stack;          // used for the stacked bar layout
	var stackSeries;
	var axisFontSize;
	
	//These are all d3.selection objects we use to insert and update svg elements into
	var svg, g, bottomAxis, leftAxis, plot, barGroup, background, plotBackground, defs;
	
	
	// Here we set up all of our svg layout elements using a 'vz-XX' class namespace.  This routine is only called once
	// These are all place holder groups for the individual data driven display elements.   We use these to do general
	// sizing and margin layout.  The all are referenced as D3 selections.
	function initialize () {
		
		svg = scope.selection.append('svg').attr('id', scope.id).style('overflow', 'visible').attr('class', 'vizuly');
		defs = vizuly2.util.getDefs(viz);
		background = svg.append('rect').attr('class', 'vz-background');
		g = svg.append('g').attr('class', 'vz-column-viz');
		bottomAxis = g.append('g').attr('class', 'vz-bottom-axis');
		leftAxis = g.append('g').attr('class', 'vz-left-axis');
		plot = g.append('g').attr('class', 'vz-plot');
		plotBackground = plot.append('rect').attr('class', 'vz-plot-background').style('fill', '#FFF').style('fill-opacity', .01);
		
		// Tell everyone we are done initializing
		scope.dispatch.apply('initialized', viz);
	}
	
	// The measure function performs any measurement or layout calcuations prior to making any updates to the SVG elements
	function measure() {
		
		// Call our validate routine and make sure all component properties have been set
		viz.validate();
		
		// Get our size based on height, width, and margin
		size = vizuly2.util.size(scope.margin, scope.width, scope.height, scope.parent);
		
		//If we have fixed bar width then we will override the width of the component
		if (scope.barWidth != 'auto') {
			barWidth = scope.barWidth;
			barPadding = calculateBarPadding(scope.barPadding, barWidth);
			groupWidth = (scope.layout == vizuly2.viz.layout.STACKED) ? (barWidth + barPadding) : (barWidth + barPadding) * scope.data.length;
			groupPadding = calculateGroupPadding(scope.groupPadding, groupWidth);
			size.width = (groupWidth + groupPadding) * scope.data[0].length;
			size.left = (size.measuredWidth - size.width)/2;
			size.right = size.left;
		}
		else {
			// The width of each group of bars for a given data point and all of series
			groupWidth = (size.width / scope.data[0].length) * .9;
			groupPadding = calculateGroupPadding(scope.groupPadding, groupWidth);
			groupWidth = groupWidth - groupPadding;
			// The width of an individual bar for a given data point a single series
			barWidth = (scope.layout == vizuly2.viz.layout.STACKED) ? groupWidth : (groupWidth / scope.data.length);
			barPadding = calculateBarPadding((scope.layout == vizuly2.viz.layout.STACKED)  ? 0 : scope.barPadding, barWidth);
			if (barPadding > barWidth) barPadding = barWidth-2;
			barWidth = barWidth - barPadding;
		}
		
		
		// If we don't have a defined x-scale then determine one
		if (scope.xScale == 'undefined') {
			scope.xScale = vizuly2.util.getTypedScale(viz.x()(scope.data[0][0]));
		}
		
		// Set our domains for the yScale (categories)
		// Assumes ordinal scale if we have a string, otherwise min and max will do;
		if (typeof scope.x(scope.data[0][0]) == 'string') {
			scope.xScale.domain(scope.data[0].map(function (d) {
				return scope.x(d);
			}));
		}
		else {
			scope.xScale.domain([
				d3.min(scope.data[0],
				 function (d) {
					 return scope.x(d);
				 }),
				d3.max(scope.data[0], function (d) {
					return scope.x(d);
				})
			]);
		}
		
		// This assumes all series share the same key value for the x-axis and are ordered accordingly.
		stackSeries = [];
		var stackKeys = [];
		
		scope.data.forEach(function (series, i) {
			stackKeys.push('series' + i);
		})
		
		for (var columnIndex = 0; columnIndex < scope.data[0].length; columnIndex++) {
			var row = {};
			scope.data.forEach(function (series, i) {
				row['series' + i] = {}
				row['series' + i].data = series[columnIndex];
			})
			stackSeries.push(row);
		}
		
		var offset = (scope.layout == vizuly2.viz.layout.STACKED) ? d3.stackOffsetDiverging : vizuly2.util.stackOffsetBaseline;
		
		// The d3.stack handles all of the d.x and d.y measurements for various stack layouts - we will let it do its magic here
		stack = d3.stack()
		 .value(function (d, i) {
			 var datum = d[i].data;
			 return scope.y(datum);
		 })
		 .keys(stackKeys)
		 .offset(offset);
		
		// Apply the stack magic to our data - note this is a destructive operation and assumes certain properties can be mutated (x, x0, y, y0)
		stackSeries = stack(stackSeries);
		
		// We set our xScale domain based on whether we have a stacked or clustered layout
		scope.yScale.domain([
			Math.min(0, d3.min(stackSeries, function (series) { return d3.min(series, function (d) { return (scope.layout == vizuly2.viz.layout.STACKED && stackSeries.length > 1) ? d[0] : d[1]; })})),
			d3.max(stackSeries, function (series) { return d3.max(series, function (d) { return d[1]; })})
		]);
		
		// Set our ranges for each scale
		scope.yScale.range([size.height, 0]);
		
		seriesOffset = 0;
		
		var xScaleOffset = 0;
		
		if (typeof scope.xScale.clamp != 'undefined') {
			seriesOffset = (groupWidth + groupPadding)/2;
			xScaleOffset = groupWidth;
		}
		
		scope.xScale.range([0, size.width - xScaleOffset]);
		
		scope.xAxis.scale(scope.xScale);
		scope.yAxis.scale(scope.yScale);
		
		scope.xAxis.tickFormat(scope.xTickFormat).tickSize(-size.height);
		scope.yAxis.tickFormat(scope.yTickFormat).tickSize(-size.width).ticks(5);
		
		scope.size = size;
		
		// Tell everyone we are done making our measurements
		scope.dispatch.apply('measured', viz);
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
		if (String(padding).toLowerCase() == 'auto') {
			val = Math.round((size.width-(w * scope.data[0].length))/scope.data[0].length);
			if (scope.layout == vizuly2.viz.layout.STACKED) val = val * 3;
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
	
	// The update function is the primary function that is called when we want to render the visualiation based on
	// all of its set properties.  A developer can change properties of the components and it will not show on the screen
	// until the update function is called
	function update() {
		
		// Call measure each time before we update to make sure all our our layout properties are set correctly
		measure();
		
		// Layout all of our primary SVG d3.elements.
		svg.attr('width', size.measuredWidth).attr('height', size.measuredHeight);
		background.attr('width', size.measuredWidth).attr('height', size.measuredHeight);
		plot.style('width', size.width).style('height', size.height).attr('transform', 'translate(' + (size.left) + ',' + (size.top) + ')');
		bottomAxis.attr('transform', 'translate(' + (size.left + seriesOffset) + ',' + (size.top + size.height) + ')');
		leftAxis.attr('transform', 'translate(' + size.left + ',' + size.top + ')');
		plotBackground.attr('width', size.width).attr('height', size.height);
		
		// Select, create, and destroy our bar groups as needed
		barGroup = plot.selectAll('.vz-bar-group').data(stackSeries[0]);
		barGroup.exit().remove();
		barGroup = barGroup.enter().append('g').attr('class', 'vz-bar-group').merge(barGroup);
		
		// Create bars in each group - even if there is only one
		barGroup.each(function (datum, index) {
			
			var group = d3.select(this);
			
			var bars = group.selectAll('.vz-bar').data(stackSeries.map(function (series, i) {
				return series[index];
			}));
			
			bars.exit().remove();
			
			bars = bars.enter().append('rect').attr('class', 'vz-bar')
			 .attr('x', function (d, i) {
				 return i * (barWidth + barPadding);
			 })
			 .attr('height', 0).attr('y', size.height)
			 .on('mouseover', function (d, i) {
				 scope.dispatch.apply('mouseover', viz, [this, d.data['series' + i].data, i, index])
			 })
			 .on('mouseout', function (d, i) {
				 scope.dispatch.apply('mouseout', viz, [this, d.data['series' + i].data, i, index]);
			 })
			 .on('click', function (d, i) {
				 scope.dispatch.apply('click', viz, [this, d.data['series' + i].data, i, index])
			 })
			 .on('touch', function (d, i) {
				 scope.dispatch.apply('touch', viz, [this, d.data['series' + i].data, i, index])
			 })
			 .merge(bars);
			
			bars.attr('width', barWidth).attr('height',0).attr('y', scope.yScale(0));
			
			bars.transition().duration(scope.duration)
			 .attr('x', function (d, i) {
				 return (scope.layout == vizuly2.viz.layout.STACKED) ?  0 :  i * (barWidth + barPadding);
			 })
			 .attr('width', barWidth)
			 .attr('height', function (d, i) {
				 return (scope.layout == vizuly2.viz.layout.STACKED) ?  Math.abs(scope.yScale(d[1]) - scope.yScale(d[0])) : Math.abs(scope.yScale(d[1]) - scope.yScale(d[0]))
			 })
			 .attr('y', function (d, i) {
				 return (scope.layout == vizuly2.viz.layout.STACKED) ? scope.yScale(Math.max(d[0], d[1]))  : scope.yScale(Math.max(0, d[1]))
			 });
			
			var labels = d3.select(this).selectAll('.vz-bar-label').data(stackSeries.map(function (series, i) {
				return series[index];
			}));
			
			labels.exit().remove();
			
			labels = labels.enter().append('text').attr('class', 'vz-bar-label')
			 .attr('x', function (d, i) {
				 return i * (barWidth + barPadding);
			 })
			 .text(function (d,i) { return scope.labelFormat(scope.y(d.data['series' + i].data)) })
			 .merge(labels);
			
			labels.attr('x',0);
			
			labels
			 .attr('y', size.height)
			 .transition().duration(scope.duration)
			 .attr('x', function (d, i) {
				 var datum = d.data['series' + i].data;
				 var fs = viz.getStyle('value-label-font-size',[datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this]);
				 return (scope.layout == vizuly2.viz.layout.STACKED) ?  groupWidth/2:  i * (barWidth + barPadding) + (barWidth/2);
			 })
			 .attr('y', function (d, i) {
				 var datum = d.data['series' + i].data;
				 var fs = viz.getStyle('value-label-font-size',[datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this]);
				 return scope.yScale(d[1]) - fs/2;
			 })
			
			group.attr('transform', function (d, i) {
				return 'translate(' + (scope.xScale(scope.x(datum.data['series0'].data)) + (groupPadding + barPadding)/2) +  ',0)'
			});
			
			
		});
		
		
		// Update our axis labels
		bottomAxis.call(scope.xAxis);
		leftAxis.call(scope.yAxis);
		
		// Let everyone know we are doing doing our update
		// Typically themes will attach a callback to this event so they can apply styles to the elements
		scope.dispatch.apply('updated', viz);
		
	}
	
	/**
	 *  Triggers the render pipeline process to refresh the component on the screen.
	 *  @method vizuly2.viz.ColumnChart.update
	 */
	viz.update = function () {
		update();
		return viz;
	};
	
	// styless and styles
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
			 d3.select(this).selectAll('.vz-bar')
				.style('fill', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('bar-fill', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				})
				.style('fill-opacity', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('bar-fill-opacity', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				})
				.style('stroke', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('bar-stroke', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				})
				.style('stroke-width', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('bar-stroke-width', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				})
				.style('stroke-opacity', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('bar-stroke-opacity', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				})
				.style('rx', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('bar-radius', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				});
			 
			 // Update value labels
			 d3.select(this).selectAll('.vz-bar-label')
				.style('display', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('value-label-show', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this]) ? 'block' : 'none'
				})
				.style('text-anchor', function (d,i) {
					return 'middle';
				})
				.style('font-weight', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('value-label-font-weight', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				})
				.style('fill', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('value-label-color', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
				})
				.style('font-size', function (d, i) {
					var datum = d.data['series' + i].data;
					return viz.getStyle('value-label-font-size', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this]) + 'px'
				})
				.attr('dy', function (d, i) {
					var datum = d.data['series' + i].data;
					var fontSize = viz.getStyle('value-label-font-size', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)),this]);
					return (scope.layout == vizuly2.viz.layout.STACKED) ? 0 : viz.getStyle('value-label-font-size', [datum, i, scope.yScale.domain().indexOf(scope.y(datum)), this]) / 2 + (scope.y(datum) < 0 ? fontSize : -fontSize/2)
				})
				.attr('dx', function (d, i) {
					var datum = d.data['series' + i].data;
					return (scope.layout == vizuly2.viz.layout.STACKED) ? viz.getStyle('value-label-font-size', [datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this]) / 4 : 0
				})
		 });
		
		// Update axis fonts
		selection.selectAll('.vz-bottom-axis text, .vz-left-axis text')
		 .style('font-weight', function () {
			 return viz.getStyle('axis-font-weight', arguments)
		 })
		 .style('font-size', function () {
			 return viz.getStyle('axis-font-size', arguments) + 'px'
		 })
		
		selection.selectAll('.vz-bottom-axis text')
		 .style('display', function () {
			 return viz.getStyle('x-axis-label-show', arguments) ? 'block' : 'none'
		 })
		 .style('font-style', function () {
			 return viz.getStyle('x-axis-font-style', arguments)
		 })
		 .attr('dy', function (d, i) {
			 return (viz.getStyle('axis-font-size', arguments)) + 'px';
		 })
		 .style('font-size', function (d, i) {
			 return viz.getStyle('axis-font-size', arguments) + 'px'
		 })
		 .style('fill', function () {
			 return viz.getStyle('x-axis-label-color', arguments)
		 })
		 .style('text-anchor', 'middle')
		
		
		selection.selectAll('.vz-left-axis text')
		 .style('display', function () {
			 return viz.getStyle('y-axis-label-show', arguments) ? 'block' : 'none'
		 })
		 .style('font-style', function () {
			 return viz.getStyle('y-axis-font-style', arguments)
		 })
		 .style('font-size', function (d, i) {
			 return viz.getStyle('y-axis-font-size', arguments) + 'px'
		 })
		 .style('fill', function () {
			 return viz.getStyle('y-axis-label-color', arguments)
		 })
		
		// Update the bottom axis
		selection.selectAll('.vz-bottom-axis line, .vz-left-axis line')
		 .style('stroke', function () {
			 return viz.getStyle('axis-stroke')
		 })
		 .style('stroke-width', 1)
		 .style('opacity', function () {
			 return viz.getStyle('axis-opacity')
		 })
		
		selection.selectAll('.vz-left-axis').attr('font-family', null)
		selection.selectAll('.vz-bottom-axis').attr('font-family', null)
		selection.selectAll('.vz-left-axis path.domain').style('display', 'none');
		selection.selectAll('.vz-bottom-axis path.domain').style('display', 'none');
		selection.selectAll('.vz-bottom-axis line').style('display', 'none');
		
		scope.dispatch.apply('styled', viz);
		
	}
	
	function styles_onMouseOver(bar, d, i) {
		
		var groupIndex = scope.xScale.domain().indexOf(scope.x(d))
		
		//Making style and color changes to our bar for the <code>mouseover</code>.
		d3.select(bar)
		 .style('fill', function (d,i) { return viz.getStyle('bar-fill-over', [d, i, groupIndex, bar]) })
		 .style('fill-opacity', function (d,i) { return viz.getStyle('bar-over-fill-opacity', [d, i, groupIndex, bar]) })
		 .style('stroke', function (d,i) { return viz.getStyle('bar-stroke-over', [d, i, groupIndex, bar]) })
		
		//Finding the correct axis label and highlighting it.
		d3.select(bottomAxis
		 .selectAll('.tick text').nodes()[groupIndex])
		 .transition()
		 .style('font-size',function () { return viz.getStyle('axis-font-size', arguments) * 1.2 + 'px' })
		 .style('font-weight', 700)
		 .style('fill-opacity', 1)
		 .style('opacity',1);
		
		viz.showDataTip(bar, d, i);
		
	}
	
	//On <coce>mouseout</code> we want to undo any changes we made on the <code>mouseover</code>.
	function styles_onMouseOut(bar, d, i) {
		
		var groupIndex = scope.xScale.domain().indexOf(scope.x(d))
		
		d3.select(bar)
		 .style('fill', function (d) {
			 var datum = d.data['series' + i].data;
			 return viz.getStyle('bar-fill',[datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
		 })
		 .style('fill-opacity', function (d) {
			 var datum = d.data['series' + i].data;
			 return viz.getStyle('bar-fill-opacity',[datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
		 })
		 .style('stroke', function (d, i) {
			 var datum = d.data['series' + i].data;
			 return viz.getStyle('bar-stroke',[datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
		 })
		 .style('stroke-opacity', function (d, i) {
			 var datum = d.data['series' + i].data;
			 return viz.getStyle('bar-stroke-opacity',[datum, i, scope.xScale.domain().indexOf(scope.x(datum)), this])
		 })
		
		d3.select(bottomAxis
		 .selectAll('.tick text').nodes()[groupIndex])
		 .transition()
		 .style('font-size',function () { return viz.getStyle('axis-font-size', arguments) + 'px' })
		 .style('fill', function () { return viz.getStyle('x-axis-label-color',arguments)})
		 .style('font-weight', function (d,i) { return viz.getStyle('axis-font-weight',arguments)})
		
		viz.removeDataTip();
		
	}
	
	function dataTipRenderer(tip, e, d, i, j, x, y) {
		
		var html = '<div class="vz-tip-header1">HEADER1</div>' +
		 '<div class="vz-tip-header-rule"></div>' +
		 '<div class="vz-tip-header2"> HEADER2 </div>' +
		 '<div class="vz-tip-header-rule"></div>' +
		 '<div class="vz-tip-header3" style="font-size:12px;"> HEADER3 </div>';
		
		var h1 = scope.x(d);
		var h2 = scope.labelFormat(scope.y(d));
		var h3 = scope.seriesLabel(d);
		
		html = html.replace("HEADER1", h1);
		html = html.replace("HEADER2", h2);
		html = html.replace("HEADER3", h3);
		
		tip.html(html);
		
		return [x-70,Math.max(y-100, 50)]
		
	}
	
	// Returns our viz component :)
	return viz;
	
};