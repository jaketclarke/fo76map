// Initialize leaflet.js
var L = require('leaflet');
var lam = require('leaflet.awesome-markers');
var lmp = require('leaflet-mouse-position');

// Initialize the map
var map = L.map('map', {
    scrollWheelZoom: false
});

// Set the position and zoom level of the map
map.setView([47.70, 13.35], 7);

// Initialize the base layer
var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([47.1, 13.34], {
    icon: L.AwesomeMarkers.icon({
        icon: 'spinner',
        prefix: 'fa',
        markerColor: 'red',
        spin:true
    })
}).addTo(map);

L.control.mousePosition().addTo(map);