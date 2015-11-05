var fs = require('fs');
var dataBase = {};
var tasks = [];


//taskType
/*
  {
    name:
    description:
    deadline:
    priority (Hi, Medium, Low):
    category:
    status (Normal, Completed, Overdue):
  }


 */
dataBase.addTask = function (task) {
  tasks.push(task);
}

dataBase.deleteTaskByName = function (taskName) {
  var index = tasks.findIndex(function (element) {
    return element.name === taskName;
  });
  if(index !== -1) {
    tasks.splice(index, 1);
    return true;
  } else {
    //'task was not found'
    return false;
  }
}

dataBase.getTaskByName = function (taskName) {
  console.log(taskName);
  return tasks.find(function (element) {
    console.log(2222222); // errors here
    return element.name === taskName;
  });
}

dataBase.updateTaskByName = function (task) {
  var index = tasks.findIndex(function (element) {
    return element.name === task.name;
  });
  if(index !== -1) {
    tasks[index] = task;
    return true;
  } else {
    //'task was not found'
    return false
  }
}

dataBase.getTasks = function () {
  return tasks;
}

dataBase.getTasksByCategory = function (category) {
  var tasksByCategory = tasks.filter(function (element) {
    return element.category === category;
  });
  return tasksByCategory;
}

dataBase.getTasksByPriority = function (priority) {
    var tasksByPriority = tasks.filter(function (element) {
    return element.priority === priority;
  });
  return tasksByPriority;
}

function openDatabase () {
  return dataBase;
}


exports.openDatabase = openDatabase;