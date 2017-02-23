# =======================================================================================
#
# Removes necessities to houses in the firebase database. Both houses and necessities
# must be passed as arguments in the call.
#
# USAGE: remove-necessities.py -h house_1 house_2 ... -n necessity1 necessity2 ...
#        remove-necessities.py --house house_1 ... --necessities necessity1 ...
#
# If after '-h' or '--house' there is 'all' the script removes the necessity in all
# houses.
#
# =======================================================================================


import sys, pyrebase


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


def format_input(argv):
	# In case input parameters were not specified
	if len(argv) == 1:
		houses = []
		necessities = []
		return houses, necessities

	# In case paramaters were specified properly
	try:
		houses = argv[argv.index('--house')+1:argv.index('--necessities')]
		necessities = argv[argv.index('--necessities')+1:]
		return houses, necessities

	# In case paramaters were specified but not properly
	except ValueError:
		try:
			houses = argv[argv.index('-h')+1:argv.index('-n')]
			necessities = argv[argv.index('-n')+1:]
			return houses, necessities
		except ValueError:
			raise ValueError("Must contain a '--house' and '--necessities' flag or '-h' and '-n'")


def add_necessities(database, houses, necessities):
	snapshot = database.get().val()
	if 'all' in houses and len(houses) == 1:
		houses = snapshot.keys()
		
	for house in houses:
		if house in snapshot:
			for necessity in necessities:
				database.child(house).child(necessity).remove()


houses, necessities = format_input(sys.argv)
add_necessities(database, houses, necessities)