module.exports = (app) => {
  // console.log(app.models()[0]);
  const ds = app.dataSources.db;
  const lbTables = ['user', 'accessToken', 'userCredential', 'userIdentity', 'ACL', 'RoleMapping', 'Role'];
  // const lbTables = ['ACL', 'RoleMapping', 'Role'];
  // const lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
  // const lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role'];
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
        email: 'test@gmail.com',
        password: 'test',
        username: 'test',
      }, (findErr, instance, created) => {
        if (findErr) {
          throw findErr;
        }
        // if (instance) {
        //   console.log(instance);
        //   console.log('test user exist');
        // }
        if (created) {
          console.log(created);
          console.log('Create test user');
        }
      });
    }
  });
};
