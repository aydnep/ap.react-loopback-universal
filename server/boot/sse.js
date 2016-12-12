const es = require('event-stream');

module.exports = (app) => {
  const sse = app.models.sse;
  sse.createChangeStream((err, changes) => {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
};
