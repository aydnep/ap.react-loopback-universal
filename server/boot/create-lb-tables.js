module.exports = (app) => {
  const ds = app.dataSources.mysql;
  const lbTables = ['user', 'accessToken', 'userCredential', 'userIdentity', 'ACL', 'RoleMapping', 'Role'];
  ds.isActual(lbTables, (err, actual) => {
    if (err) {
      throw err;
    }
    if (!actual) {
      ds.autoupdate(lbTables, (er) => {
        if (er) {
          throw er;
        }
      });
    } else {
      app.models.user.findOrCreate({
        where: { username: 'test' }
      }, {
        username: 'test',
        email: 'test@gmail.com',
        password: 'test',
      }, (findErr, instance, created) => {
        if (findErr) {
          console.log(findErr);
          // throw findErr;
        } else if (created) {
          console.log(created);
          console.log('Create test user');
        }
      });
    }
  });
};
