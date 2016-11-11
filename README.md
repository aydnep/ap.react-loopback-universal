**PLEASE CREATE ISSUES AT https://github.com/strongloop/loopback/issues**

---

#loopback-getting-started

This is the example application that accompanies the [Getting started with LoopBack](http://docs.strongloop.com/display/LB/Getting+started+with+LoopBack) tutorial. Follow the steps in the tutorial to create this application from scratch.

NOTE: This repository has commits for each step of the tutorial, so you can pick up the tutorial at any point along the way:

See [Getting started with LoopBack](http://docs.strongloop.com/display/LB/Getting+started+with+LoopBack) for step-by-step instructions to create this application.

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)

##Authentication 

Motivated by:
* [Ionic & LoopBack Frameworks – Building a REST API](https://strongloop.com/strongblog/part-1-ionic-loopback-node-js-mobile/)
* [loopback-example-passport](https://github.com/strongloop/loopback-example-passport)
* [Third-party login using Passport](http://loopback.io/doc/en/lb2/Third-party-login-using-Passport.html)
* [Tutorial: third-party login](http://loopback.io/doc/en/lb2/Tutorial-third-party-login.html)

[How to get req.user in /auth/callback](https://github.com/AndriiPindiura/ap.react-redux-loopback/commit/9f45a136c1d553ab5afd73cf9d9cc94e543eae26)

## Universal(isomorphic)

Motivated by:
* [How to Implement Node + React Isomorphic JavaScript & Why it Matters](https://strongloop.com/strongblog/node-js-react-isomorphic-javascript-why-it-matters/)
* [Webpack backend](http://jlongster.com/Backend-Apps-with-Webpack--Part-I)
* [reactGo](https://github.com/reactGo/reactGo)
* [Fix window is not defined in server rendering](https://github.com/webpack/css-loader/issues/270)
* [Isomorphic Webpack proxy](https://github.com/damassi/loopback-isomorphic-react-example)
* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)

## Client

Client side was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md                           // This file
  node_modules/                       // Modules to run and work application
  package.json                        // Project configuration file
  .eslintrc                           // ESLint rules
  .eslintignore                       // ESLint exceptions
  build/                              // Production ready folder
  client/                             // Public folder to store static files (Front-End)
  common/                             // Loopback common folder
    models/                           // Loopback data-models folder
      access-token.json               // Extended accessToken model [loopback-example-passport](https://github.com/strongloop/loopback-example-passport)
      user.js                         // Model before/afret helpers (Add & Remove cookies after login/logut) 
      user.json                       // Extended User model [loopback-example-passport](https://github.com/strongloop/loopback-example-passport)
      user-credentials.json           // Extended userCredential model [loopback-example-passport](https://github.com/strongloop/loopback-example-passport)
      user-identity.json              // Extended userIdentity model [loopback-example-passport](https://github.com/strongloop/loopback-example-passport)
  config/                             // Project config and build-helpers
    jest/                             // Facebook JavaScript test
    env.js                            // Webpack client environment
    path.js                           // Webpack client folders config
    polyfills.js                      // whatwg-fetch - promise polyfills
    webpack.config.development.js     // Webpack development config
    webpack.config.production.js      // Webpack production config
  server/                             // Loopback backend/api folder
    boot/                             // Loopback boot scripts
      authentication.js               // Enable [authentication](http://loopback.io/doc/en/lb2/Authentication-authorization-and-permissions.html) & [loopback.token middleware](https://strongloop.com/strongblog/part-1-ionic-loopback-node-js-mobile/)
      create-lb-tables.js             // Database update script & create test user 
      passport-facebook.js            // Apply passport-facebook provider middleware
      root.js                         // Root routing (app entry point)
      routes.js                       // Backend/api routes
    component-config.json             // Loopback components config (base)
    component-config.production.json  // Loopback components config (production)
    config.json                       // Loopback general config (base)
    datasources.json                  // Databases providers(connectors) config(base)
    datasources.local.json            // Databases providers(connectors) config(local without git sync)
    environment.js                    // Environment helper
    middleware.development.json       // Loopback middlewares development config (helmet, client folder etc.)
    middleware.json                   // Loopback middlewares base config (helmet, client folder etc.)
    model-config.json                 // Applying models to connectors/providers
    passport.json                     // Passport providers config file
    server.js                         // Application entry-point
  src/                                // Application source folder
    components/                       // React components
      component/                      // React component folder
        component.js(x)               // React component file
        component.css                 // Compiled Styles (please do not edit)
        component.scss                // component Styles (edit styles here) auto compiled to css
    containers/                       // React-Redux containers with mapped state and actions
      App.js(x)                       // root react-redux container - render children route containers
      Container.jx(x)                 // React-Redux container (linked in routes.js(x))
    css/                              // Application Styles like (reset.css, normalize.css, fonts.css)
      _include-media.scss             // [include-media](http://include-media.com/) Simple, elegant and maintainable media queries in Sass
    img/                              // Images path
      component/                      // Component images path
    redux/                            // Redux implementation
      middlewares/                    // Redux middlewares and promises from https://github.com/reactGo/reactGo
        preRenderMiddleware.js        // preRenderMiddleware for server rendering (currently not used)
        promiseMiddleware.js          // Promise middleware for actions and http requests (REQUEST, SUCCESS, FAIL types)
      modules/                        // Redux modules (reducers&actions)
        module/                       // Incapsulated redux module
          index.js                    // implementation reducer, actions and constants
        index.js                      // Root-reducer combineReducers
      configureStore.js               // Store configuration, apply middlewares and hot modules
    index.js                          // Front-End entry point. Import store from redux, apply routing and render application
    index.html                        // HTML template
    routes.js(x)                      // React-router child routes and route logic
  server/
```
For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Custom Packages, added to Original Boilerplate

- [Concurrently for multiple tasks](https://www.npmjs.com/package/concurrently)
- [ESLint JavaScript Linter](http://eslint.org/)
  - [ESLint Airbnb ruleset](https://www.npmjs.com/package/eslint-config-airbnb)
  - [ESLint ES2015+(ES6+) import/export syntax](https://www.npmjs.com/package/eslint-plugin-import)
  - [ESLint JSX ruleset](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
  - [ESLint React ruleset](https://www.npmjs.com/package/eslint-plugin-react)
- [Node-SASS add SASS(SCSS) support for project](https://www.npmjs.com/package/node-sass)
- [React Redux Official React bindings for Redux](https://github.com/reactjs/react-redux)
- [React Router is a complete routing library for React](https://github.com/ReactTraining/react-router)
- [react-router-redux Ruthlessly simple bindings to keep react-router and redux in sync](https://www.npmjs.com/package/react-router-redux)
- [Redux data flow](http://redux.js.org/)
- [Redux Logger middleware](https://www.npmjs.com/package/redux-logger)
- [Thunk middleware for Redux](https://github.com/gaearon/redux-thunk)

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
