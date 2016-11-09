const PassportConfigurator = require('loopback-component-passport').PassportConfigurator;

 module.exports = (app) => {
   console.log('passport-facebook');
   const passportConfigurator = new PassportConfigurator(app);
   let passportConfig = {};
   try {
    passportConfig = require('../passport.local.json');
   } catch (ex) {
    passportConfig = require('../passport.json');
   }

   const provider = passportConfig['facebook-login'];
   provider.session = provider.session !== false;
   passportConfigurator.init();
   passportConfigurator.setupModels({
     userModel: app.models.user,
     userIdentityModel: app.models.userIdentity,
     userCredentialModel: app.models.userCredential
   });
   passportConfigurator.configureProvider('facebook-login',
     provider);
 };
