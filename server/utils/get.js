app.get('/', function(req, res){
	res.send("hello");
});

app.get('/messages', function(req, res){
	dbsimplechat.connect('mongodb://127.0.0.1:27017/simplechat', function(err, db) {
    if(err) throw err;

    var collection = db.collection('messages');

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        res.send(results);
        // Let's close the db
        db.close();
      });
    });
 });

app.get('/1', function(req, res){
	var Repository = require('../repository').Repository;
	var repo = new Repository();

	console.log("Nouveau repo : "+ repo);

	res.send(repo.getUser("1", ""));
});

app.get('/login', function(req, res){
	res.render('login', {
            value: 'Veuillez saisir un autre login'
        });
});

