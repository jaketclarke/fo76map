// pull in leaflet packages we are using
var L = require('leaflet');
var lam = require('leaflet.awesome-markers');
var lmp = require('leaflet-mouse-position');
var la = require('leaflet-ajax');
var jquery = require('jquery');

// use the fontawesome iconset
L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';

// setup 'latlng' for this fallout map
function ll2m(latlng) {
    return new L.LatLng((latlng.lng + 0.5) * 1.81, latlng.lat * 1.81)
};
function m2ll(point) {
    return new L.LatLng(point.lng / 1.81, (point.lat / 1.81) - 0.5)
};

// tile layers
var cityLayer = L.tileLayer('citytiles/{z}/{x}/{y}.jpg', {
    attribution: 'Fallout 76 &copy; Bethesda Game Studios',
    maxNativeZoom: 4
});

var militaryLayer = L.tileLayer('militarytiles/{z}/{x}/{y}.jpg', {
    attribution: 'Fallout 76 &copy; Bethesda Game Studios',
    maxNativeZoom: 4
});

// overlay layers
var overlays = {
    mapmarkers: new L.layerGroup(),
    workshops: new L.layerGroup(),
    bobbleheads: new L.layerGroup(),
    powerarmors: new L.layerGroup(),
    fusioncores: new L.layerGroup(),
    hardpoints: new L.layerGroup(),
    jakestest: new L.layerGroup()
};

// inital map zoom placement
var mapCentre = ll2m(new L.LatLng(-25.3327, 22.9539));

// layer control panel
var layerControl = L.control.layers({
    "City": cityLayer,
    "Military": militaryLayer
}, {
    "Map Markers": overlays['jakestest']
}
);

// mouse position controller
var mousePosition = L.control.mousePosition({
    lngFirst: true,
    lngFormatter: function (lng) {
        return (lng / 1.81).toFixed(2);
    },
    latFormatter: function (lat) {
        return ((lat / 1.81) - 0.5).toFixed(2);
    },
});

// map
var map = L.map('map', {
    crs: L.CRS.Simple,
    zoom: 3,
    maxZoom: 6,
    center: mapCentre,
    maxBounds: [[-256, -256], [256, 256]],
    layers: [cityLayer, overlays['jakestest']]
});

// map layer

// get data, call function that defines loading it

var testJSON = jquery.getJSON('data/data.json');

testJSON.done(function(response) {
    testMapLayerMaker(response)
});

function testMapLayerMaker(res) {
    L.geoJSON(res, {
      pointToLayer: function (gjp, ll) {
        var icon = iconChooser(gjp)
        return L.marker(ll, {
          icon: icon
        }).bindPopup(iconPopup(gjp));//.bindPopup(gjp.properties.name);
      },
      coordsToLatLng(coords) {
          return new L.LatLng(coords[1] * 1.81, coords[0] * 1.81);
      }
    }).addTo(overlays['jakestest'])
};

icons = [];

marker_1 = new L.AwesomeMarkers.icon({
    icon:'house',
    iconColor: '#c0211a',
    markerColor: 'green'
});

marker_23 = new L.AwesomeMarkers.icon({
  icon:'trophy',
  iconColor: '#ffd123',
  markerColor: 'black'
});

icons['r_junk'] = new L.AwesomeMarkers.icon({
	icon: 'trash',
	iconColor: 'white',
	markerColor: 'black'
});

/* Black Titanium */
icons['r_blacktitanium'] = new L.AwesomeMarkers.icon({
	icon: 'cubes',
	iconColor: 'white',
	markerColor: 'black'
});

// /* Uranium */
// icons[3517888] = new L.AwesomeMarkers.icon({
// 	icon: 'exclamation-circle',
// 	iconColor: '#00FF00',
// 	markerColor: 'black'
// });
// /* Acid */
// icons[1629307] = new L.AwesomeMarkers.icon({
// 	icon: 'flask',
// 	iconColor: '#8FFE09',
// 	markerColor: 'black'
// });
// /* Wood */
// icons[2859477] = new L.AwesomeMarkers.icon({
// 	icon: 'tree',
// 	iconColor: 'green',
// 	markerColor: 'black'
// });
// /* Oil */
// icons[1635503] = new L.AwesomeMarkers.icon({
// 	icon: 'tint',
// 	iconColor: 'aqua',
// 	markerColor: 'black'
// });
// /* Crystal */
// icons[3302443] = new L.AwesomeMarkers.icon({
// 	icon: 'diamond',
// 	iconColor: 'white',
// 	markerColor: 'black'
// });
// /* Gravel */
// icons[1635590] = new L.AwesomeMarkers.icon({
// 	icon: 'th',
// 	iconColor: 'white',
// 	markerColor: 'black'
// });
// /* Phosphate */
// icons[3952139] = new L.AwesomeMarkers.icon({
// 	icon: 'fire',
// 	iconColor: 'red',
// 	markerColor: 'black'
// });
// /* Coal */
// icons[3517872] = new L.AwesomeMarkers.icon({
// 	icon: 'cog',
// 	iconColor: 'white',
// 	markerColor: 'black'
// });
// /* Gold */
// icons[3517877] = new L.AwesomeMarkers.icon({
// 	icon: 'trophy',
// 	iconColor: '#ffd123',
// 	markerColor: 'black'
// });
// /* Silver */
// icons[3517885] = new L.AwesomeMarkers.icon({
// 	icon: 'trophy',
// 	iconColor: '#c0c0c0',
// 	markerColor: 'black'
// });
// /* Iron */
// icons[3517879] = new L.AwesomeMarkers.icon({
// 	icon: 'bars',
// 	iconColor: 'white',
// 	markerColor: 'black'
// });
// /* Lead */
// icons[3517882] = new L.AwesomeMarkers.icon({
// 	icon: 'pencil',
// 	iconColor: 'white',
// 	markerColor: 'black'
// });
// /* Aluminium */
// icons[3517865] = new L.AwesomeMarkers.icon({
// 	icon: 'paperclip',
// 	iconColor: 'white',
// 	markerColor: 'black'
// });

function iconPopup(gjp){
  var title = gjp.properties.name;
  var body = gjp.properties.type;
  var url = '';

  if (gjp.properties.name) url = '<a href="http://fallout.wikia.com/wiki/'+encodeURIComponent(gjp.properties.name)+'" target="_blank">Wiki Link</a>';
  return '<div class=fo76-leaflet-popup><b>'+title+'</b><br />'+url+'<br />'+body+'</div>';
}

function iconChooser(gjp) {
  // default
  var icon = new L.AwesomeMarkers.icon();

  if (gjp.properties.type == 23){icon = marker_23}
  if (gjp.properties.type == 1){icon = marker_1}
  if (gjp.properties.name == 'Black Titanium Deposit') {icon = icons['r_blacktitanium']}
  if (gjp.properties.name == 'Junk Pile') {icon = icons['r_junk']}
 
  return icon;
}

// add layers
layerControl.addTo(map);

// add position
mousePosition.addTo(map);
