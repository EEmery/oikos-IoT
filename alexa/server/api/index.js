let express = require('express')
let honeywell = require('../vendors/honeywell')
let app = module.exports = express()

app.get('/temperature', function (req, res) {
  honeywell.setTemperature()
});

app.get('/authorization', function (req, res) {
	honeywell.authorization()
});