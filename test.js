var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  
  
    MongoClient.connect('mongodb://127.0.0.1:27017/simplechat', function(err, db) {
  if(err) throw err;


   console.log(db.collection('users').find(
   	   {
          'username' : 'Floc'
   	   }, 
       {
         _id : 0
       },
   	   function(err, cursor) {

           var next = function () {
               cursor.nextObject(function (err, item) {
                   if (err || !item) {
                       return;
                   }
                   console.log(item);
                   next();
               })

           }
           next();
       }
  ))});
