'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var request = require('request');
var app = express();
var port = process.env.PORT || 7777;
var localtunnel = require('localtunnel');


var pageSpeedApiUrl = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=';

app.get('/', home);
app.get('/insights', insights);
app.listen(port, listening);

function runPSA() {
    request(pageSpeedApiUrl + localtunnelAppUrl, function(error, response, body) {
        console.log(body);
    });
}

function listening() {
    console.log('Listening on port', port);
}

function home(req, res) {
    var file = path.join(__dirname, 'index.html');
    var index = fs.readFileSync(file, 'utf8');
    res.send(index);
}

function insights(req, res) {
	var tunnel = localtunnel(port, function(err, tunnel) {
	
		var requestedURL = pageSpeedApiUrl + tunnel.url;

		request(requestedURL, function(error, response, body) {
	        var pageStats = JSON.parse(body).pageStats;
	        
	        res.json({
	            "resources": {
	                "css": pageStats.numberCssResources,
	                "js": pageStats.numberJsResources,
	                "hosts": pageStats.numberHosts,
	                "total": pageStats.numberResources
	            }
	        });

	        tunnel.close();
		});
	});
}
