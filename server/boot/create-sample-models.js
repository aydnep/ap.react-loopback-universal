module.exports = (app) => {
  app.dataSources.mysql.automigrate('User', (err) => {
    if (err) throw err;

    app.models.User.create({
      email: 'test@gmail.com', password: 'test'
    }, (error, user) => {
      if (error) throw error;

      console.log('Models created: \n', user);
    });
  });
};
