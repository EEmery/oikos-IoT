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
  right_button = new five.Button({pin: 2, holdtime: HOLD_TIME});
  selection_button = new five.Button({pin: 3, holdtime: HOLD_TIME});
  left_button = new five.Button({pin: 4, holdtime: HOLD_TIME});
  
  // Necessity states placeholders
  var necessity_index = 0;
  var necessity_list = ["clothes_state", "food_state", "water_state"];
  var necessity_states = ["not in need", "not in need", "not in need"];

  // Reads the database and updates the necessity states
  database.on("value", function(snapshot) {

    // If there is data about this house
    if (snapshot.val() != null) {
      necessity_states[0] = snapshot.val().clothes_state;            // Updates the clothes state to match database
      necessity_states[1] = snapshot.val().food_state;               // Updates the food state to match database
      necessity_states[2] = snapshot.val().water_state;              // Updates the water state to match database      

      // DEBUG INFORMATION
      console.log("Clothes state: " + necessity_states[0]);
      console.log("Food state: " + necessity_states[1]);
      console.log("Water state: " + necessity_states[2] + "\n");
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


  // Right button event handler
  right_button.on("hold", function() {
    necessity_index = (necessity_index + 1) % necessity_list.length;
    console.log(necessity_index);                                    // DEBUG INFORMATION
  });

  // Left button event handler
  left_button.on("hold", function() {
    if (necessity_index == 0) {
      necessity_index = necessity_list.length - 1;
    }
    else {
      necessity_index = necessity_index - 1;
    }
    console.log(necessity_index);                                    // DEBUG INFORMATION
  });

  // Selection button event handler
  selection_button.on("hold", function() {

    // Changes to the oposite state the selected necessity
    if (necessity_states[necessity_index] == "not in need") {
      database.update(JSON.parse("{\"" + necessity_list[necessity_index] + "\": \"" + "in need" + "\"}"));
    }
    else {
      database.update(JSON.parse("{\"" + necessity_list[necessity_index] + "\": \"" + "not in need" + "\"}"));
    }
  });

});