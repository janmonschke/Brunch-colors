(function() {
  var AssetsPlugin, BasePlugin, MinifyPlugin;

  AssetsPlugin = require('./assets').AssetsPlugin;

  BasePlugin = require('./base').BasePlugin;

  MinifyPlugin = require('./minify').MinifyPlugin;

  module.exports = {
    AssetsPlugin: AssetsPlugin,
    BasePlugin: BasePlugin,
    MinifyPlugin: MinifyPlugin
  };

}).call(this);
