  // Handle 404
  app.use(function(req, res) {
   res.send('404: Page not Found', 404);
   console.log('404'.red);
 });