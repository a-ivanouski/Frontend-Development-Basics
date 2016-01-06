var cssfiles = ['index.css','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css']

var files   = ['index.html'],
  options = {
    csspath      : '.',
    stylesheets  : cssfiles
  };


var fs = require('fs');
var stream = fs.createWriteStream("myCss.css");
uncss(files, options, function (error, output) {
  stream.write(output + '\n');
  console.log('done')
});