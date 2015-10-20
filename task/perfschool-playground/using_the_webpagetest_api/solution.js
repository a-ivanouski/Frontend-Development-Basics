'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 7777;

var WebPageTest = require('webpagetest');
var localtunnel = require('localtunnel');
var request = require('request');

var testPage = new WebPageTest('www.webpagetest.org', 'A.58c95ba6d4744a69824945f392e30d89');


app.get('/', home);
app.get('/test', test);
app.listen(port, listening);

function listening () {
  console.log('Listening on port', port);
}

function home (req, res) {
  var file = path.join(__dirname, 'index.html');
  var index = fs.readFileSync(file, 'utf8');
  res.send(index);
}

function test(req, res) {
    var state;

    function response(err, resp) {
        var data = JSON.parse(resp.body);

        var respons =
            {
                timing: {
                    ttfb: data.data.runs[1].firstView.TTFB,
                    speedIndex: data.data.runs[1].firstView.SpeedIndex,
                    domLoaded: data.data.runs[1].firstView.domContentLoadedEventStart
                }
            };

        res.json(respons);
    }

    function checkTestState(err, data) {
        if (!state) state = data;

        setTimeout(function () {
            testPage.getTestStatus(state.data.testId, {}, function (err, resp) {
                if (!(resp.statusText === 'Test Complete')) {
                    console.log(resp.statusText);
                    checkTestState();
                } else {
                    request(state.data.jsonUrl, response);
                }
            });
        }, 10000);
    }

    function setUp(err, tunnel) {
        testPage.runTest(tunnel.url, {}, checkTestState);
    }

    localtunnel(port, setUp);
}