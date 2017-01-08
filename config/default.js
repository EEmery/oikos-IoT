module.exports = {
	server: {
    	port: process.env.PORT || 3000
	},
	thermostats: {
		url: 'https://api.honeywell.com/v2/devices/thermostats/',
		deviceID: 'LCC-00D02DB820AC'
	},
	key:{
		locationId: '148694',
		apikey: 'WufI1lCABizcCDGkGaKuku3wG9chcdik',
		auth: 'V3VmSTFsQ0FCaXpjQ0RHa0dhS3VrdTN3RzljaGNkaWs6ejk4VHRud05laEFmczBodw=='
	}
};

