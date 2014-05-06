  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://127.0.0.1:27017/simplechat', function(err, db) {
    if(err) throw err;

    var collection = db.collection('users');
    console.log("Collection : "+collection);
    //fonction insert

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
      });
    });
