const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const PassportConfigurator = require('loopback-component-passport').PassportConfigurator;


module.exports = (app) => {
   const passportConfigurator = new PassportConfigurator(app);
   let passportConfig = {};
   try {
    passportConfig = require('../passport.local.json');
   } catch (ex) {
    passportConfig = require('../passport.json');
   }
  // Install a "/ping" route that returns "pong"
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.get('/auth/facebook/:id', (req, res) => {
    console.log('/auth/facebook/:id');
    const facebook = passportConfig['facebook-login'];
    facebook.successRedirect = `/${req.params.id}`;
    passportConfigurator.setupModels({
      userModel: app.models.user,
      userIdentityModel: app.models.userIdentity,
      userCredentialModel: app.models.userCredential
    });

    passportConfigurator.configureProvider('facebook-login',
     facebook);
    res.redirect('/auth/facebook');
    // res.send(req.params.id);
  });

  app.get('/auth/account', ensureLoggedIn('/'), (req, res) => {
    res.send(req.user);
  });

  app.get('/login', (req, res) => {
    console.log('/login');
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
          console.log(err);
        }
        res.clearCookie('access_token');
        res.clearCookie('userId');
        res.send(result);
      });
    }
    res.redirect('/');
  });

  app.get('/usr', (req, res) => {
    res.send(res.user);
  });

  app.get('/token', (req, res) => {
    // console.log(req.accessToken);
    res.send(req.accessToken);
  });
};
