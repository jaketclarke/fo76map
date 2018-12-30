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
    hardpoints: new L.layerGroup()
};

// inital map zoom placement
var mapCentre = ll2m(new L.LatLng(-25.3327, 22.9539));

// layer control panel
var layerControl = L.control.layers({
    "City": cityLayer,
    "Military": militaryLayer
}, {
    // "Map Markers": overlays['mapmarkers'],
    "Map Markers": overlays['mapmarkers'],
    "Public Workshops": overlays['workshops'],
    "Bobbleheads": overlays['bobbleheads'],
    "Powerarmors": overlays['powerarmors'],
    "Fusion Cores": overlays['fusioncores'],
    "Deposits": overlays['hardpoints']
});

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
    layers: [cityLayer, overlays['mapmarkers']]
});

// map layer

// get data, call function that defines loading it

var testJSON = jquery.getJSON('data/mapmarkerstest.json');
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
    }).addTo(map);
};

marker_23 = new L.AwesomeMarkers.icon({
  icon:'trophy',
  iconColor: '#ffd123',
  markerColor: 'black'
});


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
  
  return icon;
}

// add layers
layerControl.addTo(map);

// add position
mousePosition.addTo(map);

// ['workshops', 'bobbleheads', 'powerarmors', 'fusioncores', 'hardpoints'].forEach(function (name) {
//   var req = new XMLHttpRequest();
//   req.responseType = 'json';
//   req.addEventListener('load', function () {
// 	loadJSON(name, this);
//   });
//   req.open('GET', 'data/' + name + '.json');
//   req.send();
// });

