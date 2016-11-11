const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const paths = require('./paths');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(entry => ['.bin'].indexOf(entry) === -1)
  .forEach(module => nodeModules[module] = `commonjs ${module}`);


module.exports = {
  entry: paths.appServerJs,
  target: 'node',
  output: {
    path: paths.appBuild,
    filename: 'server.js',
    // library: 'library',
    libraryTarget: 'commonjs2',
    // umdNamedDefine: true,
  },
  externals: nodeModules,
  resolve: {
    extensions: ['.js', '.json', '.jsx', ''],
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     loader: 'eslint',
    //     // include: paths.appSrc,
    //   }
    // ],
    loaders: [
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        // include: paths.appSrc,
        loader: 'babel',
        exclude: 'node_modules',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          // plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: 'css!postcss'
      },
      {
        test: /\.scss$/,
        loader: 'css?module&localIdentName=[name]__[local]___[hash:base64:3]!sass!postcss'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  postcss: () => {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
};
