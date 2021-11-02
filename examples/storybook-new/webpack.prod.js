const devConfig = require('./webpack.config');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
module.exports = {
  ...devConfig,
  mode: 'production',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    ...devConfig.optimization,
    concatenateModules: true,
    minimize: true,
  },
  plugins: [
    ...devConfig.plugins,
    new WebpackCdnPlugin({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: 'umd/react.production.min.js',
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: 'umd/react-dom.production.min.js',
        },
      ],
    }),
  ],
};
