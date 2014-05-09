
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
          res.redirect("/login");
       }
  });

app.get('/chat', function(req, res){
    console.log("Entrée dans la fonction get chat".green);

    /*jeu de test des messages*/
    var message = {};
      message.sender = "Floc";
      message.receiver = "Marine";
      message.text = "Coucou !";
      message.date = "12:12";
    var message2 = {};
      message2.sender = "Marine";
      message2.receiver = "Floc";
      message2.text = "Salut :D";
      message2.date = "12:13";
    var message3 = {};
      message3.sender = "Floc";
      message3.receiver = "Marine";
      message3.text = "les cours le samedi c'est trop pourri !!!!!!!!!!!!!!!! J'ai trop envie de sécher :p";
      message3.date = "12:14";

    var listmessages = [];
    listmessages.push(message);
    listmessages.push(message2);
    listmessages.push(message3);

    /*fin de jeu de test des messages*/  

    console.log('id de session : '+req.sessionID);

    //Ajouter une liste d'utilisateurs connectés

    for( var user in logusers )
      if( logusers.hasOwnProperty( user ) )
        if( logusers[user] == req.sessionID )
          res.render('chat', {
            friendid :'', 
            userid :'',
            username : user, 
            users : [],
            messages : listmessages
          });
    });

app.get('/chat/:user', function(req, res){

  for( var user in logusers )
    if( logusers.hasOwnProperty( user ) )
      if( logusers[user] == req.sessionID )
        var senderName = user;
        userRepository.getUserByName(user, function(err, objectuser){
            var idSender = objectuser.id;

            userRepository.getUserByName(req.param("user"), function(err, objectuser){
                var idReceiver = objectuser.id;

                userRepository.getMessages(idSender, idReceiver, 50, function(err, messages)
                  {
                    console.log(messages);

                    var userHashMap = {};
                    userHashMap[idSender] = senderName;
                    userHashMap[idReceiver] = req.param("user");
                    res.render('chat', { 
                        users : userHashMap,
                        username : user, 
                        friendid : idReceiver, 
                        userid : idSender,
                        messages : messages
                    });
                  });

            });

        });
/*
   var message2 = {};
      message2.sender = "Marine";
      message2.receiver = "Floc";
      message2.text = "Salut :D";
      message2.date = "12:13";
    var message3 = {};
      message3.sender = "Floc";
      message3.receiver = "Marine";
      message3.text = "les cours le samedi c'est trop pourri !!!!!!!!!!!!!!!! J'ai trop envie de sécher :p";
      message3.date = "12:14";

    var listmessages = [];
    listmessages.push(message2);
    listmessages.push(message3);
    for( var user in logusers )
        if( logusers.hasOwnProperty( user ) )
          if( logusers[user] == req.sessionID )
          {
            //user = utilisateur courant 
            var currentfriend = req.param("user");
            userRepository.getUserByName(user, function(err, sender){
              userRepository.getUserByName(currentfriend, function(err, receiver){
                  res.render('chat', { 
                    friendid: receiver.id,
                    userid :  sender.id,
                    username : user, 
                    messages : listmessages
                });
              });
            });
            //Récupérer les messages entre 2 utilisateurs
            //Mettre le res.render dans le callback
            
          }*/
    });