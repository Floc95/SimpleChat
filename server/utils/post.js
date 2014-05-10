
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
             userConnect(data.username);
             res.writeHead(301, {Location:'/chat'});
             res.end();
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

app.post('/signin', function(req, res){

    var user = {};
    console.log('Login : '.blue+req.body.user.login);

    user.login = req.body.user.login;
    user.password = req.body.user.password;
    user.avatar = "../img/inconnu.jpg";

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

app.post('/updateprofile', function(req, res){
    //vérifier si l'utilisateur change de mot de passe ou d'avatar, sinon lui renvoyer un message d'erreur
    var newpassword = req.body.user.newpassword;
    var oldpassword = req.body.user.oldpassword;

    var newavatar = req.body.avatar;
    console.log(req.body.avatar);
    console.log(req.files.avatar.path);
    console.log('AVATAR : '.blue+newavatar);

    console.log('Entree dans post updateprofile'.green);
    for( var user in logusers ){
    if( logusers.hasOwnProperty( user ) ){
      if( logusers[user] == req.sessionID ){
        userRepository.getUserByName(user, function(err, currentuser){
            var newuser = currentuser;
            if (newpassword != ""){
                if (md5(oldpassword) == currentuser.password){
                    console.log("mot de passe a changer".green);
                    newuser.password = md5(newpassword);
                }
                else{
                    console.log("Mauvais mot de passe courant".red);
                }
            }
            if (newavatar != ""){
                //Upload
                fs.readFile(newavatar, function (err, data) {
                    var newPath = "../../public/img/"+newavatar;
                    fs.writeFile(newPath, data, function (err) {
                        console.log("avatar a changer".green);
                        newuser.avatar = "../img/"+newavatar;
                        userRepository.updateUser(currentuser, newuser, function(err, data){
                            res.redirect('/chat');
                        });
                  });
                });           
            }
            console.log("juste mot de passe a changer".green);
            userRepository.updateUser(currentuser, newuser, function(err, data){
                res.redirect('/chat');
            });

            });
          }
        }       
      }
});

app.post('/updateavatar', function(req, res) {

console.log('FILES '.blue+req.files);


    if (avatarname != "") {
        for (var user in logusers) {
            if (logusers.hasOwnProperty(user)) {
                if (logusers[user] == req.sessionID) {
                    userRepository.getUserByName(user, function (err, currentuser) {
                        var newuser = currentuser;
                        fs.readFile(avatarpath, function (err, data) {
                            var newPath = "../../public/img/" + avatarname;
                            fs.writeFile(newPath, data, function (err) {
                                console.log("avatar a changer".green);
                                newuser.avatar = "../img/" + avatarname;
                                userRepository.updateUser(currentuser, newuser, function (err, data) {
                                    res.redirect('/chat');
                                });
                            });
                        });
                    });
                }
            }
        }
    }
    });


