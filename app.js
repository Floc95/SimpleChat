
var express = require('express'),
    http = require('http'),
    colors = require('colors'),
    ejs = require('ejs'),
    mongodb = require('mongodb'),
    app = express(),
    httpServer = http.createServer(app);
    dbsimplechat = require('mongodb').MongoClient,
    format = require('util').format;

    global.app = app;
    global.colors = colors;


    global.dbsimplechat = dbsimplechat;

app.configure(function () {
    app.set('port', 3000);
    app.use(express.static(__dirname + '/public'));

    app.engine('ejs', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.set('views',__dirname + '/public/views');
    app.set('view options', { layout:false, root: __dirname + '/public/views' });

    app.use(express.urlencoded()),
    app.use(express.cookieParser());
    app.use(express.session({
        "secret": "some private string",
        "store":  new express.session.MemoryStore({ reapInterval: 60000 * 10 })
        }));
    });


httpServer.listen(app.get('port'), function () {
    console.log("Simple chat server listening on port %s.".green, httpServer.address().port);
    });

console.log(require("./server/utils/get"));
console.log(require("./server/utils/set"));
console.log(require("./server/utils/post"))

console.log(require("./server/utils/error"));
