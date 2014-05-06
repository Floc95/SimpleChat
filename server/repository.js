function Repository()
{
	var self = this;
	dbsimplechat.connect('mongodb://127.0.0.1:27017/simplechat', function(err, db) {
		console.log("Création de la collection".blue);
    	if(err) throw err;
	    self.usercollection = db.collection('users');
	    db.close();
	});

	self.getUser = function(id, callback) {
		console.log("Collection : "+self.collection);
		return self.usercollection.findOne({
			id : id
		}, function(err, res){
			callback(err, res);
		})		
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
