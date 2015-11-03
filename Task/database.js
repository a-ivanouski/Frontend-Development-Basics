var fs = require('fs');
var dataBase = {};
var tasks = [];


//taskType
/*
  {
    name:
    description:
    Deadline:
    Priority (Hi, Medium, Low):
    Category:
    Status (Normal, Completed, Overdue):
  }


 */
dataBase.addTask = function (task) {
  tasks.push(task);
}

dataBase.deleteTaskByName = function (taskName) {
}

dataBase.getTaskByName = function (taskName) {
}

dataBase.updateTaskByName = function (taskName) {
}

dataBase.getTasks = function () {
  return tasks;
}

dataBase.getTasksByCategory = function (category) {
}

dataBase.getTasksByPriority = function (priority) {
}

function openDatabase () {
  return dataBase;
}
exports.openDatabase = openDatabase;