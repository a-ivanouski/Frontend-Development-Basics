'use strict';

var secret_key = '1648ff033486e7e';

var express = require('express');
var app = express();
var port = process.env.PORT || 7777;

var request = require('request');
var gm = require('gm');

app.get('/cats', cats);
app.use(express.static('./img'));
app.listen(port, listening);

function listening () {
    console.log('Listening on port', port);
}

function cats (req, res) {
    var imgUrls = 'https://api.imgur.com/3/gallery/r/kittens';

    var params = {
        headers: { Authorization: 'Client-ID ' + secret_key },
        url: imgUrls,
        json: true
    };

    function convertCats(err, response) {
        var count = 0;

        res.contentType('text/html');

        //var cats = response.body.data.map(function (v) { return v.link; });

        var result = '';

        var cats = ['http://i.imgur.com/szp6mtc.jpg',
                'http://i.imgur.com/LDi7dQc.jpg',
                'http://i.imgur.com/QTWNuxD.jpg',
                'http://i.imgur.com/blSnwaJ.jpg',
                'http://i.imgur.com/Kd4vU6t.jpg',
                'http://i.imgur.com/GM8I8CN.jpg',
                'http://i.imgur.com/976ITaH.jpg',
                'http://i.imgur.com/47ePYw8.gif'];

        cats.forEach(function (cat, i) {
            gm(request(cat))
                .noProfile()
                .resize(300, 300)
                .write('./img/' + cat.slice(cat.lastIndexOf('/') + 1) + '.jpg', function () {
                    count++;

                    result += '<img src=\'' + cat.slice(cat.lastIndexOf('/') + 1) + '.jpg' + '\' />';

                    if(count == 8)
                        res.end(result);
                });
        });
    }

    request(params, convertCats);
}
