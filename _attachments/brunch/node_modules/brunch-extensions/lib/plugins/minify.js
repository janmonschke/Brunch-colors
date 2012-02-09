(function() {
  var BasePlugin, ast_mangle, ast_squeeze, async, cleanCSS, gen_code, minify, parse, uglify, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  async = require('async');

  cleanCSS = require('clean-css');

  uglify = require('uglify-js');

  BasePlugin = require('./base').BasePlugin;

  _ref = uglify.uglify, gen_code = _ref.gen_code, ast_squeeze = _ref.ast_squeeze, ast_mangle = _ref.ast_mangle;

  parse = uglify.parser.parse;

  minify = function(file, callback) {
    var err, minified;
    minified = null;
    err = null;
    switch (file.path.split('.').pop()) {
      case 'js':
        try {
          minified = gen_code(ast_squeeze(ast_mangle(parse(file.data))));
        } catch (error) {
          err = "JS minify failed on " + file.path + ": " + error;
        }
        break;
      case 'css':
        try {
          minified = cleanCSS.process(file.data);
        } catch (error) {
          err = "CSS minify failed on " + file.path + ": " + error;
        }
    }
    return process.nextTick(function() {
      file.data = minified || file.data;
      return callback(err, file);
    });
  };

  exports.MinifyPlugin = (function(_super) {

    __extends(MinifyPlugin, _super);

    function MinifyPlugin() {
      MinifyPlugin.__super__.constructor.apply(this, arguments);
    }

    MinifyPlugin.prototype.load = function(files, callback) {
      return async.map(files, minify, callback);
    };

    return MinifyPlugin;

  })(BasePlugin);

}).call(this);
