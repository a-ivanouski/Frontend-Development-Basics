'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;
var localtunnel = require('localtunnel');
var WebPageTest = require('webpagetest');
var wpt = new WebPageTest('www.webpagetest.org', 'A.5b0265588a1abe6b0a7e96e444c34546');

var handle;

app.get('/', home);
app.get('/test', test);
app.listen(port, listening);

function home (req, res) {
  var file = path.join(__dirname, 'index.html');
  var index = fs.readFileSync(file, 'utf8');
  res.send(index);
}

function test (req, res) {
  var tunnel = localtunnel(port, function(err, tunnel) {

    if(err) return;
    var testId;
    wpt.runTest(tunnel.url, {location: 'ec2-us-west-2:Firefox'}, function(err, data) {
        testId = data.data.testId;
        handle = setInterval(requestResults, 6000);
    });

    function requestResults() {
        wpt.getTestResults(testId, function (err, data) {
            var testResults = data;
            console.log(data.statusText);
            if(data.statusCode === 200) {
                var testResults = data.data.average.firstView;
                res.json({
                    'timing': {
                        'ttfb': testResults.TTFB,
                        'speedIndex': testResults.SpeedIndex,
                        'domLoaded': testResults.domContentLoadedEventStart
                    }
                });
                clearInterval(handle);
            }
        }); 
    }
  });
}