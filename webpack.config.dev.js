const webpack = require('webpack')
const NpmDtsWebpackPlugin = require('npm-dts-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const exportedConfig = {
  entry: __dirname + '/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    sourceMapFilename: 'index.js.map',
    libraryTarget: 'umd',
    library: 'ApiMountClient',
  },
  resolveLoader: {
    modules: [__dirname + '/node_modules'],
  },
  externals: [nodeExternals()],
  plugins: [new NpmDtsWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: __dirname + '/tsconfig.json',
            },
          },
        ],
      },
    ],
  },
}

module.exports = exportedConfig
