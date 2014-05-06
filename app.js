
var express = require('express'),
    http = require('http'),
    colors = require('colors'),
    ejs = require('ejs'),
    mongodb = require('mongodb'),
    app = express(),
    httpServer = http.createServer(app);

    global.app = app;

    console.log(require("./server/utils"));


/*
 *	Configuration with express
 */

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

/*
 *	Demarrage du serveur
 */

    httpServer.listen(app.get('port'), function () {
    console.log("Simple chat server listening on port %s.".green, httpServer.address().port);
});


app.get('/', function(req, res){
	//red.send renvoie sur la page web 
	res.send('Bienvenue sur Simple Chat !')
    });




