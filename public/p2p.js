
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";

const LOCATION_KEY = "locationStore";
let connected = 0;
let isHost = 0;

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC3deGZPPFkuodHyIooXgQMkx7hnftviP0",
    authDomain: "b-side-f086d.firebaseapp.com",
    databaseURL: "https://b-side-f086d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "b-side-f086d",
    storageBucket: "b-side-f086d.appspot.com",
    messagingSenderId: "843512008015",
    appId: "1:843512008015:web:6c22075e90c14cc844893a",
    measurementId: "G-CCY7094HLX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database();
  var usersList = firebase.database().ref('users/' + 'Jezapj' + '/HostId');

  function createRoom(user, code, location, imageUrl) {
    firebase.database().ref('users/' + user).set({
      HostId: code,
      locationData: location,
      profile_picture : imageUrl
    });
    isHost = 1;
  }
  function inRoom() {
    firebase.database().ref('users/' + "Jezapj").update({
      Joined: "yes",
    });
  }
  var usersList = firebase.database().ref('users/' + "Jezapj" + '/Joined');
    usersList.on('value', (snapshot) => {
      const data = snapshot.val();

      if ((data == "yes") && isHost == 1)
      {
        connect();
        dialogH.close();
        let status = {message: 'Connected to Peer'};
        var snackbarContainer = document.querySelector('#conStatus');
        snackbarContainer.MaterialSnackbar.showSnackbar(status);
      }});

  function readUserData(userId) {
    
    var starCountRef = firebase.database().ref('users/' + userId + '/HostId');
    starCountRef.on('value', (snapshot) => {
      const data = snapshot.val();
      return data;
    });}
    
  function joinRoom(user, code) {
    
    usersList = firebase.database().ref('users/' + user + '/HostId');
    
    
      usersList.once('value', (snapshot) => {
      //usersList.get().then((snapshot) => {
      const data = snapshot.val();

      if (data == code)
      {
        alert("Correct Code, Connecting");
        connected = 1;
        return 1;

      }
      if (data != code)
      {
          alert('Inncorrect Code');
          connected = 0;
          return 0;
      }
     
    });

  }

  

  
  dialog.querySelector('.agree').addEventListener('click', function() {

    createRoom("Jezapj", joinCode, currentCoord, 'temp');
  })

  dialog2.querySelector('.agree').addEventListener('click', function() {
    dialog2.close();
    let tryJoin = document.getElementById('joinCode').value;
    //readUserData(tryJoin);
    joinRoom("Jezapj", tryJoin);
    //joinRoom("Jezapj", tryJoin);
    if (connected == 1)
    {
      alert("Joined Peer");
      connect();
      inRoom();
      let status = {message: 'Connected to Peer'};
      var snackbarContainer = document.querySelector('#conStatus');
      snackbarContainer.MaterialSnackbar.showSnackbar(status);
      
      
    }
    else{
      alert("Did not connect to room");
    }
    
  });

  function addStartH() 
{
	//let dest = currentCoord;
	//markStartOnMap(dest);
  let coordinates = [currentCoord[0], currentCoord[1]];
	map.setCenter(coordinates); 
  let marker = new mapboxgl.Marker();
  marker.setLngLat(coordinates);
  let popup = new mapboxgl.Popup({
    offset: 45
  });
  popup.setHTML("My Location");
  marker.setPopup(popup);
  marker.addTo(map);
  popup.addTo(map);
  
  startingPoint = new Location('My Location', coordinates);// add starting point as new location class instance
  storeData(startingPoint,LOCATION_KEY);
  drawLine();
  return coordinates;
}

function addStartJ() 
{
	let dest = firebase.database().ref('users/' + 'Jezapj' + '/locationData');
  dest.on('value', (snapshot) => {
    dest = snapshot.val();
    let coordinates = [dest[0], dest[1]];
	map.setCenter(coordinates); 
  let marker = new mapboxgl.Marker();
  marker.setLngLat(coordinates);
  let popup = new mapboxgl.Popup({
    offset: 45
  });
  popup.setHTML("Host Location");
  marker.setPopup(popup);
  marker.addTo(map);
  popup.addTo(map);
  
  startingPoint = new Location('Host Location', coordinates);// add starting point as new location class instance
  storeData(startingPoint, LOCATION_KEY);
  drawLine();
  return coordinates;
  });
	
}

function addStopH() 
{
	let dest = firebase.database().ref('users/' + "Jezapj" + '/locationData');
  dest.on('value', (snapshot) => {
    dest = snapshot.val();
    let coordinates = [dest[0], dest[1]];
	map.setCenter(coordinates); 
  let marker = new mapboxgl.Marker();
  marker.setLngLat(coordinates);
  let popup = new mapboxgl.Popup({
    offset: 45
  });
  popup.setHTML("Joiner Location");
  marker.setPopup(popup);
  marker.addTo(map);
  popup.addTo(map);
  
  stops.push(new Location("Joining Location", coordinates));
  storeData(stops, LOCATION_KEY);//issue
  drawLine();
  return coordinates;
  });
	

  
}

function addStopJ() 
{
	let dest = currentCoord;
	let coordinates = [currentCoord[0], currentCoord[1]];
	map.setCenter(coordinates); 
  let marker = new mapboxgl.Marker();
  marker.setLngLat(coordinates);
  let popup = new mapboxgl.Popup({
    offset: 45
  });
  popup.setHTML("My Location");
  marker.setPopup(popup);
  marker.addTo(map);
  popup.addTo(map);
  
  stops.push(new Location("My Location", coordinates));
  storeData(stops,LOCATION_KEY);
  drawLine();
  return coordinates;
}

function connect()
  {
    if (isHost)
    {
      addStartH();//issue here
      addStopH();
    }
    else
    {
      addStartJ();
      addStopJ();
    }
  }

//createRoom("Jezapj", "19837392", "me@gmail.com", "idk");
//joinRoom("Jezapj", "19837392");

