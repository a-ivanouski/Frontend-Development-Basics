var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

var categoryRepository = new require('./repositories/category-repository').CategoryRepository();
var taskRepository = new require('./repositories/tasks-repository').TaskRepository();

app.get('/categories', function (req, res) {
    var responseData = categoryRepository.readAll();

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(responseData));
});

app.get('/categories/:id', function (req, res) {
    var responseData = categoryRepository.read(req.params.id);

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(responseData));
});

app.post('/categories', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    res.end(categoryRepository.create(req.body));
});

app.put('/categories/:id', function (req, res) {
    var item = req.body;

    item.id = req.params.id;

    categoryRepository.update(req.body);

    res.end();
});

app.delete('/categories/:id', function (req, res) {
    var category = categoryRepository.read(req.params.id);

    categoryRepository.delete(req.params.id);

    var tasksToRemove = taskRepository.readAll(category.name);

    tasksToRemove.forEach(function (v, i) {
        taskRepository.delete(v.id);
    })

    res.end();
});

app.get('/tasks', function (req, res) {
    var responseData = taskRepository.readAll(req.query.category);

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(responseData));
});

app.get('/tasks/:id', function (req, res) {
    var responseData = taskRepository.read(req.params.id);

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(responseData));
});

app.post('/tasks', function (req, res) {
    if (!categoryRepository.read(req.body.category.id)) {
        throw "Invalid category";
    }

    res.setHeader('Content-Type', 'application/json');

    res.end(taskRepository.create(req.body));
});

app.put('/tasks/check/:id', function (req, res) {
    var task = taskRepository.read(req.params.id);

    task.status = 'Completed';

    taskRepository.update(task);

    res.end();
});

app.put('/tasks/:id', function (req, res) {
    if (!categoryRepository.read(req.body.category.id)) {
        throw "Invalid category";
    }

    var item = req.body;

    item.id = req.params.id;

    taskRepository.update(req.body);

    res.end();
});

app.delete('/tasks/:id', function (req, res) {
    taskRepository.delete(req.params.id);

    res.end();
});

app.listen(3000, function () {
    console.log('Listening at localhost:3000 ...');
});