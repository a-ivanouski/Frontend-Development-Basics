'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;

var psi = require('psi');
var localtunnel = require('localtunnel');

app.get('/', home);
app.get('/insights', insights);
app.listen(port, listening);

function listening () {
  console.log('Listening on port', port);
}

function home (req, res) {
  var file = path.join(__dirname, 'index.html');
  var index = fs.readFileSync(file, 'utf8');
  res.send(index);
}

function insights(req, res) {
    function response(err, data) {
        var response =
        {
            resources: {
                js: data.pageStats.numberJsResources,
                css: data.pageStats.numberCssResources,
                total: data.pageStats.numberResources,
                hosts: data.pageStats.numberHosts
            }
        };

        res.json(response);
    }

    function setUp(err, tunnel) {
        psi(tunnel.url, function (err, data) { tunnel.close(); response(err, data); });
    }

    localtunnel(port, setUp);
}
