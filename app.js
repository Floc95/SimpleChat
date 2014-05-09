//Déclaration des variables

var express = require('express'),
    http = require('http'),
    colors = require('colors'),
    ejs = require('ejs'),
    mongodb = require('mongodb'),
    app = express(),
    httpServer = http.createServer(app);
    dbsimplechat = require('mongodb').MongoClient,
    format = require('util').format,
    crypto = require('crypto'),
    md5 = require('MD5'),
    socketio = require('socket.io').listen(80);


    global.app = app;
    global.crypto = crypto;
    global.colors = colors;

var logusers = {} //Hashmap avec les id utilisateur et session

    global.logusers = logusers;

//Configuration de l'application

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


//Lancement du serveur

httpServer.listen(app.get('port'), function () {
    console.log("Simple chat server listening on port %s.".green, httpServer.address().port);

    socketio.sockets.on('connection', function (socket) {
      socket.on('sendMessage', function (data) {
        // Sauvegarde en bdd
        userRepository.createMessage(data, function(a, b) {});
        socketio.sockets.emit('receiveMessage', data);
      });

      socket.on('userConnect', function (data) {
        logusers[data.name] = data.user;
        socketio.sockets.emit('setUserConnect', logusers);
      });
    });

    });


//Connection a la base de données

var Repository = require('./server/repository').Repository;
var userRepository = new Repository();

global.userRepository = userRepository;

global.userConnect = function(user)
{
    userRepository.getUserByName(user, function(err, data) {
        socketio.sockets.emit('setUserConnect', logusers);
    });
};

//Définitions des fichiers utils

require("./server/utils/get");
require("./server/utils/post");
require("./server/utils/error");