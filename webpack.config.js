const path = require('path')
const Dotenv = require('dotenv-webpack');
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  plugins: [
    new Dotenv(),  // Load environment variables from a .env file
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',  // Enable the Options API
      __VUE_PROD_DEVTOOLS__: 'false',  // Disable devtools in production
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',  // Disable hydration mismatch warnings
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
}
