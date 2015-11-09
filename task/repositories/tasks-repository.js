﻿var dataContext = new require('../data-context/data-context').DataContext('task');

var Validator = require('jsonschema').Validator;
var validatory = new Validator();

function TaskRepository() {
    if (!(this instanceof TaskRepository)) {
        return new TaskRepository();
    }

    var validator = new Validator();

    var taskSchema = {
        "id": "/task",
        "type": "object",
        "properties": {
            "id": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "deadline": {
                "type": "string"
            },
            "priority": {
                "type": "string"
            },
            "category": {
                "type": "object"
            },
            "status": {
                "type": "string"
            },
        },
        "required": ["description", "category"]
    }

    function createGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    this.create = function (item) {
        if (validator.validate(item, taskSchema).errors.length > 0) {
            throw "Object is not valid";
        }

        item.id = createGuid();

        dataContext.getData().push(item);

        dataContext.save();

        return item.id;
    }

    this.read = function (id) {
        return dataContext.getData().filter(function (i) {
            return i.id === id;
        })[0];
    }

    this.readAll = function (categoryName) {
        if (!categoryName)
            return dataContext.getData();

        return dataContext.getData().filter(function (i) {
            return i.category.name === categoryName;
        });
    }

    this.update = function (item) {
        if (validator.validate(item, taskSchema).errors.length > 0) {
            throw "Object is not valid";
        }

        var isDeleteSuccess = false;

        dataContext.getData().forEach(function (v, i, arr) {
            if (item.id === v.id) {
                arr.splice(i, 1)
                isDeleteSuccess = true;
            }
        });

        if (!isDeleteSuccess)
            throw "There is no elements to update";

        dataContext.getData().push(item);

        dataContext.save();
    }

    this.delete = function (id) {
        dataContext.getData().forEach(function (v, i, arr) {
            if (id === v.id) {
                arr.splice(i, 1);
            }
        });

        dataContext.save();
    }
}

exports.TaskRepository = TaskRepository;