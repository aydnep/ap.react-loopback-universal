// server loopback build
const loopback = require('loopback');
const boot = require('loopback-boot');
// const PassportConfigurator = require('loopback-component-passport').PassportConfigurator;

const app = module.exports = loopback();

// client webpack build
const webpack = require('webpack');
const env = require('./environment');

const mode = process.env.NODE_ENV || env.DEVELOPMENT;
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const config = require(`../config/webpack.config.${mode}`);
const compiler = webpack(config);
// compiler.apply(new ProgressPlugin((percentage, msg) => console.log((percentage * 100) + '%', msg)));

if (mode === env.DEVELOPMENT) {
    // only need in development
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
}
app.use(webpackHotMiddleware(compiler));


app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});

// -- Add your pre-processing middleware here --

// body-parser
const bodyParser = require('body-parser');

app.middleware('parse', bodyParser.json());
app.middleware('parse', bodyParser.urlencoded({ extended: true }));


// const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
