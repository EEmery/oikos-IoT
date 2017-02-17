var HOLD_TIME = 1000;
var DEVICE_NAME = "house_1/";


// Sets up Firebase
var firebase = require("firebase-admin");
var serviceAccount = require("./oikos-gateways-key.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://oikos-iot.firebaseio.com"
});
var database = firebase.database().ref(DEVICE_NAME);                 // Creates a database reference in DEVICE_NAME


// Sets up Johnny-Five
var five = require("johnny-five");
board = new five.Board();


board.on("ready", function() {

  // Hardware pins
  water_button = new five.Button({pin: 2, holdtime: HOLD_TIME});
  food_button = new five.Button({pin: 3, holdtime: HOLD_TIME});
  clothes_button = new five.Button({pin: 4, holdtime: HOLD_TIME});
  
  // Necessity states placeholders
  var water_state;
  var food_state;
  var clothes_state;


  // Reads the database and updates the necessity states
  database.on("value", function(snapshot) {

    // If there is data about this house
    if (snapshot.val() != null) {
      water_state = snapshot.val().water_state;                        // Updates the water state to match database
      food_state = snapshot.val().food_state;                          // Updates the food state to match database
      clothes_state = snapshot.val().clothes_state;                    // Updates the clothes state to match database

      // Debug information
      console.log("Clothes state: " + clothes_state);
      console.log("Food state: " + food_state);
      console.log("Water state: " + water_state + "\n");
    }

    // If there is no data about this house, creates one (happens on the installation of device)
    else {
      database.set({
        "clothes_state": "not in need",
        "food_state": "not in need",
        "water_state": "not in need",
      });
    }

  });


  // Water button event handler
  water_button.on("hold", function() {
    if (water_state == "not in need") {
      database.update({"water_state": "in need"});
    }
    else {
      database.update({"water_state": "not in need"});
    }
  });

  // Food button event handler
  food_button.on("hold", function() {
    if (food_state == "not in need") {
      database.update({"food_state": "in need"});
    }
    else {
      database.update({"food_state": "not in need"});
    }
  });

  // Clothes button event handler
  clothes_button.on("hold", function() {
    if (clothes_state == "not in need") {
      database.update({"clothes_state": "in need"});
    }
    else {
      database.update({"clothes_state": "not in need"});
    }
  });

});