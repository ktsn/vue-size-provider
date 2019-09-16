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
    extensions: ['.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
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
              '@babel/env',
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
  devtool: 'cheap-module-eval-source-map'
}
