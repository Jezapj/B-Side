
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAnalytics  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
import { } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"
import { getDatabase, ref, set, onValue, update, get, child } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"



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
  var db = getDatabase(app);// was firebase.database();
  var usersList = ref(db,'users/' + 'Jezapj' + '/HostId');//firebase.database().ref('users/' + 'Jezapj' + '/HostId');
/*
  var uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };
  firebase.initializeApp(firebaseConfig);

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
*/
  
async function createRoom2(user, code, location, imageUrl) {
  // Get a reference to the database
  const userRef = ref(db, 'users/' + user);

  // Use try-catch to handle any potential errors during the operation
  try {
    // Wait for the set operation to complete
    await set(userRef, {
      HostId: code,
      locationData: location,
      profile_picture: imageUrl,
    });

    // After the set operation is complete, update the isHost variable
    isHost = 1;
  } catch (error) {
    // Handle errors here (e.g., log them or throw a custom error)
    console.error('Error creating room:', error);
    // Optionally, throw the error to propagate it further
    throw error;
  }
}


  function createRoom(user, code, location, imageUrl) {
    set(ref(db, 'users/' + user), { //firebase.database().ref('users/' + user).set({
      HostId: code,
      locationData: location,
      profile_picture : imageUrl
    });
    isHost = 1;
  }
  function inRoom() {
    update(ref(db, 'users/' + "Jezapj"), {//firebase.database().ref('users/' + "Jezapj").update({
      Joined: "yes",
    });
  }
  var usersList = ref(db,'users/' + "Jezapj" + '/Joined');//firebase.database().ref('users/' + "Jezapj" + '/Joined');
    onValue(usersList,(snapshot) => {//usersList.on('value', (snapshot) => {
      const data = snapshot.val();

      if ((data == "yes") && isHost == 1)
      {
        connect();
        dialogH.close();
        let status = {message: 'Connected to Peer'};
        var snackbarContainer = document.querySelector('#conStatus');
        snackbarContainer.MaterialSnackbar.showSnackbar(status);
      }});

  function readUserData(userId,db) {
    
    var starCountRef = ref(db,'users/' + userId + '/HostId');//firebase.database().ref('users/' + userId + '/HostId');
    //here
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      return data;
    });}

  function readUserData2(userId, db) {
    var starCountRef =  get(ref(db, 'users/' + userId + '/HostId')).val();
  
    return new Promise((resolve, reject) => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  async function joinRoom2(user, code) {
    try {
      // Get a reference to the 'HostId' property in the user's data
      const usersListRef = ref(db, 'users/' + user + '/HostId');
  
      // Read user data using the synchronous version of the function (readUserData)
      // const data = readUserData(user, usersListRef);
  
      // Read user data using the asynchronous version of the function (readUserData2)
      const codeFromDatabase = await readUserData2(user, usersListRef);
  
      // Compare the code from the database with the provided code
      if (codeFromDatabase === code) {
        alert('Correct Code, Connecting');
        connected = 1;
        return 1;
      } else {
        alert('Incorrect Code');
        connected = 0;
        return 0;
      }
    } catch (error) {
      // Handle errors here (e.g., log them or throw a custom error)
      console.error('Error joining room:', error);
      // Optionally, throw the error to propagate it further
      throw error;
    }
  }

  function joinRoom3(user,code) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user}/HostId`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        console.log("Hello");
        if (snapshot.val() == code) {
          alert('Correct Code, Connecting');
          connected = 1;
          connecting(connected);
        } else {
          alert('Incorrect Code');
          connected = 0;
          connecting(connected);
          return 0;
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  function joinRoom(user, code) {
    
    usersList = ref(db, 'users/' + user + '/HostId'); //firebase.database().ref('users/' + user + '/HostId');
    
   
    

      const data = readUserData(user,usersList);
    
      readUserData2(user,usersList).then((data) => {
        // Use the data here
        if (data == code)
      {
        alert("Correct Code, Connecting");
        connected = 1;
        return 1;

      }
      else
      {
          alert('Inncorrect Code');
          connected = 0;
          return 0;
      }
        console.log(data);
      })
      .catch((error) => {
        console.error('Error reading user data:', error);
      });
    }
      /*
      if (data == code)
      {
        alert("Correct Code, Connecting");
        connected = 1;
        return 1;

      }
      else
      {
          alert('Inncorrect Code');
          connected = 0;
          return 0;
      }
     
    };
    */
      /*onValue(usersList, (snapshot) => {//usersList.once('value', (snapshot) => {
      //usersList.get().then((snapshot) => {
      const data = snapshot.val();

      if (data == code)
      {
        alert("Correct Code, Connecting");
        connected = 1;
        return 1;

      }
      else
      {
          alert('Inncorrect Code');
          connected = 0;
          return 0;
      }
     
    });*/
    //joinRoom(user, code);
  

  

  
  dialog.querySelector('.agree').addEventListener('click', function() {

    createRoom2("Jezapj", joinCode, currentCoord, 'temp');// using 2
  })

  dialog2.querySelector('.agree').addEventListener('click', function() {
    dialog2.close();
    let tryJoin = document.getElementById('joinCode').value;
    //readUserData(tryJoin);
    joinRoom3("Jezapj", tryJoin); // using 2
    //joinRoom("Jezapj", tryJoin);
    /*if (connected == 1)
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
    */
  });
  function connecting(connected) {
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
  }
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
	let dest = ref(db,'users/' + 'Jezapj' + '/locationData');//firebase.database().ref('users/' + 'Jezapj' + '/locationData');
  onValue(dest, (snapshot) => {//dest.on('value', (snapshot) => {
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
	let dest = ref(db,'users/' + 'Jezapj' + '/locationData');//firebase.database().ref('users/' + "Jezapj" + '/locationData');
  onValue(dest, (snapshot) => {//dest.on('value', (snapshot) => {
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

