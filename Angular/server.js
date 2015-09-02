var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));


app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname + '/' });
});

app.listen(3000);