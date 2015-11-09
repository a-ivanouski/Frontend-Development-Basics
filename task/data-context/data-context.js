var fs = require('fs');

function DataContext (key) {
    if (!(this instanceof DataContext)) {
        return new DataContext(key);
    }

    if(!key)
    {
        throw 'key is not valid';
    }

    var connectionString = './RestAppRepositories/';

    var data = null;

    this.getData = function(){
        if(data){
            return data;
        }

        if (!fs.existsSync(connectionString)){
            fs.mkdirSync(connectionString);
        }

        if(!fs.existsSync(connectionString + key + '.txt')){
            fs.openSync(connectionString + key + '.txt', 'w');
        } else {
            data = JSON.parse(fs.readFileSync(connectionString + key + '.txt'));
        }

        data = data || [];

        return data;
    }

    this.save = function (){
        fs.writeFileSync(connectionString + key + '.txt', JSON.stringify(data))

        data = null;
    }
}


exports.DataContext = DataContext;