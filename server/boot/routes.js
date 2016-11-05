module.exports = (app) => {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', (req, res) => {
    res.send('pong');
  });
};
