var HOLD_TIME = 500;
var DEVICE_NAME = "house_2/";


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
  var necessity_list = [];
  var necessity_states = [];

  // Reads the database and updates the necessity states
  database.on("value", function(snapshot) {

    // If there is data about this house
    if (snapshot.val() != null) {

      // If local necessities are empty (happens on start up)
      if (necessity_list.length == 0) {
        for (necessity in snapshot.val()) {
          necessity_list.push(necessity);
          necessity_states.push(snapshot.val()[necessity]);
        }
        console.log("Firebase initialized\nReady to go!");
      }

      // Once local necessities are started up
      else {
        var i = 0;
        for (necessity in snapshot.val()) {
          necessity_states[i] = snapshot.val()[necessity];
          console.log(necessity + ": " + necessity_states[i]);
          i = i + 1;
        }
        console.log("");
      }
    }

    // If there is no data about this house, creates one (happens on the installation of device)
    else {
      var templateRef = firebase.database().ref("template/");        // Gets the device template
      templateRef.once("value", function(snapshot) {
        database.set(snapshot.val());                                // Copy from the template to the device data
      });
    }

  });


  // Right button event handler
  right_button.on("hold", function() {
    necessity_index = (necessity_index + 1) % necessity_list.length;
    console.log(necessity_index);
  });

  // Left button event handler
  left_button.on("hold", function() {
    if (necessity_index == 0) {
      necessity_index = necessity_list.length - 1;
    }
    else {
      necessity_index = necessity_index - 1;
    }
    console.log(necessity_index);
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