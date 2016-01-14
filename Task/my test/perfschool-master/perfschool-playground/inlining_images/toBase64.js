const DataURI = require('datauri').promise;
var fs = require('fs');
fs.readdir('./', function(err, items) {
    var images = '';
    for (var i=0; i < items.length; i++) {
        if(items[i].indexOf('.png') !== -1) {
            (function (item) {
                DataURI('./' + item)
                  .then(function(content)  {
                        console.log('<img style="background:url(' + content + ')"/>\n');
                  });
            })(items[i]);
        }
    }
});

