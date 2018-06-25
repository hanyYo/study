const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry : './index.js',
  output : {
    path : path.resolve(__dirname, 'dist'),
    publicPath : '/dist',
    filename : 'bundle.js'
  },
  mode : 'production',
  module : {
    rules : [
      {
        test : /\.js$/,
        include : path.join(__dirname),
        exclude : /(node_modules)|(dist)/,
        use : {
          loader : 'babel-loader',
          options: {
            presets : [
              ['env', {
                'targets' : {
                  'browsers' : ['last 2 versions', 'ie 9']
                },
                'debug' : true
              }]
            ]
          }
        }
      }
    ]
  }
};
