const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('./webpack.config');
const configureApp = require('./src/server/configure-app');

const start = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, '../../public')));
  const multiCompiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(multiCompiler, {
      publicPath: '/dist/client',
      serverSideRender: true,
      writeToDisk(filePath) {
        return (
          /dist\/server\//.test(filePath) ||
          /dist\/client\//.test(filePath) ||
          /loadable-stats/.test(filePath)
        );
      },
    })
  );

  configureApp(app);
  app.use(webpackHotServerMiddleware(multiCompiler, { chunkName: 'renderer' }));

  app.listen(3002, () => {
    console.log(`[DEV] Test env server is listening on port 3002`);
  });
};

start();
