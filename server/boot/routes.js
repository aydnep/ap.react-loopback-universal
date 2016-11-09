module.exports = (app) => {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.get('/login', (req, res) => {
    app.models.user.login({
      username: 'test',
      password: 'test',
    }, (err, token) => {
      if (err) {
        throw err;
      }
      if (token != null) {
        if (token.id != null) {
          res.cookie('access_token', token.id, {
            signed: req.signedCookies ? true : false,
            maxAge: 1000 * token.ttl
          });
          return res.send(token);
        }
      }
      return res.redirect('/');
    });
  });

  app.get('/logout', (req, res) => {
    if (req.accessToken) {
      app.models.user.logout(req.accessToken.id, (err, result) => {
        if (err) {
          throw err;
        }
        res.clearCookie('access_token');
        res.clearCookie('userId');
        res.send(result);
      });
    }
    res.redirect('/');
  });

  app.get('/test', (req, res) => {
    // console.log(req.accessToken);
    res.send(req.accessToken);
  });
};
