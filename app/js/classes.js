/*
* Purpose: This file stores all the classes
* associated with a taxi bookings
* Team: 1003 Team 089
* Assignment: 1003 Assignment 2
*/
"use strict"
const DATE_OBJ_START_YEAR = 1970;
const DATE_OBJ_HOUR_CORRECTION = 10; // for some reason, the date object subtracts 10 from the hours, so fix this issue by adding 10.
const DATE_OBJ_START_MONTH = 0;
const DATE_OBJ_START_DAY = 1;
const FLAG_FARE = 4.2;
const DISTANCE_RATE = 1.622;


/*
Bookings class
This class is used to create an array of all bookings made on the app, and contains the relevent methods to access and edit this array
*/

class Bookings 
{
	constructor() {
		this._bookingHistory = [];
	}
	/*
	add booking
	this method adds a new booking to the bookings array, taking the parameters starting point, stops, dateBooking, timeBooking, taxi, and feeding
	them through the Booking class, creating a booking instance, and adding this instance to the bookings array 
	*/
	addBooking(dateBooking, timeBooking, startingPoint, stops, distance) {
		let bookingNew = new Booking(startingPoint, stops, dateBooking, timeBooking, status = 0, distance.toFixed(2));

		
		//end new
		this._bookingHistory.push(bookingNew);
	}

	/*
	edit booking
	this method edits booking in the bookings array, taking the parameters starting point, stops, dateBooking, timeBooking, taxi, and feeding
	them through the Booking class and changing a booking instance. 
	*/
	editBooking(dateBooking, timeBooking, startingPoint, stops, distance, bookingID) {
		let bookingNew = new Booking(startingPoint, stops, dateBooking, timeBooking, status = 0, distance.toFixed(2));

		
		let fare = bookingNew.calculateFare(startingPoint, stops);
		bookingNew._fare = fare.toFixed(2)
		
		//end new
		this._bookingHistory[bookingID] = bookingNew;
	}
    /*
    cancelBooking
    This method takes one parameter, bookingID, and uses this as a reference to remove the correct booking from the booking history array
    */
	cancelBooking(bookingID)
	{
		
		this._bookingHistory.splice(bookingID, 1);
		
	}
    /*
    method fromData
    this method is used to take booking objects stored in local storage, and feed them back through the booking class, converting them back to 
    booking class instances, and storing them back into the bookingHistory array
    */
	fromData(data) 
    {
		this._bookingHistory = [];// set bookings array to be blank
		let refreshData = data._bookingHistory;
		this._bookingHistory = refreshData;

		for (let bookingNum = 0; bookingNum < refreshData.length; bookingNum++) 
        {
			let bookingNeo = new Booking();
			bookingNeo.fromData(refreshData[bookingNum]);
			this._bookingHistory[bookingNum] = (bookingNeo);
		}
	}
}
/*
Class Booking
this class is used to create booking class instances using the parameters that are initially entered by the user, pickupLocation, stops, 
bookingDate, bookingTime, status, taxiType. The class contains accessors and mutators for these properties. It also contains a fromData method.
*/
class Booking 
{
	constructor(pickupLocation, destinationLocation, bookingDate, bookingTime, status, distance) 
    {
		this._pickupLocation = pickupLocation;
		this._destinationLocation = destinationLocation;
		this._bookingDate = bookingDate;
		this._bookingTime = bookingTime;
		this._status = status;
		
		//this._taxi = new Taxi();
		let dateTimeBooking = new Date(`${bookingDate}T${bookingTime}:00`);
		this._dateTimeBooking = dateTimeBooking;
		this._distance = distance;
		
	}

	get pickupLocation() 
    {
		return this._pickupLocation;
	}


	get destinationLocation() 
    {
		return this._destinationLocation;
	}

	get bookingDate() 
    {
		return this._bookingDate;
	}

	get bookingTime() 
    {
		return this._bookingTime;
	}

	get status() 
    {
		return this._status;
	}

	get taxiType() 
    {
		return this._taxiType;
	}

	set pickupLocation(newPickupLocation) 
    {
		this._pickupLocation = newPickupLocation;
	}

	set intermediateLocation(newIntermediateLocation) 
    {
		this._intermediateLocation = newIntermediateLocation;
	}

	set destinationLocation(newDestinationLocation) 
    {
		this._destinationLocation = newDestinationLocation;
	}

	set bookingDate(newBookingDate) 
    {
		this._bookingDate = newBookingDate;
	}

	set bookingTime(newBookingTime) 
    {
		this._bookingTime = newBookingTime;
	}

	set status(newStatus) 
    {
		this._status = newStatus;
	}

	set taxiType(newTaxiType) 
    {
		this._taxiType = newTaxiType;
	}
	set fare(newFare) 
    {
		this._fare = newFare;
	}
/*
    fromData
    this method takes one parameter, data, which will be an object containing the properties of a booking class instance. This object is fed back
    through the constructor, making the object a class instance.
*/
	fromData(data) 
    {
		this._pickupLocation = data._pickupLocation;// make the pickuplocation in the data the pick up location in the class instance, repeated for each property lines 173-183
		if (this._intermediateLocation != "") 
        {
			this._intermediateLocation = data._intermediateLocation;
		}
		this._destinationLocation = data._destinationLocation;
		this._bookingDate = data._bookingDate;
		this._bookingTime = data._bookingTime;
		this._status = data._status;
		this._taxiType = data._taxiType;
		this._taxi = data._taxi;
		this._distance = data._distance;
		this._fare = data._fare;
		this._stops = data._stops;
		
	}


}

class Location {
	constructor(address, coordinates = 0) {
		this._address = address;
		this._coordinates = coordinates;
	}

	get address() {
		return this._address;
	}

	get coordinates() {
		return this._coordinates;
	}

	set coordinates(newCoordinates)
	 {
		this._coordinates = newCoordinates;
	 }

}


//Onload 
let bookingArray = new Bookings();