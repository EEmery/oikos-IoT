const SUCCESS = 200
let request = require('request')
let temp = require('config').thermostats
let key = require('config').key

exports.setTemperature = () => {
	request
		.post({
		  url: temp.url + temp.deviceID,
		  json: true,                                             
		  qs: {apikey: key.apikey, locationId: key.locationId},
		  method: 'POST',
		  headers: {
		      'Content-Type': 'application/json',
		      'Authorization': key.auth
		  },
		  body: {
			'mode': 'Heat',
			'heatSetpoint': 62,
			'coolSetpoint': 80,
			'thermostatSetpointStatus': 'TemporaryHold'
			}
	}, function(error, response, body){
     error ? console.log(error) : console.log(response.statusCode, body);
	})
}	

exports.authorization = () => {
 request
 		.get('https://api.honeywell.com/oauth2/authorize?client_id=WufI1lCABizcCDGkGaKuku3wG9chcdik&response_type=code')
 		.on('response', function(response) {
    	console.log(response.statusCode)
    	console.log(response.headers['content-type'])
  })
 		.pipe(request.get('/token'))
}
 
