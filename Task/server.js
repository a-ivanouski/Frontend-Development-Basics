var express = require('express');
var fs = require('fs');
var app = express();

app.use('/js', express.static(__dirname + '/js'));

app.get('/', function (req, res) {
  fs.readFile('index.html', function (err, data){
        if (err) {
            res.end("File wasn't found");
        }
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    });
});

app.get('/tasks', function (req, res) {
  var result = {
    tasks: [1,2,3,4,5]
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));
});

app.get('/tasks/:categorie', function (req, res) {
  var result = {
    categorie: req.params.categorie,
    tasks: [1,2,3,4,5]
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));
});

app.get('/task/:id', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('get task/:id'));
});

app.put('/task', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('put task'));
});

app.delete('/task/:id', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('delete task/:id'));
});

app.post('/task/:id', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('update(post) task/:id'));
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});