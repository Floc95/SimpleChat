  // Handle 404
  app.use(function(req, res) {
     res.send('404: Page not Found', 404);
     console.log('404'.red);
  });
  
  // Handle 500
  app.use(function(error, req, res, next) {
     res.send('500: Internal Server Error', 500);
     console.log('500'.red);
  });