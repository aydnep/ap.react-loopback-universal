const PassportConfigurator = require('loopback-component-passport').PassportConfigurator;

 module.exports = (app) => {
   const passportConfigurator = new PassportConfigurator(app);
   let passportConfig = {};
   try {
    passportConfig = require('../passport.local.json');
   } catch (ex) {
    passportConfig = require('../passport.json');
   }

   passportConfigurator.init();
   passportConfigurator.setupModels({
     userModel: app.models.user,
     userIdentityModel: app.models.userIdentity,
     userCredentialModel: app.models.userCredential
   });
   passportConfigurator.configureProvider('facebook-login',
     passportConfig['facebook-login']);
 };
