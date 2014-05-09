function Repository()
{
	var self = this;

  dbsimplechat.connect('mongodb://127.0.0.1:27017/simplechat', function(err, db) {
    if(err) throw err;

    self.usercollection = db.collection('users');
  	self.messagecollection = db.collection('messages');

    db.collection("messages", function(err, collection) {
        collection.count(function (err, count) {
            self.messagecounter = count;
        });
    });

    db.collection("users", function(err, collection) {
        collection.count(function (err, count) {
            self.usercounter= count;
        });
    });

  });

  	//Done
	
  self.getUserById = function(id, callback) {
	   	self.usercollection.findOne(
   	   	{
          'id' : id
   	   	}, 
       	{
         _id : 0
       	},
   	   	function(err, cursor) {
           	callback(null, cursor);
       	}
  		);
	   };

  self.getUserByName = function(name, callback){
        self.usercollection.findOne(
        {
          'username' : name
        }, 
        {
         _id : 0
        },
        function(err, cursor) {
            callback(null, cursor);
        }
        );
        };

  //TODO : Retourner un tableau d'objets
	self.getUsers = function(ids) {
		// TODO
	 };

	//TODO : Faire un insert
	self.createUser = function(user, callback) {
    self.usercollection.insert({
      id : self.usercounter+1,
      username : user.login, 
      password : md5(user.password),
      avatar: user.avatar,
      creationDate : Date.now()
    },
    function(err, cursor) {
      callback(0, 0);
    }
    );
	 };

	//TODO : Retourner tous les messages entre 2 utilisateurs
	self.getMessages = function(senderId, receiverId, messagesCount, callback) {
    console.log('get messages'.green);
		self.messagecollection.find(
            {
                $and: [
                    { $or: [ { 'sender': senderId }, { 'sender': receiverId } ] },
                    { $or: [ { 'receiver': senderId }, { 'receiver': receiverId } ] }
                ]
            },
            {
                _id : 0
            },
            function(err, cursor) {
                var counter = 0;
                var msgList = [];
                var next = function () {
                    cursor.nextObject(function (err, item) {
                        if (err || !item) {
                            callback(0, msgList);
                            return;
                        }
                        counter++;
                        msgList.push(item);
                        if (counter < messagesCount){
                          next();
                        }
                    })
                }
                next();
            }
        );
	 };

	//TODO : jouter un nouveau message en base
	self.createMessage = function(message, callback) {
		self.messagecollection.insert({
      id : self.messagecounter+1,
      sender : message.idSender, 
      receiver : message.idReceiver,
      text : message.text,
      sendDate : message.sendDate
    },
     function(err, cursor) {
      callback(0, 0);
    });
  };

}
exports.Repository = Repository;
