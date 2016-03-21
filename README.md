# gulp-entwine
[![Build Status](https://travis-ci.org/hodavidhara/gulp-entwine.svg?branch=master)](https://travis-ci.org/hodavidhara/gulp-entwine)

Turn your string to string functions into gulp plugins

## Usage

Given a function with a single string parameter that returns a string:

```js
const repeat = (input) => {
  return input + input;
};
```

Easily turn it into a gulp plugin using entwine:

```js
const gulp = require('gulp');
const entwine = require('gulp-entwine');
const repeat = require('repeat');

gulp.task('something', () => {
  return gulp.src('file.txt')
    .pipe(entwine(repeat))
    .pipe(gulp.dest('out'));
});
```

## API

`entwine(transformer, options)`

* `transformer` - A function with a single string parameter that returns a string.
* `options.pluginName` - Used in the message when an error is emitted. Defaults to 'entwine'.