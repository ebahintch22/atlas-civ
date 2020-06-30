// html element that holds the chart
var viz_container;

var styles = {
	'background-opacity': 0,
	'background-color-top': '#0000FF',
	'background-color-bottom': '#0000FF',
	'value-label-color': {'value-label-color': '#0000FF', 'value-label-show' : true},
	'value-label-font-size': {'value-label-font-size': 16, 'value-label-show': true},
	'value-label-font-weight': {'value-label-font-weight': 'bold', 'value-label-show' : true},
	'value-label-show': false,
	'bar-stroke': {'bar-stroke': '#0000FF', 'bar-stroke-opacity': 1, 'bar-stroke-width': 2},
	'bar-stroke-opacity': .5,
	'bar-stroke-over': {'bar-stroke-over': '#FFFF00', 'bar-stroke': '#FFFF00', 'bar-stroke-opacity': 2},
	'bar-stroke-width': {'bar-stroke-width': 3, 'bar-stroke': '#0000FF', 'bar-stroke-opacity': 1},
	'bar-fill': '#0000FF',
	'bar-fill-opacity': .25,
	'bar-fill-over':  {'bar-fill-over': '#FFFF00','bar-fill': '#FFFF00'},
	'bar-fill-opacity-over': {'bar-fill-opacity-over': 1, 'bar-fill-opacity': 1},
	'bar-radius': 5,
	'y-axis-font-weight': {'axis-font-weight': 700, 'y-axis-label-color': '#0000FF', 'x-axis-label-color': '#0000FF'},
	'y-axis-label-show': false,
	'y-axis-font-style': 'italic',
	'y-axis-font-size': 16,
	'y-axis-label-color': '#0000FF',
	'grid-line-stroke': '#0000FF',
	'grid-line-stroke-opacity': 1,
}


/*
		'background-opacity': 1,
		'background-color-top': '#FFF',
		'background-color-bottom': '#DDD',
		'value-label-color': '#444',
		'value-label-font-size': function () {
			return Math.max(10, Math.round(size.width / 85))
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
			return d3.scaleLinear().range([Math.min(barWidth * .45, 18), 10]).domain([0, scope.maxDrillDepth])(d.depth);
		},
		'y-axis-label-show': true,
		'y-axis-font-style': 'normal',
		'y-axis-label-color': '#444'
	}
 */

var defaultStyles = {};


var blueStyles =
 {
	 'background-color-top': '#039FDB',
	 'background-color-bottom': '#021F51',
	 'value-label-color': '#FFF',
	 'x-axis-label-color': '#FFF',
	 'y-axis-label-color': '#FFF',
	 'bar-fill': '#02C3FF',
	 'bar-stroke': '#039FDB',
	 'axis-stroke': '#FFF',
	 'bar-radius': 0,
	 'grid-line-stroke': '#FFF',
	 'grid-line-stroke-opacity': .85
 }

var pinkStyles =
 {
	 'background-color-top': '#C12780',
	 'background-color-bottom': '#540936',
	 'value-label-color': '#FFF',
	 'x-axis-label-color': '#FFF',
	 'y-axis-label-color': '#FFF',
	 'bar-fill': '#ff83de',
	 'bar-stroke': '#C12780',
	 'axis-stroke': '#FFF',
	 'bar-radius': 0,
	 'grid-line-stroke': '#FFF',
	 'grid-line-stroke-opacity': .85
 }

var neonStyles =
 {
	 'background-color-top': '#474747',
	 'background-color-bottom': '#000000',
	 'value-label-color': '#FFF',
	 'x-axis-label-color': '#FFF',
	 'y-axis-label-color': '#FFF',
	 'bar-fill': '#D1F704',
	 'axis-stroke': '#FFF',
	 'bar-radius': function (d, i, groupIndex, e) {
		 return Number(d3.select(e).attr("height")) / 2;
	 },
	 'grid-line-stroke': '#FFF',
	 'grid-line-stroke-opacity': .85
 }

 
var minimalStyles =
 {
	 'background-color-top': '#F0F0F0',
	 'background-color-bottom': '#F0F0F0',
	 'value-label-color': '#444',
	 'x-axis-label-color': '#444',
	 'y-axis-label-color': '#444',
	 'bar-fill': '#555',
	 'bar-fill-over': '#000',
	 'axis-stroke': '#777',
	 'bar-stroke': '#333',
	 'bar-radius': 0,
	 'grid-line-stroke-opacity': .5
 }


//This changes the size of the component by adjusting the radius and width/height;
function changeSize(val) {
	var s = String(val).split(",");
	d3.select('#viz_container').style('width', s[0] + 'px').style('height', s[1] + 'px');
	viz.update();
}

function changeStyles(val) {
	var styles = this[val];
	viz.clearStyles();
	viz.applyStyles(styles);
	viz.update();
}

function changeSeries(val) {
	dataField = val;
	viz.update();
}

function changeGridLines(val) {
	var gridLines = (Number(val) === 0) ? false : true;
	viz.showGridLines(gridLines).update();
}

function runDemo() {
	
	// Demo menu options
	demoOptions = [
		{
			'name': 'Display',
			'values': [
				{'label': '1000px - 1000px', 'value': '1000,1000'},
				{'label': '800px - 800px', 'value': '800,800'},
				{'label': '375px - 667px', 'value': '375,667'},
				{'label': '320px - 568px', 'value': '320,568'}
			],
			'callback': changeSize
		},
		{
			'name': 'Theme',
			'values': [
				{'label': 'Default', 'value': 'defaultStyles', 'selected': true},
				{'label': 'Blue', 'value': 'blueStyles'},
				{'label': 'Pink', 'value': 'pinkStyles'},
				{'label': 'Neon', 'value': 'neonStyles'},
				{'label': 'Minimal', 'value': 'minimalStyles'}
			],
			'callback': changeStyles
		},
		{
			'name': 'Series',
			'values': [
				{'label': 'Federal', 'value': 'Federal', 'selected': true},
				{'label': 'State', 'value': 'State'},
				{'label': 'Local', 'value': 'Local'},
			],
			'callback': changeSeries
		},
		{
			'name': 'Grid Lines',
			'values': [
				{'label': 'Show', 'value': '1', 'selected': true},
				{'label': 'Hide', 'value': '0'}
			],
			'callback': changeGridLines
		}
	]
	
	var title = window.location.href.indexOf('nologo') > -1 ? '' : 'vizuly 2.0 - nested bar chart';
	createDemoMenu(demoOptions, 600, 600, title, styles);
	
}

