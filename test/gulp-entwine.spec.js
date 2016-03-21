'use strict';
const test = require('tape');
const streamify = require('stream-array');
const File = require('vinyl');
const entwine = require('../gulp-entwine');

const repeat = (input) => {
  return input + input;
};

test('gulp-entwine transforms a buffered file', (t) => {
  t.plan(2);

  var fakeFile = new File({
    contents: new Buffer('abufferwiththiscontent')
  });

  var plugin = entwine(repeat, {
    pluginName: 'repeat-plugin'
  });

  plugin.once('data', function(file) {
    t.equal(file.isBuffer(), true, 'should be a buffer');
    t.equal(file.contents.toString('utf8'), 'abufferwiththiscontentabufferwiththiscontent',
      'file contents are as expected');
  });

  plugin.write(fakeFile);
});

test('gulp-entwine transforms a streamed file', (t) => {
  t.plan(2);

  var fakeFile = new File({
    contents: streamify(['stream', 'with', 'those', 'contents'])
  });

  var plugin = entwine(repeat, {
    pluginName: 'repeat-plugin'
  });

  plugin.once('data', function(file) {
    t.equal(file.isStream(), true, 'should be a stream');
    let completeString = '';
    let chunk;
    while (null !== (chunk = file.contents.read())) {
      completeString += chunk;
    }

    t.equal(completeString, 'streamwiththosecontentsstreamwiththosecontents',
      'file contents are as expected');
  });

  plugin.write(fakeFile);
});