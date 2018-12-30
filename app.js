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
    console.log(response)
    testMapLayerMaker(response)
});

function testMapLayerMaker(res) {
    console.log(res)
    L.geoJSON(res, {
      pointToLayer: function (gjp, ll) {
        var icon = new L.AwesomeMarkers.icon({
            icon: 'cog',
            iconColor: '#C88033',
            markerColor: 'black'
        });
        return L.marker(ll, {
          icon: icon
        }).bindPopup(gjp.properties.name);
      },
      coordsToLatLng(coords) {
          return new L.LatLng(coords[1] * 1.81, coords[0] * 1.81);
      }
    }).addTo(map);
};

// add layers
layerControl.addTo(map);

// add position
mousePosition.addTo(map);

var icons = {};
["cave", "city", "encampment", "factory", "monument",
  "metro", "military_base", "landmark", "office", "town_ruins",
  "urban_ruins", "sanc_hills", "settlement", "sewer", "vault",
  "airfield", "camper", "car", "church", "country_club",
  "custom_house", "drive_in", "elevated_highway", "farm", "filling_station",
  "forested", "goodneighbor", "graveyard", "hospital", "industrial_dome",
  "industrial_stacks", "institute", "irish_pride", "junkyard", "observatory",
  "pier", "pond_lake", "quarry", "radioactive_area", "radio_tower",
  "salem", "school", "shipwreck", "submarine", "swan_pond",
  "town", "bos", "brownstone", "bunker", "castle",
  "skyscraper", "libertalia", "low_rise", "minutemen", "police_station",
  "railroad_faction", "railroad", "satellite", "sentinel", "uss_constitution",
  "mechanist", "raider_settlement", "vassal_settlement", "potential_vassal_settlement", "train_station",
  "electrical_substation", "fissure", "vault63", "vault76", "vault94",
  "vault96", "amusement_park", "mansion", "arktos_pharma", "power_plant",
  "ski_resort", "appalachian_antiques", "teapot", "agricultural_center", "wood_shack",
  "house_trailer", "lookout_tower", "overlook", "pumpkin", "cow_spots_creamery",
  "cabin", "train_track", "capital_building", "high_tech_building", "lighthouse",
  "excavator", "space_station", "palace_winding_path", "top_of_the_world", "dam",
  "monorail", "whitespring_resort", "nuka_cola_quantum_plant", "mysterious_guidestone", "public_workshop",
  "door", "quest", "door", "quest", "player_set",
  "player_loc", "power_armor_loc", "teammate", "last_corpse", "your_camp",
  "in_world_event", "nuked_zone", "waypoint"
].forEach(function (name, key) {
  icons[key] = new L.icon({
	  iconUrl: 'icons/' + name + '.png',
	  iconSize: [35, 35]
	});
});

/* Copper */
icons[3517874] = new L.AwesomeMarkers.icon({
	icon: 'cog',
	iconColor: '#C88033',
	markerColor: 'black'
});
/* Junk */
icons[99270] = new L.AwesomeMarkers.icon({
	icon: 'trash',
	iconColor: 'white',
	markerColor: 'black'
});
/* Black Titanium */
icons[3517869] = new L.AwesomeMarkers.icon({
	icon: 'cubes',
	iconColor: 'white',
	markerColor: 'black'
});
/* Uranium */
icons[3517888] = new L.AwesomeMarkers.icon({
	icon: 'exclamation-circle',
	iconColor: '#00FF00',
	markerColor: 'black'
});
/* Acid */
icons[1629307] = new L.AwesomeMarkers.icon({
	icon: 'flask',
	iconColor: '#8FFE09',
	markerColor: 'black'
});
/* Wood */
icons[2859477] = new L.AwesomeMarkers.icon({
	icon: 'tree',
	iconColor: 'green',
	markerColor: 'black'
});
/* Oil */
icons[1635503] = new L.AwesomeMarkers.icon({
	icon: 'tint',
	iconColor: 'aqua',
	markerColor: 'black'
});
/* Crystal */
icons[3302443] = new L.AwesomeMarkers.icon({
	icon: 'diamond',
	iconColor: 'white',
	markerColor: 'black'
});
/* Gravel */
icons[1635590] = new L.AwesomeMarkers.icon({
	icon: 'th',
	iconColor: 'white',
	markerColor: 'black'
});
/* Phosphate */
icons[3952139] = new L.AwesomeMarkers.icon({
	icon: 'fire',
	iconColor: 'red',
	markerColor: 'black'
});
/* Coal */
icons[3517872] = new L.AwesomeMarkers.icon({
	icon: 'cog',
	iconColor: 'white',
	markerColor: 'black'
});
/* Gold */
icons[3517877] = new L.AwesomeMarkers.icon({
	icon: 'trophy',
	iconColor: '#ffd123',
	markerColor: 'black'
});
/* Silver */
icons[3517885] = new L.AwesomeMarkers.icon({
	icon: 'trophy',
	iconColor: '#c0c0c0',
	markerColor: 'black'
});
/* Iron */
icons[3517879] = new L.AwesomeMarkers.icon({
	icon: 'bars',
	iconColor: 'white',
	markerColor: 'black'
});
/* Lead */
icons[3517882] = new L.AwesomeMarkers.icon({
	icon: 'pencil',
	iconColor: 'white',
	markerColor: 'black'
});
/* Aluminium */
icons[3517865] = new L.AwesomeMarkers.icon({
	icon: 'paperclip',
	iconColor: 'white',
	markerColor: 'black'
});

function loadJSON(name, res) {
  L.geoJSON(res.response, {
	pointToLayer: function (gjp, ll) {
	  var icon = new L.Icon.Default;
	  if (gjp.properties.type !== undefined && icons[gjp.properties.type]) {
		icon = icons[gjp.properties.type];
	  }
	  var iconColor = 'white';
	  if (gjp.properties.icon_color !== undefined) {
		iconColor = gjp.properties.icon_color;
	  }
	  var markerColor = 'blue';
	  if (gjp.properties.marker_color !== undefined) {
		markerColor = gjp.properties.marker_color;
	  }
	  if (gjp.properties.icon !== undefined) {
		icon = L.AwesomeMarkers.icon({
			icon: gjp.properties.icon,
			iconColor: iconColor,
			markerColor: markerColor
		});
	  }
	  return L.marker(ll, {
		icon: icon
	  }).bindPopup(gjp.properties.name);
	},
	coordsToLatLng(coords) {
		return new L.LatLng(coords[1] * 1.81, coords[0] * 1.81);
	}
  }).addTo(overlays[name]);
}

['workshops', 'bobbleheads', 'powerarmors', 'fusioncores', 'hardpoints'].forEach(function (name) {
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.addEventListener('load', function () {
	loadJSON(name, this);
  });
  req.open('GET', 'data/' + name + '.json');
  req.send();
});

