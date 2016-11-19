const PassportConfigurator = require('loopback-component-passport').PassportConfigurator;

module.exports = (app) => {
  const passportConfigurator = new PassportConfigurator(app);
  let passportConfig = {};
  try {
    passportConfig = require('../passport.local.json');
  } catch (ex) {
    console.log(ex);
    passportConfig = require('../passport.json');
  }

  const facebook = passportConfig['facebook-login'];
  const local = passportConfig.local;
  facebook.session = facebook.session !== false;
  local.session = local.session !== false;
  passportConfigurator.init();
  passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
  });
  passportConfigurator.configureProvider('facebook-login',
    facebook);
  passportConfigurator.configureProvider('local',
    local);
};
