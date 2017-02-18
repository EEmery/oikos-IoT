import grequests, string

# Makes a request to get the database (JSON file). No need for authentication for now
req_sess = grequests.Session()
r = req_sess.get('https://oikos-iot.firebaseio.com/.json', params={'print': 'pretty'})			# TODO: Properly authenticate
database = r.json()

def print_database(database=database):
	"""
	Prints the database in a more friendly way.
	"""
	for house in database.keys():
		print house
		for state in database[house].keys():
			print state + ": " + str(database[house][state])
		print ""

print_database()