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
        		var message = {};
				    message.sender = "Floc";
				    message.receiver = "Marine";
				    message.content = "Coucou !";
				    message.date = "12:12";
				  var message2 = {};
				    message2.sender = "Marine";
				    message2.receiver = "Floc";
				    message2.content = "Salut :D";
				    message2.date = "12:13";
				  var message3 = {};
				    message3.sender = "Floc";
				    message3.receiver = "Marine";
				    message3.content = "les cours le samedi c'est trop pourri !!!!!!!!!!!!!!!! J'ai trop envie de sécher :p";
				    message3.date = "12:14";

				  var listmessages = [];
				  listmessages.push(message);
				  listmessages.push(message2);
				  listmessages.push(message3);

				  console.log(listmessages);

					res.render('chat', { username : data.username, messages : listmessages
				        });
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