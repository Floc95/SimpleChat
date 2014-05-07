app.get('/', function(req, res){
	res.send("hello");
});

app.get('/messages/:sender/:receiver', function(req, res){
  var sender = parseInt(req.param("sender"), 10);
  var receivers = [parseInt(req.param("receiver"), 10)];
    userRepository.getMessages(sender, receivers, 0, function (err, data) {
      console.log("DATA ".green+data);
      if (data.text)
          res.send(data.text);
      if (err)            
        console.error(err.stack); 
    });
 });

app.get('/id/:id', function(req, res) {
    var currentid = parseInt(req.param("id"), 10);
    userRepository.getUserById(currentid, function (err, data) {
      console.log("DATA ".green+data);
      if (data.username)
          res.send(data.username);
        //Vérifier le mot de passe
      if (err)            
        console.error(err.stack);

    });
});

app.get('/name/:name', function(req, res){
    var currentname = req.param("name");
    userRepository.getUserByName(currentname, function(err, data){
        if(err){
            console.error((err.stack));
            return;
        }
        res.send("id : " + data.id + " username : "+ data.username );
    });
});

app.get('/login', function(req, res){
	res.render('login', {
            errormessage: ''
        });
});

app.get('/unlog/:login', function(req, res){
  //parcourir la map d'utilisateur connecté, pour l'utilisateur dont l'id est egal a la session mettre à null
  res.render('login', {
            errormessage: ''
        });
});

app.get('/signin', function(req, res){
  res.render('signin', {
            errormessage: ''
        });
});

app.get('/chat', function(req, res){

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

  console.log(listmessages);

	res.render('chat', { username : "marine", messages : listmessages
        });

  
});

