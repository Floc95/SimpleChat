
//Login utilisateur
app.post('/login', function(req, res){
    var userlogin = req.body.user.login;
    var userpassword = req.body.user.password;

    userRepository.getUserByName(userlogin, function(err, data){
        if(err){
            console.error((err.stack));
            return;
        }
        if (data)
        {
        	console.log("userpassword : ".red+userpassword);
        	console.log("data.password : ".red+data.password);
    		if (data.password == md5(userpassword)){
    			logusers[data.username] = req.sessionID;
			 	console.log(logusers);
			  	res.writeHead(301, {Location:'/chat'});
			  	res.end();
				//res.render('chat', { username : data.username, messages : defaultmessage
				//        });
    		}
    		else
        		res.render('login', {
            		errormessage: 'Erreur de mot de passe'
        		});  
    	}
    	else
    		res.render('login', {
            		errormessage: 'Utilisateur introuvable'
        		});  
    });
	});

//Inscription
app.post('/signin', function(req, res){

    var user = {};
    console.log('Login : '.blue+req.body.user.login);

 	user.login = req.body.user.login;
    user.password = req.body.user.password;
	
    userRepository.getUserByName(user.login, function(err, data){
        if(err){
            console.error((err.stack));
            return;
        }
        if (data)
        	res.render('signin', {
            		errormessage: 'Un utilisateur avec le même login est déjà existant, veuillez choisir un autre login.'
        		});  
        else 
        	userRepository.createUser(user, function(err, data){
                res.redirect('login');
            });         
        
	//Faire un insert
		});
	});

app.post('/sendmessage', function(req, res){
    console.log('Entrée dans la fonction sendmessage'.green);
        var message = {};
        message.sender = req.body.messagepost.sender;
        message.receiver = req.body.messagepost.receiver;
        message.text = req.body.messagepost.text;
        userRepository.createMessage(message, function(err, data){
            console.log("message : ".red+message.text);
        });
    });