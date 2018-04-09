const path = require('path')
const glob = require('glob')

process.env.BABEL_ENV = 'test'

module.exports = {
  entry: glob.sync(path.resolve(__dirname, '../test/**/*.js')),
  output: {
    path: path.resolve(__dirname, '../.tmp'),
    filename: 'test.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [
            [
              'env',
              {
                modules: false,
                targets: {
                  browsers: ['last 1 Chrome versions']
                }
              }
            ],
            'power-assert'
          ]
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map'
}
