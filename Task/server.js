var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));


var database = require('./database').openDatabase('DataBase name');

function createRespObj(status, data) {
  return {
    status: status,
    data: data
  }
}

var setKeysOfTask = [
    'name',
    'description',
    'deadline',
    'priority',
    'category',
    'status',
]


function checkRespTask (task) {
  var count = 0;
  for(var key in task) {
      if(task.hasOwnProperty(key) && (setKeysOfTask.indexOf(key)) !== -1) {
        count++;
      }
  }
  return count === setKeysOfTask.length  ? true : false;
}



app.use('/js', express.static(__dirname + '/js'));

app.get('/', function (req, res) {
  fs.readFile('index.html', function (err, data){
        if (err) {
            res.end("File wasn't found");
        } else {
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
          res.end(data);
        }
    });
});

app.get('/tasks', function (req, res) {
  var result = database.getTasks();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));
});

app.get('/tasks/:categorie', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if(req.params.categorie){
    var data = database.getTasksByCategory(req.params.categorie);

    var result = createRespObj('success', data);

    res.end(JSON.stringify(result));
  } else {
    res.end(JSON.stringify(createRespObj('error')))
  }

});

app.put('/task', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  if(checkRespTask(req.body)) {
    database.addTask(req.body);
    res.end(JSON.stringify(createRespObj('success')))
  } else {
    res.end(JSON.stringify(createRespObj('error')))
  }
});

app.get('/task/:name', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

  if(req.params.name) {
    var result = database.getTaskByName(req.params.name);
    res.end(JSON.stringify(createRespObj('success',result)));
  } else {
    res.end(JSON.stringify(createRespObj('error')))
  }
});



app.delete('/task/:id', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('delete task/:id'));
});

app.post('/task/:id', function (req, res) {
  console.log(req.body.data); 
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('update(post) task/:id'));
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});