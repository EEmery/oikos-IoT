# "https://oikos-iot.firebaseio.com/.json"
# "oitkos-gateways@oikos-iot.iam.gserviceaccount.com"

import pyrebase

# Sets up firebase
config = {
	"apiKey": "AIzaSyABm-LZcGGS9fWHTZVg0PTxGrRJH0rtlc4",
	"authDomain": "oikos-iot.firebaseapp.com",
	"databaseURL": "https://oikos-iot.firebaseio.com",
	"storageBucket": "oikos-iot.appspot.com",
  	"serviceAccount": "./oikos-gateways-key.json"
}
firebase = pyrebase.initialize_app(config)
database = firebase.database().get().val()

def print_database(database=database):
	for house in database:
		print "\n" + house
		for necessity in database[house]:
			print "    " + necessity + ": " + database[house][necessity]

print_database()