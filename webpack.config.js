module.exports = options => {
  return {
    entry: './src/index.js',
    output: {
      filename: './js/bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            __dirname + '/node_modules',
            __dirname + '/src/supermarket_checkout'
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
    }
  };
}
