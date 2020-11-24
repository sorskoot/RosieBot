var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
  pluginOptions: {
    electronBuilder: {
      removeElectronJunk: false // True by default
    }
  },  
  configureWebpack: {
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
    ],
  },
  lintOnSave: false,
  devServer: {
    disableHostCheck: true
  }
};