# =======================================================================================
#
# Prints the actual state of the database.
#
# USAGE: print-database.py
#
# =======================================================================================


import pyrebase

# Sets up firebase
config = {
	"apiKey": "AIzaSyABm-LZcGGS9fWHTZVg0PTxGrRJH0rtlc4",
	"authDomain": "oikos-iot.firebaseapp.com",
	"databaseURL": "https://oikos-iot.firebaseio.com",
	"storageBucket": "oikos-iot.appspot.com",
  	"serviceAccount": "../oikos-gateways-key.json"
}
firebase = pyrebase.initialize_app(config)
database = firebase.database()


def print_database(snapshot=database.get().val()):
	"""
	Prints the database formated. Database should be two children depth (houses:necessities).

	@snapshot: a "firebase.database().get().val()" value.

	@return: none.
	"""
	for house in snapshot:
		print "\n" + house
		for necessity in snapshot[house]:
			print "    " + necessity + ": " + snapshot[house][necessity]


print_database()