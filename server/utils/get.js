
app.get('/', function(req, res){
	res.redirect('/login');
  });

app.get('/message/:sender', function(req, res){
  var sender = parseInt(req.param("sender"), 10);
    userRepository.getMessages(sender, 0, function (err, data) {
      console.log("DATA ".green+data);
      if (data)
          res.send(data.text);
      if (err)            
        console.error(err.stack); 
    });
 });

app.get('/login', function(req, res){
  //if sessionID n'appartient pas au tableau
  console.log('Entree dans get login'.blue);
  console.log('utilisateurs conntectés '.blue+logusers);
  for( var user in logusers )
    if( logusers.hasOwnProperty( user ) )
       if( logusers[user] == req.sessionID ){
          console.log('redirection vers chat'.red);
          res.redirect('/chat');
       }
    console.log('affichage de la page login'.green);
   res.render('login', { errormessage: ''});
  });

app.get('/signin', function(req, res){
  res.render('signin', { errormessage : ''});
  });

app.get('/deco', function(req, res){
  console.log('Entree dans get unlog'.red);
  for( var user in logusers )
    if(logusers.hasOwnProperty(user))
       if(logusers[user] == req.sessionID ){
          delete logusers[user];
          userConnect();
          res.redirect("/login");
       }
  });

app.get('/chat', function(req, res){
  for( var user in logusers ){
    if( logusers.hasOwnProperty( user ) ){
      if( logusers[user] == req.sessionID ){
        userRepository.getUserByName(user, function(err, res_user){
          res.render('home', { 
            username : res_user.username,
            avatar : res_user.avatar
          });
        });
      }
    }
  }
});

app.get('/chat/:user', function(req, res){

  for( var user in logusers ){
    if( logusers.hasOwnProperty( user ) ){
      if( logusers[user] == req.sessionID ){
        var senderName = user;
        userRepository.getUserByName(user, function(err, res_user){
            var idSender = res_user.id;

            userRepository.getUserByName(req.param("user"), function(err, res_user2){
                var idReceiver = res_user2.id;

                userRepository.getMessages(idSender, idReceiver, 50, function(err, messages)
                  {
                    var userHashMap = {};
                    userHashMap[idSender] = senderName;
                    userHashMap[idReceiver] = req.param("user");
                    res.render('chat', { 
                        users : userHashMap,
                        username : req.param("user"), 
                        friendid : idReceiver, 
                        avatar : res_user2.avatar,
                        userid : idSender,
                        messages : messages
                    });
                  });

            });

        });
      }
    }
  }
    });