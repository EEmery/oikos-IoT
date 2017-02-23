# =======================================================================================
#
# Reads the database template and changes houses keys in order to give them the same
# necessities. Key values are mainteined. New keys are created with the same value from
# the template.
#
# USAGE: uniformizer.py
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


def unifomize_database(database=database):
	"""
	Reads the database template and changes houses keys in order to give them the same necessities.
	Key values are mainteined. New keys are created with the same value from the template.

	@database: a "firebase.database()" value.

	@returns: none.
	"""
	snapshot = database.get().val()
	template = database.child("template").get().val()
	template_keys = template.keys()
	
	for house in snapshot:

		# Removes old necessities
		for necessity in snapshot[house]:
			if not necessity in template_keys:
				database.child(house).child(necessity).remove()

		# Adds new necessities
		for necessity in template_keys:
			if not necessity in snapshot[house]:
				database.child(house).update({necessity: template[necessity]})


unifomize_database()