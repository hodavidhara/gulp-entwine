"use strict";
const through = require('through2');
const PluginError = require('gulp-util').PluginError;

function entwine(transformer, options) {
  const PLUGIN_NAME = options.pluginName || 'entwine';
  return through.obj(function(file, encoding, callback) {
    try {
      if (file.isNull()) {
        return callback(null, file);
      }

      if (file.isStream()) {
        let completeString = '';
        let chunk;
        while (null !== (chunk = file.contents.read())) {
          completeString += chunk;
        }
        const transformed = transformer(completeString);
        file.contents = through();
        file.contents.write(transformed);

        return callback(null, file);

      } else if (file.isBuffer()) {
        file.contents = new Buffer(transformer(file.contents.toString('utf-8')));
        return callback(null, file);
      }
    } catch (e) {
      this.emit('error', new PluginError(PLUGIN_NAME, e.message));
    }
  });
}

module.exports = entwine;