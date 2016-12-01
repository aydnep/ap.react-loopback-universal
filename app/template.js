export default (react, state) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>React App</title>
  </head>
  <body>
    <div id="app">${react}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
    <script type="text/javascript" src="/static/js/bundle.js"></script>
  </body>
</html>
`;
