"use strict";

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	  .register('sw.js')
	  .then(() => { console.log('Service Worker Registered'); });
  }

let theme = "wh";
function modeLoad()
{
	if (theme != retrieveData(COLOR_MODE))
	{
		modeChange();
	}
}

function modeChange()
{
  let headColor = document.querySelector('.mdl-layout__header').style.color;
  if (theme == "wh")
     {
	  document.querySelector('main').style.cssText = "background-color: white !important;";
      document.querySelector('.mdl-layout__header').style.cssText = "color: white !important; background-color: black !important;";
      document.querySelector('.mdl-layout__drawer').style.cssText = "color: white !important; background-color: black !important;";
      document.querySelector('#show-dialog').style.cssText = "color: white !important; background-color: black !important; position: relative; margin-top: -5%; width: 30%;";
      document.querySelector('#show-dialog2').style.cssText = "color: white !important; background-color: black !important; position: relative; margin-top: -5%; width: 30%;";
	  document.querySelector('.mdl-dialog').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('dialog').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('.mdl-dialog__content').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('.mdl-dialog button').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('.mdl-button.close').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('#mdl-dialog2').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('#mdl-dialog2 button').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('#mdl-dialog2 .mdl-dialog__content ').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('#mdl-dialog2 .mdl-dialog__actions ').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('#mdl-dialog2 .mdl-button').style.cssText = "color: white !important; background-color: black !important;";
	  document.querySelector('.mdl-layout__content').style.cssText = "background-color: black !important;";
	  
	  
	
      theme = "bl";
	  storeData(theme,COLOR_MODE);
     }
  else if(theme == "bl")
      {
		document.querySelector('main').style.cssText = "background-color: black !important;";
        document.querySelector('.mdl-layout__header').style.cssText = "color: black !important; background-color: white !important;";
        document.querySelector('.mdl-layout__drawer').style.cssText = "color: black !important; background-color: white !important;";
        document.querySelector('#show-dialog').style.cssText = "color: white !important; position: relative; margin-top: -5%; width: 30%;";
        document.querySelector('#show-dialog2').style.cssText = "color: white !important; position: relative; margin-top: -5%; width: 30%;";
		document.querySelector('.mdl-dialog').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('dialog').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('.mdl-dialog__content').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('.mdl-dialog button').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('.mdl-button.close').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('#mdl-dialog2').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('#mdl-dialog2 button').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('#mdl-dialog2 .mdl-dialog__content ').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('#mdl-dialog2 .mdl-dialog__actions ').style.cssText = "color: black !important; background-color: white !important;";
		document.querySelector('#mdl-dialog2 .mdl-button').style.cssText = "color: black !important; background-color: white !important;";
	  document.querySelector('.mdl-layout__content').style.cssText = "background-color: white !important;";
		
		
		
      
        
        theme = "wh";
		storeData(theme,COLOR_MODE);
      }
}
/////Dialog//// host room
let hostDia = document.getElementById("mdl-dialogH");
let joinCode = Math.floor(Math.random()*1000);

hostDia.innerHTML = ``;
let ccontent = `
                        <h4 class="mdl-dialog__title">Hosting Room</h4>
                        <div class="mdl-dialog__content">
                          <p>
                            Use the code ${joinCode} to join this room.
                          </p>
                        </div>
                        <div class="mdl-dialog__actions">
                          <button type="button" class="mdl-button close">Cancel</button>
                        </div>
                      </dialog>`
hostDia.innerHTML = ccontent;
var dialog = document.querySelector('dialog');
var dialogH = document.querySelector('#mdl-dialogH');
var showDialogButton = document.querySelector('#show-dialog');
if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
  dialog.close();
  
});
dialog.querySelector('.agree').addEventListener('click', function() {
  dialog.close();
  dialogH.showModal();
dialogH.querySelector('.close').addEventListener('click', function() {
	dialogH.close();
});
});




//Join room
var dialog2 = document.querySelector('#mdl-dialog2');

var showDialogButton2 = document.querySelector('#show-dialog2');
if (! dialog2.showModal) {
  dialogPolyfill.registerDialog(dialog2);
}
showDialogButton2.addEventListener('click', function() {

  dialog2.showModal();
});
dialog2.querySelector('.close').addEventListener('click', function() {
  dialog2.close();
  
});
dialog2.querySelector('.agree').addEventListener('click', function() {
  dialog2.close();

});
//Search 

    var dialogS = document.querySelector('#mdl-dialogS');
    var showDialogButtonS = document.querySelector('#searchC');
    if (! dialogS.showModal) {
      dialogSPolyfill.registerDialog(dialogS);
    }
    showDialogButtonS.addEventListener('click', function() {
      dialogS.showModal();
    });
    dialogS.querySelector('.close').addEventListener('click', function() {
      dialogS.close();
    });
	dialogS.querySelector('.agree').addEventListener('click', function() {
		dialogS.close();
	  
	  });




///Map///
//Storage keys
const LOCATION_KEY = "locationStore";
const BOOKINGS_ARRAY_KEY = "bookingArrayStore";
const TAXI_KEY = "taxiStore";
const BOOKING_KEY = "bookingStore";
const COLOR_MODE = "colorMode";


/*
function updateDisplay1
This function takes no parameters and updates display of upcoming bookings page onload to show the current upcoming bookings. 
it generates the html to display the list, repeating the html generation with the relevant data for the number of upcoming bookings
*/
// ! UPCOMING BOOKINGS
function updateDisplay1() {
	// localStorage.clear();
	let output = document.getElementById("upcomingList");// define the optput are on html page
	let bookArr = retrieveData(BOOKINGS_ARRAY_KEY);// retrieve bookings array from local storage
	console.log(bookArr);
	//For Upcoming Bookings
	if (bookArr == null) // if there are no upcoming bookings, display message
    {
		output.innerHTML = `<center>No Bookings made yet.</center>`;
		return 0;
	}
	let list = `<H3>Upcoming Bookings</H3>
                            <ul class="demo-list-three mdl-list">`// add list title and start list html
	for (let booking = 0; booking < bookArr._bookingHistory.length; booking++) // for each booking in booking array, create a date object for booking date
    {
		let dateTimeBooking = new Date(`${bookArr._bookingHistory[booking]._bookingDate}T${bookArr._bookingHistory[booking]._bookingTime}:00`);

		let intermStopsList = ""; // define intermediate stop list
		for (let stopIndex = 0; stopIndex < bookArr._bookingHistory[booking]._stops.length; stopIndex++) {
			let stopName = bookArr._bookingHistory[booking]._stops[stopIndex]._address.split(',')[0];
			if (stopIndex == bookArr._bookingHistory[booking]._stops.length - 1) {
				intermStopsList += `${stopName}`;
			} else {
				intermStopsList += `${stopName}, `;
			}
		}
		console.log([intermStopsList]);

		if (dateTimeBooking >= Date.now()) //if the date object of each booking is greater than the current date, then generate html to display them as a list
		{
			list += `<li class="mdl-list__item mdl-list__item--three-line" id="output">
                                    <span class="mdl-list__item-primary-content">
                                        <i class="material-icons mdl-list__item-avatar">local_taxi</i>
                                        <span><b>${dateTimeBooking.toLocaleString('en-AU')}</b></span>
                                        <span class="mdl-list__item-text-body" >
                                            Pickup Location: <b>${bookArr._bookingHistory[booking]._pickupLocation._address.split(',')[0]}</b>;
                                            Stops: <b>${intermStopsList}</b>;
                                            Taxi Type: <b>${bookArr._bookingHistory[booking]._taxi.type}</b>
                                            Fare: $<b>${bookArr._bookingHistory[booking]._fare}</b>
                                            Distance: <b>${bookArr._bookingHistory[booking]._distance}KM</b>
                                        </span>
                                    </span>
                                    <span class="mdl-list__item-secondary-content">
                                        <a class="mdl-list__item-secondary-action" onclick="storeData(${booking}, BOOKING_KEY)" href="view.html"><i class="material-icons">visibility</i></a>
                                    <span class="mdl-list__item-secondary-content">
                                        <a class="mdl-list__item-secondary-action" onclick="storeData(${booking}, BOOKING_KEY)" href="edit.html"><i class="material-icons">mode_edit</i></a>
                                    </span>
                                    </li>`;
		}
	}
	output.innerHTML = list;// make div contain the list html
}

/*
function updateDisplay1
This function takes no parameters and updates display of completed bookings page onload to show the current completed bookings. 
it generates the html to display the list, repeating the html generation with the relevant data for the number of completed bookings
*/
// ! PREVIOUS BOOKINGS
function updateDisplay2() 
{
	// localStorage.clear();
	let output = document.getElementById("completedList");// define the optput are on html page
	let bookArr = retrieveData(BOOKINGS_ARRAY_KEY);// retrieve bookings array from local storage
	console.log(bookArr);
	//For Upcoming Bookings
	if (bookArr == null) // if there are no upcoming bookings, display message
    {
		output.innerHTML = `<center>No Bookings made yet.</center>`;
		return 0;
	}
	let list = `<H3>Completed Bookings</H3>
                            <ul class="demo-list-three mdl-list">`// add list title and start list html
	for (let booking = 0; booking < bookArr._bookingHistory.length; booking++) // for each booking in booking array, create a date object for booking date
    {
		let dateTimeBooking = new Date(`${bookArr._bookingHistory[booking]._bookingDate}T${bookArr._bookingHistory[booking]._bookingTime}:00`);

		let intermStopsList = ""; // define intermediate stop list
		for (let stopIndex = 0; stopIndex < bookArr._bookingHistory[booking]._stops.length; stopIndex++) {
			let stopName = bookArr._bookingHistory[booking]._stops[stopIndex]._address.split(',')[0];
			if (stopIndex == bookArr._bookingHistory[booking]._stops.length - 1) {
				intermStopsList += `${stopName}`;
			} else {
				intermStopsList += `${stopName}, `;
			}
		}
		console.log([intermStopsList]);

		if (dateTimeBooking < Date.now()) //if the date object of each booking is greater than the current date, then generate html to display them as a list
		{
			list += `<li class="mdl-list__item mdl-list__item--three-line" id="output">
                                    <span class="mdl-list__item-primary-content">
                                        <i class="material-icons mdl-list__item-avatar">local_taxi</i>
                                        <span><b>${dateTimeBooking.toLocaleString('en-AU')}</b></span>
                                        <span class="mdl-list__item-text-body" >
                                            Pickup Location: <b>${bookArr._bookingHistory[booking]._pickupLocation._address.split(',')[0]}</b>;
                                            Stops: <b>${intermStopsList}</b>;
                                            Taxi Type: <b>${bookArr._bookingHistory[booking]._taxi.type}</b>
                                            Fare: $<b>${bookArr._bookingHistory[booking]._fare}</b>
                                            Distance: <b>${bookArr._bookingHistory[booking]._distance}KM</b>
                                        </span>
                                    </span>
                                    <span class="mdl-list__item-secondary-content">
                                        <a class="mdl-list__item-secondary-action" onclick="storeData(${booking}, BOOKING_KEY)" href="view.html"><i class="material-icons">visibility</i></a>
                                    </span>
                                    </li>`;
		}
	}
	output.innerHTML = list;// make div contain the list html
}

/*
function notBlank
This function takes one input, input quickly validates inputs to see if they exist
*/
function notBlank(input) 
{
	if (input)
    {
        return true;
    }
	else 
    {
		alert("Please fill put the required fields");
		return false;
	}
}

/*
function distanceCalc
This function implements the haversine formula to calculate distance between two points using coordinates. It takes 2 parameters, the first point
and the second point, and using the haversine formula, returns the distance between the two points
*/
function distanceCalc(point1, point2) 
{
	let lat1 = Number(point1[1]);
	let lat2 = Number(point2[1]);
	let lon1 = Number(point1[0]);
	let lon2 = Number(point2[0]);
	//alert(lat1);
	const RADIUS = 6371; // km
	const LATITUDE1 = lat1 * Math.PI / 180; // φ, λ in radians
	const LATITUDE2 = lat2 * Math.PI / 180;
	const CHANGE_OF_LATITUDE = (lat2 - lat1) * Math.PI / 180;
	const CHANGE_OF_LONGITUDE = (lon2 - lon1) * Math.PI / 180;

	const ALPHA = Math.sin(CHANGE_OF_LATITUDE / 2) * Math.sin(CHANGE_OF_LATITUDE / 2) + Math.cos(LATITUDE1) * Math.cos(LATITUDE2) * Math.sin(CHANGE_OF_LONGITUDE / 2) * Math.sin(CHANGE_OF_LONGITUDE / 2);
	const GAMMA = 2 * Math.atan2(Math.sqrt(ALPHA), Math.sqrt(1 - ALPHA));

	let distance = RADIUS * GAMMA; // in km
	return distance;
}

/*
Function makeBooking
This function takes no parameters. It uses the user inputs to make the taxi booking, feeding the user inputs, as well as distance, fare calculation, 
the calling of geocoding functions to find coordinates, and stores everything in local storage
*/
function makeBooking() 
{
	//let dateBooking = document.getElementById("dateInput");// retrieve user inputs 183-190
	//let timeBooking = document.getElementById("timeInput");
	//let taxi = document.getElementById("taxi");

	// Getting values (some to do math with)
	//dateBooking = dateBooking.value;// make 
	//timeBooking = timeBooking.value;
	//taxi = taxi.value;

	let today = new Date();
	let timeBooking = today.getTime();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();
	
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}

	today = yyyy + '-' + mm + '-' + dd;
	let dateBooking = today;
	
	
	let distance = 0;
	let distMath = 0;
	distMath += distanceCalc(startingPoint._coordinates, stops[0]._coordinates);// calculate distance between start and first stop
	if(stops.length > 1)
	{
		for (let i = 1; i < stops.length; i++)// add distances between all other stops
		{
			distMath += distanceCalc(stops[i-1]._coordinates, stops[i]._coordinates)		
		}
	}
	
	distance = distMath;

	console.log(startingPoint, stops);

	console.log(`${dateBooking}T${timeBooking}:00`);

	if (startingPoint != null && stops.length > 0) // Makes sure values were input on the page
	{
		if (checkStorage(BOOKINGS_ARRAY_KEY)) 
		{
			bookingArray.fromData(retrieveData(BOOKINGS_ARRAY_KEY));// if there is data in local storage retrieve it
		}

		bookingArray.addBooking(dateBooking, timeBooking, startingPoint, stops, taxi, distance);// add booking to booking array
		storeData(bookingArray, BOOKINGS_ARRAY_KEY);// store data back into local storage
		//window.location = "upcoming.html";// take user to upcoming
	}
}

let startingPoint = null;// empty starting point
let stops = []// empty stops

// function add start takes no parameters, and takes the user pickup location input, and uses the geocoding function 125 and respective
// callback function to add the start location to the map. This function is called when set location button is clicked
function addStart() 
{
	let field = document.getElementById('pickupLocation').value;
	//startingPoint = field;
	markStartOnMap(field);
}

// function add start takes no parameters, and takes the user pickup location input, and uses the geocoding function markMap and respective
// callback function to add the stop location to the map. This function is called when add stop button is clicked
function addStop() 
{
	let field = document.getElementById('destinationLocation').value;
	markMap(field);
}
// this function takes no parameters, and is used to clear the destination location and start  field.
function clearFields() {

	document.getElementById("pickupLocation").value = "";
	document.getElementById("destinationLocation").value = "";

}

// this function takes one parameter, result, and is used to 
function setFieldsToGeo(result) 
{

	let locationFields = ["pickupLocation", "destinationLocation"];
	if (stopCount > 0) 
	{
		for (let i = 1; i <= stopCount; i++) {
			locationFields.push(`intermediate${i}`);
		}
	}

	for (let i = 0; i < locationFields.length; i++) 
	{
		let thisElement = document.getElementById(locationFields[i]);
		if (fieldValues[locationFields[i]] != thisElement.value) 
		{
			thisElement.value = result.results[0].formatted;
			fieldValues[locationFields[i]] = thisElement.value
		}
	}
	return result
}

let stopCount = 0;

//This function allows users to add stops along the journey, and creates new html for another stop field if required by the user
function addStopField() 
{
	stopCount += 1;
	let div = document.createElement('div');
	div.innerHTML = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="intermediate${stopCount}" required>
        <label class="mdl-textfield__label" for="pickupLocation">Intermediate Location ${stopCount}:</label>
        <span class="mdl-textfield__error">Please put in your start location</span>
        </div>`;
	document.getElementById("stopsList").appendChild(div);
}

// This function redirects the browser to the make bookings page
function goBooking() 
{
	window.location = "make.html";
}

// This function redirects the browser to the upcoming bookings page
function goViewing() 
{
	window.location = "upcoming.html";
}

// This function redirects the browser to the view bookings page
function viewDetailed() 
{
	window.location = "view.html";
}

// This function redirects the browser to the edit bookings page
function goEdit() 
{
	window.location = "edit.html";
}

// This function displays the information of a chosen booking. It takes no parameters, but retrieves the relevant booking information from local 
// storage, then adds the html containing the relevant info to the page. Adds the locations on the route to the map
function bookingInfo() 
{
	let bookings = retrieveData(BOOKINGS_ARRAY_KEY);
	let bookingID = retrieveData(BOOKING_KEY);

	let output = document.getElementById("content");

	let content = `<ul class="demo-list-two mdl-list">
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                    <i class="material-icons mdl-list__item-avatar">arrow_right_alt</i>
                                    <span>Booking Date</span>
                                    <span class="mdl-list__item-sub-title"><b>${bookings._bookingHistory[bookingID]._bookingDate}</b></span>
                                    </span>
                                </li>
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                    <i class="material-icons mdl-list__item-avatar">arrow_right_alt</i>
                                    <span>Booking Time</span>
                                    <span class="mdl-list__item-sub-title"><b>${bookings._bookingHistory[bookingID]._bookingTime}</b></span>
                                    </span>
                                </li>
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                    <i class="material-icons mdl-list__item-avatar">arrow_right_alt</i>
                                    <span>Pickup Location</span>
                                    <span class="mdl-list__item-sub-title"><b>${bookings._bookingHistory[bookingID]._pickupLocation._address}</b></span>
                                    </span>
                                </li>
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                    <i class="material-icons mdl-list__item-avatar">arrow_right_alt</i>
                                    <span>Fare</span>
                                    <span class="mdl-list__item-sub-title"><b>$${bookings._bookingHistory[bookingID]._fare}</b></span>
                                    </span>
                                </li>
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                    <i class="material-icons mdl-list__item-avatar">arrow_right_alt</i>
                                    <span>Destination</span>
                                    <span class="mdl-list__item-sub-title"><b>${bookings._bookingHistory[bookingID]._stops[(bookings._bookingHistory[bookingID]._stops.length) - 1]._address}</b></span>
                                    </span>
                                </li>
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                    <i class="material-icons mdl-list__item-avatar">arrow_right_alt</i>
                                    <span>Taxi Type</span>
                                    <span class="mdl-list__item-sub-title"><b>${bookings._bookingHistory[bookingID]._taxiType}</b></span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="mdl-cell mdl-cell--8-col">
                            <div id="map"></div>
                        </div>`;
	output.innerHTML = content;
// lines 369-377 generate 2 arrays, one an array of arrays containing the coordinates of each location, and the other containing all of the addresses
	let locations = []
	locations.push(bookings._bookingHistory[bookingID]._pickupLocation._coordinates)
	let description = [];
	description.push(bookings._bookingHistory[bookingID]._pickupLocation._address)
	for(let i = 0; i< bookings._bookingHistory[bookingID]._stops.length; i++)
	{
		locations.push(bookings._bookingHistory[bookingID]._stops[i]._coordinates)
		description.push(bookings._bookingHistory[bookingID]._stops[i]._address)
	}
	for (let i = 0; i < locations.length; i++)// add a marker to each location on the map
	{
		let location = locations[i];
		let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
		marker.setLngLat(location);

		let popup = new mapboxgl.Popup({ offset: 45});
		popup.setText(description[i]);

		marker.setPopup(popup)

		// Display the marker.
		marker.addTo(map);

		// Display the popup.
		popup.addTo(map);
		
	}
	viewPageMapLine(locations)
}
// this function is used to display the line on the view booking info page map. It applys a layer in the same way as used in the make booking page
// it takes one parameter, coordinates, which is an array of all coordinates to be displayed on the map
function viewPageMapLine(coordinates)
{
	if ( map.getLayer('routes') == undefined)
	{
		let object = {
			type: "geojson",
			data: {
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates: [coordinates]
				}
			}
		};
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
					"line-color": "#888", 
					"line-width": 6 
				}
			}
		);
	}
}
/*
function editPageMap
this function takes no parameters. It retrieves the relevant information for the booking you are wishing to edit. It also displays all the locations
from the trip on the map
*/
function editPageMap()
{
	let bookings = retrieveData(BOOKINGS_ARRAY_KEY);// retrieve data from local storage
	let bookingID = retrieveData(BOOKING_KEY);

	// lines 443-451 generate 2 arrays, one an array of arrays containing teh coordinates of each location, and the other containing all of the addresses
	let locations = []
	locations.push(bookings._bookingHistory[bookingID]._pickupLocation._coordinates)
	let description = [];
	description.push(bookings._bookingHistory[bookingID]._pickupLocation._address)
	for(let i = 0; i< bookings._bookingHistory[bookingID]._stops.length; i++)
	{
		locations.push(bookings._bookingHistory[bookingID]._stops[i]._coordinates)
		description.push(bookings._bookingHistory[bookingID]._stops[i]._address)
	}
	for (let i = 0; i < locations.length; i++)// add a marker for each address
	{
		let location = locations[i];
		let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
		marker.setLngLat(location);

		let popup = new mapboxgl.Popup({ offset: 45});
		popup.setText(description[i]);

		marker.setPopup(popup)

		// Display the marker.
		marker.addTo(map);

		// Display the popup.
		popup.addTo(map);
		
	}
	
}
// this function is used to remove a stop on the edit bookings page. it retrieves the bookings data, and asks the user which stop they would like to
// remove, and removes the relevant stop, redirecting the user back to upcoming bookings page. 
function removeStop()
{
	let bookings = retrieveData(BOOKINGS_ARRAY_KEY);// retrieve data
	let bookingArray = new Bookings();
	bookingArray.fromData(bookings);
	let bookingID = retrieveData(BOOKING_KEY);
	let choice = 0
	if (bookingArray._bookingHistory[bookingID]._stops.length > 1)// if there is more than one stop, ask the user which stop to remove
	{
		choice = Number(prompt(`Which Booking out of stop 1 - ${bookingArray._bookingHistory[bookingID]._stops.length} do you want to remove? `));
		if (1 > choice || choice > bookingArray._bookingHistory[bookingID]._stops.length) 
		{
			alert("Enter a valid stop.")
			window.location = "upcoming.html";
		}
	}
	else
	{
		if(confirm("Removing this stop will mean there is no destination and so the booking will be cancelled. Continue?"))// cancel the booking if remove all stops
		{
			bookingCancel();

		}
		else
		{
			alert("Action cancelled.")
			window.location = "upcoming.html";
			
		}
	}
	
	for (let i = 0; i < bookingArray._bookingHistory[bookingID]._stops.length; i++)//remove the requested stop from the array.
	{
		if (i == choice - 1)
		{
			bookingArray._bookingHistory[bookingID]._stops.splice(i, 1)
			storeData(bookingArray, BOOKINGS_ARRAY_KEY);
			window.location = "upcoming.html";
		}
	}


	


}
// function bookingEdit takes no parameters and is used to edit a booking. It asks the user if they would like to edit the booking, retrieves
// the relevant data
function bookingEdit()
{
	
	if(confirm("Are you sure you want to edit this booking?"))
	{
		let bookingID = retrieveData(BOOKING_KEY);
		// lines 529-535 retrieving user inputs
		let dateBooking = document.getElementById("dateInput");
		let timeBooking = document.getElementById("timeInput");
		let taxi = document.getElementById("taxi");

		dateBooking = dateBooking.value;
		timeBooking = timeBooking.value;
		taxi = taxi.value;

		let distance = 0;
		let distMath = 0;
		for (let i = 0; i < stops.length - 1; i++)// calculate distance
		{
				if (i == 0)
				{
						distMath += distanceCalc(startingPoint._coordinates, stops[i]._coordinates);
				}
				
				distMath += distanceCalc(stops[i]._coordinates, stops[i+1]._coordinates);
			
				
		}
		distance = distMath;

		console.log(startingPoint, stops);

		console.log(`${dateBooking}T${timeBooking}:00`);
		if (startingPoint != null && stops.length > 0) // Makes sure values were input on the page
		{
			if (checkStorage(BOOKINGS_ARRAY_KEY)) 
			{
				bookingArray.fromData(retrieveData(BOOKINGS_ARRAY_KEY));// retrieves array from local storage
			}

			bookingArray.editBooking(dateBooking, timeBooking, startingPoint, stops, taxi, distance, bookingID);// updates array with new information
			storeData(bookingArray, BOOKINGS_ARRAY_KEY);
			window.location = "upcoming.html";// direct user to upcoming page
			
		}
	}
}

// This function takes no parameters, and cancels the booking stored in the local storage. It removes the booking completely
function bookingCancel()
{
    if(confirm("Are you sure you want to cancel this booking?"))// ask user to confirm they wish to cancel a booking
    {
        let bookings = retrieveData(BOOKINGS_ARRAY_KEY);// retrieve the booking being cancelled
        let bookingArray = new Bookings();

        bookingArray.fromData(bookings);
	    let bookingID = retrieveData(BOOKING_KEY);

        let rego = bookingArray._bookingHistory[bookingID]._taxi.rego// find rego of booking
        bookingArray.cancelBooking(bookingID);

        
        for (let i = 0; i < taxiList.length; i++)// make taxi available when cancelled
        {
            if (taxiList[i]["rego"] == rego)
            {
                taxiList[i]["available"] = true;
            }
        }

        storeData(bookingArray, BOOKINGS_ARRAY_KEY);// store data back into local storage
        window.location = "upcoming.html";// direct user to upcoming page
    }
    else
    {
        alert("Booking has not been cancelled.")
    }
    
    
}

//Function Checkstorage takes a key to local storage as a parameter, and checks to see if local storage is available, and if there si any data stored
/**
 * @desc Checks to see if local storage is available and if there is any data at the key then returns true or false
 * @param  key - key for data in local Storage
 * @returns bool - true or false
 */
function checkStorage(key) {
	//Checks to see if local storage is available and if there is any data at the key
	if ((localStorage.getItem(key) === null) && (typeof(Storage) !== "undefined")) {
		return false;
	} else
		return true;
}

/*
function storeData
This function takes two parameters, data and key. The function tests to see if the data is an object, and if it is, turns it to a string, and then
stores the data in local storage at the key.
*/
function storeData(data, key) {
	if (typeof(data) == 'object') // if the data is an object, turn it into a string
	{
		data = JSON.stringify(data);
	}
	localStorage.setItem(key, data); // store the data in string format at the key parameter
}


/*
function retrieveData
this function takes one parameter, key. The function will return the data stored at the key, firstly turining it back into an object if it is available
as a string, if it is not, will return the data in the form it is stored. 
*/
function retrieveData(key) {
	let data = localStorage.getItem(key); // define the data stored under parameter key retrieved from local storage as data
	try {
		data = JSON.parse(data); // convert back to an object if possible
	} catch (e) {
		console.log(e); //show error if cannot convert back to object
	} finally {
		return data; // return the data
	}
}

//This restricts user from making a booking in the past
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd
}
if (mm < 10) {
	mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
function dateRestrict()
{
	document.getElementById("dateInput").setAttribute("min", today);
}

