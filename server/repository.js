function Repository()
{
	var self = this;

  dbsimplechat.connect('mongodb://127.0.0.1:27017/simplechat', function(err, db) {
    if(err) throw err;

    self.usercollection = db.collection('users');
  	self.messagecollection = db.collection('messages');
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
    //Comment résupérer l'id ?
    console.log('Entrée dans la fonction createUser'.blue);
    self.usercollection.insert({
      id : 3, 
      username : user.login, 
      password : md5(user.password),
      creationDate : Date.now()
    },
    function(err, cursor) {
      console.log('Entrée dans la fonction callback de create user'.red);
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
    console.log('Entrée dans la fonction createMessage'.red);
    var idmessage = parseInt(self.messagecollection.count()+1);
		self.messagecollection.insert({
      id : idmessage, 
      sender : message.sender, 
      receiver : message.receiver,
      text : message.text,
      sendDate : Date.now()
    },
     function(err, cursor) {
      console.log('Entrée dans la fonction callback de create message'.red);
      callback(0, 0);
    });
  };

}
exports.Repository = Repository;
