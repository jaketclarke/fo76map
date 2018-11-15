function ll2m(latlng) {
  return new L.LatLng((latlng.lng + 0.5) * 1.81, latlng.lat * 1.81)
};
function m2ll(point) {
  return new L.LatLng(point.lng / 1.81, (point.lat / 1.81) - 0.5)
};

var cityLayer = L.tileLayer('citytiles/{z}/{x}/{y}.jpg', {
	attribution: 'Fallout 76 &copy; Bethesda Game Studios',
	maxNativeZoom: 4
  });
var militaryLayer = L.tileLayer('militarytiles/{z}/{x}/{y}.jpg', {
	attribution: 'Fallout 76 &copy; Bethesda Game Studios',
	maxNativeZoom: 4
  });

var overlays = {
  mapmarkers: new L.layerGroup(),
  workshops: new L.layerGroup()
};

var map = L.map('map', {
	crs: L.CRS.Simple,
	zoom: 3,
	maxZoom: 6,
	center: ll2m(new L.LatLng(-25.3327, 22.9539)),
	maxBounds: [[-256, -256], [256, 256]],
	layers: [cityLayer, overlays['mapmarkers']]
  });

L.control.layers({
  "City": cityLayer,
  "Military": militaryLayer
}, {
  "Map Markers": overlays['mapmarkers'],
  "Public Workshops": overlays['workshops']
}).addTo(map);

L.control.mousePosition({
  lngFirst: true,
  lngFormatter: function (lng) {
	return (lng / 1.81).toFixed(2);
  },
  latFormatter: function (lat) {
	return ((lat / 1.81) - 0.5).toFixed(2);
  },
}).addTo(map);

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
	  iconSize: [20, 20]
	});
});

function loadJSON(name, res) {
  L.geoJSON(res.response, {
	pointToLayer: function (gjp, ll) {
	  var icon = new L.Icon.Default;
	  if (gjp.properties.type !== undefined && icons[gjp.properties.type]) {
		icon = icons[gjp.properties.type];
	  }
	  return L.marker(new L.LatLng(ll.lat * 1.81, ll.lng * 1.81), {
		icon: icon
	  }).bindPopup(gjp.properties.name);
	}
  }).addTo(overlays[name]);
}

['mapmarkers', 'workshops'].forEach(function (name) {
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.addEventListener('load', function () {
	loadJSON(name, this);
  });
  req.open('GET', 'data/' + name + '.json');
  req.send();
});