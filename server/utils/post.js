app.post('/login', function(req, res){
    var userlogin = req.body.user.login;
    var userpassword = req.body.user.password;

    res.render('chat', { username : userlogin
        });
});