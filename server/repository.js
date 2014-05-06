function Repository()
{
	var self = this;

  dbsimplechat.connect('mongodb://127.0.0.1:27017/simplechat', function(err, db) {
    if(err) throw err;

    self.usercollection = db.collection('users');
    console.log("Collection : "+self.usercollection);
	});

	self.getUser = function(id, callback) {
	   	console.log(self.usercollection.find(
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
  		));
	};

	self.getUsers = function(ids) {
		// TODO
	};

	self.createUser = function(username, id) {
		// TODO
	};

	self.getMessages = function(senderId, receiverIds, messagesCount) {
		// TODO
	};

	self.createMessage = function(senderId, receiverIds, text) {
		// TODO
	}
}

exports.Repository = Repository;
