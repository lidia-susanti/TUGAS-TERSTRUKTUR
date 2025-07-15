const path = require('path')
const nodeExternals = require('webpack-node-externals')

const CURRENT_WORKING_DIR = process.cwd()

const config = {
  name: 'server',
  target: 'node',
  entry: [path.join(CURRENT_WORKING_DIR, './server/server.js')],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/'),
    filename: 'server.generated.cjs', // ← penting: pakai .cjs
    publicPath: '/dist/',
    libraryTarget: 'commonjs2'        // ← output CommonJS
  },
  externals: [nodeExternals()],       // ← abaikan node_modules saat build
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}

module.exports = config

