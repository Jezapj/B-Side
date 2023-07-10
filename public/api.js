"use strict"
const MAPBOX_TOKEN = "pk.eyJ1IjoidDA4OSIsImEiOiJja29hcTZ6ZW8xencyMnBydzlsNmhxOWNlIn0.qO6lUzxltTUyCBFkJzGBCQ";
const OPENCAGE_TOKEN = "c7d7af72fbb640cc86542459ae1e96d1";
const MAX_STOPS = 10;
const STATE_POSTCODE = 3000;
//Display Map to html page
mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map({
	container: 'map',
	center: [144.9648731, -37.8182711],
	zoom: 15,
	style: 'mapbox://styles/mapbox/streets-v9'
});

// Initialises the users current location. From mapbox's documentation
// https://docs.mapbox.com/mapbox-gl-js/example/locate-user/
let autogeolocate = new mapboxgl.GeolocateControl({
	positionOptions: {
		enableHighAccuracy: true
	},
	trackUserLocation: true
});
function success(pos) {
	const crd = pos.coords;
    currentCoord = [crd.longitude,crd.latitude];
	console.log('Your current position is:');
	console.log(`Latitude : ${crd.latitude}`);
	console.log(`Longitude: ${crd.longitude}`);
	console.log(`More or less ${crd.accuracy} meters.`);
  };
  let currentCoord = navigator.geolocation.getCurrentPosition(success);
  

// Add the control to the map
map.addControl(autogeolocate);
map.on('load', function() {
	autogeolocate.trigger(); //Automatically activates geolocation
});

// Adding navigation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// This is the web service request function, and is used to generate a web service request. It takes 2 parameters, the url for the web service request
// and the data that is to be sent off with the web service request
function webServiceRequest(url, data) {
	// Build URL parameters from data object.
	let params = "";
	// For each key in data object...
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			if (params.length == 0) {
				// First parameter starts with '?'
				params += "?";
			} else {
				// Subsequent parameter separated by '&'
				params += "&";
			}

			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(data[key]);

			params += encodedKey + "=" + encodedValue;
		}
	}
	let script = document.createElement('script');
	script.src = url + params;
	document.body.appendChild(script);
}
// this function takes no paramaters and is used to clear all markers on a map
function clearMarkers() {
    for (i = mapMarkers.length; i >= 0; i--) {
        mapMarkers[i].remove();
    }
}

// this function makes the web service request for forward geocoding data from parameter location string. It only accepts coordinates in australia
// , creates the data object sent with the web service request, and uses the callback function showOnMap.
function markMap(locationString) {
	let data = {
		q: locationString,
		key: OPENCAGE_TOKEN,
		countrycode: "=au",
		jsonp: "showOnMap"
		
	};
	webServiceRequest(`https://api.opencagedata.com/geocode/v1/json`, data);
}

// sets pins and adds stop to list when given successfully geocoded data. Only accepts results from victoria from results. It is the callback 
//function for markStartOnMap, and runs when the webservice request returns
function showOnMap(result) 
{
    let coordinates = [];
	let lat
	let lng
	for(let i = 0; i < result.results.length; i++)
	{
		if(Math.floor(parseInt(result.results[i].components.postcode)/STATE_POSTCODE)== 1)// if victorian address add to map
		{
			lat = result.results[0].geometry.lat;
    		lng = result.results[0].geometry.lng;
			coordinates.push(lng,lat);
			map.setCenter(coordinates); 
			let marker = new mapboxgl.Marker();
			marker.setLngLat(coordinates);
			let popup = new mapboxgl.Popup({
				offset: 45
			});
			popup.setHTML(`${result.results[0].formatted}`);
			marker.setPopup(popup);
			marker.addTo(map);
			popup.addTo(map);
			
			// add stop to array
			stops.push(new Location(result.results[0].formatted, coordinates));// add stop to stops array as location class instance
			drawLine();
			return coordinates;
		}
		else if(Math.floor(parseInt(result.results[i].components.postcode)/STATE_POSTCODE)!= 1)// alert if not victorian address
		{
			alert("Please enter a valid Victorian address containing street number, street name, and suburb")
			break
		}
	}
}

// this function makes the web service request for forward geocoding data from parameter location string. It only accepts coordinates in australia
// , creates the data object sent with the web service request, and uses the callback function showStartOnMap.
function markStartOnMap(locationString) {
	let data = {
		q: locationString,
		key: OPENCAGE_TOKEN,
		countrycode: "=au",
		jsonp: "showStartOnMap"
		
	};
	webServiceRequest(`https://api.opencagedata.com/geocode/v1/json`, data);
}


// sets pins and adds stop to list when given successfully geocoded data. only accepts victorian addresses from results. It is the callback 
//function for markStartOnMap, and runs when the webservice request returns
function showStartOnMap(result) 
{
	let coordinates = [];
	let lat
	let lng
	for(let i = 0; i < result.results.length; i++)
		{
			if(Math.floor(parseInt(result.results[i].components.postcode)/STATE_POSTCODE)== 1)// if victorian address show on map
			{
				lat = result.results[0].geometry.lat;
				lng = result.results[0].geometry.lng;
				coordinates.push(lng,lat);
				map.setCenter(coordinates); 
				let marker = new mapboxgl.Marker();
				marker.setLngLat(coordinates);
				let popup = new mapboxgl.Popup({
					offset: 45
				});
				popup.setHTML(`${result.results[0].formatted}`);
				marker.setPopup(popup);
				marker.addTo(map);
				popup.addTo(map);
			  
				startingPoint = new Location(result.results[0].formatted, coordinates);// add starting point as new location class instance
			
				drawLine();
				return coordinates;
			}
			else if(Math.floor(parseInt(result.results[i].components.postcode)/STATE_POSTCODE)!= 1)// if not victorian alert
			{
				alert("Please enter a valid Victorian address containing street number, street name, and suburb")
				break
			}
		}
}
// this function takes one paramater, the id of the layer to be removed, and is used to remove layers on the map whenever a new layer is added
function removeLayerWithId(idToRemove)
{
	let hasPoly = map.getLayer(idToRemove)
	if (hasPoly !== undefined)
	{
		map.removeLayer(idToRemove)
		map.removeSource(idToRemove)
	}
}
//this function takes no parameters, and is used to add route lines to the maps by creating a layer with lines joining points of interest.
function drawLine()
{
    removeLayerWithId('routes');
	if ( map.getLayer('routes') == undefined)
            {
				let object = {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: []
                        }
                    }
                };
				if (startingPoint == null)
				{
					startingPoint = retrieveData(LOCATION_KEY);
				}
				let addy = startingPoint.coordinates
                object.data.geometry.coordinates.push(addy);
				for(let i = 0; i < stops.length; i++)
                {
					object.data.geometry.coordinates.push(stops[i].coordinates);
                }
				map.addLayer(
					{
						id: "routes",
						type: "line",
						source: object,
						layout: { 
							"line-join": "round", 
							"line-cap": "round" 
						},
						paint: { 
							"line-color": "#FF0000", 
							"line-width": 6 
						}
					}
				);
			}
	};


	