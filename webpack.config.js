const webpack = require('webpack');

module.exports = options => {
  return {
    entry: './src/index.js',
    output: {
      filename: './js/bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            __dirname + '/node_modules',
            __dirname + '/src/supermarket_checkout',
            __dirname + '/supermarket_catalog'
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: process.env.NODE_ENV === 'production'
      })
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: './'
    }
  };
}
